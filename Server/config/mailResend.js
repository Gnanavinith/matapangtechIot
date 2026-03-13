import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const SITE_URL = process.env.FRONTEND_URL;

// ✅ Lazy getter — only created when first used, after dotenv has loaded
let resendInstance = null;
const getResend = () => {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ RESEND_API_KEY not set - Resend email service unavailable');
      return null;
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
};

export const sendEmailResend = async (options) => {
  try {
    const resend = getResend();
    if (!resend) {
      return { success: false, error: 'RESEND_API_KEY not configured' };
    }
    const { data, error } = await resend.emails.send({
      from: `${process.env.SMTP_NAME || 'Matapangtech'} <onboarding@resend.dev>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('Resend email sent:', data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error('Error sending email with Resend:', error);
    return { success: false, error: error.message };
  }
};

export const sendNewSubscriberEmailResend = async (name, email) => {
  return sendEmailResend({
    to: ADMIN_EMAIL,
    subject: 'New Subscriber Registration',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #06A3DA;">New Subscriber Alert!</h2>
        <p>You have received a new subscriber registration.</p>
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

export const sendWelcomeEmailResend = async (email) => {
  return sendEmailResend({
    to: email,
    subject: 'Welcome to Our Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background-color: #06A3DA; padding: 30px; text-align: center;">
          <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1c4ef999-e26e-49ca-963f-8e789d56b22c-matapangtech-com/assets/images/Matapang3bg-1.png" alt="Matapang Logo" style="height: 60px; background-color: white; padding: 10px; border-radius: 8px;" />
        </div>
        <div style="padding: 40px 30px;">
          <h1 style="color: #091E3E; font-size: 28px; margin-bottom: 20px;">Welcome to Our Newsletter!</h1>
          <p style="color: #6B6A75; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for subscribing! We're excited to have you on board.
          </p>
          <p style="color: #6B6A75; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            You'll now receive the latest updates, insights, and news about our innovative IoT solutions directly to your inbox.
          </p>
          <div style="background-color: #F8FBFF; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #06A3DA;">
            <h2 style="color: #06A3DA; font-size: 20px; margin-bottom: 15px;">What to Expect:</h2>
            <ul style="color: #6B6A75; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Latest IoT industry insights</li>
              <li>Product updates and new features</li>
              <li>Expert tips and best practices</li>
              <li>Exclusive event invitations</li>
            </ul>
          </div>
          <p style="color: #6B6A75; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            We're committed to enhancing efficiency and strategic decision-making for forward-thinking enterprises like yours.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${SITE_URL}" style="display: inline-block; background-color: #06A3DA; color: white; padding: 14px 35px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Visit Our Website</a>
          </div>
          <p style="color: #6B6A75; font-size: 15px; line-height: 1.6; margin-top: 30px;">
            Best regards,<br/>
            <strong style="color: #091E3E;">The IOT Team</strong>
          </p>
        </div>
        <div style="background-color: #091E3E; color: white; padding: 20px; text-align: center; font-size: 13px;">
          <p style="margin-bottom: 10px;">Innovative IoT solutions enhancing efficiency and strategic decision-making</p>
          <p style="opacity: 0.8;">You received this email because you subscribed to our newsletter.</p>
        </div>
      </div>
    `,
  });
};