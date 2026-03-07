# Server Setup Complete! ✓

## What's Been Created

### 📁 Project Structure
```
Server/
├── config/
│   └── mail.js              # SMTP email configuration
├── models/
│   └── blogModel.js         # Blog post data model
├── routes/
│   ├── mailRoutes.js        # Email API endpoints
│   └── blogRoutes.js        # Blog CRUD API endpoints
├── .env                     # Environment variables (SMTP credentials)
├── .gitignore
├── package.json
├── server.js                # Main server entry point
├── test-api.js              # API testing script
├── api-service.js           # Frontend integration helper
└── README.md                # Full documentation
```

### ✅ Installed Packages
- **express** - Web framework
- **nodemailer** - Email sending library
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **body-parser** - Request parsing
- **nodemon** - Development auto-reload

### 🔧 SMTP Configuration
- **Service**: Gmail SMTP
- **Email**: vinithvini775@gmail.com
- **Name**: Iot
- **Status**: ✓ Configured and ready

## 🚀 How to Use

### Start the Server
```bash
cd Server
npm start
```

The server is now running on: http://localhost:5000

### Development Mode (Auto-reload)
```bash
npm run dev
```

## 📡 API Endpoints

### Mail APIs

1. **Send Email**
   - `POST /api/mail/send`
   - Body: `{ to, subject, text, html }`

2. **Contact Form**
   - `POST /api/mail/contact`
   - Body: `{ name, email, phone, message }`

### Blog APIs

1. **Get All Posts**
   - `GET /api/blog/posts`

2. **Get Published Posts**
   - `GET /api/blog/posts/published`

3. **Get Single Post**
   - `GET /api/blog/posts/:id`

4. **Create Post**
   - `POST /api/blog/posts`
   - Body: `{ title, content, author, excerpt, category, tags, status }`

5. **Update Post**
   - `PUT /api/blog/posts/:id`
   - Body: `{ title, content, author, excerpt, category, tags, status }`

6. **Delete Post**
   - `DELETE /api/blog/posts/:id`

## 🧪 Testing

### Quick Test with cURL
```bash
# Create a blog post
curl -X POST http://localhost:5000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Hello World\",\"content\":\"My first post\",\"status\":\"published\"}"

# Get all posts
curl http://localhost:5000/api/blog/posts

# Send email
curl -X POST http://localhost:5000/api/mail/send \
  -H "Content-Type: application/json" \
  -d "{\"to\":\"test@example.com\",\"subject\":\"Test\",\"text\":\"Test email\"}"
```

### Using the Test Script
Edit `test-api.js` and uncomment the test functions, then run:
```bash
node test-api.js
```

## 🔗 Frontend Integration

Copy `api-service.js` to your frontend project and import it:

```javascript
import { mailAPI, blogAPI } from './api-service';

// Example: Submit contact form
const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await mailAPI.submitContactForm(name, email, message);
  if (result.success) {
    alert('Message sent!');
  }
};

// Example: Load blog posts
const loadPosts = async () => {
  const result = await blogAPI.getPublishedPosts();
  if (result.success) {
    setPosts(result.data);
  }
};
```

## 📝 Example Requests

### Create Blog Post
```json
POST /api/blog/posts
{
  "title": "IoT in Modern Technology",
  "content": "Internet of Things is transforming...",
  "author": "John Doe",
  "excerpt": "Exploring IoT applications",
  "category": "Technology",
  "tags": ["IoT", "Smart Devices"],
  "status": "published"
}
```

### Send Email
```json
POST /api/mail/send
{
  "to": "recipient@example.com",
  "subject": "Welcome to IoT Web",
  "text": "Plain text message",
  "html": "<h1>Welcome!</h1><p>HTML content</p>"
}
```

### Contact Form
```json
POST /api/mail/contact
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "message": "I'm interested in your services"
}
```

## ⚠️ Important Notes

1. **Data Storage**: Blog posts are stored in-memory and will be lost when the server restarts. For production, integrate a database like MongoDB or PostgreSQL.

2. **Gmail SMTP**: Make sure your Gmail account allows less secure app access or use an App Password.

3. **CORS**: CORS is enabled for development. Configure appropriate origins for production.

4. **Security**: Add authentication and authorization before deploying to production.

## 🎯 Next Steps

1. ✅ Server is running successfully
2. 🔄 Integrate with your React frontend
3. 💾 Add database support (optional)
4. 🔐 Add authentication (for production)
5. 📊 Test all endpoints

## 📞 Support

All code is documented in the respective files:
- `README.md` - Detailed documentation
- `server.js` - Main server file
- `config/mail.js` - Email configuration
- `routes/` - API route handlers
- `models/` - Data models

---

**Status**: ✓ Server is UP and RUNNING!
**Port**: 5000
**SMTP**: ✓ Connected and ready
**Blog API**: ✓ All CRUD operations available
