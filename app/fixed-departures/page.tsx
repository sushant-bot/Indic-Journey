import { MainLayout } from "@/components/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Star, ArrowRight, Filter, Search, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FixedDeparturesPage() {
  const tours = [
    {
      id: "do-dham-kedarnath-badrinath",
      title: "Do Dham (Kedarnath – Badrinath)",
      location: "Haridwar - Guptkashi - Kedarnath - Ukhimath - Badrinath - Rishikesh",
      duration: "8 Nights / 9 Days",
      groupSize: "2-15 People",
      price: "₹22,999",
      originalPrice: "₹27,599",
      image: "/images/rishikesh-temple.jpg",
      category: "Spiritual",
      rating: 4.9,
      reviews: 245,
      highlights: [
        "Dev Prayag & Rudra Prayag View Points",
        "Kedarnath Temple Darshan",
        "Badrinath Temple Visit",
        "Mana Village - First Village of India",
        "Vyaas Gufa & Ganesh Gufa",
      ],
      discount: "17% OFF",
      type: "domestic",
    },
    {
      id: "classic-kerala",
      title: "God's Own Country – Kerala",
      location: "Kochi – Athirapilly– Munnar – Thekkady – Alleppey – Kochi",
      duration: "6 Nights / 7 Days",
      groupSize: "2-12 People",
      price: "₹19,999",
      originalPrice: "₹23,999",
      image: "/images/kerala-backwaters-sunset.jpg",
      category: "Nature",
      rating: 4.8,
      reviews: 189,
      highlights: [
        "Athirapilly Falls",
        "Tea Plantations",
        "Spice Gardens",
        "Pattumalay Tea Factory",
        "Alleppey Backwaters",
        "Fort Kochi",
      ],
      discount: "17% OFF",
      type: "domestic",
    },
    {
      id: "central-india-wonders",
      title: "Central India Wonders",
      location: "Ujjain – Omkareshwar – Maheshwar – Indore",
      duration: "4 Nights / 5 Days",
      groupSize: "2-16 People",
      price: "₹14,999",
      originalPrice: "₹17,999",
      image: "/images/maheshwar-fort.jpg",
      category: "Heritage",
      rating: 4.7,
      reviews: 156,
      highlights: ["Mahakaal Corridor", "Omkareshwar Jyotirlinga", "Maheshwar Fort", "Sarafa Bazaar", "Rajwada Palace"],
      discount: "17% OFF",
      type: "domestic",
    },
    {
      id: "pink-city-jaipur-pushkar",
      title: "Pink City – Jaipur with Pushkar",
      location: "Jaipur – Pushkar",
      duration: "5 Days",
      groupSize: "2-15 People",
      price: "₹14,999",
      originalPrice: "₹17,999",
      image: "/images/hawa-mahal-jaipur.jpg",
      category: "Heritage",
      rating: 4.8,
      reviews: 178,
      highlights: [
        "Amer Fort",
        "Nahargarh Fort",
        "Pushkar Brahma Temple",
        "Pushkar Bazaar",
        "Galtaji Monkey Temple",
        "Hawa Mahal",
      ],
      discount: "17% OFF",
      type: "domestic",
    },
    {
      id: "kalinga-odyssey",
      title: "Kalinga Odyssey",
      location: "Bhubaneshwar – Konark – Puri – Chilka Lake",
      duration: "5 Nights / 6 Days",
      groupSize: "2-15 People",
      price: "₹19,999",
      originalPrice: "₹23,999",
      image: "/images/konark-sun-temple.jpg",
      category: "Heritage",
      rating: 4.8,
      reviews: 142,
      highlights: [
        "Jagannath Temple",
        "Konark Sun Temple",
        "Udaygiri & Khandagiri Caves",
        "Chilka Lake",
        "Lingaraj Temple",
      ],
      discount: "17% OFF",
      type: "domestic",
    },
    {
      id: "enchanting-bali",
      title: "Enchanting Bali",
      location: "Denpasar – Ubud – Kintamani – Denpasar",
      duration: "5 Nights / 6 Days",
      groupSize: "2-15 People",
      price: "₹48,999",
      originalPrice: "₹57,999",
      image: "/images/bali-temple.jpg",
      category: "International",
      rating: 4.9,
      reviews: 198,
      highlights: ["Garuda Vishnu Temple", "Uluwatu Temple", "Tanah Lot Temple", "Gate of Heaven", "Kintamani Volcano"],
      discount: "15% OFF",
      type: "international",
    },
    {
      id: "assam-meghalaya",
      title: "Assam - Meghalaya",
      location: "Guwahati - Shillong – Cherrapunjee – Guwahati",
      duration: "5 Nights / 6 Days",
      groupSize: "2-15 People",
      price: "₹23,999",
      originalPrice: "₹28,799",
      image: "/images/shillong-hills.jpg",
      category: "Nature",
      rating: 4.7,
      reviews: 167,
      highlights: ["Kamakhya Temple", "Mawlynnong Village", "Umangot River", "Seven Sisters Falls", "Elephant Falls"],
      discount: "17% OFF",
      type: "domestic",
    },
    {
      id: "amazing-andamans",
      title: "Amazing Andamans",
      location: "Port Blair – Havelock Island – Neil Island – Port Blair",
      duration: "6 Nights / 7 Days",
      groupSize: "2-15 People",
      price: "₹32,500",
      originalPrice: "₹39,000",
      image: "/images/andaman-beach.jpg",
      category: "Beach",
      rating: 4.8,
      reviews: 234,
      highlights: ["Cellular Jail", "Radhanagar Beach", "Elephant Beach", "Bharatpur Beach", "Chidiya Tapu"],
      discount: "17% OFF",
      type: "domestic",
    },
  ]

  return (
    <MainLayout>
      {/* Improved Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500"></div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-20 h-20 bg-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 text-base mb-6 font-bold rounded-full border border-white/30">
              <Sparkles className="h-4 w-4 mr-2" />
              Guaranteed Departures
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-poppins drop-shadow-lg">Fixed Departures</h1>

            <p className="text-lg lg:text-xl mb-8 font-open-sans max-w-3xl mx-auto leading-relaxed opacity-95">
              Join our scheduled group tours with guaranteed departures. Perfect for solo travelers and those who prefer
              the company of fellow explorers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 px-8 py-3 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg rounded-full font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300"
                >
                  Read Travel Stories
                  <Star className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-white w-full h-auto">
            <path d="M0,96L60,80C120,64,240,32,360,26.7C480,21,600,43,720,53.3C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search tours, destinations..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">1-5 Days</SelectItem>
                  <SelectItem value="medium">6-10 Days</SelectItem>
                  <SelectItem value="long">11+ Days</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Under ₹30,000</SelectItem>
                  <SelectItem value="mid">₹30,000 - ₹80,000</SelectItem>
                  <SelectItem value="premium">₹80,000+</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tours List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tours.map((tour) => (
              <Card
                key={tour.id}
                className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white overflow-hidden rounded-xl max-w-sm mx-auto"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Discount Badge */}
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs px-2 py-1">
                    {tour.discount}
                  </Badge>

                  {/* Category Badge */}
                  <Badge className="absolute top-3 right-3 bg-orange-500 text-white font-semibold text-xs px-2 py-1">
                    {tour.category}
                  </Badge>

                  {/* Price Overlay */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded-md backdrop-blur-sm text-sm">
                    <div className="font-bold">{tour.price}</div>
                    <div className="text-xs line-through text-gray-300">{tour.originalPrice}</div>
                  </div>

                  {/* Rating Overlay */}
                  <div className="absolute bottom-3 left-3 bg-white/90 text-black px-2 py-1 rounded-md backdrop-blur-sm text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="font-bold text-xs">{tour.rating}</span>
                      <span className="text-xs text-gray-600">({tour.reviews})</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 font-poppins line-clamp-2">
                    {tour.title}
                  </h3>

                  <div className="flex items-center text-gray-600 text-xs mb-3">
                    <MapPin className="h-3 w-3 mr-1 text-orange-500" />
                    <span className="font-open-sans line-clamp-1">{tour.location}</span>
                  </div>

                  <div className="flex justify-between text-xs text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-orange-500" />
                      <span className="font-open-sans">{tour.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1 text-orange-500" />
                      <span className="font-open-sans">{tour.groupSize}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 font-poppins text-sm">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-gray-300 text-gray-600 py-0">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={
                      tour.id === "kalinga-odyssey"
                        ? `/fixed-departures/kalinga-odyssey`
                        : tour.id === "enchanting-bali"
                          ? `/fixed-departures/enchanting-bali`
                          : tour.id === "assam-meghalaya"
                            ? `/fixed-departures/assam-meghalaya`
                            : tour.id === "amazing-andamans"
                              ? `/fixed-departures/amazing-andamans`
                              : `/fixed-departures/${tour.id}`
                    }
                  >
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold group/btn rounded-lg h-10 text-sm">
                      View Details
                      <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-poppins">Need a Custom Itinerary?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto font-open-sans">
            Can't find the perfect fixed departure? Let us create a personalized journey just for you.
          </p>
          <Link href="/customized-holidays">
            <Button className="bg-white text-orange-600 hover:bg-gray-100 hover:text-orange-700 text-lg px-8 py-6 rounded-lg font-semibold">
              Explore Customized Holidays
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  )
}
