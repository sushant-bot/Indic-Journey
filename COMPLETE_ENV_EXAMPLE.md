# Complete .env.local File Example

After you get your service role key, your .env.local should look like this:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://khcaqznmejcvytawkdfe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoY2Fxem5tZWpjdnl0YXdrZGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MjE2NDQsImV4cCI6MjA2NTI5NzY0NH0.hjufrVwQkrs6v1a26zv3VGXeyhDBjSOIJwuLIyzr-yQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoY2Fxem5tZWpjdnl0YXdrZGZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTcyMTY0NCwiZXhwIjoyMDY1Mjk3NjQ0fQ.EXAMPLE_SERVICE_ROLE_KEY_REPLACE_WITH_YOURS
\`\`\`

## After Adding the Service Role Key:
1. Save your .env.local file
2. Restart your development server: `npm run dev`
3. Your admin panel will now work with permanent database storage!
