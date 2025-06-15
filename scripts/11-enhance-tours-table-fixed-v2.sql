-- Check if the columns already exist before adding them
DO $$
BEGIN
    -- Add sale_price column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'sale_price') THEN
        ALTER TABLE tours ADD COLUMN sale_price DECIMAL(10, 2);
    END IF;

    -- Add start_date column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'start_date') THEN
        ALTER TABLE tours ADD COLUMN start_date DATE;
    END IF;

    -- Add end_date column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'end_date') THEN
        ALTER TABLE tours ADD COLUMN end_date DATE;
    END IF;

    -- Add min_people column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'min_people') THEN
        ALTER TABLE tours ADD COLUMN min_people INTEGER;
    END IF;

    -- Add max_people column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'max_people') THEN
        ALTER TABLE tours ADD COLUMN max_people INTEGER;
    END IF;

    -- Check column type for images
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'tours' AND column_name = 'images' AND data_type = 'jsonb') THEN
        -- If it's jsonb, update with jsonb
        UPDATE tours SET images = '[]'::jsonb WHERE images IS NULL;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'tours' AND column_name = 'images') THEN
        -- If it exists but is not jsonb, do nothing (will handle in application code)
        RAISE NOTICE 'Column images exists but is not jsonb type';
    ELSE
        -- If it doesn't exist, add it as jsonb
        ALTER TABLE tours ADD COLUMN images JSONB DEFAULT '[]'::jsonb;
    END IF;

    -- Check column type for included_services
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'tours' AND column_name = 'included_services' AND data_type = 'ARRAY') THEN
        -- If it's an array, update with array
        UPDATE tours SET included_services = ARRAY[]::text[] WHERE included_services IS NULL;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'tours' AND column_name = 'included_services' AND data_type = 'jsonb') THEN
        -- If it's jsonb, update with jsonb
        UPDATE tours SET included_services = '[]'::jsonb WHERE included_services IS NULL;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'tours' AND column_name = 'included_services') THEN
        -- If it exists but is another type, do nothing (will handle in application code)
        RAISE NOTICE 'Column included_services exists but is not array or jsonb type';
    ELSE
        -- If it doesn't exist, add it as text array
        ALTER TABLE tours ADD COLUMN included_services TEXT[] DEFAULT ARRAY[]::text[];
    END IF;

    -- Check column type for excluded_services
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'tours' AND column_name = 'excluded_services' AND data_type = 'ARRAY') THEN
        -- If it's an array, update with array
        UPDATE tours SET excluded_services = ARRAY[]::text[] WHERE excluded_services IS NULL;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'tours' AND column_name = 'excluded_services' AND data_type = 'jsonb') THEN
        -- If it's jsonb, update with jsonb
        UPDATE tours SET excluded_services = '[]'::jsonb WHERE excluded_services IS NULL;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'tours' AND column_name = 'excluded_services') THEN
        -- If it exists but is another type, do nothing (will handle in application code)
        RAISE NOTICE 'Column excluded_services exists but is not array or jsonb type';
    ELSE
        -- If it doesn't exist, add it as text array
        ALTER TABLE tours ADD COLUMN excluded_services TEXT[] DEFAULT ARRAY[]::text[];
    END IF;

    -- Check column type for highlights
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'tours' AND column_name = 'highlights' AND data_type = 'ARRAY') THEN
        -- If it's an array, update with array
        UPDATE tours SET highlights = ARRAY[]::text[] WHERE highlights IS NULL;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'tours' AND column_name = 'highlights' AND data_type = 'jsonb') THEN
        -- If it's jsonb, update with jsonb
        UPDATE tours SET highlights = '[]'::jsonb WHERE highlights IS NULL;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'tours' AND column_name = 'highlights') THEN
        -- If it exists but is another type, do nothing (will handle in application code)
        RAISE NOTICE 'Column highlights exists but is not array or jsonb type';
    ELSE
        -- If it doesn't exist, add it as text array
        ALTER TABLE tours ADD COLUMN highlights TEXT[] DEFAULT ARRAY[]::text[];
    END IF;

    -- Check column type for tags
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'tours' AND column_name = 'tags' AND data_type = 'ARRAY') THEN
        -- If it's an array, update with array
        UPDATE tours SET tags = ARRAY[]::text[] WHERE tags IS NULL;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'tours' AND column_name = 'tags' AND data_type = 'jsonb') THEN
        -- If it's jsonb, update with jsonb
        UPDATE tours SET tags = '[]'::jsonb WHERE tags IS NULL;
    ELSIF EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'tours' AND column_name = 'tags') THEN
        -- If it exists but is another type, do nothing (will handle in application code)
        RAISE NOTICE 'Column tags exists but is not array or jsonb type';
    ELSE
        -- If it doesn't exist, add it as text array
        ALTER TABLE tours ADD COLUMN tags TEXT[] DEFAULT ARRAY[]::text[];
    END IF;

    -- Add meta_title column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'meta_title') THEN
        ALTER TABLE tours ADD COLUMN meta_title VARCHAR(255);
    END IF;

    -- Add meta_description column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'meta_description') THEN
        ALTER TABLE tours ADD COLUMN meta_description TEXT;
    END IF;

    -- Ensure featured_order column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'featured_order') THEN
        ALTER TABLE tours ADD COLUMN featured_order INTEGER;
    END IF;

    -- For existing tours with an image but no images array, create the images array
    -- First check if images column is jsonb
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'tours' AND column_name = 'images' AND data_type = 'jsonb') THEN
        UPDATE tours 
        SET images = json_build_array(
            json_build_object(
                'id', 'main-image', 
                'url', image, 
                'alt', title, 
                'isPrimary', true
            )
        )::jsonb
        WHERE image IS NOT NULL AND (images IS NULL OR images::text = '[]');
    END IF;

END$$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tours_featured ON tours(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_tours_enabled ON tours(enabled) WHERE enabled = true;
CREATE INDEX IF NOT EXISTS idx_tours_featured_order ON tours(featured_order) WHERE featured = true;
