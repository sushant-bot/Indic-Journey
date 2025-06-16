import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Clock,
  CheckCircle2,
  X,
  Coffee,
  Utensils,
  Hotel,
  Camera,
  Phone,
  Plane,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EnchantingBaliPage() {
  const tour = {
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
    discount: "15% OFF",
    description:
      "Discover the magical island of Bali with its ancient temples, stunning landscapes, and rich cultural heritage. Experience the spiritual beauty of Uluwatu Temple, the majestic Garuda Vishnu statue, and the breathtaking Gate of Heaven.",
    highlights: [
      "Visit iconic Garuda Vishnu Temple (122m tall statue)",
      "Experience traditional Kecak Dance Show",
      "Explore mystical Uluwatu Temple",
      "Witness stunning Tanah Lot Temple",
      "Adventure at Kintamani Volcano",
      "Visit the famous Gate of Heaven",
      "Experience Bali Swing at Mt. Batur",
      "Discover Tirta Gangga royal water palace",
    ],
    included: [
      "5 nights accommodation in quality hotels",
      "Daily breakfast at hotel",
      "Daily dinner at Indian restaurant",
      "Airport transfers in Bali",
      "English speaking guide",
      "All sightseeing as per itinerary",
      "Entrance fees to monuments",
      "2 bottles of water daily",
      "Visa charges",
    ],
    excluded: [
      "Airfare (at actuals)",
      "Travel insurance",
      "Personal expenses",
      "Tips to driver/guide",
      "Meals other than specified",
      "GST 5%",
      "TCS as applicable",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive at Bali",
        description: "Arrival at Denpasar Airport. Meet & greet, transfer to hotel. Evening dinner and overnight stay.",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Uluwatu Temple & Kecak Dance",
        description: "Visit Garuda Vishnu Temple and Uluwatu Temple. Evening enjoy traditional Kecak Dance Show.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 3,
        title: "Bedgul – Tanah Lot",
        description:
          "Half day tour of Bedgul-Tanah Lot Temples. Visit Ulundanu Temple & Lake Bratan. Afternoon at leisure.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 4,
        title: "Mt. Batur – Ubud – Kintamani",
        description:
          "Full day Ubud & Kintamani tour. Visit Celuk, Mas Village, Ubud Palace, and Kintamani Volcano. Experience Bali Swing.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 5,
        title: "Gate of Heaven & Tirta Gangga",
        description: "Visit the famous Gate of Heaven at Lempuyang Temple and Tirta Gangga royal water palace.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 6,
        title: "Departure",
        description: "Transfer to airport for return journey.",
        meals: "Breakfast",
      },
    ],
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="text-white">
                <Badge className="bg-blue-600 text-white mb-4">
                  <Plane className="mr-1 h-3 w-3" />
                  {tour.category}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2 font-poppins">{tour.title}</h1>
                <div className="flex items-center space-x-4 text-lg">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {tour.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-1 text-yellow-400 fill-current" />
                    {tour.rating} ({tour.reviews} reviews)
                  </div>
                </div>
              </div>

              <div className="text-white text-right">
                <div className="text-3xl font-bold">{tour.price}</div>
                <div className="text-lg line-through text-gray-300">{tour.originalPrice}</div>
                <Badge className="bg-red-600 text-white">{tour.discount}</Badge>
                <div className="text-sm mt-1">+ Airfare + GST + TCS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 font-poppins">Tour Overview</h2>
                <p className="text-gray-700 font-open-sans leading-relaxed">{tour.description}</p>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">Best Time: Apr-Oct</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 font-poppins">Tour Highlights</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="font-open-sans">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 font-poppins">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-blue-400 pl-6 pb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-xl font-bold font-poppins">{day.title}</h3>
                      </div>
                      <p className="text-gray-700 font-open-sans mb-2">{day.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Utensils className="h-4 w-4" />
                        <span>{day.meals}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-600 font-poppins">What's Included</h3>
                  <div className="space-y-2">
                    {tour.included.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm font-open-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-600 font-poppins">What's Not Included</h3>
                  <div className="space-y-2">
                    {tour.excluded.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <X className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                        <span className="text-sm font-open-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">{tour.price}</div>
                  <div className="text-lg line-through text-gray-500">{tour.originalPrice}</div>
                  <div className="text-sm text-gray-600">per person</div>
                  <div className="text-xs text-red-600 mt-1">+ Airfare + GST + TCS</div>
                </div>

                <div className="space-y-4 mb-6">
                  <Link href="/contact">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg py-6">
                      Enquire Now
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Send Inquiry
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 font-poppins">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Hotel className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Accommodation</span>
                    </div>
                    <span className="text-sm font-semibold">Quality Hotels</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Plane className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Flights</span>
                    </div>
                    <span className="text-sm font-semibold">At Actuals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Meals</span>
                    </div>
                    <span className="text-sm font-semibold">Breakfast + Dinner</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Guide</span>
                    </div>
                    <span className="text-sm font-semibold">English Speaking</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 font-poppins">Need Help?</h3>
                <div className="text-2xl font-bold text-orange-600 mb-1">+91 9371131975 / +91 98606 30123</div>
                <div className="text-gray-600 mb-4 text-sm">Call us for instant booking</div>
                <a
                  href="https://wa.me/919371131975"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A12 12 0 003.48 20.52l-1.32 4.8a1 1 0 001.24 1.24l4.8-1.32A12 12 0 0020.52 3.48zm-8.52 17a10 10 0 117.07-2.93A10 10 0 0112 20.48zm5.07-7.07l-2.12-2.12a1 1 0 00-1.41 0l-1.41 1.41a1 1 0 000 1.41l2.12 2.12a1 1 0 001.41 0l1.41-1.41a1 1 0 000-1.41z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
