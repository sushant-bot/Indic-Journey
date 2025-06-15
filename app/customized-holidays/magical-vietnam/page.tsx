import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Phone, Mail, CheckCircle, XCircle, Plane, Star, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MagicalVietnamPage() {
  const itinerary = [
    {
      day: "Day 01",
      title: "Hanoi Arrival",
      description:
        "Upon arrival, you are met at the Noi Bai airport and transferred to the hotel by our driver (no guide). The official check-in time is 14:00. In the afternoon around 13:00, we start to visit the Ho Chi Minh Complex, including Ho Chi Minh's Mausoleum Complex (outside view only), and President Ho Chi Minh's stilt house. Keep walking around the poetry fishpond to the One Pillar Pagoda. Then we drive to the Temple of Literature - Confucius Temple and The first University of Vietnam. After visiting, travel through the Old Quarter - the 36 ancient streets in Cyclo for around 1 hour. Dinner in a local restaurant. Overnight at the hotel in Hanoi.",
    },
    {
      day: "Day 02",
      title: "Hanoi - Ninh Binh - Hoa Lu - Trang An - Hanoi",
      description:
        "Breakfast at the hotel. 08:00 Our tour guide will pick you up from your hotel. We take you to Ninh Binh province which is far from Hanoi city about 100 km. 10h15: The first destination in this trip is visiting Hoa Lu ancient capital. This is the first capital of Vietnam. Come to visit Hoa Lu, you will learn about why the capital was moved to Hanoi nowadays. 14h:15 Taking a boat excursion from Trang An wharf is a must-do activity in Ninh Binh, as it is the highlight of the journey. On the Trang An Tour, while you ride a bamboo boat through grottos filled with stunning stalactites, you'll be able to take in the breathtaking scenery. Get in the car and return to Hanoi. Overnight in Hanoi.",
    },
    {
      day: "Day 03",
      title: "Hanoi - Ha Long Bay - Overnight on Cruise",
      description:
        "Breakfast in hotel then check out. 8:30 Leave Hanoi for a 3-hour drive to Ha Long Bay. 11:45 -12:00 Arriving at Tuan Chau marina, transferred by tender of La Pandora cruises. 12:45 -13:00 Welcome aboard the cruise. Refresh with our welcome drink. Meet the captain, and crew in the cruise briefing, and safety instructions. 13:00 -13:15: A special lunch in Vietnamese cuisine of fresh seafood. 16:00 The Cruise sails through Lan Ha Bay. We progress to the Ong Cam Area of Lan Ha Bay- a separate part of Ha Long Bay. This is a quiet tourist paradise in Vietnam, enjoy kayaking and/or swimming in the crystal-clear waters of the Bay. 17:30 Back to Cruise, drop anchor for staying overnight. Enjoy a cooking demonstration and the complimentary Sunset Party on the sundeck with local wine and fresh fruit. 19:00 Dinner is served in the restaurant. Overnight on board.",
    },
    {
      day: "Day 04",
      title: "Ha Long Bay Cruise– Hanoi – Flight to Da Nang",
      description:
        "06:00 Enjoy sunrise and admire the never-ending miraculous scenery of the Bay. Practice an invigorating Tai Chi session on the sundeck. 07:00 Light breakfast, coffee and tea served. 08:00 Visit Dark & Bright Cave and islets by local rowing boats which is a wild and mysterious beauty in the middle of the World Heritage. 09:30 Back to our La Pandora Cruise, relax before checking out. 10:15: Join a cooking demonstration on the cruise. 10:45 Lunch is served on board. 12:00 Disembark at the Tuan Chau marina by tender. Take our shuttle bus to return to Hanoi. 14:00-14:30 Arrival back at your hotel. Continue to transfer to airport for flight to Da Nang, Upon arrival, pick up, check in, free time. Dinner at the restaurant. Overnight in Da Nang.",
    },
    {
      day: "Day 05",
      title: "Da Nang - Basket Boat at Coconut Forest - Hoi An Ancient Town - Da Nang",
      description:
        "Breakfast at the hotel and freely relax. Check out the hotel. 10:00. Pick up from hotel and depart for Cam Thanh, Hoian. You will go visit the ecosystem of the forest by basket boats, catching crabs, and snails and making toys from coconut leaves in around 30 minutes. Especially, you can also join the basket boat race, which will bring you a lot of wonderful experiences. Move to Hoi An ancient town, visit the Japanese Covered Bridge, Sa Huynh Cultural Museum, and Ancient House... walk around Lantern Street, and shop at Nguyen Hoang Night Market. Dinner in a local restaurant. Get on the car to back to Da Nang. Overnight in Da Nang.",
    },
    {
      day: "Day 06",
      title: "Da Nang - Bana Hills - Golden Bridge - Fantasy Park - Da Nang - Fight to Ho Chi Minh",
      description:
        "08:00 Meet your guide and driver to head to Ba Na Hills. Take Cable Car ride from Ba Na Hills station, stop at By Night station to visit Vong Nguyet Hills, Linh Ung Pagoda, The Old Villas of French. Continue moving up by cable car to the Nui Chua Mountain - the top of Ba Na range. You should not miss walking on the famous Golden Bridge hanging in the foggy hills of the mountain, witnessing the amazing and gorgeous view of Danang City. In the afternoon, free to join games in Fantasy Park - the third the biggest indoor games zone in Vietnam with a series of interesting games. 15:00 - 15:30 Transfer from Ba Na Hills to Danang Airport for your flight to Ho Chi Minh. On arrival, meet your driver in Ho Chi Minh and drive to the hotel in the city center. Check-in the hotel and relax. Dinner at the local restaurant. Overnight in Ho Chi Minh.",
    },
    {
      day: "Day 07",
      title: "Ho Chi Minh - Mekong Delta My Tho",
      description:
        "Breakfast at the hotel. 8:00 Leaving the hustle and bustle of Ho Chi Minh City and start your trip to depart for My Tho, the town lies on the left side of the Mekong River. Upon arrival, visit Vinh Trang pagoda which dated back to the late 19th century. Then boarding the sampan and cruising down the river around the four beautiful islands known as Dragon, Unicorn, Phoenix, and Tortoise Islands. Stop over at Unicorn Island, go walking around the country lane and see orchards, enjoy tropical fruits, folk song music performed by the local people. Visit the fruit plantation. Riding a hand-rowed sampan through Thoi Son canal and treat yourself in the beauty of the countryside, visit the family business, visit the honey-bee farm, enjoy honey tea and coconut candy workshop. In the afternoon, time for enjoying landscape around the Tan Thach village on xeloi (local tuk tuk), and meet the local villagers to experience the local daily life in the Mekong delta. 17.30 Return to Ho Chi Minh City. Overnight in Ho Chi Minh.",
    },
    {
      day: "Day 08",
      title: "Ho Chi Minh - Cu Chi Tunnels - Departure",
      description:
        "Breakfast in the hotel then check out. 8:00 Pick up at your hotel and depart for Cu Chi Tunnels will take approximately one and a half hours driving. Upon arrival, before exploring the tunnels, you will have a short introduction followed by an introductory video about how the tunnels were constructed and how the people survived in the harsh conditions of wartime. Then, spend your time exploring the remaining area and tunnel systems which included the special constructed living areas with kitchens, and bedrooms side by side with other martial facilities like storage, weapons factories, field hospitals, and command centers. Afterward, special tea and cassava (guerilla's food during the war) will be served. Break time for relaxation or time for those who want to try the real shooting gun. (Optional). Return to Saigon. 3.5 hours before your flight, transfer to the Tan Son Nhat airport for your departure flight.",
    },
  ]

  const highlights = [
    "Ninh Binh",
    "Hoi An",
    "Golden Bridge",
    "Bana Hills",
    "Ha Long Bay Cruise",
    "Basket Boat at Coconut Forest",
    "Mekong Delta",
    "Cu Chu Tunnels",
  ]

  const inclusions = [
    "03 Star Hotel Accommodation",
    "07 Breakfasts",
    "01 Lunch on Cruise + 01 Brunch on Cruise",
    "02 Dinners at Indian Restaurants + 01 Dinner on Cruise",
    "01 Overnight on Cruise in Ha Long Bay",
    "Cable Car Round Trip at Bana Hills",
    "Entrance fees for all visits as mentioned in the itinerary",
    "All Sightseeing on SIC Basis",
    "Experienced English-Speaking guide",
    "Sampan Boat Trip in Tam Coc",
    "Coconut Boat Ride at Hoi An",
    "01 Bottled Water Per Day during the Trip",
  ]

  const exclusions = [
    "Air Tickets",
    "Any Expense of Personal Nature",
    "Meals other than specified",
    "Compulsory Tips",
    "Anything that is not specifically mentioned in the Inclusions",
    "Vietnam E-Visa",
    "Travel Insurance",
    "5% GST + 5% TCS",
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/halong-bay.jpg" alt="Magical Vietnam" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-teal-900/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-emerald-100 text-emerald-800 px-4 py-1.5 text-sm font-semibold mb-6">
              <Plane className="h-4 w-4 mr-1 inline-block" />
              International Tour
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">Magical Vietnam</h1>

            <div className="flex flex-wrap gap-6 mb-8 text-white">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>07 Nights / 08 Days</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Hanoi – Ha Long Bay – Da Nang – Ho Chi Minh City</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Starting ₹74,999/- Per Person + Airfare</span>
              </div>
            </div>

            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              Discover the enchanting landscapes and rich culture of Vietnam from the bustling streets of Hanoi to the
              serene waters of Ha Long Bay and the historic charm of Hoi An.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 h-auto text-lg rounded-lg">
                Book Now
                <Phone className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-900 px-8 py-6 h-auto text-lg rounded-lg"
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
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
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
              Experience the best of Vietnam with our comprehensive 8-day journey through the country's most iconic
              destinations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {itinerary.map((day, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <CardTitle className="flex items-center text-emerald-800">
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
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 mx-auto"></div>
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
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore Vietnam?</h2>
            <p className="text-xl text-white/90 mb-8">
              Book your magical journey through the enchanting landscapes and rich culture of Vietnam!
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="text-4xl font-bold text-white mb-2">₹74,999/-</div>
              <div className="text-white/80">Per Person + Airfare at Actuals</div>
              <div className="text-sm text-white/70 mt-2">*Excluding GST & TCS</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto rounded-xl font-semibold">
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
