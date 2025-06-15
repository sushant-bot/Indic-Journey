"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelers: "",
    duration: "",
    message: "",
    travelDate: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Construct message for WhatsApp
      const message = `
Hello! I'd like to request a quote for my trip:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Destination: ${formData.destination}
- Number of Travelers: ${formData.travelers}
- Duration: ${formData.duration}
- Travel Date: ${formData.travelDate}
- Additional Info: ${formData.message}
      `.trim()
        // Open WhatsApp with pre-filled message
      // Using the WhatsApp number from environment variable or a fallback
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919XXXXXXXXX" // Replace with your WhatsApp number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
      
      // Send the data to your API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send email')
      }
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        travelers: "",
        duration: "",
        message: "",
        travelDate: "",
      })
      
      alert("Your quote request has been sent successfully!")
    } catch (error) {
      console.error("Error sending form:", error)
      alert("There was an error sending your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Your Personalized Quote</h3>
          <p className="text-gray-600">
            Tell us about your dream trip and we'll get back to you within 24 hours
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-colors rounded-lg"
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
                className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-colors rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-colors rounded-lg"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm font-semibold text-gray-700">
                Destination *
              </Label>
              <Select
                value={formData.destination}
                onValueChange={(value) => handleSelectChange("destination", value)}
                required
              >
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-colors rounded-lg">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="kerala">Kerala</SelectItem>
                  <SelectItem value="himachal">Himachal Pradesh</SelectItem>
                  <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                  <SelectItem value="goa">Goa</SelectItem>
                  <SelectItem value="golden-triangle">Golden Triangle</SelectItem>
                  <SelectItem value="varanasi">Varanasi</SelectItem>
                  <SelectItem value="ladakh">Ladakh</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="travelers" className="text-sm font-semibold text-gray-700">
                Number of Travelers *
              </Label>
              <Select
                value={formData.travelers}
                onValueChange={(value) => handleSelectChange("travelers", value)}
                required
              >
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-colors rounded-lg">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map((num) => (
                    <SelectItem key={num.toString()} value={num.toString()}>
                      {num} {num === 1 ? "Person" : "People"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-semibold text-gray-700">
                Duration *
              </Label>
              <Select 
                value={formData.duration} 
                onValueChange={(value) => handleSelectChange("duration", value)}
                required
              >
                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-colors rounded-lg">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3 days">1-3 Days</SelectItem>
                  <SelectItem value="4-7 days">4-7 Days</SelectItem>
                  <SelectItem value="8-14 days">8-14 Days</SelectItem>
                  <SelectItem value="15+ days">15+ Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="travelDate" className="text-sm font-semibold text-gray-700">
                Travel Date
              </Label>
              <Input
                id="travelDate"
                name="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={handleInputChange}
                className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-colors rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
              Additional Information
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Any specific requirements, interests, budget constraints, or questions..."
              className="min-h-[120px] border-2 border-gray-200 focus:border-blue-400 transition-colors rounded-lg"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Request My Free Quote"}
            <Send className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
