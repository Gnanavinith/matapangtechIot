import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

// Create transporter with SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP verification failed:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

// Send email function
export const sendEmail = async (options) => {
  const mailOptions = {
    from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send new subscriber notification email
export const sendNewSubscriberEmail = async (name, email) => {
  const mailOptions = {
    from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_USER}>`,
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
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('New subscriber email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending new subscriber email:', error);
    throw error;
  }
};

// Send welcome email to new subscriber
export const sendWelcomeEmail = async (email) => {
  const mailOptions = {
    from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Welcome to Our Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #06A3DA; padding: 30px; text-align: center;">
          <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1c4ef999-e26e-49ca-963f-8e789d56b22c-matapangtech-com/assets/images/Matapang3bg-1.png" alt="Matapang Logo" style="height: 60px; background-color: white; padding: 10px; border-radius: 8px;" />
        </div>
        
        <!-- Content -->
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
            <a href="http://localhost:5173" style="display: inline-block; background-color: #06A3DA; color: white; padding: 14px 35px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Visit Our Website</a>
          </div>
          
          <p style="color: #6B6A75; font-size: 15px; line-height: 1.6; margin-top: 30px;">
            Best regards,<br/>
            <strong style="color: #091E3E;">The IOT Team</strong>
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #091E3E; color: white; padding: 20px; text-align: center; font-size: 13px;">
          <p style="margin-bottom: 10px;">Innovative IoT solutions enhancing efficiency and strategic decision-making</p>
          <p style="opacity: 0.8;">You received this email because you subscribed to our newsletter.</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

export default transporter;
