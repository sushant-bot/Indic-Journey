import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  Users,
  Clock,
  Star,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Camera,
  Mountain,
  Waves,
  Building,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CambodiaGlimpsePage() {
  const tourHighlights = [
    { icon: Building, name: "Angkor Wat", description: "Architectural masterpiece" },
    { icon: Building, name: "Angkor Thom", description: "Ancient city with Bayon Temple" },
    { icon: Building, name: "Banteay Srei", description: "The Citadel of Women" },
    { icon: Mountain, name: "Kulen Mountain", description: "Sacred waterfall & Buddha" },
    { icon: Building, name: "Beng Mealea Temple", description: "Jungle-strangled temple" },
    { icon: Waves, name: "Tonle Sap Lake", description: "Floating village experience" },
  ]

  const itinerary = [
    {
      day: 1,
      title: "Siem Reap Arrival",
      description:
        "Arrive at Siem Reap Airport and meet your tour guide, then transfer to your comfortable hotel and check in. Rest of the day is free on your own. Evening enjoy your Dinner at Indian restaurant. Return to the hotel and overnight stay at Siem Reap.",
      meals: "Dinner",
    },
    {
      day: 2,
      title: "Siem Reap – Angkor Thom – Angkor Wat",
      description:
        "Morning, have breakfast at the hotel. Post breakfast we leave hotel then start your visit to the World Heritage Site; visit the South Gate of Angkor Thom which is famous for its series of colossal human faces carved in stone, the impressive Bayon Temple, the Royal Enclosure, Phimeanakas, the Elephant Terrace and the Terrace of the Leper King. Continue visit Ta Prohm. Afternoon, visit the architectural masterpiece of Angkor Wat.",
      meals: "Breakfast",
    },
    {
      day: 3,
      title: "Kulen Mountain – Waterfall Tour",
      description:
        "Rise early & have an early breakfast, 8:00 am Pick up at your hotel. Today you will discover the holy grounds of Phnom Kulen, with its waterfall, giant reclining Buddha, and riverbed carvings. We begin the tour by venturing off the beaten path, followed by an awe-inspiring drive up the mountain, where we will explore the abundant greenery and Kulen Waterfall.",
      meals: "Breakfast",
    },
    {
      day: 4,
      title: "Banteay Srei – Grand Temple",
      description:
        "This morning, post breakfast, we leave to explore Banteay Srei and all the surrounding beauty! Begin your day with a visit to the modest and lovely Pre Rup Temple. Beyond that, you'll see the ornate pink-colored Banteay Srei Temple, which translates beautifully to 'The Citadel of Women.' Then spend the afternoon exploring the unique East Mebon, Ta Som, and Preah Khan Temples.",
      meals: "Breakfast",
    },
    {
      day: 5,
      title: "Siem Reap Visit",
      description:
        "Breakfast at the hotel. This morning, drive to the remote Beng Mealea temple through the typical Khmer countryside (60 Kms from Siem Reap). Explore the long-abandoned temple (11th century), strangled by the jungle. A further 1hour drive brings you to Koh Ker, situated in the northeast of Siem Reap. Discover the long-abandoned temples in the forests of northern Cambodia.",
      meals: "Breakfast",
    },
    {
      day: 6,
      title: "Siem Reap Departure",
      description:
        "After Breakfast at hotel, Depart to Visit floating village at Chong Khnease. drive out the city to enjoy a boat ride on the Tonle Sap Lake at Chong Khneas village. We will see a fishermen's 'floating village' with floating schools, floating police station, etc. Then head to airport for your flight departure.",
      meals: "Breakfast",
    },
  ]

  const inclusions = [
    "Mumbai – Phnom Penh & Siem Reap – Mumbai Airfare",
    "05 Nights Accommodation in Siem Reap",
    "05 Breakfasts",
    "All the Sightseeing as per the Itinerary",
    "Ground transportation in air-conditioned vehicle",
    "Service of English-Speaking Guide",
    "Tour with entrance fees as specified",
    "Mineral water during excursion",
    "Boat trip on Tonle Sap by private boat",
    "Meeting and Assistance at airports",
  ]

  const exclusions = [
    "Any Expense of Personal Nature",
    "Meals other than Specified",
    "Camera & video permits",
    "Anything not specifically mentioned in the Inclusions",
    "Tips & Portages",
    "GST 5% Extra",
    "TCS 5% Extra",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/customized-holidays" className="text-gray-600 hover:text-gray-900">
                Customized Holidays
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/angkor-wat.jpg" alt="Angkor Wat Cambodia" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-blue-900/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <Badge className="bg-white/20 text-white mb-4 px-3 py-1">
              <Camera className="h-4 w-4 mr-1" />
              Cultural Heritage Tour
            </Badge>
            <h1 className="text-5xl font-bold mb-4">Cambodia Glimpse</h1>
            <p className="text-xl mb-6 text-white/90">
              Explore the magnificent temples of Angkor and discover Cambodia's rich cultural heritage through ancient
              temples, sacred mountains, and floating villages.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4 mr-2" />
                05 Nights / 06 Days
              </div>
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <MapPin className="h-4 w-4 mr-2" />
                Siem Reap – Angkor – Kulen Mountain
              </div>
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Users className="h-4 w-4 mr-2" />
                ₹64,999 per person
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Tour Overview</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="font-semibold">Duration</p>
                      <p className="text-gray-600">05 Nights / 06 Days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="font-semibold">Route</p>
                      <p className="text-gray-600">Siem Reap – Angkor – Kulen Mountain</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="font-semibold">Price</p>
                      <p className="text-gray-600">₹64,999 per person</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="font-semibold">Rating</p>
                      <p className="text-gray-600">4.8/5 (Based on reviews)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tour Highlights */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Tour Highlights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {tourHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg">
                      <highlight.icon className="h-6 w-6 text-teal-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{highlight.name}</p>
                        <p className="text-sm text-gray-600">{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Itinerary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-teal-500 pl-6 pb-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-teal-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                          {day.day}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{day.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {day.meals}
                        </Badge>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{day.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-700 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Inclusions
                  </h3>
                  <ul className="space-y-2">
                    {inclusions.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-700 flex items-center">
                    <XCircle className="h-5 w-5 mr-2" />
                    Exclusions
                  </h3>
                  <ul className="space-y-2">
                    {exclusions.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-2 border-teal-200">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Book This Tour</h3>
                    <div className="text-3xl font-bold text-teal-600">₹64,999</div>
                    <p className="text-gray-600">per person</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">6 Days</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Group Size:</span>
                      <span className="font-semibold">2-15 People</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Best Time:</span>
                      <span className="font-semibold">Nov - Mar</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">Book Now</Button>
                    <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50 py-3">
                      Request Custom Quote
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-3">Need Help?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-teal-600" />
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-teal-600" />
                        <span>info@indicjourneys.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 text-gray-900">Important Notes</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Bring swimsuit for Kulen Waterfall</li>
                    <li>• Comfortable walking shoes recommended</li>
                    <li>• Camera permits may be required at some temples</li>
                    <li>• Modest dress code for temple visits</li>
                    <li>• GST 5% and TCS 5% extra</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Image
              src="/images/indic-journeys-logo.png"
              alt="Indic Journeys"
              width={150}
              height={40}
              className="h-10 w-auto mx-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-400">© 2024 Indic Journeys. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
