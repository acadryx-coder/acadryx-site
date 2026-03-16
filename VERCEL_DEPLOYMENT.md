# 🚀 Vercel Deployment Guide for Acadryx

Complete step-by-step guide to deploy acadryx-site to Vercel.

## Prerequisites

- [ ] GitHub account
- [ ] Vercel account (free)
- [ ] Supabase project with migrations run
- [ ] Supabase credentials ready

---

## Step 1: Push Code to GitHub

### If you haven't created a GitHub repo yet:

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `acadryx-site`
3. **Don't** initialize with README (you already have one)
4. Click "Create repository"

### Push your code:

```bash
cd acadryx-site

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Acadryx marketing site with onboarding"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/acadryx-site.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Get Supabase Credentials

Before deploying, get your Supabase credentials ready:

1. Go to https://supabase.com/dashboard
2. Select your Acadryx project
3. Click **Settings** (⚙️ in sidebar)
4. Click **API**
5. **Copy these values** (you'll need them soon):
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

**Keep these handy - you'll paste them into Vercel in Step 4!**

---

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Find your `acadryx-site` repository
5. Click **"Import"**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

---

## Step 4: Configure Environment Variables

**THIS IS CRITICAL - Without these, the app won't work!**

### In Vercel Dashboard:

1. Go to your project in Vercel
2. Click **Settings** tab
3. Click **Environment Variables** in sidebar
4. Add these variables one by one:

#### Variable 1: VITE_SUPABASE_URL
- **Name:** `VITE_SUPABASE_URL`
- **Value:** Paste your Project URL from Step 2
- **Environments:** Check all (Production, Preview, Development)
- Click **Save**

#### Variable 2: VITE_SUPABASE_ANON_KEY
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** Paste your anon public key from Step 2
- **Environments:** Check all (Production, Preview, Development)
- Click **Save**

### Example:
```
VITE_SUPABASE_URL = https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 5: Trigger Redeploy

After adding environment variables:

1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Check **"Use existing Build Cache"**
6. Click **"Redeploy"**

Wait for deployment to finish (usually 1-2 minutes).

---

## Step 6: Verify Deployment

Once deployed, Vercel will give you a URL like:
```
https://acadryx-site.vercel.app
```

### Test these pages:

1. **Landing page:** `https://your-site.vercel.app/`
   - Should load normally ✅

2. **Signup:** `https://your-site.vercel.app/signup`
   - Create a test account
   - Should redirect to dashboard ✅

3. **Dashboard:** `https://your-site.vercel.app/dashboard`
   - Should show "No Schools Yet" ✅

4. **Create school:** Click "Create Your First School"
   - Go through wizard
   - Create a test school ✅

5. **Check dashboard:** School should appear ✅

---

## Step 7: Set Up Custom Domain (Optional)

### If you have acadryx.com:

1. In Vercel project, go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter `acadryx.com`
4. Vercel will show DNS records to add
5. Go to your domain registrar (e.g., Namecheap, GoDaddy)
6. Add the DNS records Vercel provides:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
7. Wait for DNS propagation (can take up to 48 hours, usually minutes)
8. Site will be live at `https://acadryx.com`

---

## 🔄 Making Updates

### Code Changes:

1. Make your changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your change description"
   git push
   ```
3. Vercel auto-deploys on every push! ✨

### Environment Variable Changes:

1. Go to Vercel → Settings → Environment Variables
2. Edit the variable
3. Click **Save**
4. Go to Deployments → Click "..." → **Redeploy**

---

## 🐛 Troubleshooting

### ❌ "Missing Supabase environment variables" error

**Solution:**
1. Verify variables are set in Vercel (Settings → Environment Variables)
2. Check variable names are **exactly**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Redeploy after adding variables

### ❌ Signup/Login not working

**Solution:**
1. Check Supabase Auth settings:
   - Go to Supabase → Authentication → Settings
   - Ensure "Enable Email Signup" is ON
   - Check "Site URL" matches your Vercel URL
2. Add your Vercel URL to allowed redirect URLs:
   - Supabase → Authentication → URL Configuration
   - Add `https://your-site.vercel.app/**`

### ❌ School not appearing after creation

**Solution:**
1. Verify database migrations ran:
   - Check `acadryx_accounts` table exists
   - Check `schools` table has `owner_id` column
2. Check browser console for errors
3. Verify RLS policies are set up

### ❌ Changes not showing up

**Solution:**
1. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
2. Check deployment status in Vercel
3. Verify you pushed to the correct branch
4. Check Vercel build logs for errors

---

## 📊 Monitoring

### View Logs:

1. Go to Vercel project
2. Click **Deployments**
3. Click on a deployment
4. View **Build Logs** and **Function Logs**

### Analytics:

Vercel provides free analytics:
1. Go to **Analytics** tab
2. View page views, user paths, etc.

---

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] Landing page loads correctly
- [ ] Can create an account
- [ ] Can login
- [ ] Dashboard shows correctly
- [ ] Can create a school
- [ ] School appears in dashboard
- [ ] Environment variables are set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Vercel)

---

## 🎉 You're Live!

Your Acadryx site is now deployed and accessible worldwide!

**Next Steps:**
1. Share your site URL with test users
2. Set up email templates in Supabase
3. Configure billing integration
4. Add analytics (Google Analytics, Plausible, etc.)
5. Set up monitoring (Sentry, LogRocket)

---

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Check browser console
3. Verify Supabase connection
4. Test locally first (`npm run dev`)

**Vercel Resources:**
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
