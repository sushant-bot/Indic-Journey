"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Users, Building, MapPin, Star, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getTours } from "@/lib/supabase-queries"
import type { Tour } from "@/lib/supabase"

export function CategoriesSection() {
  const [fixedDepartureTours, setFixedDepartureTours] = useState<Tour[]>([])
  const [customizedTours, setCustomizedTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const [fixedTours, customTours] = await Promise.all([
          getTours({ tour_type: "fixed-departure", enabled: true }),
          getTours({ tour_type: "customized", enabled: true }),
        ])

        setFixedDepartureTours(fixedTours.slice(0, 3)) // Show top 3
        setCustomizedTours(customTours.slice(0, 3)) // Show top 3
      } catch (error) {
        console.error("Error fetching tours:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  const categories = [
    {
      id: "fixed-departures",
      title: "Fixed Departures",
      description: "Join our scheduled group tours with guaranteed departures",
      image: "/images/fixed-departures.png",
      icon: Calendar,
      color: "from-blue-600 to-blue-800",
      tours: fixedDepartureTours,
      link: "/fixed-departures",
    },
    {
      id: "customized-holidays",
      title: "Customized Holidays",
      description: "Tailor-made journeys designed just for you",
      image: "/images/customized-holidays.png",
      icon: Users,
      color: "from-green-600 to-green-800",
      tours: customizedTours,
      link: "/customized-holidays",
    },
    {
      id: "heritage-walks",
      title: "Heritage Walks",
      description: "Discover the rich cultural heritage of Pune",
      image: "/images/heritage-walks.png",
      icon: Building,
      color: "from-yellow-600 to-orange-600",
      tours: [],
      link: "/heritage-walks",
      subcategories: [
        {
          name: "Old Pune Heritage Walk",
          link: "/heritage-walks/old-pune",
          description: "Historic Pune exploration",
          tours: "Daily Walks",
        },
        {
          name: "Temple Tour of Pune",
          link: "/heritage-walks/temple-tour",
          description: "Sacred temples journey",
          tours: "Spiritual Tours",
        },
        {
          name: "Museums of Pune",
          link: "/heritage-walks/museums",
          description: "Cultural museum visits",
          tours: "Educational Tours",
        },
      ],
    },
  ]

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-128 mx-auto animate-pulse"></div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
            Explore Our <span className="text-yellow-500">Travel Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans">
            Choose from our diverse range of travel experiences, from fixed group departures to personalized journeys
            and cultural heritage walks.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[16/10] relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                </div>

                {/* Category Icon */}
                <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Category Title */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2 font-poppins">{category.title}</h3>
                  <p className="text-white/90 font-open-sans">{category.description}</p>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Show tours for fixed departures and customized holidays */}
                  {category.tours && category.tours.length > 0
                    ? category.tours.map((tour) => (
                        <Link key={tour.id} href={`/tours/${tour.slug}`}>
                          <div className="group/tour flex items-center justify-between p-4 bg-gray-50 hover:bg-yellow-50 rounded-lg transition-all duration-300 cursor-pointer border hover:border-yellow-300">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900 group-hover/tour:text-yellow-600 transition-colors font-poppins">
                                  {tour.title}
                                </h4>
                                {tour.discount && (
                                  <Badge variant="destructive" className="text-xs">
                                    {tour.discount}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {tour.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {tour.duration}
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{tour.rating}</span>
                                  <span className="text-xs text-gray-500">({tour.reviews} reviews)</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-green-600">{tour.price}</div>
                                  {tour.original_price && (
                                    <div className="text-xs text-gray-500 line-through">{tour.original_price}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover/tour:text-yellow-600 group-hover/tour:translate-x-1 transition-all duration-300 ml-4" />
                          </div>
                        </Link>
                      ))
                    : category.subcategories
                      ? // Show subcategories for heritage walks
                        category.subcategories.map((sub, idx) => (
                          <Link key={idx} href={sub.link}>
                            <div className="group/sub flex items-center justify-between p-4 bg-gray-50 hover:bg-yellow-50 rounded-lg transition-all duration-300 cursor-pointer border hover:border-yellow-300">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 group-hover/sub:text-yellow-600 transition-colors font-poppins">
                                  {sub.name}
                                </h4>
                                <p className="text-sm text-gray-600 font-open-sans">{sub.description}</p>
                                <Badge variant="outline" className="mt-2 text-xs">
                                  {sub.tours}
                                </Badge>
                              </div>
                              <ArrowRight className="h-5 w-5 text-gray-400 group-hover/sub:text-yellow-600 group-hover/sub:translate-x-1 transition-all duration-300" />
                            </div>
                          </Link>
                        ))
                      : null}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Link href={category.link}>
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-black hover:text-white font-semibold group/btn">
                      View All {category.title}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2 font-poppins">
              {fixedDepartureTours.length + customizedTours.length}+
            </div>
            <div className="text-gray-600 font-open-sans">Tour Packages</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2 font-poppins">1000+</div>
            <div className="text-gray-600 font-open-sans">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2 font-poppins">25+</div>
            <div className="text-gray-600 font-open-sans">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2 font-poppins">5+</div>
            <div className="text-gray-600 font-open-sans">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}
