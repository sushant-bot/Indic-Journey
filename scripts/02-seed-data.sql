-- Insert initial website content
INSERT INTO website_content (section, content) VALUES 
('hero', '{
  "slides": [
    {
      "title": "Dev Bhoomi Uttarakhand",
      "subtitle": "Enchanting Experiences on this Spiritual Canvas",
      "image": "/placeholder.svg?height=600&width=1200",
      "accent": "Experience the Divine",
      "location": "Tera Manzila Mandir, Rishikesh",
      "link": "/contact"
    },
    {
      "title": "In Search of Moksh",
      "subtitle": "Explore the City of the God of Gods",
      "image": "/placeholder.svg?height=600&width=1200",
      "accent": "Faith • Worship • Salvation",
      "location": "Varanasi, Uttar Pradesh",
      "link": "/contact"
    },
    {
      "title": "Nature, Mountains, Monasteries",
      "subtitle": "Country of Gross National Happiness",
      "image": "/placeholder.svg?height=600&width=1200",
      "accent": "Explore the Land of the Thunder Dragon",
      "location": "Thimphu, Bhutan",
      "link": "/contact"
    }
  ]
}'),

('featured_journeys_meta', '{
  "title": "Handpicked Journeys",
  "subtitle": "Discover our carefully curated selection of extraordinary journeys across India''s most captivating destinations."
}'),

('testimonials_meta', '{
  "title": "What Our Travelers Say",
  "subtitle": "Don''t just take our word for it. Here''s what our satisfied travelers have to say about their journeys with us.",
  "stats": {
    "rating": "4.9/5 Average Rating",
    "travelers": "500+ Happy Travelers"
  }
}'),

('blog_meta', '{
  "title": "Stories & Insights",
  "subtitle": "Get inspired by travel stories, destination guides, and expert tips from our experienced travelers and local guides."
}');

-- Insert sample tours
INSERT INTO tours (slug, title, location, duration, group_size, price, original_price, image, category, tour_type, rating, reviews, highlights, description, discount, enabled, featured) VALUES 

('do-dham-kedarnath-badrinath', 'Do Dham - Kedarnath & Badrinath', 'Haridwar - Kedarnath - Badrinath', '8 Days', '2-15 People', '₹22,999', '₹27,599', '/placeholder.svg?height=300&width=400', 'Spiritual', 'fixed-departure', 4.9, 245, 
ARRAY['Kedarnath Temple', 'Badrinath Temple', 'Ganga Aarti', 'Himalayan Views'], 
'Experience the divine journey to two of the most sacred Char Dham temples in the Himalayas. This spiritual odyssey takes you through breathtaking mountain landscapes to the holy shrines of Kedarnath and Badrinath.', 
'17% OFF', true, true),

('classic-kerala', 'God''s Own Country – Kerala', 'Kochi – Munnar – Alleppey', '6 Days', '2-12 People', '₹19,999', '₹23,999', '/placeholder.svg?height=300&width=400', 'Nature', 'fixed-departure', 4.8, 189, 
ARRAY['Backwater Cruise', 'Tea Plantations', 'Spice Gardens', 'Athirapilly Falls'], 
'Immerse yourself in the serene beauty of Kerala with houseboat cruises through tranquil backwaters, visits to aromatic spice plantations, and the majestic Athirapilly Falls.', 
'17% OFF', true, true),

('varanasi-spiritual', 'Spiritual Varanasi', 'Varanasi - Sarnath', '4 Days', '2-20 People', '₹14,999', '₹17,999', '/placeholder.svg?height=300&width=400', 'Spiritual', 'fixed-departure', 4.7, 156, 
ARRAY['Ganga Aarti', 'Kashi Vishwanath', 'Sarnath', 'Ancient Temples'], 
'Discover the spiritual essence of India in the ancient city of Varanasi. Witness the mesmerizing Ganga Aarti, explore sacred temples, and experience the profound spirituality of this holy city.', 
'17% OFF', true, true),

