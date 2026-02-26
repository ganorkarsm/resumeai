# 🚀 ResumePro — Complete Deployment Guide

## What's Inside This Project

```
resumepro/
├── app/
│   ├── layout.jsx              ← Root layout (fonts, metadata)
│   ├── globals.css             ← Global styles
│   ├── page.jsx                ← Landing page (resumepro.in/)
│   ├── builder/
│   │   └── page.jsx            ← Resume builder app (/builder)
│   └── api/
│       ├── analyze/route.js    ← Claude AI (generate + ATS) — SECURE
│       ├── create-order/route.js   ← Razorpay order creation — SECURE
│       └── verify-payment/route.js ← Payment verification — SECURE
├── .env.example                ← Copy this to .env.local
├── .gitignore                  ← Protects your secrets
├── next.config.js
└── package.json
```

---

## ⚡ Quick Start (Local Development)

### Step 1 — Install Node.js
Download from: https://nodejs.org (choose LTS version)
Verify: `node --version` should show v18 or higher

### Step 2 — Set up the project
```bash
# 1. Copy this entire resumepro/ folder to your computer
# 2. Open terminal in the resumepro/ folder, then:

npm install
```

### Step 3 — Add your API keys
```bash
# Copy the example file
cp .env.example .env.local

# Now open .env.local in any text editor and fill in:
# - ANTHROPIC_API_KEY (from console.anthropic.com)
# - RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (from dashboard.razorpay.com)
# - NEXT_PUBLIC_RAZORPAY_KEY_ID (same as RAZORPAY_KEY_ID)
```

### Step 4 — Run locally
```bash
npm run dev
```
Open http://localhost:3000 in your browser. Your app is running! ✅

---

## 🌐 Deploy to Vercel (Free Hosting)

### Step 1 — Create GitHub account
Go to https://github.com and sign up (free)

### Step 2 — Upload your code to GitHub
```bash
# In the resumepro/ folder:
git init
git add .
git commit -m "Initial ResumePro commit"
```

Then:
1. Go to github.com → Click "+" → "New repository"
2. Name it `resumepro` → Click "Create repository"
3. Copy the commands GitHub shows you (the ones with `git remote add origin...`)
4. Paste and run them in your terminal

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com → Sign up with GitHub
2. Click **"Add New Project"**
3. Click **"Import"** next to your `resumepro` repository
4. Click **"Deploy"** — Vercel builds it automatically!

✅ Your app is now live at: `https://resumepro.vercel.app`

### Step 4 — Add Environment Variables on Vercel
This is important — your API keys need to be added to Vercel too:

1. Go to your Vercel dashboard → Click your project
2. Click **"Settings"** → **"Environment Variables"**
3. Add each variable from your `.env.local` file:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | sk-ant-your-key... |
| `RAZORPAY_KEY_ID` | rzp_test_your-key... |
| `RAZORPAY_KEY_SECRET` | your-secret... |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | rzp_test_your-key... |

4. Click **"Redeploy"** after adding variables

---

## 🌍 Add a Custom Domain (Optional)

### Buy a domain
Recommended for India:
- **GoDaddy India**: godaddy.com/en-in (~₹500–800/year for .in)
- **BigRock**: bigrock.in (~₹400–700/year)
- **Namecheap**: namecheap.com (~$10/year for .com)

Good domain ideas:
- `resumepro.in`
- `airesumepro.in`
- `myresumepro.in`
- `resumebuilder.co.in`

### Connect domain to Vercel
1. In Vercel → Your Project → **Settings** → **Domains**
2. Type your domain (e.g. `resumepro.in`) → Click **Add**
3. Vercel shows you 2 DNS records like:
   ```
   Type: A     Name: @     Value: 76.76.21.21
   Type: CNAME Name: www   Value: cname.vercel-dns.com
   ```
4. Go to GoDaddy → **My Domains** → **DNS** → Add those records
5. Wait 10–30 minutes
6. Visit `resumepro.in` — it works! ✅

