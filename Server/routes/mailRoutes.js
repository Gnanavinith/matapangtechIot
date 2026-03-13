import express from 'express';
import { sendEmail, sendNewSubscriberEmail, sendWelcomeEmail } from '../config/mail.js';
import { sendEmailResend, sendNewSubscriberEmailResend, sendWelcomeEmailResend } from '../config/mailResend.js';
import Subscriber from '../models/subscriberModel.js';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'varavind746@gmail.com';

const useResend = !!process.env.RESEND_API_KEY;
console.log(`📧 Email service: ${useResend ? 'Resend (HTTP)' : 'Gmail SMTP'}`);

const sendEmailService = useResend ? sendEmailResend : sendEmail;
const sendWelcomeEmailService = useResend ? sendWelcomeEmailResend : sendWelcomeEmail;
const sendNewSubscriberEmailService = useResend ? sendNewSubscriberEmailResend : sendNewSubscriberEmail;

const router = express.Router();

// POST /api/mail/send
router.post('/send', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    if (!to || !subject) {
      return res.status(400).json({ success: false, message: 'Recipient email and subject are required' });
    }
    const result = await sendEmailService({ to, subject, text, html: html || text });
    if (result.success) {
      res.status(200).json({ success: true, message: 'Email sent successfully', messageId: result.messageId });
    } else {
      res.status(500).json({ success: false, message: 'Failed to send email', error: result.error });
    }
  } catch (error) {
    console.error('Error in mail route:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// POST /api/mail/contact
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message, service } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    try {
      await sendEmailService({
        to: ADMIN_EMAIL,
        subject: `New Quote Request from ${name} - ${service || 'General Inquiry'}`,
        html: `
          <h2>New Quote Request Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
          <h3>Message:</h3>
          <p>${message}</p>
          <hr>
          <p><small>Automated notification from your website.</small></p>
        `,
      });
      console.log('Admin email sent to:', ADMIN_EMAIL);
    } catch (err) {
      console.error('Failed to send admin email:', err.message);
    }

    try {
      await sendEmailService({
        to: email,
        subject: 'Thank you for contacting us',
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>We have received your quote request and will get back to you within 24 hours.</p>
          ${service ? `<p><strong>Service Interested:</strong> ${service}</p>` : ''}
          <h3>Your Message:</h3>
          <p>${message}</p>
          <p>Best regards,<br>Matapangtech Team</p>
          <hr>
          <p><small>Urgent? Call us at +91 8248742297</small></p>
        `,
      });
      console.log('Confirmation email sent to:', email);
    } catch (err) {
      console.error('Failed to send user email:', err.message);
    }

    res.status(200).json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// POST /api/mail/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    try {
      const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
      if (existingSubscriber) {
        if (existingSubscriber.status === 'active') {
          return res.status(400).json({ success: false, message: 'You are already subscribed to our newsletter!' });
        }
        existingSubscriber.status = 'active';
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();
      } else {
        await Subscriber.create({ email: email.toLowerCase() });
      }
    } catch (dbError) {
      console.error('Database operation failed:', dbError.message);
    }

    try {
      await sendWelcomeEmailService(email);
      console.log('Welcome email sent successfully');
    } catch (err) {
      console.error('Failed to send welcome email:', err.message);
    }

    try {
      await sendNewSubscriberEmailService('Newsletter Subscriber', email);
      console.log('Admin notification sent successfully');
    } catch (err) {
      console.error('Failed to send admin notification:', err.message);
    }

    res.status(200).json({ success: true, message: 'Successfully subscribed to our newsletter!' });
  } catch (error) {
    console.error('Error in subscribe route:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You are already subscribed to our newsletter!' });
    }
    res.status(500).json({ success: false, message: 'Failed to subscribe. Please try again later.', error: error.message });
  }
});

export default router;