import { MainLayout } from "@/components/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ArrowRight, MapPin, CheckCircle, AlertCircle, Heart, Sparkles, Car } from "lucide-react"
import Link from "next/link"

export default function PuneJourneyThroughTimePage() {
  const itinerary = [
    {
      time: "09:00 AM",
      location: "Hotel Pickup",
      description: "Pickup from your hotel within Pune Corporation limits",
      duration: "15 minutes",
    },
    {
      time: "09:15 AM",
      location: "Pataleshwar Cave Temple & Jangli Maharaj Math",
      description: "Explore the oldest historical monument of Pune - 8th century rock-cut cave temple",
      duration: "45 minutes",
    },
    {
      time: "10:00 AM",
      location: "Omkareshwar Temple",
      description: "Visit this beautiful Shiva temple showcasing traditional architecture",
      duration: "30 minutes",
    },
    {
      time: "10:30 AM",
      location: "Shaniwarwada",
      description: "Discover the historic fortified palace and seat of Peshwa rulers",
      duration: "60 minutes",
    },
    {
      time: "11:30 AM",
      location: "Trishundya Ganpati",
      description: "Visit this revered Ganpati temple with rich cultural significance",
      duration: "30 minutes",
    },
    {
      time: "12:00 PM",
      location: "Aga Khan Palace",
      description: "Explore this architectural marvel and important freedom struggle site",
      duration: "60 minutes",
    },
    {
      time: "01:00 PM",
      location: "Shinde Chatri",
      description: "Marvel at the architecturally rich cenotaph of Mahadji Shinde",
      duration: "45 minutes",
    },
    {
      time: "02:00 PM",
      location: "Hotel Drop-off",
      description: "Return to your hotel within Pune Corporation limits",
      duration: "30 minutes",
    },
  ]

  const inclusions = [
    "Expert Heritage Guide",
    "One Packaged Water Bottle (500ml)",
    "One Energy Bar",
    "Entrance Fees for Indians to Shaniwarwada, Aga Khan Palace & Shinde Chatri",
    "Vehicle with pickup and drop (if selected)",
    "All transportation between sites",
  ]

  const highlights = [
    "Complete historical timeline from ancient to modern",
    "Rock-cut cave temples to architectural cenotaphs",
    "Peshwa era palaces and freedom struggle sites",
    "Expert storytelling covering different dynasties",
    "Comfortable vehicle transportation",
    "Professional photography opportunities",
  ]

  const importantNotes = [
    "Dress modestly for temple visits",
    "Ensure adequate sun protection",
    "You will need to remove shoes at places of worship",
    "Comfortable walking shoes recommended",
    "Vehicle option includes pickup/drop within Pune Corporation limits",
  ]

  const pricingOptions = [
    {
      title: "With Vehicle",
      price: "₹2,499",
      minPax: "4 Pax",
      description: "Includes pickup, drop & transportation",
    },
    {
      title: "Without Vehicle",
      price: "₹1,599",
      minPax: "5-8 Pax",
      description: "Meet at designated points",
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500"></div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 text-base mb-6 font-bold rounded-full border border-white/30">
              <Car className="h-4 w-4 mr-2" />
              Full Day Tour
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-poppins drop-shadow-lg">
              Pune - A Journey through Time
            </h1>

            <p className="text-lg lg:text-xl mb-8 font-open-sans max-w-3xl mx-auto leading-relaxed opacity-95">
              Experience Pune's complete historical timeline in 6 hours - from ancient rock-cut caves to modern
              monuments, covering the Rashtrakuta Empire to the freedom struggle era.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                <span>6 Hours</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                <span>2-8 People</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>09:00 AM - 03:00 PM</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="h-4 w-4 mr-2 text-yellow-300" />
                <span>4.8 Rating</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 px-8 py-3 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Book This Tour - From ₹1,599
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg rounded-full font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300"
                >
                  Enquire Now
                  <Heart className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-white w-full h-auto">
            <path d="M0,96L60,80C120,64,240,32,360,26.7C480,21,600,43,720,53.3C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Tour Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4 font-poppins">About This Tour</h2>
                  <p className="text-gray-600 font-open-sans leading-relaxed text-lg">
                    This comprehensive 6-hour trip gives you insight into the rich and long history of Pune which dates
                    back to the Rashtrakuta Empire. We cover the famous monuments that were built along the historical
                    and cultural timeline of different eras of Ancient, Medieval & Modern History of this city. From the
                    oldest historical monument of Pune to the newest one, we cover them all and understand their
                    history. From Rock Cut Cave Temples to Architecturally rich Cenotaphs, this trip covers it all.
                  </p>
                </div>

                {/* Detailed Itinerary */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 font-poppins">Detailed Itinerary</h3>
                  <div className="space-y-4">
                    {itinerary.map((item, index) => (
                      <Card key={index} className="border-l-4 border-l-orange-500">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                            <div className="flex items-center mb-2 md:mb-0">
                              <Badge variant="outline" className="mr-3 font-bold text-orange-600 border-orange-600">
                                {item.time}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {item.duration}
                              </Badge>
                            </div>
                          </div>
                          <h4 className="text-xl font-bold mb-2 font-poppins text-gray-900">{item.location}</h4>
                          <p className="text-gray-600 font-open-sans">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 font-poppins">Tour Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-open-sans">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Pricing Options */}
                  <div className="space-y-4">
                    {pricingOptions.map((option, index) => (
                      <Card key={index} className="border-2 border-orange-200">
                        <CardContent className="p-6">
                          <div className="text-center mb-4">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h4>
                            <div className="text-3xl font-bold text-orange-600 mb-1">{option.price}</div>
                            <div className="text-sm text-gray-600 mb-2">per person (Min. {option.minPax})</div>
                            <div className="text-xs text-gray-500">{option.description}</div>
                          </div>

                          <Link href="/contact">
                            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg">
                              Book {option.title}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Tour Details */}
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-4 font-poppins">Tour Details</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold">6 Hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timing:</span>
                          <span className="font-semibold">09:00 AM - 03:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Group Size:</span>
                          <span className="font-semibold">2-8 People</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Difficulty:</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Inclusions */}
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-4 font-poppins">What's Included</h4>
                      <div className="space-y-3">
                        {inclusions.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                            <span className="text-gray-700 font-open-sans text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Important Notes */}
                  <Card className="border-amber-200 bg-amber-50">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-4 font-poppins flex items-center">
                        <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                        Important Notes
                      </h4>
                      <div className="space-y-2">
                        {importantNotes.map((note, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-amber-800 font-open-sans text-sm">{note}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-poppins">
              Ready for a Complete Historical Journey?
            </h2>
            <p className="text-xl mb-8 font-open-sans opacity-95">
              Experience Pune's entire historical timeline from ancient caves to modern monuments in one comprehensive
              tour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 px-8 py-3 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Book This Tour Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/heritage-walks">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg rounded-full font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300"
                >
                  View All Heritage Walks
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
