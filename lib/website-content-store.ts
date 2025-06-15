"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Tour {
  id: string
  title: string
  location: string
  duration: string
  groupSize: string
  price: string
  originalPrice: string
  image: string
  category: string
  rating: number
  reviews: number
  highlights: string[]
  discount: string
  enabled: boolean
}

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  category: string
  readTime: string
  trending: boolean
  content: string
  enabled: boolean
}

interface HeroSlide {
  title: string
  subtitle: string
  image: string
  accent: string
  location: string
  link: string
}

interface Testimonial {
  name: string
  location: string
  rating: number
  text: string
  tour: string
}

interface WebsiteContentState {
  hero: {
    slides: HeroSlide[]
  }
  featuredJourneys: {
    title: string
    subtitle: string
    tours: Tour[]
  }
  testimonials: {
    title: string
    subtitle: string
    testimonials: Testimonial[]
    stats: {
      rating: string
      travelers: string
    }
  }
  blog: {
    title: string
    subtitle: string
    posts: BlogPost[]
  }
  booking: {
    title: string
    subtitle: string
    ctaText: string
    popularTours: Array<{
      id: string
      name: string
      price: string
      duration: string
    }>
  }
  // Actions
  updateHeroSlides: (slides: HeroSlide[]) => void
  updateFeaturedTours: (tours: Tour[]) => void
  updateTestimonials: (testimonials: Testimonial[]) => void
  updateBlogPosts: (posts: BlogPost[]) => void
  updateSectionContent: (section: string, content: any) => void
  addFeaturedTour: (tour: Tour) => void
  removeFeaturedTour: (tourId: string) => void
  addBlogPost: (post: BlogPost) => void
  removeBlogPost: (postId: number) => void
  addTestimonial: (testimonial: Testimonial) => void
  removeTestimonial: (index: number) => void
  saveToServer: () => Promise<boolean>
  loadFromServer: () => Promise<boolean>
  isLoading: boolean
  isSaving: boolean
  lastSaved: string | null
}

