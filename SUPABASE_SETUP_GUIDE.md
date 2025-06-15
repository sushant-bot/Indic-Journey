# 🚀 Complete Supabase Setup Guide for Indic Journeys Admin Panel

Follow these simple steps to make your admin panel work with permanent data storage.

## Step 1: Create Supabase Account & Project

1. **Go to Supabase**: Visit [supabase.com](https://supabase.com)
2. **Sign Up**: Create a free account using your email or GitHub
3. **Create New Project**: 
   - Click "New Project"
   - Choose your organization
   - Enter project name: "indic-journeys"
   - Enter database password (save this!)
   - Select region closest to you
   - Click "Create new project"

## Step 2: Get Your Project Keys

1. **Go to Project Settings**: Click the gear icon in sidebar
2. **Go to API Section**: Click "API" in the settings menu
3. **Copy These Values**:
   - Project URL (starts with https://...)
   - anon/public key (starts with eyJ...)
   - service_role key (starts with eyJ...)

## Step 3: Set Up Environment Variables

1. **Create .env.local file** in your project root (same level as package.json)
2. **Add these lines** (replace with your actual values):

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
\`\`\`

## Step 4: Set Up Database

1. **Go to SQL Editor**: In Supabase dashboard, click "SQL Editor" in sidebar
2. **Run First Script**: 
   - Copy content from `scripts/01-create-tables.sql`
   - Paste in SQL editor
   - Click "Run"
3. **Run Second Script**:
   - Copy content from `scripts/02-seed-data.sql`
   - Paste in SQL editor
   - Click "Run"

## Step 5: Test Your Setup

1. **Start your development server**: `npm run dev`
2. **Visit your website**: Go to http://localhost:3000
3. **Check if data loads**: You should see tours, testimonials, etc.
4. **Test admin panel**: Go to http://localhost:3000/admin
5. **Make a test change**: Edit a tour title and save
6. **Refresh main page**: Changes should appear immediately

## Step 6: Deploy to Production

1. **Add environment variables** to your hosting platform (Vercel, Netlify, etc.)
2. **Deploy your code**
3. **Test live website**: All changes in admin should reflect immediately

## 🎉 You're Done!

Your admin panel now:
- ✅ Saves all changes permanently to database
- ✅ Shows changes immediately on live website
- ✅ Stores inquiries from contact forms
- ✅ Manages tours, testimonials, blog posts
- ✅ Works in production environment

## 🆘 Troubleshooting

**If data doesn't load:**
1. Check environment variables are correct
2. Verify database scripts ran successfully
3. Check browser console for errors

**If admin changes don't save:**
1. Verify service_role key is correct
2. Check network tab for API errors
3. Ensure database tables exist

**Need help?** Check the Supabase documentation or contact support.
