-- Add featured_order column to tours table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'tours' AND column_name = 'featured_order'
    ) THEN
        ALTER TABLE tours ADD COLUMN featured_order INTEGER;
        
        -- Update existing featured tours with sequential order
        WITH ranked_tours AS (
            SELECT id, ROW_NUMBER() OVER (ORDER BY updated_at DESC) AS row_num
            FROM tours
            WHERE featured = true
        )
        UPDATE tours
        SET featured_order = ranked_tours.row_num
        FROM ranked_tours
        WHERE tours.id = ranked_tours.id;
        
        RAISE NOTICE 'Added featured_order column to tours table';
    ELSE
        RAISE NOTICE 'featured_order column already exists in tours table';
    END IF;
END $$;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_tours_featured_order ON tours(featured_order);
