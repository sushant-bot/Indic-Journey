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

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  // This would normally fetch data based on the slug
  const tour = {
    id: "golden-triangle",
    title: "Golden Triangle Classic",
    location: "Delhi - Agra - Jaipur",
    duration: "7 Days / 6 Nights",
    groupSize: "2-15 People",
    price: "₹25,000",
    originalPrice: "₹30,000",
    image: "/placeholder.svg?height=400&width=800",
    category: "Heritage",
    rating: 4.8,
    reviews: 156,
    discount: "17% OFF",
    description:
      "Experience the iconic Golden Triangle circuit covering India's most famous historical monuments. This carefully crafted journey takes you through Delhi's bustling streets, Agra's magnificent Taj Mahal, and Jaipur's royal palaces.",
    highlights: [
      "Visit the iconic Taj Mahal at sunrise",
      "Explore Red Fort and Jama Masjid in Delhi",
      "Discover Hawa Mahal and Amber Fort in Jaipur",
      "Experience local markets and cuisine",
      "Professional guide throughout the journey",
      "Comfortable accommodation in heritage hotels",
    ],
    included: [
      "6 nights accommodation in 4-star hotels",
      "Daily breakfast and 3 dinners",
      "Private air-conditioned vehicle",
      "Professional English-speaking guide",
      "All monument entrance fees",
      "Airport transfers",
    ],
    excluded: [
      "International flights",
      "Lunch (except mentioned)",
      "Personal expenses",
      "Tips and gratuities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Arrive at Delhi airport, transfer to hotel. Evening visit to India Gate and Connaught Place.",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Delhi Sightseeing",
        description:
          "Full day tour of Old and New Delhi including Red Fort, Jama Masjid, Raj Ghat, and Humayun's Tomb.",
        meals: "Breakfast",
      },
      {
        day: 3,
        title: "Delhi to Agra",
        description: "Drive to Agra (3 hours). Visit Agra Fort and Mehtab Bagh for sunset view of Taj Mahal.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 4,
        title: "Agra to Jaipur via Fatehpur Sikri",
        description: "Early morning visit to Taj Mahal. Drive to Jaipur via Fatehpur Sikri (5 hours total).",
        meals: "Breakfast",
      },
      {
        day: 5,
        title: "Jaipur Sightseeing",
        description: "Visit Amber Fort, City Palace, Hawa Mahal, and Jantar Mantar. Evening at local bazaars.",
        meals: "Breakfast, Dinner",
      },
      {
        day: 6,
        title: "Jaipur to Delhi",
        description: "Morning at leisure. Drive back to Delhi (5 hours). Evening free for shopping.",
        meals: "Breakfast",
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to airport for onward journey.",
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
                <Badge className="bg-yellow-400 text-black mb-4">{tour.category}</Badge>
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
                    <span className="font-semibold">Best Time: Oct-Mar</span>
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
                    <div key={index} className="border-l-4 border-yellow-400 pl-6 pb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">
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
                </div>

                <div className="space-y-4 mb-6">
                  <Link href="/contact">
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-black hover:text-white text-lg py-6">
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
                      <Hotel className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Accommodation</span>
                    </div>
                    <span className="text-sm font-semibold">4-Star Hotels</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Transportation</span>
                    </div>
                    <span className="text-sm font-semibold">Private AC Vehicle</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Meals</span>
                    </div>
                    <span className="text-sm font-semibold">Breakfast + 3 Dinners</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-yellow-500" />
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
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">+91-9371131975</div>
                    <div className="text-sm text-gray-600">Call us for instant booking</div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Coffee className="h-4 w-4 mr-2" />
                    Chat with Expert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 font-poppins">You Might Also Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Related tour cards would go here */}
            <div className="text-center text-gray-500">
              <p>Related tours will be displayed here</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
