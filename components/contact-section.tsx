"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      travelInterest: formData.get("travelInterest"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Message Sent !",
          description: "Thank you for your inquiry. We'll get back to you soon.",
        })
        e.currentTarget.reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const offices = [
    {
      title: "Head Office - Pune",
      address: "403 - Anandvan Residency, Lane A-31, Opp. Moti Bakery, Dhayari - 411041",
      phone: "+91-9371131975 / +91-9860630123",
      email: "indicjourneys@gmail.com",
    },
  ]

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 sm:mb-20">
          <Badge className="bg-gradient-to-r from-yellow-400 to-red-600 text-black px-6 py-2 text-base mb-6 font-bold rounded-full shadow-lg">
            Contact Us
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 font-['Poppins']">Get In Touch</h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-['Open_Sans'] leading-relaxed">
            Ready to start your journey? Contact us today and let's plan your perfect travel experience together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Contact Form */}
          <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="p-6 sm:p-8 bg-gradient-to-r from-yellow-400 to-red-600">
              <CardTitle className="text-xl sm:text-2xl font-bold text-black font-['Poppins'] flex items-center">
                <Send className="mr-3 h-6 w-6" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-bold text-gray-700 mb-3">First Name</label>
                    <Input
                      name="firstName"
                      placeholder="Your first name"
                      required
                      className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors rounded-xl text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-bold text-gray-700 mb-3">Last Name</label>
                    <Input
                      name="lastName"
                      placeholder="Your last name"
                      required
                      className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors rounded-xl text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-bold text-gray-700 mb-3">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors rounded-xl text-base"
                  />
                </div>

                <div>
                  <label className="block text-base font-bold text-gray-700 mb-3">Phone</label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX / +91 XXXXX XXXXX"
                    required
                    className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors rounded-xl text-base"
                  />
                </div>

                <div>
                  <label className="block text-base font-bold text-gray-700 mb-3">Travel Interest</label>
                  <Input
                    name="travelInterest"
                    placeholder="e.g., Kerala Backwaters, Golden Triangle"
                    className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors rounded-xl text-base"
                  />
                </div>

                <div>
                  <label className="block text-base font-bold text-gray-700 mb-3">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your travel plans and preferences..."
                    rows={5}
                    required
                    className="border-2 border-gray-200 focus:border-yellow-400 transition-colors rounded-xl text-base resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-3 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Office Locations */}
          <div className="space-y-8">
            <div className="mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-6 font-['Poppins']">Our Office</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-base font-medium">Mon - Sat: 9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-base font-medium">Sunday: 10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            {offices.map((office, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-shadow duration-300 rounded-2xl border-0 shadow-lg"
              >
                <CardContent className="p-6 sm:p-8">
                  <h4 className="font-bold text-xl text-black mb-6 font-['Poppins']">{office.title}</h4>

                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-6 w-6 mt-0.5 flex-shrink-0 text-red-500" />
                      <span className="text-base font-medium">{office.address}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-6 w-6 text-green-500" />
                      <a
                        href={`tel:${office.phone}`}
                        className="text-base font-medium hover:text-yellow-600 transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-6 w-6 text-blue-500" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-base font-medium hover:text-yellow-600 transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Contact */}
            <Card className="bg-gradient-to-r from-yellow-50 to-red-50 border-2 border-yellow-200 rounded-2xl shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h4 className="font-bold text-xl text-black mb-6 font-['Poppins']">Quick Contact</h4>
                <div className="space-y-4">
                  <a
                    href="tel:+919371131975"
                    className="flex items-center space-x-3 text-gray-700 hover:text-yellow-600 transition-colors group"
                  >
                    <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="text-base font-bold">Call: +91-9371131975 / +91-9860630123</span>
                  </a>
                  <a
                    href="mailto:indicjourneys@gmail.com"
                    className="flex items-center space-x-3 text-gray-700 hover:text-yellow-600 transition-colors group"
                  >
                    <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="text-base font-bold">Email: indicjourneys@gmail.com</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