// Define initialState
const initialState = {
  hero: {
    slides: [
      {
        title: "Explore. Experience. Evolve.",
        subtitle: "Crafted Travel Stories across India & the World",
        image: "/images/taj-mahal.png",
        accent: "Discover Hidden Gems",
        location: "Taj Mahal, Agra",
        link: "/tours/golden-triangle",
      },
      {
        title: "Spiritual Journeys Await",
        subtitle: "Connect with Ancient Wisdom & Sacred Places",
        image: "/images/varanasi-ganga.png",
        accent: "Find Inner Peace",
        location: "Varanasi, Uttar Pradesh",
        link: "/tours/spiritual-varanasi",
      },
      {
        title: "Adventure & Mountains",
        subtitle: "Conquer the Highest Peaks & Scenic Landscapes",
        image: "/images/ladakh-mountains.png",
        accent: "Live the Adventure",
        location: "Ladakh, Jammu & Kashmir",
        link: "/tours/ladakh-adventure",
      },
    ],
  },
  featuredJourneys: {
    title: "Handpicked Journeys",
    subtitle:
      "Discover our carefully curated selection of extraordinary journeys across India's most captivating destinations.",
    tours: [
      {
        id: "golden-triangle",
        title: "Golden Triangle Classic",
        location: "Delhi - Agra - Jaipur",
        duration: "7 Days",
        groupSize: "2-15 People",
        price: "₹25,000",
        originalPrice: "₹30,000",
        image: "/images/taj-mahal.png",
        category: "Heritage",
        rating: 4.8,
        reviews: 156,
        highlights: ["Taj Mahal", "Red Fort", "Hawa Mahal", "Amber Fort"],
        discount: "17% OFF",
        enabled: true,
      },
      {
        id: "kerala",
        title: "Kerala Backwaters",
        location: "Kochi - Alleppey - Munnar",
        duration: "6 Days",
        groupSize: "2-12 People",
        price: "₹22,000",
        originalPrice: "₹26,000",
        image: "/images/kerala-backwaters.png",
        category: "Nature",
        rating: 4.9,
        reviews: 203,
        highlights: ["Houseboat Stay", "Tea Plantations", "Spice Gardens", "Ayurveda"],
        discount: "15% OFF",
        enabled: true,
      },
      {
        id: "ladakh",
        title: "Ladakh Adventure",
        location: "Leh - Nubra - Pangong",
        duration: "8 Days",
        groupSize: "4-16 People",
        price: "₹35,000",
        originalPrice: "₹42,000",
        image: "/images/ladakh-mountains.png",
        category: "Adventure",
        rating: 4.7,
        reviews: 89,
        highlights: ["Khardung La", "Pangong Lake", "Monasteries", "Desert Safari"],
        discount: "17% OFF",
        enabled: true,
      },
      {
        id: "varanasi",
        title: "Spiritual Varanasi",
        location: "Varanasi - Sarnath",
        duration: "4 Days",
        groupSize: "2-20 People",
        price: "₹15,000",
        originalPrice: "₹18,000",
        image: "/images/varanasi-ganga.png",
        category: "Spiritual",
        rating: 4.6,
        reviews: 124,
        highlights: ["Ganga Aarti", "Temple Tours", "Boat Rides", "Meditation"],
        discount: "17% OFF",
        enabled: true,
      },
    ],
  },
  testimonials: {
    title: "What Our Travelers Say",
    subtitle:
      "Don't just take our word for it. Here's what our satisfied travelers have to say about their journeys with us.",
    testimonials: [
      {
        name: "Priya Sharma",
        location: "Mumbai",
        rating: 5,
        text: "Indic Journeys made our Kerala trip absolutely magical! The attention to detail and personalized service exceeded our expectations. The houseboat experience was unforgettable.",
        tour: "Kerala Backwaters",
      },
      {
        name: "Rajesh Kumar",
        location: "Delhi",
        rating: 5,
        text: "The Golden Triangle tour was perfectly organized. Our guide was knowledgeable and the accommodations were excellent. Highly recommend for first-time visitors to India.",
        tour: "Golden Triangle Classic",
      },
      {
        name: "Sarah Johnson",
        location: "California, USA",
        rating: 5,
        text: "As an international traveler, I was impressed by how well Indic Journeys handled every aspect of our spiritual journey to Varanasi. Truly transformative experience!",
        tour: "Spiritual Varanasi",
      },
      {
        name: "Amit Patel",
        location: "Pune",
        rating: 5,
        text: "The Ladakh adventure was the trip of a lifetime! Despite the challenging terrain, everything was managed professionally. The team's expertise in offbeat destinations is remarkable.",
        tour: "Ladakh Adventure",
      },
    ],
    stats: {
      rating: "4.9/5 Average Rating",
      travelers: "500+ Happy Travelers",
    },
  },
  blog: {
    title: "Stories & Insights",
    subtitle:
      "Get inspired by travel stories, destination guides, and expert tips from our experienced travelers and local guides.",
    posts: [
      {
        id: 1,
        title: "10 Hidden Gems in Rajasthan You Must Visit",
        excerpt:
          "Discover the lesser-known treasures of the Land of Kings, from secret palaces to mystical temples that most tourists never see.",
        image: "/placeholder.svg?height=300&width=500",
        author: "Priya Sharma",
        date: "Dec 15, 2024",
        category: "Destinations",
        readTime: "8 min read",
        trending: true,
        content: "Rajasthan is a land of incredible diversity...",
        enabled: true,
      },
      {
        id: 2,
        title: "The Ultimate Guide to Kerala Backwaters",
        excerpt: "Everything you need to know about planning the perfect houseboat experience in God's Own Country.",
        image: "/placeholder.svg?height=300&width=500",
        author: "Rajesh Kumar",
        date: "Dec 12, 2024",
        category: "Travel Tips",
        readTime: "12 min read",
        trending: false,
        content: "Kerala's backwaters are a network of interconnected canals...",
        enabled: true,
      },
      {
        id: 3,
        title: "Spiritual Journey: Temples of Tamil Nadu",
        excerpt: "Explore the architectural marvels and spiritual significance of South India's most sacred temples.",
        image: "/placeholder.svg?height=300&width=500",
        author: "Meera Nair",
        date: "Dec 10, 2024",
        category: "Spiritual",
        readTime: "15 min read",
        trending: true,
        content: "Tamil Nadu's temples are architectural masterpieces...",
        enabled: true,
      },
      {
        id: 4,
        title: "Adventure Sports in Himachal Pradesh",
        excerpt:
          "From paragliding in Bir Billing to river rafting in Kullu, discover the thrill of mountain adventures.",
        image: "/placeholder.svg?height=300&width=500",
        author: "Vikram Singh",
        date: "Dec 8, 2024",
        category: "Adventure",
        readTime: "10 min read",
        trending: false,
        content: "Himachal Pradesh offers some of the best adventure sports...",
        enabled: true,
      },
    ],
  },
  booking: {
    title: "Plan Your Journey",
    subtitle:
      "Start planning your perfect getaway with our easy booking system. Choose from our curated tours or create a custom experience.",
    ctaText: "Enquiry Now",
    popularTours: [
      { id: "golden-triangle", name: "Golden Triangle Classic", price: "₹25,000", duration: "7 Days" },
      { id: "kerala", name: "Kerala Backwaters", price: "₹22,000", duration: "6 Days" },
      { id: "ladakh", name: "Ladakh Adventure", price: "₹35,000", duration: "8 Days" },
      { id: "rajasthan", name: "Royal Rajasthan", price: "₹30,000", duration: "10 Days" },
    ],
  },
  isLoading: false,
  isSaving: false,
  lastSaved: null,
}

