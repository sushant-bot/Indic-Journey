"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function SimpleInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    duration: "",
    groupSize: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format WhatsApp message
    const whatsappNumber = "919371131975";
    const message = encodeURIComponent(`
*Quote Request from Website*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Destination: ${formData.destination || "Not specified"}
Duration: ${formData.duration || "Not specified"}
Group Size: ${formData.groupSize || "Not specified"}
Message: ${formData.message || "No additional message"}
    `);
    
    // Open WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    window.open(whatsappUrl, "_blank");
    
    // Mark form as submitted
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your inquiry has been submitted successfully. Our travel experts will contact you shortly.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-yellow-400 to-red-600 text-black hover:text-white"
          >
            Submit Another Inquiry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white rounded-2xl">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Your Free Quote</h2>
            <p className="text-gray-600">Fill out the form and we'll get back to you within 24 hours</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
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
                onChange={(e) => handleChange("email", e.target.value)}
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
                onChange={(e) => handleChange("phone", e.target.value)}
                className="mt-1 bg-blue-50 text-gray-900"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label htmlFor="destination" className="text-sm font-semibold text-gray-700">
                Destination
              </Label>
              <Select value={formData.destination} onValueChange={(value) => handleChange("destination", value)}>
                <SelectTrigger className="mt-1 bg-blue-50 text-gray-900">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Ladakh">Ladakh</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="groupSize" className="text-sm font-semibold text-gray-700">
                Number of Travelers
              </Label>
              <Select value={formData.groupSize} onValueChange={(value) => handleChange("groupSize", value)}>
                <SelectTrigger className="mt-1 bg-blue-50 text-gray-900">
                  <SelectValue placeholder="Select group size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 Person">1 Person</SelectItem>
                  <SelectItem value="2 People">2 People</SelectItem>
                  <SelectItem value="3-5 People">3-5 People</SelectItem>
                  <SelectItem value="6+ People">6+ People</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration" className="text-sm font-semibold text-gray-700">
                Duration
              </Label>
              <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
                <SelectTrigger className="mt-1 bg-blue-50 text-gray-900">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3 Days">1-3 Days</SelectItem>
                  <SelectItem value="4-7 Days">4-7 Days</SelectItem>
                  <SelectItem value="8-14 Days">8-14 Days</SelectItem>
                  <SelectItem value="15+ Days">15+ Days</SelectItem>
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
              onChange={(e) => handleChange("message", e.target.value)}
              className="mt-1 bg-blue-50 text-gray-900"
              rows={4}
              placeholder="Tell us about your interests, special requirements, or any specific places you'd like to visit..."
            />
          </div>

          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg py-6 font-semibold rounded-xl"
            >
              Get My Free Quote
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
