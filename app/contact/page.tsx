"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Instagram, Facebook, Linkedin, Sparkles } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    tourType: "",
    travelers: "",
    destination: "",
    message: "",
  })

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Message Sent Successfully!",
          description: data.message,
          duration: 5000,
        })

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          tourType: "",
          travelers: "",
          destination: "",
          message: "",
        })
      } else {
        toast({
          title: "Failed to Send Message",
          description: data.message,
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      {/* Hero Section with Orange Gradient and Wave */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500"></div>

        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-20 h-20 bg-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 text-base mb-6 font-bold rounded-full border border-white/30">
              <Sparkles className="h-4 w-4 mr-2" />
              Get in Touch With Us
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-poppins drop-shadow-lg">Contact Us</h1>

            <p className="text-lg lg:text-xl mb-8 font-open-sans max-w-3xl mx-auto leading-relaxed opacity-95">
              Ready to start your journey? Get in touch with our travel experts and let us create the perfect experience
              for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919371131975">
                <Button className="bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700 px-8 py-3 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Call Now
                  <Phone className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="mailto:indicjourneys@gmail.com">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg rounded-full font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300"
                >
                  Email Us
                  <Mail className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-gray-50 w-full h-auto">
            <path d="M0,96L60,80C120,64,240,32,360,26.7C480,21,600,43,720,53.3C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Contact Form & Info with animated elements */}
      <section className="py-20 bg-gray-50 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-red-600/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-br from-yellow-400/20 to-red-600/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="shadow-2xl border-0 transform transition-all duration-300 hover:shadow-yellow-400/20 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-red-600 text-white p-6 rounded-t-lg">
                <CardTitle className="text-2xl font-bold font-poppins flex items-center">
                  <Send className="mr-3 h-6 w-6 text-white" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-base font-semibold text-gray-700">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-base font-semibold text-gray-700">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-semibold text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-semibold text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="tourType" className="text-base font-semibold text-gray-700">
                        Type of Inquiry *
                      </Label>
                      <Select
                        value={formData.tourType}
                        onValueChange={(value) => handleSelectChange("tourType", value)}
                      >
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors">
                          <SelectValue placeholder="Select type of inquiry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">Tour Booking</SelectItem>
                          <SelectItem value="customized">Customized Journey</SelectItem>
                          <SelectItem value="heritage">Heritage Walks</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="travelers" className="text-base font-semibold text-gray-700">
                        Number of Travelers
                      </Label>
                      <Select
                        value={formData.travelers}
                        onValueChange={(value) => handleSelectChange("travelers", value)}
                      >
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors">
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-base font-semibold text-gray-700">
                      Preferred Destination
                    </Label>
                    <Input
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="Where would you like to go?"
                      className="h-12 border-2 border-gray-200 focus:border-yellow-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-semibold text-gray-700">
                      Your Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your requirements or questions"
                      className="min-h-[150px] border-2 border-gray-200 focus:border-yellow-400 transition-colors"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 transition-all font-semibold text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-400 to-red-600 text-white overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 font-poppins">Get in Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Phone</h4>
                        <p className="opacity-90">+91 9371131975</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Email</h4>
                        <p className="opacity-90">indicjourneys@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Address</h4>
                        <p className="opacity-90">403 - Anandvan Residency, Lane A-31,</p>
                        <p className="opacity-90">Opp. Moti Bakery, Dhayari - 411041</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-white/20 p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Office Hours</h4>
                        <p className="opacity-90">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="opacity-90">Saturday: 10:00 AM - 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Card */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 font-poppins text-gray-800">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="bg-gradient-to-br from-yellow-400 to-red-600 p-4 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-110"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="bg-gradient-to-br from-yellow-400 to-red-600 p-4 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-110"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="bg-gradient-to-br from-yellow-400 to-red-600 p-4 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-110"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a
                      href="#"
                      className="bg-gradient-to-br from-yellow-400 to-red-600 p-4 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-110"
                    >
                      <MessageCircle className="h-6 w-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-40 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1 rounded-full inline-block mb-3">
              <Sparkles className="inline-block h-4 w-4 mr-1" /> Help Center
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-center font-poppins">
              Frequently Asked{" "}
              <span className="text-gradient bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our tours, booking process, and travel services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <Accordion type="single" defaultValue="item-1" className="space-y-4">
              <AccordionItem value="item-1" className="border-b border-gray-200 pb-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-yellow-600 transition-colors py-4 px-2">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 px-2">
                  We accept all major credit/debit cards, net banking, UPI, and bank transfers. All payments are
                  processed securely through our payment gateway with end-to-end encryption for your financial safety.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-gray-200 pb-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-yellow-600 transition-colors py-4 px-2">
                  How far in advance should I book my tour?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 px-2">
                  We recommend booking at least 30-60 days in advance for domestic tours and 60-90 days for
                  international tours to ensure availability, especially during peak seasons (October-March for most
                  Indian destinations).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-gray-200 pb-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-yellow-600 transition-colors py-4 px-2">
                  Can I customize an existing tour package?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 px-2">
                  We specialize in customized journeys. Contact our team with your requirements and we'll craft a
                  personalized itinerary just for you. We can modify any aspect of our existing packages or create
                  something entirely new based on your preferences.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-gray-200 pb-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-yellow-600 transition-colors py-4 px-2">
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 px-2">
                  Our cancellation policy varies depending on the tour and timing of cancellation. Generally,
                  cancellations made 30+ days before departure receive a higher refund percentage. Detailed cancellation
                  terms are provided at the time of booking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-gray-200 pb-2">
                <AccordionTrigger className="text-lg font-semibold hover:text-yellow-600 transition-colors py-4 px-2">
                  Do you provide assistance with visa applications?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4 px-2">
                  Yes, for international tours, we provide guidance and assistance with visa applications. While we
                  don't guarantee visa approval (as this is at the discretion of the embassy/consulate), we help prepare
                  the necessary documentation and guide you through the process.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Still have questions? Contact our support team</p>
              <Button className="bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-black font-semibold rounded-full px-6 py-2">
                Ask a Question
                <MessageCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