('sri-lanka-ramayana-trail', 'Sri Lanka - Ramayana Trail', 'Colombo - Sigiriya - Ella', '5 Days', '2-16 People', '₹74,999', '₹89,999', '/placeholder.svg?height=300&width=400', 'Heritage', 'fixed-departure', 4.6, 98, 
ARRAY['Sigiriya Rock', 'Ramayana Sites', 'Ancient Temples', 'Cultural Heritage'], 
'Follow the legendary Ramayana trail through Sri Lanka, visiting ancient sites connected to the epic tale while exploring the island''s rich cultural heritage and stunning landscapes.', 
'17% OFF', true, true),

('rajasthan-royal', 'Royal Rajasthan', 'Jaipur - Jodhpur - Udaipur', '10 Days', '2-18 People', '₹40,000', '₹48,000', '/placeholder.svg?height=300&width=400', 'Heritage', 'customized', 4.8, 95, 
ARRAY['City Palace', 'Lake Pichola', 'Mehrangarh Fort', 'Desert Safari'], 
'Experience the grandeur of Rajasthan''s royal heritage with magnificent palaces, imposing forts, and desert adventures in the Land of Kings.', 
'17% OFF', true, false),

('goa-beaches', 'Goa Beach Paradise', 'North & South Goa', '5 Days', '2-12 People', '₹18,000', '₹22,000', '/placeholder.svg?height=300&width=400', 'Leisure', 'customized', 4.5, 78, 
ARRAY['Beach Resorts', 'Water Sports', 'Portuguese Heritage', 'Nightlife'], 
'Relax on pristine beaches of Goa while exploring Portuguese heritage, enjoying water sports, and experiencing the vibrant nightlife.', 
'18% OFF', true, false);

-- Insert sample testimonials
INSERT INTO testimonials (name, location, rating, text, tour, enabled) VALUES 
('Priya Sharma', 'Mumbai', 5, 'Indic Journeys made our Kerala trip absolutely magical! The attention to detail and personalized service exceeded our expectations. The houseboat experience was unforgettable.', 'Kerala Backwaters', true),

('Rajesh Kumar', 'Delhi', 5, 'The Golden Triangle tour was perfectly organized. Our guide was knowledgeable and the accommodations were excellent. Highly recommend for first-time visitors to India.', 'Golden Triangle Classic', true),

('Sarah Johnson', 'California, USA', 5, 'As an international traveler, I was impressed by how well Indic Journeys handled every aspect of our spiritual journey to Varanasi. Truly transformative experience!', 'Spiritual Varanasi', true),

('Amit Patel', 'Pune', 5, 'The Ladakh adventure was the trip of a lifetime! Despite the challenging terrain, everything was managed professionally. The team''s expertise in offbeat destinations is remarkable.', 'Ladakh Adventure', true);

-- Insert sample blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, image, author, category, read_time, trending, enabled) VALUES 
('hidden-gems-rajasthan', '10 Hidden Gems in Rajasthan You Must Visit', 'Discover the lesser-known treasures of the Land of Kings, from secret palaces to mystical temples that most tourists never see.', 'Rajasthan is a land of incredible diversity, where every corner holds a story waiting to be discovered. While the famous destinations like Jaipur, Udaipur, and Jaisalmer attract millions of visitors, there are countless hidden gems that offer equally mesmerizing experiences without the crowds...', '/placeholder.svg?height=300&width=500', 'Priya Sharma', 'Destinations', '8 min read', true, true),

('kerala-backwaters-guide', 'The Ultimate Guide to Kerala Backwaters', 'Everything you need to know about planning the perfect houseboat experience in God''s Own Country.', 'Kerala''s backwaters are a network of interconnected canals, rivers, and lakes that stretch along the coast. This unique ecosystem offers one of the most serene and beautiful travel experiences in India...', '/placeholder.svg?height=300&width=500', 'Rajesh Kumar', 'Travel Tips', '12 min read', false, true);
