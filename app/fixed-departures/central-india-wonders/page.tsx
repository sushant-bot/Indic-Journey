import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Phone,
  Mail,
  Share2,
  CheckCircle,
  XCircle,
  Camera,
  Mountain,
  Utensils,
  Bed,
} from "lucide-react"
import Image from "next/image"

export default function CentralIndiaWondersDetailPage() {
  const tourData = {
    id: "central-india-wonders",
    title: "Central India Wonders",
    location: "Ujjain – Omkareshwar – Maheshwar – Indore",
    duration: "4 Nights / 5 Days",
    groupSize: "2-16 People",
    price: "₹14,999",
    originalPrice: "₹17,999",
    image: "/images/maheshwar-fort.jpg",
    category: "Heritage",
    rating: 4.7,
    reviews: 156,
    discount: "17% OFF",
  }

  const itinerary = [
    {
      day: 1,
      title: "Ujjain",
      description:
        "Arrive at Ujjain. Pick up, transfer to the hotel and Check in. Fresh up & have breakfast. Post Breakfast, Visit the Mahakaleshwar Temple. This is one of the 12 Jyotirlingas. The temple is located on the banks of Kshipra River and has a Dakshinmukhi Shivalinga. The Current Temple was commissioned by Maratha General Ranoji Shinde and was financed by his diwan Ramchandra Baba Sukhatankar Shenavi. Late evening visit the Mahakaal Corridor to check out the Amazing Lighting. Return to the Hotel and overnight stay at Ujjain.",
      meals: "Breakfast, Dinner",
      accommodation: "Hotel in Ujjain",
    },
    {
      day: 2,
      title: "Ujjain – Omkareshwar – Maheshwar",
      description:
        "Early morning, Check Out and drive to Omkareshwar. Have breakfast enroute, reach & time for Lunch. Later, visit the Omkareshwar Temple. It is located on Mandhata/Shivpuri Island at the meeting points of Narmada & Kaveri Rivers and is one of the 12 Jyotirlingas. The temple witnessed onslaught by Islamic Invaders and was rebuilt several times. The latest by Punyashlok Maharani Ahilyabai Holkar. Take Darshan. Evening depart to Maheshwar. Reach the Hotel, have dinner and overnight stay is at Maheshwar.",
      meals: "Breakfast, Lunch, Dinner",
      accommodation: "Hotel in Maheshwar",
    },
    {
      day: 3,
      title: "Maheshwar",
      description:
        "This Morning, post Breakfast leave for Maheshwar Sightseeing. As per many Historians Maheshwar, is the same as Mahismati, the capital of King Sahasrarjun of the Haihaya Kingdom who was slain by Lord Parshuram. The city also served as the capital of Punyashlok Maharani Ahilyabai Holkar in the late 19 Century. During Sightseeing we Visit Raj Rajeshwar Temple, Ahilyeshwar Temple, Maheshwar Fort & Ghat, etc. Late Evening, return to the Hotel and overnight stay is at Maheshwar.",
      meals: "Breakfast, Dinner",
      accommodation: "Hotel in Maheshwar",
    },
    {
      day: 4,
      title: "Maheshwar to Indore",
      description:
        "This morning, post breakfast, Drive to Indore. Arrive and Check into Indore. Later leave for Indore Local Sightseeing. We visit, the Rajwada Palace, Lal Bagh Palace, Central Museum, etc. Evening return to the Hotel. Fresh up and at Night, Explore and enjoy the Sarafa Bazaar. This place is famous for its food stalls that run through the night. Return to the Hotel and overnight stay at Indore.",
      meals: "Breakfast, Dinner",
      accommodation: "Hotel in Indore",
    },
    {
      day: 5,
      title: "Indore – Departure",
      description:
        "This Morning, post breakfast, check out of the Hotel. Time is free at the Indore Market for Shopping. Late Afternoon, drop at Indore Railway Station / Bus Stop for return journey.",
      meals: "Breakfast",
      accommodation: "Departure",
    },
  ]

  const inclusions = [
    "Accommodation",
    "Breakfast on Tour Ex Ujjain",
    "Sightseeing as Per Itinerary",
    "Visit to Mahakaal Corridor",
    "Visit to Sarafa Bazaar",
    "All Toll, Parking & Driver Charges",
  ]

  const exclusions = [
    "Any Expense of Personal Nature",
    "Meals other than Specified",
    "Meals During Train Journeys",
    "Entrance Fees to the Monuments",
    "Anything that is not specifically mentioned in the Inclusions",
    "GST 05% Extra",
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image src={tourData.image || "/placeholder.svg"} alt={tourData.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white">
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2">{tourData.category}</Badge>
                <Badge className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-bold">
                  {tourData.discount}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-poppins">{tourData.title}</h1>

              <div className="flex items-center text-lg mb-4">
                <MapPin className="h-5 w-5 mr-2 text-orange-400" />
                <span className="font-open-sans">{tourData.location}</span>
              </div>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-orange-400" />
                  <span>{tourData.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-orange-400" />
                  <span>{tourData.groupSize}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                  <span>
                    {tourData.rating} ({tourData.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="text-3xl font-bold text-orange-400">{tourData.price}</div>
                <div className="text-lg line-through text-gray-300">{tourData.originalPrice}</div>
                <div className="text-sm text-gray-300">per person</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tour Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-poppins text-orange-800">Tour Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed font-open-sans">
                  Embark on a spiritual and cultural journey through Central India's most sacred sites. This tour takes
                  you through the heart of Madhya Pradesh, visiting two of the twelve sacred Jyotirlingas -
                  Mahakaleshwar in Ujjain and Omkareshwar. Experience the rich heritage of Queen Ahilyabai Holkar in
                  Maheshwar and conclude with the vibrant culture of Indore, including the famous Sarafa Bazaar night
                  food tour.
                </p>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3 text-orange-800 font-poppins">Tour Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {["Mahakaal Corridor", "Omkareshwar Jyotirlinga", "Maheshwar Fort", "Sarafa Bazaar"].map(
                      (highlight, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0" />
                          <span className="text-sm font-open-sans">{highlight}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-poppins text-orange-800">Detailed Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-orange-200 pl-6 pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-lg font-semibold text-orange-800 font-poppins">{day.title}</h3>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed font-open-sans">{day.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Utensils className="h-4 w-4 mr-1 text-orange-500" />
                          <span>{day.meals}</span>
                        </div>
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1 text-orange-500" />
                          <span>{day.accommodation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-poppins text-green-800 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Inclusions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {inclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-open-sans">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-poppins text-red-800 flex items-center">
                    <XCircle className="h-5 w-5 mr-2 text-red-600" />
                    Exclusions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-open-sans">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-poppins text-orange-800">Important Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm font-open-sans">
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Best Time to Visit</h4>
                    <p className="text-gray-700">
                      October to March is ideal for visiting Central India with pleasant weather for temple visits and
                      sightseeing.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">What to Pack</h4>
                    <p className="text-gray-700">
                      Comfortable walking shoes, modest clothing for temple visits, light cotton clothes, and a camera
                      for capturing the beautiful architecture.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">Special Notes</h4>
                    <p className="text-gray-700">
                      Temple timings may vary. The Mahakaal Corridor is beautifully illuminated in the evening. Sarafa
                      Bazaar comes alive after sunset with amazing street food.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Booking Card */}
              <Card className="border-orange-200">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                  <CardTitle className="text-xl font-poppins text-orange-800">Book This Tour</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-orange-600 mb-1">{tourData.price}</div>
                    <div className="text-lg line-through text-gray-500 mb-1">{tourData.originalPrice}</div>
                    <div className="text-sm text-gray-600">per person</div>
                    <Badge className="bg-red-600 text-white mt-2">{tourData.discount}</Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Book Now</Button>
                    <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                      Send Enquiry
                    </Button>
                    <Button variant="ghost" className="w-full text-orange-600 hover:bg-orange-50">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Tour
                    </Button>
                  </div>

                  <div className="border-t border-gray-200 my-4"></div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">{tourData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Group Size:</span>
                      <span className="font-semibold">{tourData.groupSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold">{tourData.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-poppins text-orange-800">Unique Experiences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <Mountain className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-open-sans">Visit 2 of the 12 sacred Jyotirlingas</span>
                    </div>
                    <div className="flex items-start">
                      <Camera className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-open-sans">Mahakaal Corridor evening lighting</span>
                    </div>
                    <div className="flex items-start">
                      <Utensils className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="font-open-sans">Sarafa Bazaar night food tour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-poppins text-orange-800">Need Help?</CardTitle>
                  <div className="text-2xl font-bold text-orange-600 mb-1">+91 9371131975 / +91 98606 30123</div>
                  <div className="text-gray-600 mb-4 text-sm">Call us for instant booking</div>
                  <a
                    href="https://wa.me/919371131975"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.52 3.48A12 12 0 003.48 20.52l-1.32 4.8a1 1 0 001.24 1.24l4.8-1.32A12 12 0 0020.52 3.48zm-8.52 17a10 10 0 117.07-2.93A10 10 0 0112 20.48zm5.07-7.07l-2.12-2.12a1 1 0 00-1.41 0l-1.41 1.41a1 1 0 000 1.41l2.12 2.12a1 1 0 001.41 0l1.41-1.41a1 1 0 000-1.41z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
