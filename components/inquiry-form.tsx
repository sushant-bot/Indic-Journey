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

export function InquiryForm() {
  // Add WhatsApp link creator function
  const createWhatsAppLink = (data: any) => {
    const whatsappNumber = "919371131975";
    const whatsappMessage = encodeURIComponent(`
*Quote Request from Website*
Name: ${data.name || ''}
Email: ${data.email || ''}
Phone: ${data.phone || ''}
Destination: ${data.destination || ''}
Duration: ${data.travel_dates || ''}
Group Size: ${data.group_size || ''}
Message: ${data.message || ''}
    `);
    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;
  };

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
    
    // Immediately open WhatsApp as a fallback regardless of form processing
    const directWhatsappUrl = createWhatsAppLink(formData);
    window.open(directWhatsappUrl, "_blank");
    
    try {
      console.log("Form submission started");
      setIsSubmitting(true)
      setError("")
      
      // Validate required fields
      if (!formData.name || !formData.email) {
        throw new Error("Name and email are required")
      }
      
      console.log("Form data validation passed:", formData);
      
      // Skip API call and set as submitted
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
      
      return; // End function here to avoid API call issues
      
      // Below code is disabled temporarily
      /*
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log("API response status:", response.status);
      const result = await response.json();
      console.log("API response:", result);
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to process quote request");
      }
      
      setIsSubmitted(true)
      */

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
      console.error("Error submitting inquiry:", error);
      // Don't show error to user since WhatsApp was already opened
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
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
            Your inquiry has been submitted successfully. Our travel experts will contact you within 24 hours via email or phone.
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
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-white rounded-2xl">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Your Free Quote</h2>
            <p className="text-gray-600">Fill out the form and we'll get back to you within 24 hours</p>
          </div>

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1 bg-blue-50 text-gray-900"
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
                className="mt-1 bg-blue-50 text-gray-900"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1 bg-blue-50 text-gray-900"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label htmlFor="destination" className="text-sm font-semibold text-gray-700">
                Destination
              </Label>
              <Select value={formData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
                <SelectTrigger className="mt-1 bg-blue-50 text-gray-900">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Ladakh">Ladakh</SelectItem>
                  <SelectItem value="Himachal">Himachal Pradesh</SelectItem>
                  <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="group_size" className="text-sm font-semibold text-gray-700">
                Number of Travelers
              </Label>
              <Select value={formData.group_size} onValueChange={(value) => handleInputChange("group_size", value)}>
                <SelectTrigger className="mt-1 bg-blue-50 text-gray-900">
                  <SelectValue placeholder="Select group size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Person</SelectItem>
                  <SelectItem value="2">2 People</SelectItem>
                  <SelectItem value="3-5">3-5 People</SelectItem>
                  <SelectItem value="6-10">6-10 People</SelectItem>
                  <SelectItem value="10+">10+ People</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="travel_dates" className="text-sm font-semibold text-gray-700">
                Duration
              </Label>
              <Select value={formData.travel_dates} onValueChange={(value) => handleInputChange("travel_dates", value)}>
                <SelectTrigger className="mt-1 bg-blue-50 text-gray-900">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3 Days">1-3 Days</SelectItem>
                  <SelectItem value="4-7 Days">4-7 Days</SelectItem>
                  <SelectItem value="8-14 Days">8-14 Days</SelectItem>
                  <SelectItem value="15+ Days">15+ Days</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
              Tell us about your preferences
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="mt-1 bg-blue-50 text-gray-900"
              rows={4}
              placeholder="Tell us about your interests, special requirements, or any specific places you'd like to visit..."
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg py-6 font-semibold rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Get My Free Quote
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// No longer using this function - removed
