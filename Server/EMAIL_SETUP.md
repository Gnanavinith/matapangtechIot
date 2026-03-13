# EMAIL SERVICE SETUP GUIDE

This guide explains how to configure email sending for your application on **Vercel** or **Render**.

---

## ⚡ Quick Start (Choose One Method)

### Option A: Gmail SMTP (Free, but less reliable on serverless)
**Best for:** Local development, testing, small-scale production

### Option B: Resend API (Recommended for Vercel/Render)
**Best for:** Production, serverless environments, reliability
- ✅ Works perfectly on Vercel & Render
- ✅ Free tier: 3,000 emails/month (100/day)
- ✅ HTTP-based (no SMTP connection issues)
- ✅ Easy setup

---

## 🔧 Setup Instructions

### Option A — Gmail SMTP Configuration

#### 1. Get Gmail App Password
1. Go to your Google Account: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App passwords**: https://myaccount.google.com/apppasswords
4. Select "Mail" and your device, then click **Generate**
5. Copy the 16-character password (e.g., `wkai xsqj jotl oawk`)

#### 2. Update Environment Variables

**On Vercel Dashboard:**
- Go to Project → Settings → Environment Variables
- Add these variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=vinithvini775@gmail.com
SMTP_PASS=wkai xsqj jotl oawk
SMTP_NAME=Iot
ADMIN_EMAIL=varavind746@gmail.com
MONGODB_URI=mongodb+srv://vinithvini775:vinithvini775@thetee.2nn0l55.mongodb.net/TheTee?retryWrites=true&w=majority&appName=TheTee
```

**On Render Dashboard:**
- Go to Service → Environment
- Add the same variables as above

#### 3. Deploy
Push your code and redeploy. The app will automatically use Gmail SMTP.

---

### Option B — Resend API Configuration (RECOMMENDED)

#### 1. Sign Up for Resend
1. Go to https://resend.com
2. Sign up with GitHub (recommended) or email
3. Get your API key from: https://resend.com/api-keys

#### 2. Add Environment Variables

**On Vercel Dashboard:**
- Go to Project → Settings → Environment Variables
- Add these variables:

```
RESEND_API_KEY=re_your_api_key_here_123456789
SMTP_NAME=Iot
ADMIN_EMAIL=varavind746@gmail.com
MONGODB_URI=mongodb+srv://vinithvini775:vinithvini775@thetee.2nn0l55.mongodb.net/TheTee?retryWrites=true&w=majority&appName=TheTee
```

**On Render Dashboard:**
- Go to Service → Environment
- Add the same variables as above

#### 3. Install Dependencies (Local Development Only)
```bash
cd Server
npm install resend
```

#### 4. Deploy
Push your code and redeploy. The app will automatically use Resend.

---

## 🔄 How It Works

The application automatically detects which service to use:

```javascript
// routes/mailRoutes.js
const useResend = !!process.env.RESEND_API_KEY;
```

- **If `RESEND_API_KEY` is set** → Uses Resend (HTTP API)
- **If `RESEND_API_KEY` is NOT set** → Uses Gmail SMTP

You can switch between services just by adding/removing the `RESEND_API_KEY` environment variable!

---

## 📊 Comparison Table

| Feature | Gmail SMTP | Resend |
|---------|-----------|--------|
| **Cost** | Free | Free (3k/month), then $0.00035/email |
| **Setup Complexity** | Medium | Easy |
| **Vercel Compatibility** | ⚠️ Sometimes blocked | ✅ Perfect |
| **Render Compatibility** | ⚠️ Sometimes blocked | ✅ Perfect |
| **Daily Limit** | ~500 emails | 100 emails (free tier) |
| **Monthly Limit** | ~15,000 emails | 3,000 emails (free tier) |
| **Delivery Speed** | Fast | Very fast |
| **Analytics** | ❌ None | ✅ Built-in dashboard |
| **Domain Verification** | ❌ Not needed | ✅ Required for custom domain |

---

## 🐛 Troubleshooting

### Issue: Emails not being sent

**Check Logs:**
- Vercel: Dashboard → Project → Logs
- Render: Dashboard → Service → Logs

**Look for:**
- `SMTP connection timeout` → Switch to Resend
- `Invalid credentials` → Check SMTP_USER and SMTP_PASS
- `Missing RESEND_API_KEY` → Add the environment variable

### Issue: Gmail SMTP fails on Vercel/Render

**Solution:** Use Resend instead. Serverless platforms often block SMTP connections for security.

### Issue: Resend emails going to spam

**Solution:** 
1. Verify your domain in Resend dashboard
2. Add DNS records (SPF, DKIM) as instructed by Resend
3. Use a custom domain instead of `onboarding@resend.dev`

---

## 📝 Testing Locally

### Test Gmail SMTP:
1. Set up `.env` file in Server folder with SMTP variables
2. Run `npm start` in Server folder
3. Submit a form on localhost:5173
4. Check logs for "Email sent successfully"

### Test Resend:
1. Set up `.env` file with `RESEND_API_KEY`
2. Run `npm install resend` first
3. Run `npm start` in Server folder
4. Submit a form on localhost:5173
5. Check logs for "Resend email sent"

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Environment variables are set in dashboard (NOT in .env file)
- [ ] No sensitive data committed to Git
- [ ] Test newsletter subscription works
- [ ] Test contact form works
- [ ] Check email inbox for confirmation emails
- [ ] Check admin inbox for notification emails

---

## 🆘 Support

- **Resend Docs:** https://resend.com/docs
- **Resend Dashboard:** https://resend.com/dashboard
- **Gmail SMTP Help:** https://support.google.com/mail/answer/7126229

For issues, check the application logs first—they will tell you which email service is being used and any errors encountered.
