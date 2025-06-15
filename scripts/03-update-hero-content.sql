-- Update hero section with new content and images
UPDATE website_content 
SET content = '{
  "slides": [
    {
      "title": "Dev Bhoomi Uttarakhand",
      "subtitle": "Enchanting Experiences on this Spiritual Canvas",
      "image": "/images/tera-manzil-temple.jpg",
      "accent": "Experience the Divine",
      "location": "Tera Manzila Mandir, Rishikesh",
      "link": "/contact"
    },
    {
      "title": "In Search of Moksh",
      "subtitle": "Explore the City of the God of Gods",
      "image": "/images/varanasi-ghats.jpg",
      "accent": "Faith • Worship • Salvation",
      "location": "Varanasi, Uttar Pradesh",
      "link": "/contact"
    },
    {
      "title": "Nature, Mountains, Monasteries",
      "subtitle": "Country of Gross National Happiness",
      "image": "/images/thimphu-bhutan.jpg",
      "accent": "Explore the Land of the Thunder Dragon",
      "location": "Thimphu, Bhutan",
      "link": "/contact"
    },
    {
      "title": "Cambodia",
      "subtitle": "Explore the Angkor Marvels",
      "image": "/images/angkor-wat.jpg",
      "accent": "Indic Culture Beyond India",
      "location": "Angkor Temple Complex, Cambodia",
      "link": "/contact"
    }
  ]
}'
WHERE section = 'hero';
