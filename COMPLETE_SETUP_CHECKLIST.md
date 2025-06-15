# ✅ Complete Setup Checklist

Follow these steps in order to make your admin panel work:

## Phase 1: Supabase Account Setup
- [ ] Go to supabase.com and create account
- [ ] Create new project (choose free tier)
- [ ] Wait for project to be ready (2-3 minutes)
- [ ] Note down your project URL and API keys

## Phase 2: Environment Variables
- [ ] Create `.env.local` file in your project root
- [ ] Add the 3 environment variables with YOUR keys
- [ ] Restart your development server
- [ ] Test that no errors appear in console

## Phase 3: Database Setup
- [ ] Go to Supabase Dashboard → SQL Editor
- [ ] Copy and run the first SQL script (01-create-tables.sql)
- [ ] Copy and run the second SQL script (02-seed-data.sql)
- [ ] Verify tables are created in Database → Tables

## Phase 4: Testing
- [ ] Visit your website locally
- [ ] Check if hero section loads
- [ ] Try submitting an inquiry form
- [ ] Visit /admin/login and test admin panel
- [ ] Make a change in admin and see if it appears on website

## Phase 5: Production Deployment
- [ ] Add environment variables to your hosting platform
- [ ] Deploy your updated code
- [ ] Test admin panel on live website
- [ ] Verify all changes are permanent

## 🎉 Success Indicators:
- ✅ No console errors about Supabase
- ✅ Inquiry forms save to database
- ✅ Admin panel shows real data
- ✅ Changes in admin appear on website immediately
- ✅ Data persists after page refresh

## 🆘 If Something Goes Wrong:
1. Check browser console for errors
2. Verify environment variables are correct
3. Ensure SQL scripts ran successfully
4. Check Supabase project is active
5. Restart development server
