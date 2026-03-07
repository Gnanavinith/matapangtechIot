# MongoDB Setup Guide for IOT Web Server

## 📋 Overview

Your server now supports MongoDB for persistent blog post storage. This guide will help you set up MongoDB locally or use MongoDB Atlas (cloud).

---

## 🎯 Current Configuration

**Environment Variables in `.env`:**
```env
MONGODB_URI=mongodb://localhost:27017/iot-web-db
MONGODB_LOCAL=mongodb://127.0.0.1:27017/iot-web-db
DB_NAME=iot-web-db
```

---

## Option 1: Install MongoDB Locally (Recommended for Development)

### Windows Installation

#### Step 1: Download MongoDB Community Server
1. Visit: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (8.0.x or higher)
   - Platform: Windows
   - Package: MSI
3. Click **Download**

#### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **"Complete"** installation
3. Select **"Install MongoDB as a Service"** (recommended)
4. Keep default settings:
   - Data Directory: `C:\Program Files\MongoDB\Server\8.0\data`
   - Log Directory: `C:\Program Files\MongoDB\Server\8.0\log`
5. Click **Next** and **Install**

#### Step 3: Verify Installation
Open PowerShell and run:
```powershell
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
...
test>
```

Type `exit` to quit mongosh.

#### Step 4: Start Using MongoDB
MongoDB service should already be running. Verify with:
```powershell
Get-Service -Name MongoDB
```

If not running, start it:
```powershell
Start-Service MongoDB
```

---

## Option 2: MongoDB Atlas (Cloud - Free Tier)

### Step 1: Create Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. No credit card required

### Step 2: Create Cluster
1. Click **"Build a Database"**
2. Select **FREE** tier (M0 Sandbox)
3. Choose cloud provider and region (closest to you)
4. Click **"Create Cluster"**

### Step 3: Configure Access
1. **Database Access:**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Create username and password
   - Set role: "Read and write to any database"
   - Click "Add User"

2. **Network Access:**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click **"Allow Access from Anywhere"** (for development)
   - Click "Confirm"

### Step 4: Get Connection String
1. Go back to **Database** view
2. Click **"Connect"** on your cluster
3. Select **"Connect your application"**
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Update `.env` File
Replace the MONGODB_URI in your `.env` file:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/iot-web-db?retryWrites=true&w=majority
```

**Important:** Replace `<username>` and `<password>` with your actual credentials!

---

## 🚀 Testing MongoDB Connection

### Test Local MongoDB
```bash
cd "c:\Users\ADMIN\Desktop\IOT Web\Server"
npm start
```

Look for:
```
✅ MongoDB Connected: localhost
📦 Database: iot-web-db
```

### Test MongoDB Atlas
Same command, but you should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📦 Database: iot-web-db
```

---

## 📝 Using MongoDB with Your Blog API

### Create Sample Posts (With MongoDB)

The same script works with MongoDB:
```bash
cd "c:\Users\ADMIN\Desktop\IOT Web\Server"
node add-sample-posts.js
```

Posts will be saved to MongoDB database permanently!

### Verify Data in MongoDB

#### Using mongosh (Local):
```bash
mongosh
use iot-web-db
db.blogposts.find().pretty()
```

#### Using MongoDB Compass (GUI):
1. Download: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `iot-web-db`
4. View collection: `blogposts`

---

## 🔄 Switching Between In-Memory and MongoDB

Your server is configured to use MongoDB by default. If MongoDB is not available, it will show an error message.

**To force MongoDB usage:**
- Make sure MongoDB is running
- Check connection string in `.env`

**To disable MongoDB (use in-memory):**
- Comment out the `connectDB()` call in `server.js`
- Use the original `blogRoutes.js` instead of `blogRoutesMongo.js`

---

## 🛠️ Troubleshooting

### MongoDB Won't Start (Windows)

**Check if service exists:**
```powershell
Get-Service -Name MongoDB
```

**Start the service:**
```powershell
Start-Service MongoDB
```

**Check logs:**
```
C:\Program Files\MongoDB\Server\8.0\log\mongod.log
```

### Connection Refused Error

**Verify MongoDB is running:**
```powershell
Test-NetConnection -ComputerName localhost -Port 27017
```

Should return: `TcpTestSucceeded : True`

**Restart MongoDB service:**
```powershell
Restart-Service MongoDB
```

### Authentication Failed (Atlas)

1. Double-check username and password in connection string
2. Ensure IP address is whitelisted (0.0.0.0/0 for development)
3. Wait 5 minutes after creating user (propagation delay)

### Mongoose Not Connecting

**Check your `.env` file:**
```env
MONGODB_URI=mongodb://localhost:27017/iot-web-db
```

**Verify in code:**
```javascript
console.log(process.env.MONGODB_URI);
```

---

## 📊 Database Schema

Your blog posts are stored with this structure:

```javascript
{
  _id: ObjectId("..."),
  title: "Post Title",
  content: "Full content...",
  author: "Admin",
  excerpt: "Short description",
  featuredImage: "https://image-url.com/image.jpg",
  category: "Technology",
  tags: ["IoT", "Tech"],
  status: "published", // draft, published, archived
  createdAt: ISODate("2026-03-04T..."),
  updatedAt: ISODate("2026-03-04T...")
}
```

**Indexes created for performance:**
- `{ status: 1, createdAt: -1 }`
- `{ category: 1, status: 1 }`

---

## 🎯 Next Steps

1. ✅ Install MongoDB locally OR create Atlas account
2. ✅ Verify connection in terminal
3. ✅ Restart your server
4. ✅ Run sample posts script
5. ✅ Test blog API endpoints
6. ✅ View data in MongoDB Compass (optional)

---

## 📞 Quick Reference

### MongoDB Commands

**Show all databases:**
```javascript
show dbs
```

**Use database:**
```javascript
use iot-web-db
```

**Show collections:**
```javascript
show collections
```

**Find all posts:**
```javascript
db.blogposts.find()
```

**Find published posts:**
```javascript
db.blogposts.find({ status: "published" })
```

**Count posts:**
```javascript
db.blogposts.countDocuments()
```

**Delete all posts:**
```javascript
db.blogposts.deleteMany({})
```

---

## ✨ Benefits of MongoDB

✅ **Persistent Storage** - Data survives server restarts
✅ **Scalable** - Handle millions of blog posts
✅ **Flexible Schema** - Easy to add new fields
✅ **Powerful Queries** - Advanced filtering and sorting
✅ **Indexing** - Fast query performance
✅ **Production Ready** - Used by major companies

---

**Happy Coding with MongoDB! 🚀**
