-- Create tour categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS tour_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  display_order INT DEFAULT 0,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add category_id to tours table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'tours' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE tours ADD COLUMN category_id UUID REFERENCES tour_categories(id);
  END IF;
END $$;

-- Insert default categories if they don't exist
INSERT INTO tour_categories (name, slug, description, display_order, enabled)
VALUES 
  ('Fixed Departures', 'fixed-departures', 'Join our scheduled group tours with fixed departure dates', 1, true),
  ('Customized Holidays', 'customized-holidays', 'Tailor-made journeys designed specifically for you', 2, true),
  ('Heritage Walks', 'heritage-walks', 'Guided walks through historical and cultural sites', 3, true)
ON CONFLICT (slug) DO NOTHING;

-- Update existing tours to assign them to categories
UPDATE tours
SET category_id = (SELECT id FROM tour_categories WHERE slug = 'fixed-departures')
WHERE category_id IS NULL AND (
  title ILIKE '%kedarnath%' OR
  title ILIKE '%badrinath%' OR
  title ILIKE '%kerala%' OR
  title ILIKE '%pink city%' OR
  title ILIKE '%central india%'
);

UPDATE tours
SET category_id = (SELECT id FROM tour_categories WHERE slug = 'customized-holidays')
WHERE category_id IS NULL AND (
  title ILIKE '%varanasi%' OR
  title ILIKE '%sri lanka%' OR
  title ILIKE '%bhutan%' OR
  title ILIKE '%cambodia%'
);

UPDATE tours
SET category_id = (SELECT id FROM tour_categories WHERE slug = 'heritage-walks')
WHERE category_id IS NULL;
