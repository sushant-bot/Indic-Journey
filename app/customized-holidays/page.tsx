import { MainLayout } from "@/components/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, ArrowRight, Heart, Settings, Globe, Calendar, Star, Sparkles, GaugeCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CustomizedHolidaysPage() {
  const packages = [
    {
      type: "spiritual",
      title: "Varanasi: The City of Lord Shiva",
      description: "Experience the spiritual heart of India with a customized journey through the holy city",
      image: "/images/varanasi-ghats.jpg",
      features: ["Ganga Aarti", "Temple Visits", "Boat Rides", "Cultural Immersion"],
      startingPrice: "₹14,999",
      link: "/customized-holidays/varanasi",
    },
    {
      type: "heritage",
      title: "Sri Lanka - The Ramayana Trail",
      description: "Follow the epic journey of Ramayana through the mystical landscapes of Sri Lanka",
      image: "/images/sigiriya-rock.jpg",
      features: ["Sigiriya Rock", "Ancient Temples", "Ramayana Sites", "Cultural Heritage"],
      startingPrice: "₹74,999",
      link: "/customized-holidays/sri-lanka-ramayana-trail",
    },
    {
      type: "adventure",
      title: "Exotic Bhutan",
      description: "Discover the Last Shangri-La with its pristine monasteries and breathtaking landscapes",
      image: "/images/thimphu-bhutan.jpg",
      features: ["Dzongs & Monasteries", "Himalayan Views", "Cultural Heritage", "Sustainable Tourism"],
      startingPrice: "₹42,750",
      link: "/customized-holidays/exotic-bhutan",
    },
    {
      type: "cultural",
      title: "Cambodia Glimpse",
      description: "Explore the magnificent temples of Angkor and discover Cambodia's rich cultural heritage",
      image: "/images/angkor-wat.jpg",
      features: ["Angkor Wat", "Temple Complex", "Floating Village", "Cultural Sites"],
      startingPrice: "₹64,999",
      link: "/customized-holidays/cambodia-glimpse",
    },
    {
      type: "adventure",
      title: "Garhwal Glimpse",
      description: "Explore the spiritual heart of Uttarakhand with sacred temples and scenic hill stations",
      image: "/images/garhwal-mountains.jpg",
      features: ["Ganga Aarti", "Kempty Falls", "Robbers Cave", "Dev Prayag"],
      startingPrice: "₹21,999",
      link: "/customized-holidays/garhwal-glimpse",
    },
    {
      type: "heritage",
      title: "Central Indian Heritage",
      description: "Journey through the magnificent forts, palaces and temples of Central India",
      image: "/images/khajuraho-temples.jpg",
      features: ["Gwalior Fort", "Khajuraho Temples", "Orchha Palaces", "Jhansi Fort"],
      startingPrice: "₹29,999",
      link: "/customized-holidays/central-indian-heritage",
    },
    {
      type: "adventure",
      title: "Western Himachal with Amritsar",
      description: "Experience the Golden Temple and scenic beauty of Himachal Pradesh",
      image: "/images/golden-temple.jpg",
      features: ["Golden Temple", "Dalai Lama Palace", "Khajjiar", "Dharamshala"],
      startingPrice: "₹29,999",
      link: "/customized-holidays/western-himachal-with-amritsar",
    },
    {
      type: "cultural",
      title: "Magical Vietnam",
      description: "Discover the enchanting landscapes and rich culture of Vietnam",
      image: "/images/halong-bay.jpg",
      features: ["Ha Long Bay Cruise", "Golden Bridge", "Hoi An", "Mekong Delta"],
      startingPrice: "₹74,999",
      link: "/customized-holidays/magical-vietnam",
    },
  ]

  const features = [
    {
      icon: Heart,
      title: "Personalized Itineraries",
      description: "Every journey is crafted based on your preferences, interests, and travel style.",
    },
    {
      icon: Settings,
      title: "Flexible Planning",
      description: "Modify your itinerary anytime. We adapt to your changing needs and preferences.",
    },
    {
      icon: Globe,
      title: "Expert Local Knowledge",
      description: "Our destination experts ensure you experience the best each place has to offer.",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Your personal travel consultant is available throughout your journey.",
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
              Tailored For You
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-poppins drop-shadow-lg">Customized Holidays</h1>

            <p className="text-lg lg:text-xl mb-8 font-open-sans max-w-3xl mx-auto leading-relaxed opacity-95">
              Your journey, your way. We create personalized travel experiences that match your dreams, preferences, and
              budget. Every detail is crafted just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 px-8 py-3 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Planning
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

      {/* Package Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-orange-100 text-orange-800 px-3 py-1 mb-4">Explore Options</Badge>
            <h2 className="text-4xl font-bold mb-4 font-poppins">Choose Your Adventure</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans">
              Discover our carefully curated customized holiday experiences, each designed to offer unique cultural and
              spiritual journeys.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {packages.map((pkg) => (
              <Card
                key={pkg.type}
                className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 bg-white overflow-hidden rounded-xl max-w-sm mx-auto"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white mb-1 font-poppins">{pkg.title}</h3>
                    <p className="text-white/90 font-open-sans text-sm line-clamp-2">{pkg.description}</p>
                  </div>

                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold px-2 py-1 text-xs">
                      Starting {pkg.startingPrice}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 font-poppins flex items-center text-sm">
                      <Sparkles className="h-3 w-3 mr-1 text-orange-500" /> Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      {pkg.features.map((feature, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs border-gray-300 text-gray-600 justify-center hover:bg-gray-50 transition-colors py-1"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href={pkg.link}>
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

      {/* Why Choose Us - Moved Below Tours */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 px-3 py-1 mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold mb-4 font-poppins">The Indic Journey Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans">
              Experience travel like never before with our personalized approach to holiday planning.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-poppins text-center group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-open-sans text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 px-3 py-1 mb-4">Simple Process</Badge>
            <h2 className="text-4xl font-bold mb-4 font-poppins">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans">
              Creating your perfect customized holiday is simple and straightforward with our expert team.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mt-6"></div>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 hidden md:block"></div>

            <div className="grid md:grid-cols-4 gap-10">
              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-20 group hover:scale-110 transition-transform shadow-lg">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 h-full">
                  <h3 className="text-xl font-bold mb-3 font-poppins">Tell Us Your Dreams</h3>
                  <p className="text-gray-600 font-open-sans">
                    Share your travel preferences, interests, budget, and desired destinations with our experts.
                  </p>
                </div>
              </div>

              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 relative z-20 group hover:scale-110 transition-transform shadow-lg">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 h-full">
                  <h3 className="text-xl font-bold mb-3 font-poppins">Get Custom Proposal</h3>
                  <p className="text-gray-600 font-open-sans">
                    Receive a detailed, personalized itinerary crafted specifically for your travel style and
                    preferences.
                  </p>
                </div>
              </div>

              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-20 group hover:scale-110 transition-transform shadow-lg">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 h-full">
                  <h3 className="text-xl font-bold mb-3 font-poppins">Refine & Perfect</h3>
                  <p className="text-gray-600 font-open-sans">
                    Work with our team to adjust and perfect every detail until your itinerary is exactly right.
                  </p>
                </div>
              </div>

              <div className="relative text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-20 group hover:scale-110 transition-transform shadow-lg">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 h-full">
                  <h3 className="text-xl font-bold mb-3 font-poppins">Travel & Enjoy</h3>
                  <p className="text-gray-600 font-open-sans">
                    Embark on your perfectly planned journey with 24/7 support throughout your travels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-100 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <GaugeCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Ready to Start Planning?</h4>
                <p className="text-gray-700">
                  Our expert travel consultants typically respond within 24 hours with a draft itinerary based on your
                  requirements. The entire planning process usually takes 3-7 days depending on the complexity of your
                  journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-poppins">Your Dream Holiday Awaits</h2>

            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto font-open-sans">
              Book now and receive a complimentary hotel upgrade or cultural experience on select customized journeys.
              Let our travel experts create a personalized itinerary that exceeds your expectations.
            </p>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-10 inline-block">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-white/80 text-sm">Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">10k+</div>
                  <div className="text-white/80 text-sm">Happy Travelers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">250+</div>
                  <div className="text-white/80 text-sm">Destinations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">15+</div>
                  <div className="text-white/80 text-sm">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-red-600 hover:bg-gray-100 hover:text-red-700 text-lg px-8 py-6 h-auto rounded-xl font-semibold">
                  Start Planning Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/fixed-departures">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-6 h-auto rounded-xl font-semibold"
                >
                  View Fixed Departures
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
