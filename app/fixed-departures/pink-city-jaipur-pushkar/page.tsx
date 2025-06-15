import { MainLayout } from "@/components/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Camera,
  Mountain,
  Building,
} from "lucide-react"
import Image from "next/image"

export default function PinkCityJaipurPushkarTourPage() {
  const tourData = {
    name: "Pink City – Jaipur with Pushkar",
    duration: "05 Days Ex Jaipur",
    route: "Jaipur – Pushkar",
    price: "₹14,999",
    originalPrice: "₹17,999",
    discount: "17% OFF",
    rating: 4.8,
    reviews: 178,
    category: "Heritage",
    groupSize: "2-15 People",
    image: "/images/hawa-mahal-jaipur.jpg",
  }

  const highlights = ["Amer Fort", "Nahargarh Fort", "Pushkar Brahma Temple", "Pushkar Bazaar", "Galtaji Monkey Temple"]

  const itinerary = [
    {
      day: 1,
      title: "Jaipur",
      description:
        "Reach Jaipur and Check into the Stay Facility. Afternoon, we have a small introductory session and we head for Sightseeing of Jaipur. We visit Gaitore Ki Chhatriyan, a crematorium ground. It something unique to visit in Jaipur. Evening, visit the Birla Mandir white temple is a quick and easy activity that should not be missed. The final visit of the day can be The Statue Circle, which is only a 5-minute drive from Birla Mandir. Later return to the stay facility. Have dinner and overnight stay is at Jaipur.",
      meals: "Dinner",
      accommodation: "Jaipur",
    },
    {
      day: 2,
      title: "Jaipur",
      description:
        "This morning, post breakfast, leave for Jaipur Local Sightseeing. Today you will be covering Jantar Mantar, City Palace, Govind Devi Ji Temple & Albert Hall. We start at the famous Jantar Mantar Observatory. Later, we visit the City Palace. Afternoon, we walk over to the Govind Dev Ji Temple in which is also in the City Palace Complex. Post that we visit the Albert Hall Museum to see Indian art, arms, jewels, and artefacts. It is a 5-10-minute drive from the Govind Dev Ji Temple. Late afternoon, we visit Chand Baori & Sisodia Rani ka Bagh Garden. Later, return to the Stay Facility, have dinner & Overnight stay at Jaipur.",
      meals: "Breakfast, Dinner",
      accommodation: "Jaipur",
    },
    {
      day: 3,
      title: "Jaipur – Pushkar – Jaipur",
      description:
        "Early Morning, depart to Pushkar. The distance is approx. 150 km & it takes roughly around 3&1/2 Hours of Drive. Have Breakfast Enroute. Reach Pushkar & visit the Pushkar Lake. It is also known as the Pushkar Sarovar. It has more than 50 bathing ghats is said to cleanse you of your sins. Later, visit the Brahma Temple. Situated beside the Pushkar Lake it is one of its kinds. The bird motif used in the place is unique one. The place is packed with architectural features. The pillared outdoor hall, stone slabs combined with molten lead in the inside, the marble steps are all very fascinating to the tourists. We then proceed to Savitri Temple. Located on the top of Ratnagiri Hills, the temple was built in 1687. It is said to be the place where Goddess Savitri rested for a while. Presently, Goddesses Savitri and Gayatri are being prayed in the temple. We then visit the Man Mahal Palace. This is the largest Royal residence in the town. The structure had been built beside the Sarovar Lake by Raja man Singh-1 as a retreat palace. The interiors of the palace are a treat to the visitors reflecting the Rajasthani elements combined with Mughal architecture. We end our exploration with a visit to the Pushkar Bazaar. Rose pulp, syrup and gulkand are sold here at reasonable rates. Handicraft items, embroidered fabrics, brass utensils, glass ware, leather bags made of camel skin, and belts and many more such unique items can be purchased in the bustling Pushkar Bazaar. Evening, we depart to back to Jaipur. We have Dinner enroute. Reach Jaipur and Overnight stay in Jaipur.",
      meals: "Breakfast, Dinner",
      accommodation: "Jaipur",
    },
    {
      day: 4,
      title: "Jaipur – Fort Excursions",
      description:
        "This Morning, rise early and leave for a full day sightseeing. Today You cover: Amer Fort, Nahargarh Forts, Jal mahal, Hawa mahal, Johri Bazaar. Depart at 7:30 am for Amer Fort (or Amber Fort), located in Amer, just outside the main city. Allow 2 hours here. Tip: try to reach there as early as possible to avoid crowds and people in your photos. In fact, we reached there even before the fort opened at 8 am to be among the first ones to enter. Later, Walk over to Panna Meena Kund for some good pictures in the stepwell. It's a 10-minute walk or 1 minute in a taxi from Amber Fort. Your next stop is at Nahargarh Fort, a 15-minute taxi drive away. If you haven't maxed out on beautiful forts, stop over to Nahargarh Fort and enjoy panoramic city views. It's a 15-minute drive between Amber Fort and Nahargarh Fort. Additionally, Jaipur Wax Museum and Nahargarh Step Well are only a 3-minute walk from Nahargarh Fort. Allow 2-3 hours at these sites. Have Lunch. These places have amazing Rajasthani Local Street food. Do taste it. Later Proceed on the 40-minute drive back to the city, stop by Jalmahal (The Water Palace) to click some beautiful shots of the floating palace. This won't take long, just ask your driver to stop for a few minutes. Later, visit one of the most important and exciting places in Jaipur, The Hawamahal (Palace of Winds). Many people simply marvel at it from the street, but you can also enter and check out the museum and incredible viewpoints from inside if you wish. Evening, head to Johri Bazaar for some shopping in Jaipur. This is a 10-minute walk from Hawa Mahal. If interested also visit Bapu Bazaar. We have dinner at a local restaurant & head back to the stay facility to have dinner. Overnight stay is in Jaipur.",
      meals: "Breakfast, Lunch, Dinner",
      accommodation: "Jaipur",
    },
    {
      day: 5,
      title: "Jaipur – Departure",
      description:
        "This morning, rise early, and leave for a short excursion to Galtaji Monkey Temple. Have Breakfast during the excursion. Return to the Stay facility, Check Out and leave for your return destination.",
      meals: "Breakfast",
      accommodation: "Departure",
    },
  ]

  const inclusions = [
    "Accommodation",
    "04 Breakfasts + 04 Dinners",
    "Guided Heritage Walk",
    "Excursion to Amer & Nahargarh",
    "Excursion to Pushkar",
    "All Sightseeing as per Itinerary",
  ]

  const exclusions = [
    "Any Expense of Personal Nature",
    "Meals other than Specified",
    "Entrance fees to the Monuments",
    "Anything that is not specifically mentioned in the Inclusions",
    "GST 5% Extra",
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={tourData.image || "/placeholder.svg"}
            alt={tourData.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 via-pink-800/60 to-orange-900/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="max-w-4xl text-white">
            <Badge className="bg-pink-600 hover:bg-pink-700 text-white mb-4 text-sm px-3 py-1">
              {tourData.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-poppins">{tourData.name}</h1>
            <p className="text-xl md:text-2xl mb-6 font-open-sans opacity-90">
              {tourData.duration} • {tourData.route}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{tourData.rating}</span>
                <span className="opacity-80">({tourData.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-pink-300" />
                <span>{tourData.groupSize}</span>
              </div>
              <Badge className="bg-red-600 text-white font-bold px-3 py-1">{tourData.discount}</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold">{tourData.price}</div>
              <div className="text-xl line-through opacity-60">{tourData.originalPrice}</div>
              <div className="text-sm opacity-80">per person</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tour Overview */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-pink-800 font-poppins">Tour Overview</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 font-open-sans">
                  Discover the royal heritage of Rajasthan with our Pink City tour that combines the majestic forts and
                  palaces of Jaipur with the spiritual serenity of Pushkar. Experience the grandeur of Rajput
                  architecture, explore ancient temples, and immerse yourself in the vibrant culture of the desert
                  state.
                </p>

                <h3 className="text-xl font-semibold mb-4 text-pink-700 font-poppins">Tour Highlights</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0" />
                      <span className="font-open-sans">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Itinerary */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-pink-800 font-poppins">Detailed Itinerary</h2>
                <div className="space-y-6">
                  {itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-pink-500 pl-6 pb-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-xl font-semibold text-pink-800 font-poppins">{day.title}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4 font-open-sans">{day.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-pink-600">
                          <span className="font-semibold">Meals:</span>
                          <span>{day.meals}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-pink-600">
                          <span className="font-semibold">Stay:</span>
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
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-700 font-poppins">Inclusions</h3>
                  <div className="space-y-3">
                    {inclusions.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-open-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-700 font-poppins">Exclusions</h3>
                  <div className="space-y-3">
                    {exclusions.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-open-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Important Information */}
            <Card className="border-0 shadow-lg bg-pink-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-pink-800 font-poppins">Important Information</h3>
                <div className="space-y-3 text-gray-700 font-open-sans">
                  <p>
                    <strong>Best Time to Visit:</strong> October to March for pleasant weather
                  </p>
                  <p>
                    <strong>What to Pack:</strong> Comfortable walking shoes, light cotton clothes, camera, sunscreen
                  </p>
                  <p>
                    <strong>Photography:</strong> Early morning visits to forts recommended for best lighting
                  </p>
                  <p>
                    <strong>Shopping:</strong> Pushkar and Jaipur bazaars offer authentic Rajasthani handicrafts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Booking Card */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-pink-50 to-orange-50">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-pink-800 mb-2">{tourData.price}</div>
                    <div className="text-lg line-through text-gray-500 mb-1">{tourData.originalPrice}</div>
                    <div className="text-sm text-gray-600">per person</div>
                    <Badge className="bg-red-600 text-white mt-2">{tourData.discount}</Badge>
                  </div>

                  <div className="space-y-4 mb-6">
                    <Button className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white font-semibold py-3">
                      Book Now
                    </Button>
                    <Button variant="outline" className="w-full border-pink-600 text-pink-600 hover:bg-pink-50">
                      Send Enquiry
                    </Button>
                  </div>

                  <div className="border-t pt-4 space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-pink-600" />
                      <span>{tourData.duration}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-pink-600" />
                      <span>{tourData.route}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-pink-600" />
                      <span>{tourData.groupSize}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 text-pink-800 font-poppins">Unique Experiences</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <Building className="h-4 w-4 text-pink-600" />
                      <span>Hawa Mahal & Amer Fort</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mountain className="h-4 w-4 text-pink-600" />
                      <span>Pushkar Sacred Lake</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Camera className="h-4 w-4 text-pink-600" />
                      <span>Royal Palaces & Bazaars</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 text-pink-800 font-poppins">Need Help?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-pink-600" />
                      <span className="text-sm">+91-9371131975</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-pink-600" />
                      <span className="text-sm">info@indicjourneys.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-pink-600" />
                      <span className="text-sm">24/7 Support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
