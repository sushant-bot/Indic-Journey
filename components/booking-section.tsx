"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles, CheckCircle } from "lucide-react"

export function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelers: "",
    duration: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const features = [
    "Free consultation with travel experts",
    "Customized itinerary planning",
    "24/7 support during your journey",
    "Best price guarantee",
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 text-base mb-6 font-bold rounded-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Start Your Journey
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-poppins">
                Ready to{" "}
                <span className="text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text">
                  Explore?
                </span>
              </h2>
              <p className="text-xl text-gray-600 font-open-sans leading-relaxed mb-8">
                Tell us about your dream destination and travel preferences. Our expert team will craft the perfect
                itinerary just for you.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-open-sans">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">50+</div>
                <div className="text-sm text-gray-600">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">4.9</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">Get Your Free Quote</h3>
                <p className="text-gray-600 font-open-sans">
                  Fill out the form and we'll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="h-12 border-2 border-gray-200 focus:border-orange-400 transition-colors rounded-lg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="h-12 border-2 border-gray-200 focus:border-orange-400 transition-colors rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone"
                      className="h-12 border-2 border-gray-200 focus:border-orange-400 transition-colors rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-sm font-semibold text-gray-700">
                      Destination
                    </Label>
                    <Select
                      value={formData.destination}
                      onValueChange={(value) => handleSelectChange("destination", value)}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-400 transition-colors rounded-lg">
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="kerala">Kerala</SelectItem>
                        <SelectItem value="himachal">Himachal Pradesh</SelectItem>
                        <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                        <SelectItem value="goa">Goa</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelers" className="text-sm font-semibold text-gray-700">
                      Number of Travelers
                    </Label>
                    <Select
                      value={formData.travelers}
                      onValueChange={(value) => handleSelectChange("travelers", value)}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-400 transition-colors rounded-lg">
                        <SelectValue placeholder="Select travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Person" : "People"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-sm font-semibold text-gray-700">
                      Duration
                    </Label>
                    <Select value={formData.duration} onValueChange={(value) => handleSelectChange("duration", value)}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-400 transition-colors rounded-lg">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3">1-3 Days</SelectItem>
                        <SelectItem value="4-7">4-7 Days</SelectItem>
                        <SelectItem value="8-14">8-14 Days</SelectItem>
                        <SelectItem value="15+">15+ Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                    Tell us about your preferences
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any specific requirements, interests, or questions..."
                    className="min-h-[120px] border-2 border-gray-200 focus:border-orange-400 transition-colors rounded-lg"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get My Free Quote
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
