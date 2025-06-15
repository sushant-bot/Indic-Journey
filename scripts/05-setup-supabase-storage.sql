-- This script doesn't actually run SQL commands
-- It's a guide for setting up Supabase Storage through the UI

/*
SUPABASE STORAGE SETUP INSTRUCTIONS

1. Go to your Supabase project dashboard
2. Navigate to "Storage" in the left sidebar
3. Create a new bucket called "website-images"
4. Set the bucket's privacy to "Public"
5. Create the following folders in the bucket:
   - general
   - tours
   - hero
   - testimonials
   - blog
6. Set up the following policies for the bucket:

For SELECT operations:
- Policy name: "Public Access"
- Policy definition: true
- This allows anyone to view images

For INSERT operations:
- Policy name: "Auth Users Can Upload"
- Policy definition: (auth.role() = 'authenticated')
- This allows only authenticated users to upload images

For UPDATE operations:
- Policy name: "Auth Users Can Update"
- Policy definition: (auth.role() = 'authenticated')
- This allows only authenticated users to update images

For DELETE operations:
- Policy name: "Auth Users Can Delete"
- Policy definition: (auth.role() = 'authenticated')
- This allows only authenticated users to delete images

7. Save all policies
*/
