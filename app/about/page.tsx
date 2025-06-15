import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, Users, Star, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      title: "Authenticity",
      description:
        "We showcase the real India, beyond tourist clichés, connecting travelers with genuine local experiences.",
    },
    {
      title: "Sustainability",
      description: "We're committed to environmentally responsible travel and supporting local communities.",
    },
    {
      title: "Excellence",
      description: "We maintain the highest standards in service, accommodations, and experiences.",
    },
    {
      title: "Personalization",
      description: "We craft unique journeys tailored to individual preferences and interests.",
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold bg-yellow-400 text-orange-800 rounded-full">
            <span>Our Company</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the story behind India's premier travel experience curator, our mission, and the passionate team
            making your journeys unforgettable.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1440,37.3L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-yellow-400 font-semibold font-open-sans">OUR STORY</span>
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6">The Journey of Indic Journeys</h2>
              <div className="space-y-4 font-open-sans text-gray-700">
                <p>
                  Founded in 2010, Indic Journeys began with a simple vision: to share the extraordinary diversity, rich
                  heritage, and vibrant soul of India with travelers seeking authentic experiences.
                </p>
                <p>
                  What began as a small team of passionate travel enthusiasts has grown into one of India's most trusted
                  travel curators, with offices across India and a dedicated team of travel specialists, guides, and
                  local experts.
                </p>
                <p>
                  Through our journey, we've remained committed to our core belief that travel should be transformative,
                  connecting people not just to places, but to cultures, traditions, and the human stories that make
                  each destination special.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">15+</div>
                    <div className="text-sm text-gray-500">Years Experience</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">500+</div>
                    <div className="text-sm text-gray-500">Happy Travelers</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">4.5/5</div>
                    <div className="text-sm text-gray-500">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/about.jpeg"
                alt="The Indic Journeys Team"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-10 -right-10 bg-yellow-400 p-6 rounded-lg shadow-lg hidden lg:block">
                <div className="font-bold text-3xl text-black">12+</div>
                <div className="text-black">Destinations Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-yellow-400 font-semibold font-open-sans">OUR VALUES</span>
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6">What Guides Us</h2>
            <p className="max-w-3xl mx-auto text-gray-700 font-open-sans">
              At Indic Journeys, our core values shape every experience we create and every interaction we have with our
              travelers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white h-full"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-poppins">{value.title}</h3>
                  <p className="text-gray-600 font-open-sans flex-grow">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-yellow-400 to-red-600 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-poppins">Ready to Start Your Journey?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10 font-open-sans">
            Discover India's extraordinary destinations with our expertly crafted travel experiences.
          </p>
          <Link href="/tours">
            <Button className="bg-black hover:bg-gray-800 text-white text-lg px-8 py-6 rounded-lg font-semibold">
              Browse Our Tours
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  )
}
