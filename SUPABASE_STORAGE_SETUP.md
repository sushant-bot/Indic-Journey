# Supabase Storage Setup Guide for Indic Journeys

This guide will walk you through setting up Supabase Storage for your Indic Journeys website.

## 1. Create a Storage Bucket

1. Go to your Supabase project dashboard
2. Navigate to "Storage" in the left sidebar
3. Click "Create bucket"
4. Name the bucket `website-images`
5. Set the bucket's privacy to "Public"
6. Click "Create bucket"

## 2. Create Folders

Create the following folders in the bucket:

1. `general` - For general website images
2. `tours` - For tour-related images
3. `hero` - For hero section images
4. `testimonials` - For testimonial profile images
5. `blog` - For blog post images

To create a folder:
1. Click on the bucket name
2. Click "Create folder"
3. Enter the folder name
4. Click "Create"

## 3. Set Up Access Policies

For the bucket to work properly, you need to set up access policies:

### For SELECT operations (viewing images):

1. Click on the bucket name
2. Go to the "Policies" tab
3. Click "Add policies" and select "Create a policy from scratch"
4. Policy name: "Public Access"
5. Policy definition: `true`
6. Click "Save policy"

### For INSERT operations (uploading images):

1. Click "Add policies" and select "Create a policy from scratch"
2. Policy name: "Auth Users Can Upload"
3. Policy definition: `(auth.role() = 'authenticated')`
4. Click "Save policy"

### For UPDATE operations (updating images):

1. Click "Add policies" and select "Create a policy from scratch"
2. Policy name: "Auth Users Can Update"
3. Policy definition: `(auth.role() = 'authenticated')`
4. Click "Save policy"

### For DELETE operations (deleting images):

1. Click "Add policies" and select "Create a policy from scratch"
2. Policy name: "Auth Users Can Delete"
3. Policy definition: `(auth.role() = 'authenticated')`
4. Click "Save policy"

## 4. Testing Your Storage Setup

To test if your storage setup is working correctly:

1. Go to the Admin Panel of your website
2. Navigate to the Image Manager
3. Try uploading an image to the "general" folder
4. If the upload is successful and you can see the image, your storage setup is working correctly

## 5. Troubleshooting

If you encounter issues:

1. Check that your environment variables are set correctly:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Verify that the bucket and folders are created correctly

3. Check that the access policies are set up correctly

4. Look at the browser console for any error messages

5. Check the Supabase logs for any errors
\`\`\`

## 13. Let's create a guide for setting up Resend for email automation:
