import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Calendar,
  Users,
  Star,
  CheckCircle2,
  X,
  Coffee,
  Utensils,
  Car,
  Hotel,
  Camera,
  Download,
  Share,
  Heart,
  Palmtree,
  Phone,
  SailboatIcon as Boat,
  Mountain,
  Leaf,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function KeralaDetailPage() {
  const tour = {
    id: "classic-kerala",
    title: "God's Own Country – Kerala",
    location: "Kochi – Athirapilly – Munnar – Thekkady – Alleppey – Kochi",
    duration: "06 Nights / 07 Days",
    groupSize: "2-12 People",
    price: "₹19,999",
    originalPrice: "₹23,999",
    image: "/images/kerala-backwaters-sunset.jpg",
    category: "Nature",
    rating: 4.8,
    reviews: 189,
    discount: "17% OFF",
    description:
      "Experience the lush beauty of Kerala, aptly named 'God's Own Country'. This comprehensive tour takes you through misty hill stations, serene backwaters, pristine beaches, and historic colonial sites. From the thundering Athirapilly Falls to the tranquil backwaters of Alleppey, immerse yourself in Kerala's natural splendor and rich cultural heritage.",
    tourHighlights:
      "Athirapilly Falls, Tea Plantations, Spice Gardens, Pattumalay Tea Factory, Alleppey Backwaters, Fort Kochi",
    included: [
      "03 AC Train Tickets Ex Pune",
      "Accommodation on Twin Sharing Basis in Deluxe Hotels",
      "06 Breakfasts",
      "06 Dinners",
      "All Sightseeing in AC Vehicle",
      "Backwater Boat Ride in Alleppey",
      "Ferry Ride at Kochi Harbour",
      "All Toll, Parking and Driver Charges",
    ],
    excluded: [
      "Airfare if opted",
      "Any Expense of Personal Nature",
      "Meals other than specified",
      "Meals During Train Journeys",
      "Entrance Fees to the Monuments",
      "Anything that is not specifically mentioned in the Inclusions",
      "GST 5% Extra",
    ],
    itinerary: [
      {
        day: 1,
        title: "Kochi – Athirapilly – Kochi",
        description:
          "Arrive & Assemble at Kochi Hotel. Afternoon take a excursion to Athirapilly. This is the biggest Waterfall in Kerala and was also featured in the Magnum Opus movie Bahubali. Later visit Ezattamugham Nature Park. Late evening, return to the stay facility, have dinner & overnight stay at Kochi.",
        meals: "Dinner",
        accommodation: "Hotel in Kochi",
      },
      {
        day: 2,
        title: "Kochi to Munnar",
        description:
          "Morning, after breakfast, leave for Munnar. Enroute take a small stop at Cheeyaparya Falls. Late afternoon, reach Munnar. Check in to the stay facility. Evening is free at leisure. Have dinner. Overnight stay is at Munnar.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Munnar",
      },
      {
        day: 3,
        title: "Munnar",
        description:
          "Morning, after breakfast, leave for full day sightseeing of Munnar. Visit Anamudi View Point, Mattupetti Lake and Dam, Kundala Lake, Tea Plantations and the Tata Tea Factory. Late Evening, return to the hotel, have dinner & overnight stay at Munnar.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Munnar",
      },
      {
        day: 4,
        title: "Munnar – Thekkady",
        description:
          "After breakfast proceed to Thekkady (Periyar) 105 kms / 4 Hrs. The drive through the Rain Forest itself is enchanting as the road winds through countryside, rich plantations and thick jungles. Arrive at Thekkady & check in to the Hotel. Periyar, One of the well known wildlife Sanctuaries in the south, attracts a large number of nature lovers every year. Also called the Thekkady wildlife sanctuary, this place is ideal for watching the animals in their natural habitat. There are boat services which takes the visitor around the lake. Spread over 777 sq. km of the Cardamom Hills of Western Ghats. Take a boat ride in Periyar Lake (at own cost). If Interested, also enjoy the Kalaripayattu Martial Arts Show (at own cost). Late evening, visit local market famous for tea, pepper & cardamom. Evening, return to the hotel and overnight stay at Thekkady.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Thekkady",
      },
      {
        day: 5,
        title: "Thekkady to Alleppey",
        description:
          "This morning, after breakfast, proceed to Alleppey. Enroute take a stop at the 90+ Year old Pattumalay Tea Factory. It is one of the very few remaining Traditional Tea Factories in Kerala. Late afternoon, Teach Alleppey and check into the hotel. Fresh-up and visit Alleppey Beach in the evening and enjoy the sunset. Late evening return to the hotel, have dinner & overnight stay at Alleppey.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Alleppey",
      },
      {
        day: 6,
        title: "Alleppey – Kochi",
        description:
          "This morning, after breakfast, check out of the hotel and Visit the Alleppey Light House. Later, you can also take a Boat Ride in the Backwaters of Alleppey. Post Lunch time, leave for Kochi. Late afternoon, reach Kochi and Evening is free at Leisure. You can enjoy the Kathakali Show at the Art Center (at own cost). Have Dinner and Overnight stay at Kochi.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Kochi",
      },
      {
        day: 7,
        title: "Kochi",
        description:
          "This Morning, after breakfast, leave for the Full Day Sightseeing of Kochi. Kochi is a vibrant city situated on the south-west coast in state of Kerala. Fresh up and leave for Kochi Sightseeing. Visit the Mattencherry Palace, Jewish Synagogue, St. Francis Church, Santa Cruz Cathedral & Chinese Fishing Nets at the entrance of the Kochi Harbour. Also Visit the Navy Museum and Jain Temple. Evening, drop at Eranakulam Railway Station/Kochi Airport for Return Journey.",
        meals: "Breakfast",
        accommodation: "Departure",
      },
    ],
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="text-white">
                <Badge className="bg-green-600 text-white mb-4">{tour.category}</Badge>
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
                <p className="text-gray-700 font-open-sans leading-relaxed mb-6">{tour.description}</p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Palmtree className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Nature & Culture</span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2">Tour Highlights</h3>
                  <p className="text-green-700 font-open-sans">{tour.tourHighlights}</p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Itinerary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 font-poppins">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-6 pb-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-xl font-bold font-poppins text-gray-900">{day.title}</h3>
                      </div>
                      <p className="text-gray-700 font-open-sans mb-3 leading-relaxed">{day.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Utensils className="h-4 w-4 text-green-600" />
                          <span>{day.meals}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Hotel className="h-4 w-4 text-green-600" />
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
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-600 font-poppins">What's Included</h3>
                  <div className="space-y-3">
                    {tour.included.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-open-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-600 font-poppins">What's Not Included</h3>
                  <div className="space-y-3">
                    {tour.excluded.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
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
                  <Badge className="bg-red-600 text-white mt-2">{tour.discount}</Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <Link href="/contact">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-lg py-6">
                      Enquire Now
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Enquire Now
                  </Button>
                </div>

                <div className="flex justify-between text-sm">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
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
                      <Hotel className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Accommodation</span>
                    </div>
                    <span className="text-sm font-semibold">Deluxe Hotels</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Transportation</span>
                    </div>
                    <span className="text-sm font-semibold">AC Vehicle</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Meals</span>
                    </div>
                    <span className="text-sm font-semibold">6 Breakfast + 6 Dinner</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Boat className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Activities</span>
                    </div>
                    <span className="text-sm font-semibold">Backwater Cruise</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experiences */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 font-poppins">Unique Experiences</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Boat className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-open-sans">Serene backwater cruise in Alleppey</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Mountain className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-open-sans">Misty tea plantations of Munnar</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Leaf className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-open-sans">Spice gardens and aromatic cardamom hills</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Camera className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-open-sans">Colonial heritage of Fort Kochi</span>
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
                    <div className="text-2xl font-bold text-green-600">+91-9371131975</div>
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

      {/* Important Notes */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 font-poppins text-center">Important Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-600 font-poppins">Best Time to Visit</h3>
                  <ul className="space-y-2 text-sm font-open-sans">
                    <li>• September to March is ideal for Kerala</li>
                    <li>• Monsoon (June-August) offers lush green landscapes</li>
                    <li>• December-January has pleasant weather but higher crowds</li>
                    <li>• April-May can be hot and humid in coastal areas</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-600 font-poppins">What to Carry</h3>
                  <ul className="space-y-2 text-sm font-open-sans">
                    <li>• Light cotton clothes</li>
                    <li>• Comfortable walking shoes</li>
                    <li>• Insect repellent</li>
                    <li>• Camera for capturing scenic beauty</li>
                    <li>• Sunscreen and hat</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
