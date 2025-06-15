import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Phone, Mail, CheckCircle, XCircle, Mountain, Star, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function GarhwalGlimpsePage() {
  const itinerary = [
    {
      day: "Day 01",
      title: "Dehradun",
      description:
        "Arrive at Dehradun. Pick up and Transfer to the Stay Facility. Evening is free at disposal. Have dinner and overnight stay at Dehradun.",
    },
    {
      day: "Day 02",
      title: "Dehradun - Mussoorie",
      description:
        "Morning, after breakfast, visit Tapkeshwar, Robbers Cave, Sahastradhara and Malsi Deer Park. Afternoon, leave for Mussoorie. Enroute, Visit Prakasheshwar Mahadev Mandir. Late evening, reach Mussoorie, check into the stay facility, have dinner & and Overnight stay at Mussoorie.",
    },
    {
      day: "Day 03",
      title: "Mussoorie",
      description:
        "This morning, after breakfast, we leave for Sightseeing. We Visit, Gun Hill, Lal Tibba View Point, Jharipani Falls, Company Garden & Kempty Falls. Evening is free at the Mall Road. Return to the stay facility, have dinner & Overnight stay is at Mussoorie.",
    },
    {
      day: "Day 04",
      title: "Mussoorie – Dev Prayag – Rishikesh",
      description:
        "Early morning, drive from Mussoorie to Dev Prayag. Breakfast is Enroute. This is the place where the rivers viz. the Alaknanda descending from Badrinath and the Bhagirathi descending from Gangotri confluence to form the mighty Ganga. Also Visit the Raghunath Mandir at Dev Prayag. Afternoon, drive to Rishikesh. Time is free for Rafting (at own Cost). In Rishikesh, we visit the Lakshman Jhula, Lakshman Mandir & Tera Manzila Mandir. Also attend the evening Ganga Arti at Rishikesh. Late evening return to the stay facility, have dinner and overnight stay is at Rishikesh.",
    },
    {
      day: "Day 05",
      title: "Rishikesh to Haridwar",
      description:
        "Morning, after breakfast, leave for Haridwar. Haridwar is the gateway to the Chardham Yatra. Reach Haridwar and check into the stay facility. Later visit Chandi Devi or Mansa Devi temple. Also visit Daksh Prajapati Temple at Kankhal, Bharat Mata Mandir and Patanjali Yog Peeth. Evening visit Hari ki Pauri to attend the Ganga Arti. The Arti is a spectacle to watch and photograph. Return to the stay facility, have dinner and overnight stay at Haridwar.",
    },
    {
      day: "Day 06",
      title: "Haridwar – Return",
      description:
        "Morning, time is free to explore Haridwar on own till 11 am. If interested one can also attend the early morning Ganga Arti at Hari Ki Pauri. Later leave Haridwar to board a flight for return journey.",
    },
  ]

  const highlights = [
    "Ganga Aarti at Haridwar",
    "Ganga Aarti at Rishikesh",
    "Prakasheshwar Mahadev",
    "Robbers Cave",
    "Kempty Falls",
  ]

  const inclusions = [
    "Accommodation in Deluxe Hotels",
    "05 Breakfasts",
    "05 Dinners",
    "All Transfers & Sightseeing in Private Vehicle",
    "Sightseeing as per the Itinerary",
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
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/garhwal-mountains.jpg" alt="Garhwal Glimpse" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-green-100 text-green-800 px-4 py-1.5 text-sm font-semibold mb-6">
              <Mountain className="h-4 w-4 mr-1 inline-block" />
              Adventure Tour
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">Garhwal Glimpse</h1>

            <div className="flex flex-wrap gap-6 mb-8 text-white">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>05 Nights / 06 Days</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Dehradun – Mussoorie – Rishikesh – Haridwar</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Starting ₹21,999/- Per Person</span>
              </div>
            </div>

            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              Explore the spiritual heart of Uttarakhand with sacred temples, scenic hill stations, and the divine Ganga
              Aarti ceremonies in this comprehensive journey through Garhwal region.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 h-auto text-lg rounded-lg">
                Book Now
                <Phone className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-6 h-auto text-lg rounded-lg"
              >
                Get Quote
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tour Highlights</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800">{highlight}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Itinerary */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Detailed Itinerary</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the spiritual and natural beauty of Garhwal with our carefully planned day-by-day itinerary.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {itinerary.map((day, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                  <CardTitle className="flex items-center text-green-800">
                    <Clock className="h-5 w-5 mr-2" />
                    {day.day}: {day.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 leading-relaxed">{day.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What's Included & Excluded</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-800 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Inclusions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {inclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-red-800 flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Exclusions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {exclusions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing & Booking */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Garhwal?</h2>
            <p className="text-xl text-white/90 mb-8">
              Book your spiritual and scenic journey through the beautiful Garhwal region today!
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="text-4xl font-bold text-white mb-2">₹21,999/-</div>
              <div className="text-white/80">Per Person</div>
              <div className="text-sm text-white/70 mt-2">*Excluding GST</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto rounded-xl font-semibold">
                  Book This Tour
                  <Phone className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 h-auto rounded-xl font-semibold"
                >
                  Get Custom Quote
                  <Mail className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
