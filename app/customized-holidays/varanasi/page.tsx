import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MapPin,
  Calendar,
  Users,
  Mail,
  ArrowRight,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  Camera,
  Waves,
  Heart,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function VaranasiTourPage() {
  const tourHighlights = ["Kashi Vishwanath Corridor", "Sarnath", "Sankat Mochan Temple", "Ghats of Varanasi"]

  const itinerary = [
    {
      day: 1,
      title: "Arrival in Varanasi",
      description:
        "Arrive at Varanasi Airport/Railway Station. Transfer to hotel and evening Ganga Aarti experience at the holy ghats.",
      highlights: ["Airport/Station pickup", "Hotel check-in", "Evening Ganga Aarti", "Dinner at hotel"],
    },
    {
      day: 2,
      title: "Varanasi Exploration",
      description:
        "Early morning boat ride on Ganges, visit famous ghats, Kashi Vishwanath Corridor, and explore local cuisine.",
      highlights: ["Morning boat ride", "Kashi Vishwanath Temple", "Bharat Mata Temple", "Local cuisine exploration"],
    },
    {
      day: 3,
      title: "Varanasi - Sarnath - Varanasi",
      description:
        "Excursion to Sarnath where Buddha delivered his first sermon. Visit Buddhist temples and archaeological sites.",
      highlights: ["Sarnath excursion", "Dhamekha Stupa", "Archaeological Museum", "Shopping time"],
    },
    {
      day: 4,
      title: "Varanasi Temples & Markets",
      description:
        "Visit silk factories, temples including Sankat Mochan and Annapurna Temple. Evening Ganga Aarti and local food.",
      highlights: ["Silk factory visit", "Temple visits", "Evening Ganga Aarti", "Local chaat & lassi"],
    },
    {
      day: 5,
      title: "Departure",
      description: "Check out from hotel and transfer to Railway Station/Airport for return journey.",
      highlights: ["Hotel checkout", "Airport/Station drop", "Return journey"],
    },
  ]

  const inclusions = [
    "Deluxe Accommodation",
    "04 Breakfasts",
    "04 Dinners",
    "Sightseeing as per the Itinerary",
    "Boat Ride on River Ganga",
    "Visit to Sarnath",
    "All Toll, Parking & Driver Charges",
  ]

  const exclusions = [
    "Train or Airfare",
    "Meals other than specified",
    "Any expense of personal Nature",
    "Anything that is not specified in the inclusions",
    "GST 5% Extra",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/indic-journeys-logo.png"
                alt="Indic Journeys"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-yellow-600">
                Home
              </Link>
              <Link href="/customized-holidays" className="text-gray-700 hover:text-yellow-600">
                Customized Holidays
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-yellow-600">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/varanasi-ghats.jpg" alt="Varanasi Ghats" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-yellow-900/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <Badge className="bg-orange-100 text-orange-800 mb-4">
              <Heart className="h-4 w-4 mr-1" />
              Spiritual Journey
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Varanasi – The City of Lord Shiva</h1>
            <p className="text-xl mb-6 text-orange-100">
              Experience the spiritual heart of India in the holy city where Lord Shiva resides
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Calendar className="h-5 w-5 mr-2" />
                <span>04 Nights / 05 Days</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Varanasi – Sarnath</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Users className="h-5 w-5 mr-2" />
                <span>₹14,999 per person</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tour Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Star className="h-6 w-6 mr-2 text-yellow-500" />
                  Tour Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {tourHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                      <span className="font-medium text-gray-800">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Calendar className="h-6 w-6 mr-2 text-orange-500" />
                  Detailed Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {itinerary.map((day, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-6 pb-6 last:pb-0">
                    <div className="flex items-center mb-3">
                      <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                        {day.day}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{day.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">{day.description}</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {day.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <ArrowRight className="h-4 w-4 text-orange-500 mr-2" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-green-700">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Inclusions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {inclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-red-700">
                    <XCircle className="h-5 w-5 mr-2" />
                    Exclusions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-6">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                <CardTitle className="text-center">Book This Tour</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-orange-600">₹14,999</div>
                  <div className="text-gray-600">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">04 Nights / 05 Days</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-gray-600">Route</span>
                    <span className="font-medium">Varanasi – Sarnath</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Group Size</span>
                    <span className="font-medium">Min 2 persons</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/contact">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                      Enquire Now
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full border-orange-500 text-orange-600 hover:bg-orange-50">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Inquiry
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-500 mr-3" />
                  <div>
                    <div className="font-medium">Best Time to Visit</div>
                    <div className="text-sm text-gray-600">October to March</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Camera className="h-5 w-5 text-orange-500 mr-3" />
                  <div>
                    <div className="font-medium">Photography</div>
                    <div className="text-sm text-gray-600">Allowed at most places</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Waves className="h-5 w-5 text-orange-500 mr-3" />
                  <div>
                    <div className="font-medium">River Activities</div>
                    <div className="text-sm text-gray-600">Boat rides included</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image
                src="/images/indic-journeys-logo.png"
                alt="Indic Journeys"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2024 Indic Journeys. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
