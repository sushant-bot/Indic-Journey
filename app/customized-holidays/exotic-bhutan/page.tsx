import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  Users,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Mountain,
  Camera,
  Car,
  Home,
  Utensils,
  FileText,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ExoticBhutanPage() {
  const itinerary = [
    {
      day: 1,
      title: "Bagdogra Airport – Phuentsholing",
      distance: "154 Km / Approx 4 Hrs",
      description:
        "Meet and greet at Bagdogra Airport and drive to Phuentsholing. Phuentsholing (alt. 300m / 985 ft.) - The frontier town, it is a thriving commercial centre, situated directly at the base of Himalayan foothills. It is a fascinating place where different ethnic groups mingle prominently Indian, Bhutanese and Nepalese. Being the border town, Phuentsholing serves as the convenient entry/exit point for Bhutan and also the important link to visit the Indian states of West Bengal, Sikkim and Assam.",
      meals: "Dinner",
      accommodation: "Hotel in Phuentsholing",
    },
    {
      day: 2,
      title: "Phuentsholing - Thimphu: Immigration Process",
      distance: "165KM / 4.45 Hrs",
      description:
        "After breakfast, proceed towards Thimphu via the wonderful mystic town Gedu, which is about 9000 ft above the sea and Chukha Dam. On the way, halt at Chojun to take photographs of the confluence of two rivers of Bhutan, Thimpu Chu and Paro Chu. Reach Thimpu in the evening. Visit the Tashichho Dzong (Fortress of the Glorious Religion). THIMPHU - The capital town of Bhutan and the centre of government, religion and commerce, Thimphu is a unique city with an unusual mixture of modern development alongside ancient traditions. With a population of about 90,000, it is perhaps still the world's only capital city without a traffic light.",
      meals: "Breakfast, Dinner",
      accommodation: "Hotel in Thimphu",
    },
    {
      day: 3,
      title: "Thimphu: Enchanting local sightseeing – Punakha",
      distance: "Various locations",
      description:
        "Visit enchanting local sites as part of your Bhutan tour itinerary. Visit Kuensel Phodrang, National Memorial Chorten, Folk Heritage Museum, Typical Bhutanese lunch at the Folk Heritage Restaurant, Sangaygang view point, Takin Reserve Centre, Changangkha Monastery, Tashichho Dzong. Later depart to Punakha / Wangdue Phodrang. Enroute, visit the famous DochuLa Pass (3,080m) that heralds the most enchanting views of Bhutan.",
      meals: "Breakfast, Dinner",
      accommodation: "Hotel in Punakha",
    },
    {
      day: 4,
      title: "Punakha / Wangdue to Paro",
      distance: "Various locations",
      description:
        "In the morning after breakfast, visit PUNAKHA DZONG built strategically at the junction of PHO CHU & MO CHU River, Suspension Bridge, and Chimmi Monastery View. Later, drive to Paro and visit NYA MEY ZAM BRIDGE, RINPUNG DZONG, KICHU LHAKHANG, INTERNATIONAL AIRPORT, MUSEUM and TIGER NEST VIEW.",
      meals: "Breakfast, Dinner",
      accommodation: "Hotel in Paro",
    },
    {
      day: 5,
      title: "Paro Local Sightseeing - Chele La Pass",
      distance: "Various locations",
      description:
        "Morning, after breakfast, drive to chellela view point sightseeing, Chele La Pass is at over 13,000 ft to the west above the Paro Valley is the highest road pass in the country and has amazing views of the Himalaya especially that of Mt. Jhomolari, Bhutan's most sacred peak at over 22,000 feet and drive back to Paro.",
      meals: "Breakfast, Dinner",
      accommodation: "Hotel in Paro",
    },
    {
      day: 6,
      title: "Paro - Phuentsholing",
      distance: "Approx 150 km / 5 Hours",
      description:
        "After breakfast check out from the hotel and transfer to Phuentsholing. On arrival check in at the hotel.",
      meals: "Breakfast, Dinner",
      accommodation: "Hotel in Phuentsholing",
    },
    {
      day: 7,
      title: "Departure from Phuentsholing",
      distance: "Transfer to NJP/IXB",
      description:
        "After breakfast check out from the hotel and take the departure transfer to NJP Railway Station / IXB Airport for your onward journey.",
      meals: "Breakfast",
      accommodation: "Departure",
    },
  ]

  const inclusions = [
    "Accommodation on Double Sharing Basis",
    "07 Breakfasts",
    "07 Dinners",
    "Sightseeing and all transfers, As Per Tour by Exclusive NonAc Vehicle",
    "Toll tax, Permit, Parking, Driver's allowances",
    "Immigration",
    "Sustainable Development Fees (SDF)",
    "Professional English-Speaking Guide",
    "Tourist Sim Card on Arrival complimentary for Bhutan",
    "Above rate is valid for Indian Nationals only",
  ]

  const exclusions = [
    "Any Expense of Personal Nature",
    "Any extra excursions or sightseeing apart from the tour itinerary",
    "Any entry fees for museums, parks, Jeep safari or anything else",
    "Anything is not mentioned in the inclusion",
    "Train Fare / Air Fare",
    "Any cost arising due to natural calamities like, landslides, road blockage, political disturbances (strikes), etc",
    "Any increase in taxes or fuel price, leading to increase in cost on surface transportation & land arrangements",
    "GST 05% Extra",
  ]

  const highlights = [
    "Tashichho Dzong",
    "Punakha Dzong",
    "Kichu Lhakhang",
    "DochuLa Pass",
    "Rinpung Dzong",
    "Chele La Pass",
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
              <Link href="/fixed-departures" className="text-gray-600 hover:text-gray-900">
                Fixed Departures
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
          <Image src="/images/bhutan-night.jpg" alt="Exotic Bhutan" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-teal-900/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <Badge className="bg-white/20 text-white mb-4 px-3 py-1">
              <Mountain className="h-4 w-4 mr-1" />
              Last Shangri-La
            </Badge>
            <h1 className="text-5xl font-bold mb-4">Exotic Bhutan</h1>
            <p className="text-xl mb-6 text-blue-100">
              Discover the mystical kingdom of Bhutan with its pristine monasteries, breathtaking Himalayan landscapes,
              and rich cultural heritage.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4 mr-2" />
                06 Nights / 07 Days
              </div>
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <MapPin className="h-4 w-4 mr-2" />
                Phuentsholing – Thimphu – Punakha – Paro
              </div>
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Users className="h-4 w-4 mr-2" />
                ₹42,750 per person
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
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Mountain className="h-6 w-6 mr-2 text-blue-600" />
                  Tour Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-semibold">Duration</p>
                        <p className="text-gray-600">06 Nights / 07 Days</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-semibold">Route</p>
                        <p className="text-gray-600">Phuentsholing – Thimphu – Punakha – Paro – Phuentsholing</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-semibold">Price</p>
                        <p className="text-2xl font-bold text-blue-600">₹42,750</p>
                        <p className="text-sm text-gray-500">per person</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tour Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Camera className="h-6 w-6 mr-2 text-blue-600" />
                  Tour Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-3 text-green-600" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Clock className="h-6 w-6 mr-2 text-blue-600" />
                  Detailed Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {itinerary.map((day, index) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-6 pb-6 relative">
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{day.day}</span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <h3 className="text-lg font-bold text-gray-900">
                          Day {day.day}: {day.title}
                        </h3>
                        {day.distance && (
                          <Badge variant="outline" className="text-xs">
                            <Car className="h-3 w-3 mr-1" />
                            {day.distance}
                          </Badge>
                        )}
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{day.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-green-700">
                          <Utensils className="h-4 w-4 mr-1" />
                          <span className="font-medium">Meals: {day.meals}</span>
                        </div>
                        <div className="flex items-center text-blue-700">
                          <Home className="h-4 w-4 mr-1" />
                          <span className="font-medium">Stay: {day.accommodation}</span>
                        </div>
                      </div>
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
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
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
                        <XCircle className="h-4 w-4 mr-2 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Important Notes */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-yellow-800">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Important Notes & Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Vehicle Timing & Conditions:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1 ml-4">
                    <li>• Vehicle Timing: 9:00 am to 6:00 PM, Point to Point Sightseeing, not at disposal Basis</li>
                    <li>
                      • A/C is not allowed on the hill sides, you may directly discuss with the driver if required
                    </li>
                    <li>
                      • We are not liable for any change in the program arising due to Permit Failure, Bhutan Government
                      Regulations, Natural Calamities, Etc.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Required Documents:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1 ml-4">
                    <li>• Do carry 2 Passport size photos</li>
                    <li>• Mandatory Documents - Adult above 18 yrs: Passport with 2 Copies PP size Photo</li>
                    <li>• (Aadhar Card, PAN Card & Driving License are not accepted)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-lg">
                  <CardTitle className="text-center">Book This Tour</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600">₹42,750</div>
                    <div className="text-gray-600">per person</div>
                    <div className="text-sm text-gray-500 mt-1">06 Nights / 07 Days</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold">7 Days</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Group Size</span>
                      <span className="font-semibold">Min 2 Pax</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Best Time</span>
                      <span className="font-semibold">Oct-May</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href="/contact">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Get Custom Quote
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
                    <div className="text-lg font-bold text-blue-600 mb-1">+91 9371131975 / +91 98606 30123</div>
                    <div className="text-blue-700 mb-4 text-sm">Call us for instant booking</div>
                    <a
                      href="https://wa.me/919371131975"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.52 3.48A12 12 0 003.48 20.52l-1.32 4.8a1 1 0 001.24 1.24l4.8-1.32A12 12 0 0020.52 3.48zm-8.52 17a10 10 0 117.07-2.93A10 10 0 0112 20.48zm5.07-7.07l-2.12-2.12a1 1 0 00-1.41 0l-1.41 1.41a1 1 0 000 1.41l2.12 2.12a1 1 0 001.41 0l1.41-1.41a1 1 0 000-1.41z"/>
                      </svg>
                      WhatsApp Us
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                height={30}
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
