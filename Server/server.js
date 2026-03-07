import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import mailRoutes from './routes/mailRoutes.js';
import blogRoutes from './routes/blogRoutesMongo.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().catch(err => {
  console.log('⚠️  Server will start without database connection');
  console.log('💡 Email notifications will still work, but data won\'t be persisted');
});

// Middleware
const corsOptions = {
  origin: true, // Allow all origins in production (you can restrict this later)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'IOT Web Server API',
    version: '1.0.0',
    status: 'running',
  });
});

// API Routes
app.use('/api/mail', mailRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  - GET  /');
  console.log('  - POST /api/mail/send');
  console.log('  - POST /api/mail/contact');
  console.log('  - POST /api/mail/subscribe');
  console.log('  - GET  /api/blog/posts');
  console.log('  - GET  /api/blog/posts/published');
  console.log('  - GET  /api/blog/posts/:id');
  console.log('  - POST /api/blog/posts');
  console.log('  - PUT  /api/blog/posts/:id');
  console.log('  - DELETE /api/blog/posts/:id');
  console.log('  - POST /api/auth/login');
  console.log('  - POST /api/auth/signup');
});

export default app;
