import { MainLayout } from "@/components/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ArrowRight, Building, Camera, Book, Sparkles, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeritageWalksPage() {
  const walks = [
    {
      id: "old-pune-heritage-walk",
      title: "Old Pune Heritage Walk",
      description:
        "Explore the rich history of Pune from Rashtrakuta Empire to modern times through famous monuments and cultural sites",
      image: "/images/1.jpg",
      duration: "3 Hours",
      timing: "08:30 AM - 11:30 AM",
      groupSize: "5-15 People",
      price: "₹899",
      rating: 4.9,
      reviews: 156,
      highlights: ["Pataleshwar Caves", "Shaniwarwada", "Kasba Ganpati", "Omkareshwar Temple"],
      difficulty: "Easy",
      category: "Walking Tour",
    },
    {
      id: "pune-journey-through-time",
      title: "Pune - A Journey through Time",
      description:
        "6-hour comprehensive tour covering ancient to modern monuments showcasing Pune's complete historical timeline",
      image: "/images/2.jpg",
      duration: "6 Hours",
      timing: "09:00 AM - 03:00 PM",
      groupSize: "2-8 People",
      price: "₹2,499",
      priceWithoutVehicle: "₹1,599",
      rating: 4.8,
      reviews: 124,
      highlights: ["Aga Khan Palace", "Shinde Chatri", "Cave Temples", "Historical Monuments"],
      difficulty: "Moderate",
      category: "Full Day Tour",
    },
    {
      id: "temple-tour-pune",
      title: "Temple Tour of Pune",
      description:
        "Discover Pune's spiritual heritage through famous temples representing different architectural periods and cultural significance",
      image: "/images/3.jpg",
      duration: "4-5 Hours",
      timing: "07:00 AM - 12:00 PM",
      groupSize: "2-8 People",
      price: "₹2,499",
      priceWithoutVehicle: "₹1,599",
      rating: 4.9,
      reviews: 189,
      highlights: ["Sarasbaug Ganpati", "Baneshwar Cave", "Someshwar Temple", "Parvati Temple"],
      difficulty: "Moderate",
      category: "Spiritual Tour",
    },
    {
      id: "around-pune-architecture",
      title: "Around Pune - Architecture & Heritage",
      description:
        "Full-day excursion to three architecturally rich temples around Pune showcasing intricate carvings and spiritual importance",
      image: "/images/4.jpg",
      duration: "6-8 Hours",
      timing: "07:00 AM - 03:00 PM",
      groupSize: "2-8 People",
      price: "₹2,799",
      priceWithoutVehicle: "₹1,599",
      rating: 4.7,
      reviews: 98,
      highlights: ["Bhuleshwar Temple", "Changwateshwar Temple", "Sangameshwar Temple", "Scenic Drive"],
      difficulty: "Moderate",
      category: "Architecture Tour",
    },
  ]

  const features = [
    {
      icon: Building,
      title: "Historical Insights",
      description: "Learn about Pune's rich history from expert local guides",
    },
    {
      icon: Camera,
      title: "Photo Opportunities",
      description: "Capture stunning architecture and cultural moments",
    },
    {
      icon: Book,
      title: "Cultural Stories",
      description: "Discover fascinating stories and legends of each location",
    },
    {
      icon: Users,
      title: "Small Groups",
      description: "Intimate group sizes for personalized experiences",
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
              Cultural Experiences
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-poppins drop-shadow-lg">Heritage Walks</h1>

            <p className="text-lg lg:text-xl mb-8 font-open-sans max-w-3xl mx-auto leading-relaxed opacity-95">
              Step back in time and explore Pune's rich cultural heritage through our guided walking tours. Discover
              ancient temples, historic architecture, and fascinating stories of the past.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 px-8 py-3 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Enquire Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg rounded-full font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300"
                >
                  Book Private Tour
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

      {/* Heritage Walks List */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2 text-base mb-6 font-bold rounded-full" style={{ display: 'none' }}>
              CURATED EXPERIENCES
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-center font-poppins">Explore Our Heritage Walks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully designed heritage walks that showcase different aspects of Pune's rich cultural
              legacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {walks.map((walk) => (
              <Card
                key={walk.id}
                className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white overflow-hidden rounded-xl max-w-sm mx-auto"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={walk.image || "/placeholder.svg"}
                      alt={walk.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Category Badge */}
                  <Badge className="absolute top-3 left-3 font-bold text-xs px-2 py-1 bg-orange-600 text-white shadow-lg">
                    {walk.category}
                  </Badge>

                  {/* Price Overlay */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded-md backdrop-blur-sm shadow-lg text-sm">
                    <div className="font-bold">{walk.price}</div>
                    <div className="text-xs">per person</div>
                  </div>

                  {/* Rating Overlay */}
                  <div className="absolute bottom-3 left-3 bg-white/90 text-black px-2 py-1 rounded-md backdrop-blur-sm shadow-lg text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="font-bold text-xs">{walk.rating}</span>
                      <span className="text-xs text-gray-600">({walk.reviews})</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 font-poppins line-clamp-2">
                    {walk.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 font-open-sans line-clamp-2">{walk.description}</p>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-xs text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-orange-500" />
                        <span className="font-open-sans">{walk.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-orange-500" />
                        <span className="font-open-sans">{walk.groupSize}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="h-3 w-3 mr-1 text-orange-500" />
                      <span className="font-open-sans">{walk.timing}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 font-poppins text-sm">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {walk.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-gray-300 text-gray-600 py-0">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href={`/heritage-walks/${walk.id}`}>
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

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2 text-base mb-6 font-bold rounded-full">
              EXCEPTIONAL EXPERIENCES
            </Badge>
            <h2 className="text-4xl font-bold mb-6 font-poppins">Why Choose Our Heritage Walks?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans leading-relaxed">
              Experience Pune's heritage like never before with our expertly curated walking tours designed to immerse
              you in history and culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="text-center transform transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-poppins">{feature.title}</h3>
                <p className="text-gray-600 font-open-sans">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-poppins">What to Expect</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-poppins">Historical Sites</h3>
              <p className="text-gray-600 font-open-sans">
                Visit ancient temples, historic buildings, and architectural marvels that tell Pune's story.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-poppins">Engaging Stories</h3>
              <p className="text-gray-600 font-open-sans">Hear captivating tales from local historians and guides.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-poppins">Photogenic Spots</h3>
              <p className="text-gray-600 font-open-sans">Capture beautiful moments at every turn of your walk.</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
