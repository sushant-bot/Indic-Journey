import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Phone, Mail, CheckCircle, XCircle, Castle, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CentralIndianHeritagePage() {
  const itinerary = [
    {
      day: "Day 01",
      title: "Gwalior",
      description:
        "On arrival at Gwalior airport/railway station, Pick up and Transfer to the Hotel. Check-in to the hotel & fresh up. Later, leave for sightseeing. We visit to the Gwalior fort, which is one of the largest forts in India. Seek blessing at Vishnu temple which was built long back in the 11th century. Late evening, return to the hotel, have dinner and overnight stay is at Gwalior.",
    },
    {
      day: "Day 02",
      title: "Gwalior",
      description:
        "This morning, post breakfast, leave for a full day sightseeing. Today we visit, Jaivilas Palace, Siddhachal and Gopachal Jain Caves. Explore the classic carvings and history of the place. Evening, return to the hotel, have dinner and overnight stay at Gwalior.",
    },
    {
      day: "Day 03",
      title: "Gwalior - Orchha",
      description:
        "This morning, post breakfast, leave for Orchha which 124 kms from Gwalior. After reaching Orchha we visit the popular temples in Orchha such as the Ram Raja Temple and Chaturbhuj Temple. These temples were built by Bundela rulers in the 16th and 17th century. Late evening, Check into the Hotel, fresh up, have dinner and overnight stay at Orchha.",
    },
    {
      day: "Day 04",
      title: "Orchha",
      description:
        "This morning, post breakfast, leave for a full day excursion of Orchha fort Complex and Orchha Temples. We visit Jahangir Mahal, Raja Mahal, Phool Bagh & Orchha Chattris. Evening is free to explore the town or shopping. Later, return to the hotel, have dinner and overnight stay in Orchha.",
    },
    {
      day: "Day 05",
      title: "Orchha – Khajuraho",
      description:
        "This morning, rise early & depart to Khajuraho. Have breakfast enroute. After reaching Khajuraho, we visit the Western Group which has 14 temples including Kandariya Mahadev, Lakshmana, Chausath Yogini, Parvati, Varaha, Vishvanath and Nandi, Chitragupta, and Devi Jagdamba. Late evening, check in to the hotel, fresh up, have dinner and overnight stay at Khajuraho.",
    },
    {
      day: "Day 06",
      title: "Khajuraho",
      description:
        "This morning, post breakfast, leave for a full day excursion of the Eastern Group of temples, which consists of seven temples out of which four are Jain temples and the other three are Hindu. The seven temples are the Parsvanath, Adinath, Shantinath, Ghantai, Vamana, Javeri and Brahma. Evening is free to explore the town or shopping. Later, return to the hotel, have dinner and overnight stay in Khajuraho.",
    },
    {
      day: "Day 07",
      title: "Departure",
      description:
        "This morning, rise early & depart to Jhansi. Have breakfast enroute. After reaching Jhansi, we visit the Jhansi Fort. The fort was offered to Peshwa Bajirao 1st by Maharaja Chatrasal Bundela as a Mark of Gratitude for helping him defeat the Mughal army of Mohammad Khan Bangash. The Jhansi fort was one of the main Centres of the First War of Independence in 1857. Later, drop at Jhansi / Shivpuri Station to Board a Train for return Journey.",
    },
  ]

  const highlights = [
    "Jaivilas Palace",
    "Gopachal & Siddhachal Caves",
    "Chaturbhuj Temple",
    "Jahangir Mahal",
    "Khajuraho Temples",
    "Jhansi Fort",
  ]

  const inclusions = [
    "Accommodation",
    "06 Breakfasts",
    "06 Dinners",
    "Sightseeing as Per Itinerary",
    "All Sightseeing in AC Vehicle",
    "All Toll, Parking and Driver Charges",
  ]

  const exclusions = [
    "Train or Air Fare",
    "Any Expense of Personal Nature",
    "Entrance Fees to the Monuments",
    "Meals other than Specified",
    "Anything that is not specifically mentioned in the Inclusions",
    "GST 05% Extra",
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/khajuraho-temples.jpg" alt="Central Indian Heritage" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-red-900/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-orange-100 text-orange-800 px-4 py-1.5 text-sm font-semibold mb-6">
              <Castle className="h-4 w-4 mr-1 inline-block" />
              Heritage Tour
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">Central Indian Heritage</h1>

            <div className="flex flex-wrap gap-6 mb-8 text-white">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>06 Nights / 07 Days</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Gwalior – Orchha – Khajuraho – Jhansi</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Starting ₹29,999/- Per Person</span>
              </div>
            </div>

            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              Journey through the magnificent forts, palaces and temples of Central India, exploring the rich heritage
              of Gwalior, Orchha, and the world-famous Khajuraho temples.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 h-auto text-lg rounded-lg">
                Book Now
                <Phone className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-900 px-8 py-6 h-auto text-lg rounded-lg"
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
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Castle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
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
              Explore the architectural marvels and rich history of Central India with our comprehensive itinerary.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {itinerary.map((day, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                  <CardTitle className="flex items-center text-orange-800">
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
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-600 mx-auto"></div>
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
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore Central India?</h2>
            <p className="text-xl text-white/90 mb-8">
              Book your heritage journey through the magnificent monuments and temples of Central India!
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="text-4xl font-bold text-white mb-2">₹29,999/-</div>
              <div className="text-white/80">Per Person</div>
              <div className="text-sm text-white/70 mt-2">*Excluding GST</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto rounded-xl font-semibold">
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
