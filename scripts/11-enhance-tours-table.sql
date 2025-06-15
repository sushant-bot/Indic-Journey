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

    -- Add images column if it doesn't exist (JSON array of image objects)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'images') THEN
        ALTER TABLE tours ADD COLUMN images JSONB DEFAULT '[]'::jsonb;
    END IF;

    -- Add included_services column if it doesn't exist (JSON array of strings)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'included_services') THEN
        ALTER TABLE tours ADD COLUMN included_services JSONB DEFAULT '[]'::jsonb;
    END IF;

    -- Add excluded_services column if it doesn't exist (JSON array of strings)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'excluded_services') THEN
        ALTER TABLE tours ADD COLUMN excluded_services JSONB DEFAULT '[]'::jsonb;
    END IF;

    -- Add highlights column if it doesn't exist (JSON array of strings)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'highlights') THEN
        ALTER TABLE tours ADD COLUMN highlights JSONB DEFAULT '[]'::jsonb;
    END IF;

    -- Add tags column if it doesn't exist (JSON array of strings)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'tours' AND column_name = 'tags') THEN
        ALTER TABLE tours ADD COLUMN tags JSONB DEFAULT '[]'::jsonb;
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

    -- Update existing tours to have empty arrays for new JSON fields if they're null
    UPDATE tours SET 
        images = '[]'::jsonb WHERE images IS NULL,
        included_services = '[]'::jsonb WHERE included_services IS NULL,
        excluded_services = '[]'::jsonb WHERE excluded_services IS NULL,
        highlights = '[]'::jsonb WHERE highlights IS NULL,
        tags = '[]'::jsonb WHERE tags IS NULL;

    -- For existing tours with an image but no images array, create the images array
    UPDATE tours 
    SET images = json_build_array(
        json_build_object(
            'id', 'main-image', 
            'url', image, 
            'alt', title, 
            'isPrimary', true
        )
    )::jsonb
    WHERE image IS NOT NULL AND (images IS NULL OR images = '[]'::jsonb);

END$$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tours_featured ON tours(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_tours_enabled ON tours(enabled) WHERE enabled = true;
CREATE INDEX IF NOT EXISTS idx_tours_featured_order ON tours(featured_order) WHERE featured = true;
