-- Add published_at column to blog_posts table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'blog_posts' AND column_name = 'published_at'
    ) THEN
        -- Add published_at column with default value of created_at
        ALTER TABLE blog_posts ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
        
        -- Update existing blog posts to use created_at as published_at
        UPDATE blog_posts SET published_at = created_at;
        
        -- Set NOT NULL constraint after populating data
        ALTER TABLE blog_posts ALTER COLUMN published_at SET NOT NULL;
        
        RAISE NOTICE 'Added published_at column to blog_posts table';
    ELSE
        RAISE NOTICE 'published_at column already exists in blog_posts table';
    END IF;
END $$;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
