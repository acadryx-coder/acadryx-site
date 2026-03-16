# Acadryx Marketing Site + Onboarding

Complete marketing website with integrated school onboarding system.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

#### For Local Development:
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
```

#### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to: **Settings → Environment Variables**
3. Add these variables:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key
4. Apply to all environments (Production, Preview, Development)
5. Redeploy

### 3. Get Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Settings** → **API**
4. Copy:
   - **Project URL** → use as `VITE_SUPABASE_URL`
   - **anon public** key → use as `VITE_SUPABASE_ANON_KEY`

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

## 📦 What's Included

### Pages

**Marketing** (with Nav):
- `/` - Home page
- `/features` - Feature details
- `/pricing` - Pricing information
- `/contact` - Contact form
- `/demo` - Interactive demo

**Authentication** (no Nav):
- `/signup` - Create Acadryx account
- `/login` - Login to existing account

**Application** (no Nav):
- `/dashboard` - User dashboard (shows all schools)
- `/onboarding` - 5-step school creation wizard

### Components

- `Nav` - Navigation bar for marketing pages
- `Footer` - Footer component
- Auth pages with protected routes
- Complete onboarding wizard with progress bar

### Features

✅ Supabase authentication
✅ Protected routes
✅ School creation wizard (5 steps)
✅ Dashboard with school management
✅ Responsive design
✅ Professional styling

## 🗄️ Database Setup Required

Before the app works, you need to run the database migrations:

1. Go to your Supabase project
2. Open **SQL Editor**
3. Run these files in order:
   - `acadryx-schema-additions.sql` (creates tables)
   - `acadryx-rls-policies.sql` (sets up security)

These files are provided in the implementation package.

## 🌐 Vercel Deployment

### Initial Setup

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Vite settings
6. Add environment variables (Settings → Environment Variables):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Deploy!

### Updates

Any push to your main branch will trigger automatic deployment.

For environment variable changes:
1. Update in Vercel dashboard
2. Trigger a redeploy (Deployments → ... → Redeploy)

## 🔧 Project Structure

```
acadryx-site/
├── src/
│   ├── lib/
│   │   └── supabase.js          # Supabase client
│   ├── components/
│   │   ├── Nav.jsx              # Navigation
│   │   └── Footer.jsx           # Footer
│   ├── pages/
│   │   ├── Home.jsx             # Landing page
│   │   ├── Features.jsx
│   │   ├── Pricing.jsx
│   │   ├── Contact.jsx
│   │   ├── Demo.jsx
│   │   ├── Dashboard.jsx        # User dashboard
│   │   ├── OnboardingWizard.jsx # School creation wizard
│   │   └── auth/
│   │       ├── SignupPage.jsx   # Sign up
│   │       └── LoginPage.jsx    # Login
│   ├── styles/
│   │   ├── globals.css          # Global styles
│   │   ├── auth.css             # Auth page styles
│   │   ├── dashboard.css        # Dashboard styles
│   │   └── onboarding.css       # Wizard styles
│   ├── App.jsx                  # Main app with routing
│   └── main.jsx                 # Entry point
├── .env.example                 # Environment template
├── package.json
└── vite.config.js
```

## 🎯 User Flow

1. User visits landing page (`/`)
2. Clicks "Get Started" → `/signup`
3. Creates Acadryx account
4. Redirected to `/dashboard` (empty, no schools yet)
5. Clicks "Create Your First School"
6. Goes through 5-step wizard (`/onboarding`):
   - Step 1: School details
   - Step 2: Choose school URL slug
   - Step 3: Configure academics
   - Step 4: Review
   - Step 5: Success! Get school link + admin code
7. School appears in dashboard
8. User can access school at `slug.acadryx.com`

## 🔐 Authentication

- Powered by Supabase Auth
- Email/password authentication
- Protected routes with automatic redirects
- Session management
- Auto-creates `acadryx_accounts` entry on signup

## ⚙️ Environment Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
→ Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to:
  - `.env.local` (for local dev)
  - Vercel environment variables (for production)

### "Failed to create account"
→ Check:
  1. Supabase project is active
  2. Email confirmation settings in Supabase Auth
  3. Database migrations have been run

### "School not appearing in dashboard"
→ Verify:
  1. RLS policies are set up correctly
  2. User is authenticated
  3. School has `owner_id` set to user's ID

### Changes not reflecting on Vercel
→ After updating environment variables, redeploy:
  1. Go to Deployments
  2. Click "..." on latest deployment
  3. Click "Redeploy"

## 📝 Next Steps

After deployment:

1. ✅ Test signup/login flow
2. ✅ Test school creation wizard
3. ✅ Verify dashboard displays schools
4. ⬜ Set up custom domain
5. ⬜ Configure email templates in Supabase
6. ⬜ Add billing integration
7. ⬜ Set up analytics

## 🆘 Support

If you encounter issues:
1. Check browser console for errors
2. Verify environment variables are set
3. Check Supabase logs
4. Ensure database migrations ran successfully

## 📄 License

Private - Acadryx Platform
