import express from 'express';
import { sendEmail, sendNewSubscriberEmail, sendWelcomeEmail } from '../config/mail.js';
import Subscriber from '../models/subscriberModel.js';
import dotenv from 'dotenv';

dotenv.config();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'varavind746@gmail.com';

const router = express.Router();

// POST /api/mail/send - Send email endpoint
router.post('/send', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    // Validate required fields
    if (!to || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Recipient email and subject are required',
      });
    }

    // Send email
    const result = await sendEmail({
      to,
      subject,
      text,
      html: html || text, // Use HTML if provided, otherwise use text
    });

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Error in mail route:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// POST /api/mail/contact - Contact form endpoint
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message, service } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    // Send email to admin
    console.log('Sending quote notification to admin...');
    try {
      const adminResult = await sendEmail({
        to: ADMIN_EMAIL,
        subject: `New Quote Request from ${name} - ${service || 'General Inquiry'}`,
        html: `
          <h2>New Quote Request Received</h2>
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
          <h3>Message:</h3>
          <p>${message}</p>
          <hr>
          <p><small>This is an automated notification from your website.</small></p>
        `,
      });
      console.log('Admin email result:', adminResult);
      console.log('Admin email sent to:', ADMIN_EMAIL);
    } catch (emailError) {
      console.error('Failed to send admin email:', emailError.message);
    }

    // Send confirmation email to user
    console.log('Sending confirmation email to user:', email);
    try {
      const userResult = await sendEmail({
        to: email,
        subject: 'Thank you for contacting us',
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>We have received your quote request and will get back to you within 24 hours.</p>
          ${service ? `<h3>Service Interested:</h3><p>${service}</p>` : ''}
          <h3>Your Message:</h3>
          <p>${message}</p>
          <p><strong>Our team will review your requirements and contact you soon.</strong></p>
          <p>Best regards,<br>Matapangtech Team</p>
          <hr>
          <p><small>If you have any urgent questions, please call us at +91 8248742297</small></p>
        `,
      });
      console.log('User confirmation email result:', userResult);
    } catch (emailError) {
      console.error('Failed to send user email:', emailError.message);
    }

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// POST /api/mail/subscribe - Newsletter subscription endpoint
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
      });
    }

    // Check if subscriber already exists (only if DB is connected)
    try {
      const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
      
      if (existingSubscriber) {
        if (existingSubscriber.status === 'active') {
          return res.status(400).json({
            success: false,
            message: 'You are already subscribed to our newsletter!',
          });
        } else {
          // Reactivate subscription
          existingSubscriber.status = 'active';
          existingSubscriber.subscribedAt = new Date();
          await existingSubscriber.save();
        }
      } else {
        // Create new subscriber
        await Subscriber.create({ email: email.toLowerCase() });
      }
    } catch (dbError) {
      console.error('Database operation failed:', dbError.message);
      console.log('Proceeding without saving to database...');
      // Continue anyway - we'll still send emails
    }

    // Send welcome email to subscriber (don't fail if email fails)
    try {
      await sendWelcomeEmail(email);
      console.log('Welcome email sent successfully');
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError.message);
      // Continue anyway - subscription was successful
    }

    // Send notification email to admin (don't fail if email fails)
    try {
      await sendNewSubscriberEmail('Newsletter Subscriber', email);
      console.log('Admin notification sent successfully');
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError.message);
      // Continue anyway - subscription was successful
    }

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
    });
  } catch (error) {
    console.error('Error in subscribe route:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You are already subscribed to our newsletter!',
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again later.',
      error: error.message,
    });
  }
});

export default router;
