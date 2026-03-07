# IOT Web Server

Backend server for IOT Web application with email functionality and blog management.

## Features

- **Email Module**: Send emails using SMTP (Gmail)
- **Blog API**: Create, Read, Update, Delete blog posts
- **Contact Form**: Handle contact form submissions

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env` file (already configured):
- SMTP credentials are pre-configured
- Port defaults to 5000

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Mail Endpoints

#### 1. Send Email
```
POST /api/mail/send
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "text": "Plain text message",
  "html": "<h1>HTML message</h1>"
}
```

#### 2. Contact Form
```
POST /api/mail/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Your message here"
}
```

### Blog Endpoints

#### 1. Get All Posts
```
GET /api/blog/posts
```

#### 2. Get Published Posts
```
GET /api/blog/posts/published
```

#### 3. Get Single Post
```
GET /api/blog/posts/:id
```

#### 4. Create New Post
```
POST /api/blog/posts
Content-Type: application/json

{
  "title": "Blog Post Title",
  "content": "Blog post content...",
  "author": "Author Name",
  "excerpt": "Short description",
  "featuredImage": "image-url.jpg",
  "category": "Category",
  "tags": ["tag1", "tag2"],
  "status": "published" // or "draft"
}
```

#### 5. Update Post
```
PUT /api/blog/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "published"
}
```

#### 6. Delete Post
```
DELETE /api/blog/posts/:id
```

## Testing with cURL or Postman

### Test Email Sending:
```bash
curl -X POST http://localhost:5000/api/mail/send \
  -H "Content-Type: application/json" \
  -d "{\"to\":\"test@example.com\",\"subject\":\"Test Email\",\"text\":\"This is a test\"}"
```

### Test Create Blog Post:
```bash
curl -X POST http://localhost:5000/api/blog/posts \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"My First Post\",\"content\":\"Hello World!\",\"status\":\"published\"}"
```

### Test Get All Posts:
```bash
curl http://localhost:5000/api/blog/posts
```

## Project Structure

```
Server/
├── config/
│   └── mail.js          # SMTP configuration
├── models/
│   └── blogModel.js     # Blog post data model
├── routes/
│   ├── mailRoutes.js    # Email routes
│   └── blogRoutes.js    # Blog routes
├── .env                 # Environment variables
├── .gitignore
├── package.json
└── server.js            # Main entry point
```

## Notes

- Blog posts are stored in-memory (will be lost on server restart)
- For production, replace in-memory storage with a database (MongoDB, PostgreSQL, etc.)
- SMTP credentials are configured for Gmail
- Make sure to enable "Less secure app access" or use App Password for Gmail

## Technologies Used

- Express.js - Web framework
- Nodemailer - Email sending
- CORS - Cross-origin resource sharing
- dotenv - Environment variables
- body-parser - Request parsing
