"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface Tour {
  id: string
  title: string
  slug: string
  location: string
  duration: string
  group_size: string
  price: string
  original_price?: string
  image?: string
  category_id: string
  category: string
  rating: number
  reviews: number
  highlights?: string[]
  description?: string
  enabled: boolean
  featured: boolean
}

export function FeaturedJourneysSection() {
  const [tours, setTours] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTours = async () => {
      setIsLoading(true)
      try {
        // Get two tours from Fixed Departures category
        const { data: fixedDeparturesTours, error: fixedDeparturesError } = await supabase
          .from("tours")
          .select("*")
          .eq("tour_type", "fixed-departure")
          .eq("enabled", true)
          .limit(2)

        if (fixedDeparturesError) {
          console.error("Error loading fixed departures tours:", fixedDeparturesError)
        }

        // Get two tours from Customized Tours category
        const { data: customizedTours, error: customizedError } = await supabase
          .from("tours")
          .select("*")
          .eq("tour_type", "customized")
          .eq("enabled", true)
          .limit(2)

        if (customizedError) {
          console.error("Error loading customized tours:", customizedError)
        }

        // Combine the tours
        const combinedTours = [...(fixedDeparturesTours || []), ...(customizedTours || [])]

        if (combinedTours.length > 0) {
          setTours(
            combinedTours.map((tour: any) => ({
              id: tour.id,
              title: tour.title,
              slug: tour.slug,
              location: tour.location,
              duration: tour.duration,
              group_size: tour.group_size,
              price: tour.price,
              original_price: tour.original_price,
              image: tour.image,
              category_id: tour.category_id,
              category: tour.category,
              rating: tour.rating,
              reviews: tour.reviews,
              highlights: tour.highlights,
              description: tour.description,
              enabled: tour.enabled,
              featured: tour.featured,
            }))
          )
        } else {
          // Fallback to default tours if no tours found
          setTours(getDefaultTours())
        }
      } catch (error) {
        console.error("Error loading tours:", error)
        setTours(getDefaultTours())
      } finally {
        setIsLoading(false)
      }
    }

    loadTours()
  }, [])

  // Fallback tours if database fetch fails
  function getDefaultTours(): Tour[] {
    return [
      {
        id: "1",
        title: "Do Dham - Kedarnath & Badrinath",
        slug: "do-dham-kedarnath-badrinath",
        location: "Haridwar - Kedarnath - Badrinath",
        duration: "8 Days",
        group_size: "2-15 People",
        price: "₹22,999",
        original_price: "₹27,599",
        image: "/images/rishikesh-temple.jpg",
        category_id: "1",
        category: "Fixed Departures",
        rating: 4.9,
        reviews: 245,
        highlights: ["Kedarnath Temple", "Badrinath Temple", "Ganga Aarti", "Himalayan Views"],
        description: "Experience the divine journey to two of the most sacred Himalayan temples.",
        enabled: true,
        featured: true,
      },
      {
        id: "2",
        title: "God's Own Country – Kerala",
        slug: "gods-own-country-kerala",
        location: "Kochi – Munnar – Alleppey",
        duration: "6 Days",
        group_size: "2-12 People",
        price: "₹19,999",
        original_price: "₹23,999",
        image: "/images/kerala-backwaters-sunset.jpg",
        category_id: "1",
        category: "Fixed Departures",
        rating: 4.8,
        reviews: 189,
        highlights: ["Backwater Cruise", "Tea Plantations", "Spice Gardens", "Athirapilly Falls"],
        description: "Explore the serene backwaters and lush landscapes of God's own country.",
        enabled: true,
        featured: true,
      },
      {
        id: "3",
        title: "Spiritual Varanasi",
        slug: "spiritual-varanasi",
        location: "Varanasi - Sarnath",
        duration: "4 Days",
        group_size: "2-20 People",
        price: "₹14,999",
        original_price: "₹17,999",
        image: "/images/varanasi-ghats.jpg",
        category_id: "2",
        category: "Customized Holidays",
        rating: 4.7,
        reviews: 156,
        highlights: ["Ganga Aarti", "Kashi Vishwanath", "Sarnath", "Ancient Temples"],
        description: "Immerse yourself in the spiritual heart of India with this customized journey.",
        enabled: true,
        featured: true,
      },
      {
        id: "4",
        title: "Sri Lanka - Ramayana Trail",
        slug: "sri-lanka-ramayana-trail",
        location: "Colombo - Sigiriya - Ella",
        duration: "5 Days",
        group_size: "2-16 People",
        price: "₹74,999",
        original_price: "₹89,999",
        image: "/images/sigiriya-rock.jpg",
        category_id: "2",
        category: "Customized Holidays",
        rating: 4.6,
        reviews: 98,
        highlights: ["Sigiriya Rock", "Ramayana Sites", "Ancient Temples", "Cultural Heritage"],
        description: "Follow the legendary Ramayana trail through the beautiful island of Sri Lanka.",
        enabled: true,
        featured: true,
        
      },
    ]
  }

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Update the links for the "View Details" buttons to point to the correct pages
  const tourLinks = [
    "/fixed-departures/do-dham-kedarnath-badrinath",
    "/fixed-departures/classic-kerala",
    "/customized-holidays/varanasi",
    "/customized-holidays/sri-lanka-ramayana-trail",
  ];

  const toursWithButtons = tours.map((tour, index) => ({
    ...tour,
    buttons: [
      { label: "View Details", link: tourLinks[index] },
      { label: "Book Now", link: "/contact" },
    ],
  }));

  return (
    <section id="tours" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <Badge className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-6 py-2 text-lg mb-6 font-semibold">
            Featured Tours
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-poppins">
            Handpicked{" "}
            <span className="text-transparent bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text">Journeys</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-open-sans leading-relaxed">
            Discover our carefully curated selection of extraordinary journeys across India's most captivating
            destinations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {toursWithButtons.map((tour, index) => {
            return (
              <Card
                key={tour.id}
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img
                      src={tour.image || "/placeholder.svg?height=300&width=400"}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Category Badge */}
                  <Badge className="absolute top-4 right-4 bg-yellow-400 text-black font-semibold">
                    {tour.category}
                  </Badge>

                  {/* Price Overlay */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                    <div className="text-lg font-bold">{tour.price}</div>
                    {tour.original_price && (
                      <div className="text-xs line-through text-gray-300">{tour.original_price}</div>
                    )}
                  </div>

                  {/* Rating Overlay */}
                  <div className="absolute bottom-4 left-4 bg-white/90 text-black px-3 py-2 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-bold text-sm">{tour.rating}</span>
                      <span className="text-xs text-gray-600">({tour.reviews})</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300 font-poppins">
                    {tour.title}
                  </h3>

                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="font-open-sans">{tour.location}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-yellow-500" />
                      <span className="font-open-sans">{tour.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-yellow-500" />
                      <span className="font-open-sans">{tour.group_size}</span>
                    </div>
                  </div>

                  {tour.highlights && tour.highlights.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2 font-poppins">Highlights:</h4>
                      <div className="flex flex-wrap gap-1">
                        {tour.highlights.slice(0, 3).map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-gray-300 text-gray-600">
                            {highlight}
                          </Badge>
                        ))}
                        {tour.highlights.length > 3 && (
                          <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                            +{tour.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    {tour.buttons.map((button, idx) => (
                      <Link href={button.link} key={idx}>
                        <Button className="w-full bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-black hover:text-white font-semibold">
                          {button.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
