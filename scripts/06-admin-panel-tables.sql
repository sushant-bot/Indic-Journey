-- Check if the website_content table exists, if not create it
CREATE TABLE IF NOT EXISTS website_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(255) NOT NULL UNIQUE,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Check if the testimonials table exists, if not create it
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL,
  text TEXT NOT NULL,
  tour VARCHAR(255),
  image VARCHAR(255),
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Check if the blog_posts table exists, if not create it
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(255),
  author VARCHAR(255) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Check if the inquiries table exists, if not create it
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  tour VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Check if the tours table exists, if not create it
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  location VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  group_size VARCHAR(100) NOT NULL,
  price VARCHAR(100) NOT NULL,
  original_price VARCHAR(100),
  image VARCHAR(255),
  tour_type VARCHAR(50) NOT NULL,
  category VARCHAR(100) NOT NULL,
  rating NUMERIC(3,1) DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  highlights TEXT[],
  description TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert some sample data if tables are empty
INSERT INTO testimonials (name, location, rating, text, tour, enabled)
SELECT 'John Smith', 'New York, USA', 5, 'Amazing experience! The tour was well organized and our guide was very knowledgeable.', 'Kerala Backwaters Tour', TRUE
WHERE NOT EXISTS (SELECT 1 FROM testimonials LIMIT 1);

INSERT INTO blog_posts (title, slug, excerpt, content, author, published_at, enabled)
SELECT 'Exploring the Beauty of Kerala', 'exploring-kerala', 'Discover the natural wonders and cultural heritage of Kerala.', 'Kerala, known as God''s Own Country, is famous for its backwaters, beaches, and lush green landscapes...', 'Admin', NOW(), TRUE
WHERE NOT EXISTS (SELECT 1 FROM blog_posts LIMIT 1);

INSERT INTO tours (title, slug, location, duration, group_size, price, tour_type, category, highlights, description, enabled, featured)
SELECT 'Kerala Backwaters Tour', 'kerala-backwaters-tour', 'Kerala, India', '5 Days', '2-10 People', '₹25,000', 'fixed-departure', 'Nature', ARRAY['Houseboat Stay', 'Local Cuisine', 'Cultural Performances'], 'Experience the serene backwaters of Kerala on this unforgettable journey.', TRUE, TRUE
WHERE NOT EXISTS (SELECT 1 FROM tours LIMIT 1);

INSERT INTO inquiries (name, email, phone, message, status)
SELECT 'Jane Doe', 'jane@example.com', '+1234567890', 'I am interested in the Kerala Backwaters Tour. Can you provide more details?', 'new'
WHERE NOT EXISTS (SELECT 1 FROM inquiries LIMIT 1);
