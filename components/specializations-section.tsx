"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Users, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function SpecializationsSection() {
  const specializations = [
    {
      id: "spiritual-journeys",
      title: "Spiritual Journeys",
      description: "Sacred temples, holy rivers, and divine experiences across India's spiritual heartlands",
      image: "/images/varanasi-ghats.jpg",
      destinations: ["Varanasi", "Rishikesh", "Haridwar", "Kedarnath"],
      tours: "15+ Tours",
      rating: 4.9,
      color: "from-orange-500 to-red-600",
      link: "/customized-holidays/varanasi",
    },
    {
      id: "heritage-culture",
      title: "Heritage & Culture",
      description: "Ancient forts, royal palaces, and UNESCO World Heritage sites",
      image: "/images/taj-mahal.png",
      destinations: ["Rajasthan", "Madhya Pradesh", "Odisha", "Karnataka"],
      tours: "20+ Tours",
      rating: 4.8,
      color: "from-blue-500 to-purple-600",
      link: "/fixed-departures/pink-city-jaipur-pushkar",
    },
    {
      id: "nature-wildlife",
      title: "Nature & Wildlife",
      description: "Pristine landscapes, exotic wildlife, and breathtaking natural wonders",
      image: "/images/kerala-backwaters-sunset.jpg",
      destinations: ["Kerala", "Himachal", "Northeast", "Andaman"],
      tours: "12+ Tours",
      rating: 4.7,
      color: "from-green-500 to-teal-600",
      link: "/fixed-departures/classic-kerala",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 text-base mb-6 font-bold rounded-full">
            <Sparkles className="h-4 w-4 mr-2" />
            Our Specializations
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-poppins">
            Discover{" "}
            <span className="text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text">
              India's Essence
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-open-sans leading-relaxed">
            From spiritual pilgrimages to royal heritage trails, we craft journeys that showcase India's incredible
            diversity and timeless beauty.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {specializations.map((spec, index) => (
            <Card
              key={spec.id}
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white overflow-hidden rounded-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={spec.image || "/placeholder.svg"}
                    alt={spec.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${spec.color} opacity-80`}></div>
                </div>

                {/* Floating Stats */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2 text-white">
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-bold">{spec.rating}</span>
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white">
                  <span className="text-sm font-bold">{spec.tours}</span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 font-poppins">{spec.title}</h3>
                  <p className="text-white/90 font-open-sans mb-4">{spec.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {spec.destinations.map((dest, idx) => (
                      <Badge key={idx} className="bg-white/20 text-white border-white/30 text-xs">
                        {dest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-open-sans">{spec.destinations.length} Destinations</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-open-sans">Group & Private</span>
                  </div>
                </div>

                <Link href={spec.link}>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold group/btn rounded-xl h-12">
                    Explore Tours
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6 font-open-sans">
            Can't find what you're looking for? Let us create a custom journey just for you.
          </p>
          <Link href="/customized-holidays">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Plan Custom Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
