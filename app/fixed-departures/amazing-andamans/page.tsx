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
  Car,
  Hotel,
  Camera,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AmazingAndamansPage() {
  const tour = {
    id: "amazing-andamans",
    title: "Amazing Andamans",
    location: "Port Blair – Havelock Island – Neil Island – Port Blair",
    duration: "6 Nights / 7 Days",
    groupSize: "2-15 People",
    price: "₹32,500",
    originalPrice: "₹39,000",
    image: "/images/andaman-beach.jpg",
    category: "Beach",
    rating: 4.8,
    reviews: 234,
    discount: "17% OFF",
    description:
      "Discover the pristine beauty of Andaman Islands with crystal clear waters, white sandy beaches, and rich marine life. Experience the historic Cellular Jail, relax at world-famous Radhanagar Beach, and enjoy thrilling water activities.",
    highlights: [
      "Visit historic Cellular Jail & Light Show",
      "Relax at world-famous Radhanagar Beach",
      "Snorkeling at Elephant Beach",
      "Explore beautiful Bharatpur Beach",
      "Visit scenic Chidiya Tapu",
      "Experience Kalapathar Beach",
      "Enjoy water activities at Neil Island",
      "Ferry rides between islands",
    ],
    included: [
      "6 nights accommodation",
      "Daily breakfast and dinner",
      "Ferry transfers between islands",
      "All sightseeing as per itinerary",
      "Shared vehicle transportation",
      "Complimentary snorkeling at Elephant Beach",
      "Photo shoot at Radhanagar Beach",
    ],
    excluded: [
      "Airfare (at actuals)",
      "Personal expenses",
      "Meals other than specified",
      "Water activity/sports charges",
      "GST 5% Extra",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Port Blair",
        description:
          "Arrive at Port Blair Airport. Visit Corbyn's Cove Beach and historic Cellular Jail. Evening Light & Sound Show.",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Port Blair - Havelock Island",
        description: "Ferry to Havelock Island. Visit world-famous Radhanagar Beach and Kalapathar Beach.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 3,
        title: "Havelock Island - Elephant Beach",
        description: "Memorable trip to Elephant Beach. Ideal for water activities and rich in coral reef structure.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 4,
        title: "Havelock Island - Neil Island",
        description: "Ferry to Neil Island. Visit Laxmanpur Beach, Bharatpur Beach & Natural Bridge.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 5,
        title: "Neil Island",
        description: "Visit Sitapur Beach. Day at leisure to enjoy the pristine beauty of Neil Island.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 6,
        title: "Neil Island - Port Blair",
        description: "Ferry back to Port Blair. Visit Chidiya Tapu beach for water activities and swimming.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to airport for return flight.",
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
                <Badge className="bg-cyan-600 text-white mb-4">{tour.category}</Badge>
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
                <div className="text-sm mt-1">+ Airfare at actuals</div>
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
                    <Calendar className="h-5 w-5 text-cyan-500" />
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-cyan-500" />
                    <span className="font-semibold">{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-cyan-500" />
                    <span className="font-semibold">Best Time: Oct-May</span>
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
                    <div key={index} className="border-l-4 border-cyan-400 pl-6 pb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-cyan-400 text-white rounded-full flex items-center justify-center font-bold">
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
                  <div className="text-xs text-red-600 mt-1">+ Airfare at actuals</div>
                </div>

                <div className="space-y-4 mb-6">
                  <Link href="/contact">
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-lg py-6">
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
                      <Hotel className="h-4 w-4 text-cyan-500" />
                      <span className="text-sm">Accommodation</span>
                    </div>
                    <span className="text-sm font-semibold">Beach Resorts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4 text-cyan-500" />
                      <span className="text-sm">Transportation</span>
                    </div>
                    <span className="text-sm font-semibold">Shared Vehicle</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-4 w-4 text-cyan-500" />
                      <span className="text-sm">Meals</span>
                    </div>
                    <span className="text-sm font-semibold">Breakfast + Dinner</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-cyan-500" />
                      <span className="text-sm">Activities</span>
                    </div>
                    <span className="text-sm font-semibold">Water Sports</span>
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