export const useWebsiteContent = create<WebsiteContentState>()(
  persist(
    (set, get) => ({
      ...initialState,

      updateHeroSlides: (slides) =>
        set((state) => ({
          ...state,
          hero: { ...state.hero, slides },
        })),

      updateFeaturedTours: (tours) =>
        set((state) => ({
          ...state,
          featuredJourneys: { ...state.featuredJourneys, tours },
        })),

      updateTestimonials: (testimonials) =>
        set((state) => ({
          ...state,
          testimonials: { ...state.testimonials, testimonials },
        })),

      updateBlogPosts: (posts) =>
        set((state) => ({
          ...state,
          blog: { ...state.blog, posts },
        })),

      updateSectionContent: (section, content) =>
        set((state) => ({
          ...state,
          [section]: { ...state[section as keyof typeof state], ...content },
        })),

      addFeaturedTour: (tour) =>
        set((state) => ({
          ...state,
          featuredJourneys: {
            ...state.featuredJourneys,
            tours: [...state.featuredJourneys.tours, tour],
          },
        })),

      removeFeaturedTour: (tourId) =>
        set((state) => ({
          ...state,
          featuredJourneys: {
            ...state.featuredJourneys,
            tours: state.featuredJourneys.tours.filter((tour) => tour.id !== tourId),
          },
        })),

      addBlogPost: (post) =>
        set((state) => ({
          ...state,
          blog: {
            ...state.blog,
            posts: [...state.blog.posts, post],
          },
        })),

      removeBlogPost: (postId) =>
        set((state) => ({
          ...state,
          blog: {
            ...state.blog,
            posts: state.blog.posts.filter((post) => post.id !== postId),
          },
        })),

      addTestimonial: (testimonial) =>
        set((state) => ({
          ...state,
          testimonials: {
            ...state.testimonials,
            testimonials: [...state.testimonials.testimonials, testimonial],
          },
        })),

      removeTestimonial: (index) =>
        set((state) => ({
          ...state,
          testimonials: {
            ...state.testimonials,
            testimonials: state.testimonials.testimonials.filter((_, i) => i !== index),
          },
        })),

      saveToServer: async () => {
        set((state) => ({ ...state, isSaving: true }))
        try {
          const state = get()
          const dataToSave = {
            hero: state.hero,
            featuredJourneys: {
              title: state.featuredJourneys.title,
              subtitle: state.featuredJourneys.subtitle,
            },
            testimonials: {
              title: state.testimonials.title,
              subtitle: state.testimonials.subtitle,
              stats: state.testimonials.stats,
            },
            blog: {
              title: state.blog.title,
              subtitle: state.blog.subtitle,
            },
          }

          const response = await fetch("/api/admin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSave),
          })

          const result = await response.json()

          if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to save data")
          }

          set((state) => ({
            ...state,
            isSaving: false,
            lastSaved: new Date().toISOString(),
          }))
          return true
        } catch (error) {
          console.error("Error saving data:", error)
          set((state) => ({ ...state, isSaving: false }))
          return false
        }
      },

      loadFromServer: async () => {
        set((state) => ({ ...state, isLoading: true }))
        try {
          const response = await fetch("/api/admin")
          const result = await response.json()

          if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to load data")
          }

          if (result.data) {
            set((state) => ({
              ...state,
              hero: result.data.hero || state.hero,
              featuredJourneys: {
                ...state.featuredJourneys,
                title: result.data.featuredJourneys?.title || state.featuredJourneys.title,
                subtitle: result.data.featuredJourneys?.subtitle || state.featuredJourneys.subtitle,
              },
              testimonials: {
                ...state.testimonials,
                title: result.data.testimonials?.title || state.testimonials.title,
                subtitle: result.data.testimonials?.subtitle || state.testimonials.subtitle,
                stats: result.data.testimonials?.stats || state.testimonials.stats,
              },
              blog: {
                ...state.blog,
                title: result.data.blog?.title || state.blog.title,
                subtitle: result.data.blog?.subtitle || state.blog.subtitle,
              },
              isLoading: false,
            }))
          } else {
            set((state) => ({ ...state, isLoading: false }))
          }

          return true
        } catch (error) {
          console.error("Error loading data:", error)
          set((state) => ({ ...state, isLoading: false }))
          return false
        }
      },
    }),
    {
      name: "website-content",
      storage: {
        getItem: () => null, // Disable localStorage, use API instead
        setItem: () => {},
        removeItem: () => {},
      },
    },
  ),
)
