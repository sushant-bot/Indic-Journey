-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create website_content table for storing hero slides, section titles, etc.
CREATE TABLE website_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section VARCHAR(50) UNIQUE NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tours table
CREATE TABLE tours (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  group_size VARCHAR(100) NOT NULL,
  price VARCHAR(100) NOT NULL,
  original_price VARCHAR(100),
  image TEXT,
  category VARCHAR(100) NOT NULL,
  tour_type VARCHAR(50) DEFAULT 'fixed-departure' CHECK (tour_type IN ('fixed-departure', 'customized')),
  rating DECIMAL(2,1) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  highlights TEXT[],
  description TEXT,
  itinerary JSONB,
  inclusions TEXT[],
  exclusions TEXT[],
  discount VARCHAR(50),
  enabled BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inquiries table
CREATE TABLE inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  tour_type VARCHAR(100),
  destination VARCHAR(255),
  travel_dates VARCHAR(255),
  group_size INTEGER,
  budget VARCHAR(100),
  message TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'booked', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating &lt;= 5),
  text TEXT NOT NULL,
  tour VARCHAR(255),
  image TEXT,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  read_time VARCHAR(50),
  trending BOOLEAN DEFAULT false,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_tours_enabled ON tours(enabled);
CREATE INDEX idx_tours_featured ON tours(featured);
CREATE INDEX idx_tours_category ON tours(category);
CREATE INDEX idx_tours_tour_type ON tours(tour_type);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX idx_testimonials_enabled ON testimonials(enabled);
CREATE INDEX idx_blog_posts_enabled ON blog_posts(enabled);
CREATE INDEX idx_blog_posts_trending ON blog_posts(trending);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_website_content_updated_at BEFORE UPDATE ON website_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON tours FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
