# 🔑 How to Get Your Supabase Service Role Key

## Step-by-Step Instructions:

### Step 1: Go to Your Supabase Dashboard
- Open this link: https://supabase.com/dashboard/project/khcaqznmejcvytawkdfe
- (This is your specific project dashboard)

### Step 2: Navigate to API Settings
1. Look at the LEFT SIDEBAR
2. Click on "Settings" (gear/cog icon) 
3. Click on "API" from the dropdown menu

### Step 3: Find Your Service Role Key
1. Scroll down to the section called "Project API keys"
2. You'll see a table with different keys:
   - `anon` key (you already have this one ✅)
   - `service_role` key (this is what you need 🎯)

### Step 4: Copy the Service Role Key
1. Find the row that says "service_role"
2. Click the "Copy" button next to it
3. It will be a LONG string starting with "eyJ..."

### Step 5: Add to Your .env.local File
Replace this line in your .env.local:
\`\`\`
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
\`\`\`

With:
\`\`\`
SUPABASE_SERVICE_ROLE_KEY=eyJ... (paste your actual key here)
\`\`\`

## ⚠️ IMPORTANT SECURITY NOTE:
- The service_role key has ADMIN access to your database
- Never share it publicly or commit it to GitHub
- Keep it secret in your .env.local file only

## What Each Key Does:
- `anon` key: For public website visitors (safe to expose)
- `service_role` key: For admin operations (must keep secret)
