import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Phone, Mail, CheckCircle, XCircle, Mountain, Star, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function WesternHimachalWithAmritsarPage() {
  const itinerary = [
    {
      day: "Day 01",
      title: "Amritsar",
      description:
        "Arrive at Amritsar. Pick up and Transfer to the Hotel. Fresh up and leave for Amritsar Sightseeing. Visit Jalianwala Bagh. Afternoon leave for Atari – Wagah Border to experience the Gate Closing Ceremony. Late evening return to the hotel, have dinner & Overnight stay at Amritsar.",
    },
    {
      day: "Day 02",
      title: "Amritsar – Dharamshala",
      description:
        "This morning, rise early and fresh up and visit the Golden Temple. Return to the Hotel and Have breakfast. Post Breakfast, depart to Dharamshala. Reach Dharamshala & Transfer to the hotel. Evening is free at Leisure. Have dinner and overnight stay at Dharamshala.",
    },
    {
      day: "Day 03",
      title: "Dharamshala",
      description:
        "This morning after breakfast take a local tour of Dharamshala. Visit Mcleodganj. Also known as upper Dharamshala this town is 14 Kms from Dharamshala. Visit The Buddhist Monastary & The Tibetian Museum. Also visit the Palace of His Holiness The Dalai Lama – Spiritual leader of the Tibetans. Evening return to the Hotel, have dinner & Overnight stay at Dharamshala.",
    },
    {
      day: "Day 04",
      title: "Dharamshala – Dalhousie",
      description:
        "Proceed to Dalhousie (135 kms / 5 – 6 Hrs) Dalhousie is built on and around five hills. Located on the western edge of the Dhauladhar mountain range of the Himalayas, Situated at 7250 feet above sea level. Visit Punjpula popular picnic spot on a stream. There is Samadhi of Shahid Ajit Singh who died on August 15, 1947. On the way to Punjpula are the seven springs of Satdhara, On the way is a popular spot called Subash Bowli. It is claimed that Netaji Subhash Chandra Bose spent many hours at this spot during is his sojourn in Dalhousie in 1937. Arrive at Dalhousie & transfer to the Hotel. Fresh up, have dinner & overnight stay at Dalhousie.",
    },
    {
      day: "Day 05",
      title: "Dalhousie – Khajjiar – Dalhousie",
      description:
        "This morning after breakfast proceed to Khajjiar (23 Kms). Khajjiar is officially proclaimed the mini-Switzerland of India. There are a few spots on the way from where a beautiful bird's eye-view of Khajjiar can be seen. If time permits also visit Chamba. Evening, return to the Hotel, have dinner & overnight stay at Dalhousie.",
    },
    {
      day: "Day 06",
      title: "Dalhousie – Amritsar",
      description:
        "Morning after breakfast, transfer to Amritsar. Reach Amritsar & Check into the Hotel. Evening is free for Leisure. You can visit Amritsar Market or also visit the Golden Temple again. Return to the Hotel, have dinner & Overnight stay at Amritsar.",
    },
    {
      day: "Day 07",
      title: "Amritsar – Return",
      description:
        "Morning, after breakfast, check out from the Hotel and Drop at the Station / Airport for Return Journey.",
    },
  ]

  const highlights = ["Golden Temple", "Dalai Lama Palace", "Khajjiar", "Subhash Bowli"]

  const inclusions = [
    "Accommodation",
    "06 Breakfasts",
    "06 Dinners",
    "Transfers & Sightseeing as per the Itinerary in Exclusive Vehicle",
    "All Toll, Parking & Driver Charges",
    "All Hotel Taxes",
  ]

  const exclusions = [
    "Train Fare or Airfare",
    "Any Expense of Personal Nature",
    "Entrance Fees to the monuments",
    "Meals other than Specified",
    "Anything that is not specifically mentioned in the Inclusions",
    "GST 5% Extra",
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/golden-temple.jpg" alt="Western Himachal with Amritsar" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-1.5 text-sm font-semibold mb-6">
              <Mountain className="h-4 w-4 mr-1 inline-block" />
              Adventure Tour
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Western Himachal with Amritsar
            </h1>

            <div className="flex flex-wrap gap-6 mb-8 text-white">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>06 Nights / 07 Days</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Amritsar – Dharamshala – Dalhousie – Amritsar</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Starting ₹29,999/- Per Person</span>
              </div>
            </div>

            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              Experience the Golden Temple and scenic beauty of Himachal Pradesh in this perfect blend of spirituality
              and mountain adventure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto text-lg rounded-lg">
                Book Now
                <Phone className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-6 h-auto text-lg rounded-lg"
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
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-blue-600 mx-auto mb-3" />
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
              Journey through the spiritual Golden Temple and the scenic hill stations of Himachal Pradesh.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {itinerary.map((day, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardTitle className="flex items-center text-blue-800">
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
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready for Himachal Adventure?</h2>
            <p className="text-xl text-white/90 mb-8">
              Book your spiritual and scenic journey through Punjab and Himachal Pradesh today!
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="text-4xl font-bold text-white mb-2">₹29,999/-</div>
              <div className="text-white/80">Per Person</div>
              <div className="text-sm text-white/70 mt-2">*Excluding GST</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto rounded-xl font-semibold">
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
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            Need assistance? Call us at{" "}
            <a href="tel:+91-9371131975" className="text-blue-600">
              +91-9371131975
            </a>
          </p>
        </div>
      </section>
    </MainLayout>
  )
}
