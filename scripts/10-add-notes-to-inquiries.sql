-- Add notes column to inquiries table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'inquiries' AND column_name = 'notes'
    ) THEN
        ALTER TABLE inquiries ADD COLUMN notes TEXT;
        RAISE NOTICE 'Added notes column to inquiries table';
    ELSE
        RAISE NOTICE 'notes column already exists in inquiries table';
    END IF;
END $$;
