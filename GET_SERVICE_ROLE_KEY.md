# How to Get Your Supabase Service Role Key

1. Go to your Supabase project dashboard: https://khcaqznmejcvytawkdfe.supabase.co
2. Click "Settings" (gear icon) in the left sidebar
3. Click "API" 
4. Scroll down to "Project API keys"
5. Copy the "service_role" key (it's a long string starting with "eyJ...")
6. Replace "your_supabase_service_role_key" in your .env.local file with this key

⚠️ IMPORTANT: Keep this key secret! It has admin access to your database.
\`\`\`

## **Step 2: Update Your .env.local File**

\`\`\`plaintext file=".env.local"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://khcaqznmejcvytawkdfe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoY2Fxem5tZWpjdnl0YXdrZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MjE2NDQsImV4cCI6MjA2NTI5NzY0NH0.hjufrVwQkrs6v1a26zv3VGXeyhDBjSOIJwuLIyzr-yQ
SUPABASE_SERVICE_ROLE_KEY=PUT_YOUR_ACTUAL_SERVICE_ROLE_KEY_HERE

# Optional: Email Configuration (for inquiry notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=noreply@indicjourneys.com

# Optional: WhatsApp Integration
WHATSAPP_PHONE_NUMBER=+919876543210
