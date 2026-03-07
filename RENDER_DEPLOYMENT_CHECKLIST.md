# Render Deployment Checklist ✅

## ⚠️ CRITICAL: Environment Variables on Render

The `.env` file in your Server folder is **NOT deployed** to Render. You MUST set these in Render Dashboard:

### 1. Go to Render Dashboard
- Visit: https://dashboard.render.com
- Select your web service: `matapangtechiot`

### 2. Set Environment Variables
Click **Environment** tab → **Add Environment Variable**:

| Key | Value | Required? |
|-----|-------|-----------|
| `PORT` | `10000` | Render sets this automatically |
| `NODE_ENV` | `production` | ✅ Required |
| `MONGODB_URI` | `mongodb+srv://vinithvini775:vinithvini775@thetee.2nn0l55.mongodb.net/TheTee?retryWrites=true&w=majority&appName=TheTee` | ✅ Required |
| `SMTP_HOST` | `smtp.gmail.com` | ✅ Required |
| `SMTP_PORT` | `587` | ✅ Required |
| `SMTP_USER` | `vinithvini775@gmail.com` | ✅ Required |
| `SMTP_PASS` | `wkai xsqj jotl oawk` | ✅ Required |
| `SMTP_NAME` | `Iot` | ✅ Required |
| `ADMIN_EMAIL` | `varavind746@gmail.com` | ✅ Required |
| `FRONTEND_URL` | Your frontend URL (optional for CORS) | Optional |

### 3. Verify MongoDB Atlas Access
1. Go to: https://cloud.mongodb.com
2. Click **Network Access**
3. Ensure **0.0.0.0/0** (Allow All IPs) is added
4. If not, add it to allow Render to connect

---

## 🔍 Debugging Steps

### Step 1: Check Render Logs
1. Go to Render Dashboard
2. Select your service
3. Click **Logs** tab
4. Submit the newsletter form
5. Look for errors like:
   - `MongoDB Connection Error`
   - `SMTP authentication failed`
   - `Connection timeout`

### Step 2: Test API Directly
Open terminal and run:
```bash
curl -X POST https://matapangtechiot.onrender.com/api/mail/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Successfully subscribed to our newsletter!"
}
```

If you get an error, check logs!

### Step 3: Health Check
Visit in browser: https://matapangtechiot.onrender.com/

Should return:
```json
{
  "message": "IOT Web Server API",
  "version": "1.0.0",
  "status": "running"
}
```

---

## 🛠️ Common Issues & Fixes

### Issue 1: MongoDB Connection Timeout
**Symptoms:** 500 error with "Connection timeout"

**Fix:**
1. Check MongoDB Atlas Network Access allows 0.0.0.0/0
2. Verify MONGODB_URI is correct in Render
3. Check cluster is running (not paused)

### Issue 2: Email Not Sending
**Symptoms:** Subscription succeeds but no email received

**Fix:**
1. Verify SMTP credentials in Render environment variables
2. Check Gmail app password is valid
3. Check Render logs for SMTP errors

### Issue 3: CORS Errors
**Symptoms:** Browser blocks request with CORS error

**Fix:**
1. Ensure server has CORS configured (already done in code)
2. Check FRONTEND_URL env var matches your actual frontend

### Issue 4: 404 Not Found
**Symptoms:** POST /api/mail/subscribe returns 404

**Fix:**
1. Verify server is running (check health endpoint)
2. Check route is mounted correctly in server.js
3. Redeploy to Render

---

## 📋 Quick Fix Commands

### Deploy Latest Code to Render:
```bash
cd "c:\Users\ADMIN\Desktop\IOT Web"
git add .
git commit -m "Deploy fixes"
git push origin main
```

Then wait 2-3 minutes for Render to redeploy.

### Test Locally First:
```bash
# Terminal 1 - Start Server
cd Server
npm start

# Terminal 2 - Start Client
cd Client
npm run dev
```

Test at http://localhost:5173 - if it works locally but not on Render, it's an environment variable issue!

---

## ✅ Verification Checklist

Before testing on Render, verify:

- [ ] Environment variables are set in Render Dashboard (not just .env file)
- [ ] MongoDB Atlas Network Access allows 0.0.0.0/0
- [ ] Latest code is deployed to Render (check commit hash)
- [ ] Server logs show "MongoDB Connected" or at least started
- [ ] Health endpoint responds: https://matapangtechiot.onrender.com/
- [ ] Frontend .env has correct VITE_API_URL pointing to Render

---

## 🆘 Still Not Working?

1. **Check the exact error** in browser console (F12)
2. **Check Render logs** for server-side errors
3. **Test with curl** to rule out frontend issues
4. **Verify all environment variables** are set correctly
5. **Check MongoDB connection** by testing locally first

Share the error message from Render logs for more specific help!
