import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Star, Check, X, Phone, Mail, ArrowRight, Mountain, Plane, Hotel } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SriLankaRamayanaTrailPage() {
  const highlights = [
    "Muneshwaram Temple",
    "Sigiriya Rock Fortress",
    "Koneswaram Temple",
    "Seetha Amman Temple",
    "Ashok Vatika",
    "Panchamuga Anjaneyar Temple",
  ]

  const inclusions = [
    "Pune – Colombo – Pune Airfare",
    "Accommodation in 4 Star Hotels",
    "05 Breakfasts",
    "05 Dinners",
    "Sightseeing as per Itinerary in an A/C Coach",
    "500ml X 02 Mineral Water Bottle – per person per day",
    "Entrance Fees to all mentioned temples and sites",
    "Value added tax",
    "English-speaking National Tour Guide",
    "Meeting and Assistance at the airport",
  ]

  const exclusions = [
    "Any Expense of Personal Nature",
    "Meals other than Specified",
    "Camera & video permits",
    "Anything not specifically mentioned in the Inclusions",
    "Tips & Portages",
    "GST 5%",
  ]

  const itinerary = [
    {
      day: "Day 01",
      title: "Airport – Chilaw - Dambulla",
      description:
        "Arrive at Colombo International Airport. Proceed to Dambulla. En-route visit Chilaw Munishwaram Temple & Manavari Temple.",
      highlights: ["Muneshwaram Temple", "Manavari Temple", "Sigiriya Rock Fortress"],
    },
    {
      day: "Day 02",
      title: "Dambulla – Trincomalee – Dambulla",
      description:
        "Visit Trincomalee, a port city on the northeast coast. Explore the grand Koneswaram Temple and Shankari Temple.",
      highlights: ["Koneswaram Temple", "Shankari Devi Temple", "Kanniya Hot Springs"],
    },
    {
      day: "Day 03",
      title: "Dambulla – Nuwara Eliya",
      description:
        "Visit Spice Garden in Matale, Sri Muthumariamman Temple, and Sri Bhaktha Hanuman Temple. Learn about tea production.",
      highlights: ["Spice Garden", "Muthumariamman Temple", "Hanuman Temple", "Tea Factory"],
    },
    {
      day: "Day 04",
      title: "Nuwara Eliya – Ella – Nuwara Eliya",
      description: "Visit Gayathri Pedam, Seetha Amman Temple & Ashoka Vatika, Ravana Cave and Ravana Waterfall.",
      highlights: ["Seetha Amman Temple", "Ashoka Vatika", "Ravana Cave", "Ravana Waterfall"],
    },
    {
      day: "Day 05",
      title: "Nuwara Eliya - Colombo",
      description:
        "Visit Kelaniya Temple where Vibeeshana was coronated. Explore Colombo city and visit Panchamuga Anjaneyar Temple.",
      highlights: ["Kelaniya Temple", "Colombo City Tour", "Panchamuga Anjaneyar Temple", "Shopping"],
    },
    {
      day: "Day 06",
      title: "Colombo – Airport",
      description: "Breakfast at hotel and departure to airport for your flight back home.",
      highlights: ["Departure"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-yellow-600">
            Indic Journeys
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/sigiriya-rock.jpg" alt="Sigiriya Rock Fortress" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-yellow-500 text-black px-4 py-1.5 text-sm font-semibold mb-6">
              <Mountain className="h-4 w-4 mr-1 inline-block" />
              Heritage Tour
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Sri Lanka - The <span className="text-yellow-400">Ramayana Trail</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              Follow the epic journey of Ramayana through the mystical landscapes of Sri Lanka. Discover ancient
              temples, sacred sites, and breathtaking natural wonders connected to this timeless epic.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Calendar className="h-5 w-5 text-white mr-2" />
                <span className="text-white font-medium">05 Nights / 06 Days</span>
              </div>

              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <MapPin className="h-5 w-5 text-white mr-2" />
                <span className="text-white font-medium">Colombo - Sigiriya - Ella - Nuwara Eliya</span>
              </div>

              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Users className="h-5 w-5 text-white mr-2" />
                <span className="text-white font-medium">₹74,999 Per Person</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Tour Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Embark on a spiritual and cultural journey through Sri Lanka, following the legendary path of the
                  Ramayana. This carefully crafted itinerary takes you to the most significant sites mentioned in the
                  epic, from the magnificent Sigiriya Rock Fortress to the sacred temples where Lord Rama's journey
                  unfolded.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Mountain className="h-8 w-8 text-yellow-500 mr-3" />
                        <h3 className="text-xl font-semibold">Ancient Fortresses</h3>
                      </div>
                      <p className="text-gray-600">
                        Explore the legendary Sigiriya Rock Fortress, believed to be Ravana's palace from the Ramayana.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Star className="h-8 w-8 text-yellow-500 mr-3" />
                        <h3 className="text-xl font-semibold">Sacred Temples</h3>
                      </div>
                      <p className="text-gray-600">
                        Visit ancient temples including Seetha Amman Temple and witness the spiritual heritage.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Tour Highlights */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Tour Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Itinerary */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {itinerary.map((day, index) => (
                    <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
                      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-gray-800">
                            {day.day}: {day.title}
                          </CardTitle>
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            {day.day.split(" ")[1]}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-gray-600 mb-4">{day.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {day.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Booking Card */}
                <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">Book This Tour</CardTitle>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-yellow-600">₹74,999</span>
                      <span className="text-gray-600 ml-2">per person</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>5N/6D</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>All Ages</span>
                      </div>
                      <div className="flex items-center">
                        <Plane className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Flights Included</span>
                      </div>
                      <div className="flex items-center">
                        <Hotel className="h-4 w-4 mr-2 text-gray-500" />
                        <span>4 Star Hotels</span>
                      </div>
                    </div>

                    <div className="h-px bg-gray-200 my-4"></div>

                    <div className="space-y-3">
                      <Link href="/contact">
                        <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold">
                          Enquire Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>

                      <Button variant="outline" className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                        <Phone className="mr-2 h-4 w-4" />
                        Call for Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">05 Nights / 06 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route:</span>
                      <span className="font-medium">Colombo - Sigiriya - Ella</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Time:</span>
                      <span className="font-medium">Nov - Apr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group Size:</span>
                      <span className="font-medium">Min 2 persons</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Inclusions */}
            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="text-xl text-green-800 flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {inclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Exclusions */}
            <Card>
              <CardHeader className="bg-red-50">
                <CardTitle className="text-xl text-red-800 flex items-center">
                  <X className="h-5 w-5 mr-2" />
                  What's Not Included
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {exclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <X className="h-4 w-4 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore the Ramayana Trail?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join us on this spiritual journey through Sri Lanka and discover the legendary sites of the Ramayana epic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                <Mail className="mr-2 h-5 w-5" />
                Get Quote
              </Button>
            </Link>
            <Link href="/customized-holidays">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/20 px-8 py-3 text-lg font-semibold"
              >
                View More Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Indic Journeys. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
