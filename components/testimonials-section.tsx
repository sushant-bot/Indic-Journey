"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Testimonial {
  id: number
  name: string
  location: string
  tour: string
  text: string
  rating: number
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .eq("enabled", true)
          .order("created_at", { ascending: false })
          .limit(8)

        if (error) {
          console.error("Error loading testimonials:", error)
          setTestimonials(getOriginalTestimonials())
        } else if (data && data.length > 0) {
          setTestimonials(data.slice(0, 7))
        } else {
          setTestimonials(getOriginalTestimonials())
        }
      } catch (error) {
        console.error("Error:", error)
        setTestimonials(getOriginalTestimonials())
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  function getOriginalTestimonials(): Testimonial[] {
    return [
      {
        id: 1,
        name: "Dr. Amy Light",
        location: "USA",
        tour: "Rajasthan 10 Day Tour",
        text: "I am pleased to write the highest recommendation for Indic Journeys and it's founder Mayur Kunte. I'm American and this was my fourth visit to India. I was amazed how much easier travel was with Mayur's help. His quality of services was truly amazing. My Rajasthan trip was so much better and easier than if I'd done it without his help.",
        rating: 5,
      },
      {
        id: 2,
        name: "Dr. Amy Light",
        location: "USA",
        tour: "Pune Heritage Walk",
        text: "Based on her prior excellent history with Indic tours, we booked a Pune Heritage Walk tour with Mayur Kunte. Mayur showed us many local sites that we might have otherwise missed. He has an encyclopedic knowledge of, and a passion for, Indian history. Our tour with him was amazing.",
        rating: 5,
      },
      {
        id: 3,
        name: "Mr. Uday Gosavi",
        location: "Pune",
        tour: "Gujarat Glimpse Tour",
        text: "Mayur, a big thank you for organising a seamless and stress free trip. No glitches anywhere. Thank you once again.",
        rating: 5,
      },
      {
        id: 4,
        name: "Vaishali & Rohit Jail",
        location: "India",
        tour: "Kazakhstan Tour",
        text: "We visited Almaty, Kazakhstan. The entire trip was booked through Indic Journeys. We were extremely pleased with the travel stay and entire local site seeing arranged by them. Couple of unseen issues were very promptly and professionally handled. We highly recommend them.",
        rating: 5,
      },
      {
        id: 5,
        name: "Dr. Vinaya Bhagwat and Group",
        location: "India",
        tour: "Cambodia - Laos - Vietnam Tour",
        text: "We had wonderful trip to Cambodia, Laos and Vietnam. I am grateful for your patience, hospitality and kindness in looking after us during our journey. It was great relief to have constant back up of Mayur on WhatsApp. It gave me peace of mind.",
        rating: 5,
      },
      {
        id: 6,
        name: "Brigadier (Retd.) Dr. Rajeev Joshi",
        location: "Pune",
        tour: "Nepal Tour",
        text: "Thanks Indic Journeys for a meticulously planned memorable Nepal trip. Looking forward for more tours 🙏🏻",
        rating: 5,
      },
      {
        id: 7,
        name: "Mrs. Mrudula Kathale",
        location: "Pune",
        tour: "Pune Heritage Walk",
        text: "It was the 2nd of March when we met Mayur Kunte for a Heritage Walk. The joy of understanding rich history behind each one was truly overwhelming. He walked us through the history with such an ease as if all of us travelled to that era. We would like to go on such a wonderful journey with Mayur again and again.",
        rating: 5,
      },
    ]
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-3 font-['Poppins']">What Our Travelers Say</h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto font-['Open_Sans']">
            Real experiences from our valued customers who have journeyed with us
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300 h-full">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-4 font-['Open_Sans'] italic text-sm flex-grow">"{testimonial.text}"</p>

                <div className="border-t pt-3 mt-auto">
                  <div className="font-semibold text-black text-sm">{String(testimonial.name)}</div>
                  <div className="text-xs text-gray-600">{String(testimonial.location)}</div>
                  <div className="text-xs text-red-600 font-medium mt-1">{String(testimonial.tour)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="inline-flex items-center space-x-2 bg-yellow-400 px-5 py-2 rounded-full">
            <Star className="h-4 w-4 fill-black text-black" />
            <span className="font-semibold text-black text-sm">4.9</span>
            <span className="text-black">•</span>
            <span className="text-black text-sm">500+ Happy Travelers</span>
          </div>
        </div>
      </div>
    </section>
  )
}
