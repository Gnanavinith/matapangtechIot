import express from 'express';
import { authenticateUser, createUser, getUserByEmail } from '../models/userModel.js';
import { sendNewSubscriberEmail } from '../config/mail.js';

const router = express.Router();

// POST /api/auth/login - User login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }
    
    // Authenticate user
    const user = authenticateUser(email, password);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
    
    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${user.id}:${user.email}`).toString('base64');
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// POST /api/auth/signup - User signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }
    
    // Check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }
    
    // Create new user
    const newUser = createUser({ name, email, password });
    
    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${newUser.id}:${newUser.email}`).toString('base64');
    
    // Send email notification if it's a regular user (not admin)
    if (!newUser.isAdmin) {
      try {
        await sendNewSubscriberEmail(newUser.name, newUser.email);
        console.log(`✓ New subscriber email sent for: ${newUser.email}`);
      } catch (emailError) {
        console.error('Failed to send new subscriber email:', emailError);
        // Don't fail the signup if email fails
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

export default router;
