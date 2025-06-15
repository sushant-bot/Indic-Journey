"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Users, DollarSign, Send, CheckCircle } from "lucide-react"
import { createInquiry } from "@/lib/supabase-queries"

export function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tour_type: "",
    destination: "",
    travel_dates: "",
    group_size: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Validate required fields
      if (!formData.name || !formData.email) {
        throw new Error("Name and email are required")
      }

      // Create inquiry in Supabase
      const inquiry = await createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        tour_type: formData.tour_type || undefined,
        destination: formData.destination || undefined,
        travel_dates: formData.travel_dates || undefined,
        group_size: formData.group_size ? Number.parseInt(formData.group_size) : undefined,
        budget: formData.budget || undefined,
        message: formData.message || undefined,
      })

      if (!inquiry) {
        throw new Error("Failed to submit inquiry")
      }

      setIsSubmitted(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        tour_type: "",
        destination: "",
        travel_dates: "",
        group_size: "",
        budget: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting inquiry:", error)
      setError(error instanceof Error ? error.message : "Failed to submit inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your inquiry has been submitted successfully. Our travel experts will contact you within 24 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-yellow-400 to-red-600 text-black hover:text-white"
          >
            Submit Another Inquiry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="bg-gradient-to-r from-yellow-400 to-red-600 text-black">
        <CardTitle className="text-2xl font-bold text-center">Plan Your Perfect Journey</CardTitle>
        <p className="text-center opacity-90">Tell us about your dream trip and we'll create a customized itinerary</p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="mt-1"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Travel Preferences */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-gray-700 flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-yellow-500" />
                Tour Type
              </Label>
              <Select value={formData.tour_type} onValueChange={(value) => handleInputChange("tour_type", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select tour type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed-departure">Fixed Departure</SelectItem>
                  <SelectItem value="customized">Customized Holiday</SelectItem>
                  <SelectItem value="heritage-walk">Heritage Walk</SelectItem>
                  <SelectItem value="spiritual">Spiritual Journey</SelectItem>
                  <SelectItem value="adventure">Adventure Tour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="destination" className="text-sm font-semibold text-gray-700">
                Preferred Destination
              </Label>
              <Input
                id="destination"
                type="text"
                value={formData.destination}
                onChange={(e) => handleInputChange("destination", e.target.value)}
                className="mt-1"
                placeholder="e.g., Rajasthan, Kerala, Ladakh"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="travel_dates" className="text-sm font-semibold text-gray-700 flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-yellow-500" />
                Travel Dates
              </Label>
              <Input
                id="travel_dates"
                type="text"
                value={formData.travel_dates}
                onChange={(e) => handleInputChange("travel_dates", e.target.value)}
                className="mt-1"
                placeholder="e.g., March 2024 or Flexible"
              />
            </div>
            <div>
              <Label htmlFor="group_size" className="text-sm font-semibold text-gray-700 flex items-center">
                <Users className="h-4 w-4 mr-1 text-yellow-500" />
                Group Size
              </Label>
              <Select value={formData.group_size} onValueChange={(value) => handleInputChange("group_size", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Number of travelers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Person</SelectItem>
                  <SelectItem value="2">2 People</SelectItem>
                  <SelectItem value="3">3 People</SelectItem>
                  <SelectItem value="4">4 People</SelectItem>
                  <SelectItem value="5">5 People</SelectItem>
                  <SelectItem value="6">6+ People</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="budget" className="text-sm font-semibold text-gray-700 flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-yellow-500" />
              Budget Range
            </Label>
            <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-25k">Under ₹25,000</SelectItem>
                <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="100k-200k">₹1,00,000 - ₹2,00,000</SelectItem>
                <SelectItem value="above-200k">Above ₹2,00,000</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
              Additional Requirements
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="mt-1"
              rows={4}
              placeholder="Tell us about your interests, special requirements, or any specific places you'd like to visit..."
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-black hover:text-white text-lg py-6 font-semibold"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Inquiry
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