---

## 🔑 Getting Your API Keys

### Anthropic (Claude AI)
1. Go to https://console.anthropic.com
2. Sign up / Log in
3. Click **"API Keys"** → **"Create Key"**
4. Copy the key (starts with `sk-ant-`)
5. Add ₹500–1000 credits to your account to start

**Cost**: ~₹0.15 per resume generated (very cheap)

### Razorpay
1. Go to https://dashboard.razorpay.com
2. Sign up with your business details
3. Go to **Settings** → **API Keys** → **Generate Test Key**
4. Copy Key ID and Key Secret
5. Use `rzp_test_` keys for testing (no real money)
6. Switch to `rzp_live_` keys when ready to accept payments

**To go live with Razorpay:**
- Complete KYC (PAN card, bank account, business proof)
- Takes 1–3 business days
- Razorpay charges 2% per transaction (₹3.98 per ₹199 payment)

### Test Razorpay Payments (No Real Money)
Use these test card details:
```
Card Number: 4111 1111 1111 1111
Expiry:      Any future date (e.g. 12/26)
CVV:         Any 3 digits
Name:        Any name

Test UPI ID: success@razorpay
```

---

## 📱 After Deployment — Promote Your App

### Free Marketing (Do This First!)
1. **WhatsApp Groups** — Share in college alumni groups, placement groups
   > "Built an AI resume builder! Try it free: resumepro.in — Only ₹199 to download"

2. **LinkedIn Post** — Post about your product, tag college friends

3. **Reddit** — Post in r/india, r/developersIndia, r/IndianStreetBets

4. **Quora** — Answer "How to make a good resume?" questions → mention your tool

5. **Instagram Reels** — Screen record yourself using the app, post as a reel

### Paid Marketing (After First ₹5,000 Revenue)
- Google Ads: Target "resume builder india", "ATS resume india"
- Instagram Ads: Target 18–28 year olds in India
- LinkedIn Ads: Target job seekers

---

## 💰 Revenue Projections

| Daily Downloads | Monthly Revenue | Annual Revenue |
|----------------|-----------------|----------------|
| 3/day          | ₹17,910         | ₹2,14,920      |
| 10/day         | ₹59,700         | ₹7,16,400      |
| 30/day         | ₹1,79,100       | ₹21,49,200     |
| 100/day        | ₹5,97,000       | ₹71,64,000     |

**Monthly Costs:**
- Vercel Hosting: ₹0 (free tier handles 100+ users/day)
- Domain: ₹42/month (₹500/year)
- Anthropic API: ~₹1,500/month for 1,000 resumes
- Razorpay: 2% per transaction

**Profit at 10 downloads/day**: ~₹57,000/month 🎯

---

## 🛠️ Common Issues & Fixes

### "Module not found" error
```bash
npm install
```

### API key not working
- Make sure `.env.local` file exists (not `.env`)
- Restart dev server after adding keys: `Ctrl+C` then `npm run dev`
- On Vercel, click "Redeploy" after adding environment variables

### Razorpay popup not opening
- Check that `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set correctly
- Must start with `rzp_test_` for test mode
- Must start with `rzp_live_` for production

### Payment goes through but download doesn't trigger
- Check Vercel logs: Dashboard → Your Project → "Functions" tab
- Verify `RAZORPAY_KEY_SECRET` is correctly set

### "Build failed" on Vercel
- Check that all files are committed to GitHub
- Look at the build log for the specific error

---

## 📞 Need Help?

If you're stuck at any step:
1. Check the error message carefully
2. Search the error on Google
3. Ask in the Vercel community: https://vercel.com/community
4. Ask in Next.js Discord: https://nextjs.org/discord

---

*Built with Next.js 14, Claude AI (Anthropic), Razorpay, jsPDF, and docx.js*
*© 2025 ResumePro — Made with ❤️ in India*
