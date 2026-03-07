# Quote Request Email - Troubleshooting Guide

## Problem
Quote request form is not sending emails.

---

## Quick Diagnosis

### 1️⃣ Check Browser Console (F12)

When you submit the quote form, what error do you see?

**Common errors:**
- `Failed to fetch` → Backend server is down or URL incorrect
- `404 Not Found` → Wrong API endpoint
- `CORS error` → Backend CORS not configured properly
- `500 Internal Server Error` → Backend error (check Render logs)

---

### 2️⃣ Is Your Render Backend Running?

**Check these:**

1. Go to https://render.com/dashboard
2. Find your service: `matapangtechiot`
3. Status should show **"Live"**
4. Click "Logs" tab

**Submit a quote and check for these log messages:**
```
POST /api/mail/contact
Sending quote notification to admin...
Admin email sent to: varavind746@gmail.com
User confirmation email result: { success: true, ... }
```

---

### 3️⃣ Environment Variables on Render

Make sure ALL these are set in Render dashboard:

| Variable | Value |
|----------|-------|
| `ADMIN_EMAIL` | varavind746@gmail.com |
| `SMTP_HOST` | smtp.gmail.com |
| `SMTP_PORT` | 587 |
| `SMTP_USER` | vinithvini775@gmail.com |
| `SMTP_PASS` | wkai xsqj jotl oawk |
| `SMTP_NAME` | Iot |
| `MONGODB_URI` | mongodb+srv://vinithvini775:vinithvini775@thetee.2nn0l55.mongodb.net/TheTee?retryWrites=true&w=majority&appName=TheTee |
| `PORT` | 5000 |

**To add environment variables on Render:**
1. Go to your service dashboard
2. Click "Environment" tab
3. Add each variable above
4. Click "Save Changes"
5. Service will automatically redeploy

---

### 4️⃣ Test Locally First

**Step 1: Start backend locally**
```bash
cd Server
npm run dev
```

**Step 2: Run test script**
```bash
node test-quote.js
```

**Expected output:**
```
Testing quote request...
Response: { success: true, message: 'Contact form submitted successfully' }
✅ Email sent successfully!
```

**If it works locally but not on Render:**
→ Issue is with Render deployment (environment variables or service status)

---

### 5️⃣ Gmail SMTP Issues

If using Gmail, make sure:

1. **2-Factor Authentication is enabled** on the Gmail account
2. **App Password** is generated (not regular password)
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate new app password for "Mail"
   - Use this 16-character password as `SMTP_PASS`

**Current SMTP credentials:**
```env
SMTP_USER=vinithvini775@gmail.com
SMTP_PASS=wkai xsqj jotl oawk  ← This should be an App Password
```

---

### 6️⃣ Common Solutions

#### **Solution A: Restart Render Service**
1. Go to Render dashboard
2. Click your service
3. Click "Manual Deploy" → "Deploy"
4. Wait for deployment to complete

#### **Solution B: Fix CORS**
If getting CORS errors, check `server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-domain.com'],
  credentials: true
}));
```

#### **Solution C: Check API URL**
Frontend `.env` should have:
```env
VITE_API_URL=https://matapangtechiot.onrender.com/api
```

---

### 7️⃣ Debug Checklist

- [ ] Backend server running (local or Render)
- [ ] All environment variables set
- [ ] MongoDB connected (check Render logs)
- [ ] SMTP credentials correct
- [ ] Frontend API URL points to production
- [ ] No console errors in browser
- [ ] No errors in Render logs

---

### 8️⃣ Quick Test Commands

**Test backend health:**
```bash
curl https://matapangtechiot.onrender.com/
```
Should return: `{"message":"IOT Web Server API","version":"1.0.0","status":"running"}`

**Test contact endpoint:**
```bash
curl -X POST https://matapangtechiot.onrender.com/api/mail/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

---

### 9️⃣ If Nothing Works

**Re-deploy everything:**

1. **Backend:**
   ```bash
   cd Server
   git push origin main  # This triggers Render deploy
   ```

2. **Frontend:**
   ```bash
   cd Client
   npm run build
   # Redeploy your frontend hosting
   ```

---

## Expected Email Flow

1. User fills quote form → clicks "Request A Quote"
2. Frontend sends POST to `/api/mail/contact`
3. Backend receives request
4. Backend sends email to ADMIN_EMAIL (notification)
5. Backend sends email to user (confirmation)
6. Frontend shows success message

**Timeline:** Emails should arrive within 1-2 minutes.

---

## Contact Information

If still having issues, check:
- Render community forums
- Nodemailer documentation
- Gmail SMTP limits (500 emails/day)
