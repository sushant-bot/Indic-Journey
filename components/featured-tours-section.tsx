import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Tour {
  id: string
  title: string
  location: string
  duration: string
  groupSize: string
  price: string
  originalPrice: string
  image: string
  category:
    | {
        id: string
        name: string
        slug: string
      }
    | string // Handle both cases
  rating: number
  reviews: number
  highlights: string[]
  discount: string
}

export function FeaturedToursSection() {
  const featuredTours: Tour[] = [
    {
      id: "do-dham-kedarnath-badrinath",
      title: "Do Dham - Kedarnath & Badrinath",
      location: "Haridwar - Kedarnath - Badrinath",
      duration: "8 Days",
      groupSize: "2-15 People",
      price: "₹22,999",
      originalPrice: "₹27,599",
      image: "/images/rishikesh-temple.jpg",
      category: "Spiritual",
      rating: 4.9,
      reviews: 245,
      highlights: ["Kedarnath Temple", "Badrinath Temple", "Ganga Aarti", "Himalayan Views"],
      discount: "17% OFF",
    },
    {
      id: "classic-kerala",
      title: "God's Own Country – Kerala",
      location: "Kochi – Munnar – Alleppey",
      duration: "6 Days",
      groupSize: "2-12 People",
      price: "₹19,999",
      originalPrice: "₹23,999",
      image: "/images/kerala-backwaters-sunset.jpg",
      category: "Nature",
      rating: 4.8,
      reviews: 189,
      highlights: ["Backwater Cruise", "Tea Plantations", "Spice Gardens", "Athirapilly Falls"],
      discount: "17% OFF",
    },
    {
      id: "varanasi",
      title: "Spiritual Varanasi",
      location: "Varanasi - Sarnath",
      duration: "4 Days",
      groupSize: "2-20 People",
      price: "₹14,999",
      originalPrice: "₹17,999",
      image: "/images/varanasi-ghats.jpg",
      category: "Spiritual",
      rating: 4.7,
      reviews: 156,
      highlights: ["Ganga Aarti", "Kashi Vishwanath", "Sarnath", "Ancient Temples"],
      discount: "17% OFF",
    },
    {
      id: "sri-lanka-ramayana-trail",
      title: "Sri Lanka - Ramayana Trail",
      location: "Colombo - Sigiriya - Ella",
      duration: "5 Days",
      groupSize: "2-16 People",
      price: "₹74,999",
      originalPrice: "₹89,999",
      image: "/images/sigiriya-rock.jpg",
      category: "Heritage",
      rating: 4.6,
      reviews: 98,
      highlights: ["Sigiriya Rock", "Ramayana Sites", "Ancient Temples", "Cultural Heritage"],
      discount: "17% OFF",
    },
  ]

  return (
    <section id="tours" className="pt-8 md:pt-12 lg:pt-16 pb-16 lg:pb-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <Badge className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-lg mb-4 md:mb-6 font-semibold">
            Featured Tours
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-6 font-poppins">
            Handpicked{" "}
            <span className="text-transparent bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text">Journeys</span>
          </h2>
          <p className="text-base md:text-lg lg:text-2xl text-gray-600 max-w-3xl mx-auto font-open-sans leading-relaxed">
            Discover our carefully curated selection of extraordinary journeys across India's most captivating
            destinations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {featuredTours.map((tour, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-56 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Discount Badge */}
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold">
                  {tour.discount}
                </Badge>

                {/* Category Badge */}
                <Badge className="absolute top-4 right-4 bg-yellow-400 text-black font-semibold">
                  {typeof tour.category === "object" ? tour.category.name : tour.category}
                </Badge>

                {/* Price Overlay */}
                <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                  <div className="text-lg font-bold">{tour.price}</div>
                  <div className="text-xs line-through text-gray-300">{tour.originalPrice}</div>
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
                    <span className="font-open-sans">{tour.groupSize}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2 font-poppins">Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-gray-300 text-gray-600">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold group/btn">
                    Enquire Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-500 hover:text-white hover:border-transparent transition-all duration-300 px-8 py-4 text-lg font-semibold"
          >
            View All Tours
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
