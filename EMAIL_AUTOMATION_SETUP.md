# Email Automation Setup Guide for Indic Journeys

This guide will walk you through setting up email automation for your Indic Journeys website using Resend.

## 1. Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up for an account
2. Verify your email address

## 2. Add Your Domain

1. In the Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain name (e.g., `indicjourneys.com`)
4. Follow the instructions to verify your domain ownership
   - This typically involves adding DNS records to your domain

## 3. Create an API Key

1. In the Resend dashboard, go to "API Keys"
2. Click "Create API Key"
3. Give your API key a name (e.g., "Indic Journeys Website")
4. Select the appropriate permissions (typically "Full Access")
5. Click "Create"
6. Copy the API key (you'll only see it once)

## 4. Add the API Key to Your Environment Variables

Add the Resend API key to your `.env.local` file:

\`\`\`
RESEND_API_KEY=re_123456789...
\`\`\`

If you're deploying to Vercel, add the environment variable in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Go to "Settings" > "Environment Variables"
3. Add a new variable with the name `RESEND_API_KEY` and the value from step 3

## 5. Test Your Email Setup

To test if your email setup is working correctly:

1. Submit a contact form on your website
2. Check if you receive the email notification
3. Check the Resend dashboard to see if the email was sent successfully

## 6. Customize Email Templates

The email templates are defined in the `lib/email-service.ts` file. You can customize them to match your branding and requirements.

## 7. Troubleshooting

If you encounter issues:

1. Check that your environment variables are set correctly
2. Verify that your domain is properly verified in Resend
3. Check the Resend dashboard for any errors or failed deliveries
4. Look at the browser console and server logs for any error messages
5. Make sure your email templates are valid HTML
