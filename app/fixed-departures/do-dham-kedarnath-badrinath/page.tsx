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
  Mountain,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DoDhamTourDetailPage() {
  const tour = {
    id: "do-dham-kedarnath-badrinath",
    title: "Do Dham (Kedarnath – Badrinath)",
    location: "Haridwar - Guptkashi - Kedarnath - Ukhimath - Badrinath - Rishikesh",
    duration: "08 Nights / 09 Days",
    groupSize: "2-15 People",
    price: "₹22,999",
    originalPrice: "₹27,599",
    image: "/images/rishikesh-temple.jpg",
    category: "Spiritual",
    rating: 4.9,
    reviews: 245,
    discount: "17% OFF",
    description:
      "Embark on a sacred journey to two of the most revered Jyotirlingas in the Himalayas. This spiritual odyssey takes you through the divine landscapes of Uttarakhand, offering darshan at Kedarnath and Badrinath temples while experiencing the pristine beauty of the Garhwal Himalayas.",
    tourHighlights:
      "View Points of Dev Prayag & Rudra Prayag. Visits to Narsingh Badri & Vriddha Badri and if time permits then to Yog Dhyan Badri.",
    included: [
      "Accommodation on triple sharing",
      "08 Breakfasts",
      "08 Dinners",
      "Transportation Ex Haridwar",
      "All Sightseeing as per Itinerary",
      "Services of a Trip Leader",
    ],
    excluded: [
      "Any Train / Air Fare",
      "Any Expense of Personal Nature",
      "Meals other than specified",
      "Any Portage / Doli / Helicopter Charges",
      "Anything which is specifically not mentioned in the Inclusions",
      "GST 5% Extra",
    ],
    itinerary: [
      {
        day: 1,
        title: "Delhi - Haridwar",
        description:
          "Reach at Haridwar by 3pm. Check in to the Hotel & fresh up. If interested visit Hari Ki Pauri for Ganga Arati (at own expense) in the evening. Return to the Hotel, have dinner and Overnight stay at Haridwar.",
        meals: "Dinner",
        accommodation: "Hotel in Haridwar",
      },
      {
        day: 2,
        title: "Haridwar - Guptakashi / Phata (Approx 225 Km)",
        description:
          "This Morning, drive to Guptkashi or further towards Kedarnath. En-route overview Devprayag (Alaknanda – Bhagirathi Confluence). Later continue drive via Srinagar, Rudraprayag. On arrival, Check In to the stay facility and overnight stay.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Guptakashi/Phata",
      },
      {
        day: 3,
        title: "Phata/Guptakashi – Kedarnath (Approx 15 Km DRIVE, 20 Km TREK)",
        description:
          "This Morning, drive to Gaurikund. (up to Sonprayag by our vehicle and from Sonprayag to Gaurikund by walk or by local Jeep). Arrive at Gaurikund, start your journey on the Trek ahead. En-route relax at Rambara. Later by the evening Arrive at Kedarnath. On arrival at Kedarnath, check in to the stay facility. Fresh up and time is free for Pooja and Darshan at Shri Kedarnathji Temple. Also visit Adi Shankaracharya Samadhi behind the Temple. Overnight stay at Kedarnath.",
        meals: "Breakfast, Dinner",
        accommodation: "Guest House in Kedarnath",
      },
      {
        day: 4,
        title: "Kedarnath – Ukhimath (20 Km TREK / Approx 45 Km DRIVE)",
        description:
          "Early Morning, time is given for Pooja & Darshan at the Kedarnath Temple. Later, Trek Back to Gaurikund and drive further to Ukhimath, a winter seat of Shri Kedarnath. Arrival, dinner and Halt.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Ukhimath",
      },
      {
        day: 5,
        title: "Ukhimath – Pandukeshwar (Approx 145 Km DRIVE)",
        description:
          "Early morning Visit Temple at Ukhimath and drive to Pandukeshwar. (145km). Enroute visit Chopta, Narsingh Badri Temple at Joshimath and Vriddha Badri temple at Govindghat. Reach Pandukeshwar and if time permits visit Yog Dhyaan Badri at Pandukeshwar. Stay at Pandukeshwar.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Pandukeshwar",
      },
      {
        day: 6,
        title: "Pandukeshwar – Badrinath – Mana - Pipalkoti (Approx 45 Km & 75 Km Drive)",
        description:
          "This Morning, we drive to Badrinath. After reaching Badrinath, we take Darshan. Later we visit Mana, the first village of India. Explore the village. Visit Vyaas Gufa, Ganesh Gufa, Saraswati Mandir, Bheem Shila and Saraswati river start point. Later leave for Pipalkoti / Gopeshwar. Reach Pipalkoti / Gopeshwar and stay.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Pipalkoti/Gopeshwar",
      },
      {
        day: 7,
        title: "Peepalkoti/Gopeshwar – Rishikesh – Haridwar (Approx 160 KMS Drive)",
        description:
          "This Morning, rise early and leave for Haridwar. Enroute stop at Rudra Prayag View Point. Stop at Rishikesh for Rafting. Later proceed to Haridwar. Reach Haridwar & Overnight stay.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Haridwar",
      },
      {
        day: 8,
        title: "Haridwar",
        description:
          "This Morning, post breakfast, day is free to explore Haridwar on your own. Visit the Kankhal Area temples and Bharat Mata Temple and Vaishnodevi Gufa. If interested, you can also visit Mansa Devi Temple by Ropeway. Late afternoon proceed to hari Ki Pauri to attend the Ganga Aarti. Later, return to the stay facility. Overnight stay is at Haridwar.",
        meals: "Breakfast, Dinner",
        accommodation: "Hotel in Haridwar",
      },
      {
        day: 9,
        title: "Haridwar – Return",
        description: "This Morning, post breakfast, check out from the hotel and head for return journey.",
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
                <Badge className="bg-orange-500 text-white mb-4">{tour.category}</Badge>
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
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold">{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold">{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mountain className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold">Spiritual Journey</span>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-bold text-orange-800 mb-2">Tour Highlights</h3>
                  <p className="text-orange-700 font-open-sans">{tour.tourHighlights}</p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Itinerary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 font-poppins">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-orange-400 pl-6 pb-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-xl font-bold font-poppins text-gray-900">{day.title}</h3>
                      </div>
                      <p className="text-gray-700 font-open-sans mb-3 leading-relaxed">{day.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Utensils className="h-4 w-4 text-orange-500" />
                          <span>{day.meals}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Hotel className="h-4 w-4 text-orange-500" />
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
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg py-6">
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
                      <Hotel className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Accommodation</span>
                    </div>
                    <span className="text-sm font-semibold">Triple Sharing</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Car className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Transportation</span>
                    </div>
                    <span className="text-sm font-semibold">Ex Haridwar</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Meals</span>
                    </div>
                    <span className="text-sm font-semibold">8 Breakfast + 8 Dinner</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Guide</span>
                    </div>
                    <span className="text-sm font-semibold">Trip Leader</span>
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
                    <div className="text-2xl font-bold text-orange-600">+91-9371131975</div>
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
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 font-poppins text-center">Important Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-orange-600 font-poppins">Trek Information</h3>
                  <ul className="space-y-2 text-sm font-open-sans">
                    <li>• Kedarnath trek is approximately 20 km from Gaurikund</li>
                    <li>• Trek difficulty: Moderate to Difficult</li>
                    <li>• Altitude: Kedarnath (3,583m), Badrinath (3,133m)</li>
                    <li>• Weather can be unpredictable in mountains</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-orange-600 font-poppins">What to Carry</h3>
                  <ul className="space-y-2 text-sm font-open-sans">
                    <li>• Warm clothes and rain gear</li>
                    <li>• Comfortable trekking shoes</li>
                    <li>• Personal medicines and first aid</li>
                    <li>• Valid ID proof for all travelers</li>
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
