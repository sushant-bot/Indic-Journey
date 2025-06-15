# 🔧 Environment Variables Setup Guide

## What is `.env.local` file?
The `.env.local` file stores your secret keys and configuration that your website needs to connect to Supabase database. Think of it as a secure vault for your passwords.

## Step-by-Step Instructions:

### 1. Create the File
- In your project's ROOT folder (same level as package.json)
- Create a new file called `.env.local` (exactly this name)
- Make sure it starts with a dot (.)

### 2. Get Your Supabase Keys
After creating your Supabase project:

1. **Go to your Supabase Dashboard**
2. **Click on "Settings" (gear icon)**
3. **Click on "API"**
4. **Copy these 2 values:**
   - Project URL (looks like: https://abcdefgh.supabase.co)
   - anon/public key (long string starting with "eyJ...")

### 3. Add Keys to .env.local File
Open your `.env.local` file and add these 3 lines:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### 4. Replace with YOUR actual values:
- Replace `https://your-project-id.supabase.co` with YOUR Project URL
- Replace the anon key with YOUR anon/public key
- Replace the service role key with YOUR service role key

### 5. Important Notes:
- ❌ NO spaces around the = sign
- ❌ NO quotes around the values
- ❌ NEVER share this file publicly
- ✅ Add `.env.local` to your .gitignore file

### Example of what your file should look like:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjU0ODAwMCwiZXhwIjoxOTUyMTI0MDAwfQ.example_key_here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM2NTQ4MDAwLCJleHAiOjE5NTIxMjQwMDB9.example_service_key_here
\`\`\`

### 6. Restart Your Development Server
After creating the file:
- Stop your development server (Ctrl+C)
- Start it again (npm run dev)
- Your website can now connect to Supabase!

## 🚨 Security Tips:
- Never commit .env.local to GitHub
- Never share these keys publicly
- Each environment (development/production) should have its own keys
