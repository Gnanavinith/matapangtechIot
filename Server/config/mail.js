import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export const sendNewSubscriberEmail = async (name, email) => {
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: 'New Subscriber Registration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #06A3DA;">New Subscriber Alert!</h2>
        <div style="background-color: #F8FBFF; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p>This is an automated notification from the IOT Web platform.</p>
      </div>
    `,
  });
};

export const sendWelcomeEmail = async (email) => {
  return sendEmail({
    to: email,
    subject: 'Welcome to Our Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #06A3DA;">Welcome to Our Newsletter!</h2>
        <p>Thank you for subscribing! You'll receive the latest IoT updates directly to your inbox.</p>
        <p>Best regards,<br/><strong>The IOT Team</strong></p>
      </div>
    `,
  });
};

export default transporter;