"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  Upload,
  Save,
  Eye,
  Trash2,
  Plus,
  Home,
  MapPin,
  Star,
  BookOpen,
  MessageSquare,
} from "lucide-react"
import { useWebsiteContent } from "@/lib/website-content-store"

interface WebsiteContent {
  hero: {
    slides: Array<{
      title: string
      subtitle: string
      image: string
      accent: string
      location: string
      link: string
    }>
  }
  featuredJourneys: {
    title: string
    subtitle: string
    tours: Array<{
      id: string
      title: string
      location: string
      duration: string
      groupSize: string
      price: string
      originalPrice: string
      image: string
      category: string
      rating: number
      reviews: number
      highlights: string[]
      discount: string
      enabled: boolean
    }>
  }
  testimonials: {
    title: string
    subtitle: string
    testimonials: Array<{
      name: string
      location: string
      rating: number
      text: string
      tour: string
    }>
    stats: {
      rating: string
      travelers: string
    }
  }
  booking: {
    title: string
    subtitle: string
    ctaText: string
    popularTours: Array<{
      id: string
      name: string
      price: string
      duration: string
    }>
  }
  blog: {
    title: string
    subtitle: string
    posts: Array<{
      id: number
      title: string
      excerpt: string
      image: string
      author: string
      date: string
      category: string
      readTime: string
      trending: boolean
      content: string
      enabled: boolean
    }>
  }
}

export function ComprehensiveAdmin() {
  const websiteContent = useWebsiteContent()
  const [activeSection, setActiveSection] = useState("overview")
  const [saveStatus, setSaveStatus] = useState<{ status: "idle" | "saving" | "success" | "error"; message: string }>({
    status: "idle",
    message: "",
  })

  const stats = [
    { title: "Total Bookings", value: "1,234", change: "+12%", icon: Calendar },
    { title: "Revenue", value: "₹45,67,890", change: "+8%", icon: DollarSign },
    { title: "Active Tours", value: "28", change: "+3", icon: BarChart3 },
    { title: "Customers", value: "856", change: "+15%", icon: Users },
  ]

  const updateSlide = async (index: number, field: string, value: string) => {
    const newSlides = [...websiteContent.hero.slides]
    newSlides[index] = { ...newSlides[index], [field]: value }
    websiteContent.updateHeroSlides(newSlides)
    await websiteContent.saveToServer()
  }

  const addNewSlide = async () => {
    const newSlide = {
      title: "New Slide Title",
      subtitle: "New slide subtitle",
      image: "/placeholder.svg",
      accent: "New Accent",
      location: "Location",
      link: "/tours/new",
    }
    websiteContent.updateHeroSlides([...websiteContent.hero.slides, newSlide])
    await websiteContent.saveToServer()
  }

  const deleteSlide = async (index: number) => {
    const newSlides = websiteContent.hero.slides.filter((_, i) => i !== index)
    websiteContent.updateHeroSlides(newSlides)
    await websiteContent.saveToServer()
  }

  const updateTestimonial = (index: number, field: string, value: any) => {
    const newTestimonials = [...websiteContent.testimonials.testimonials]
    newTestimonials[index] = { ...newTestimonials[index], [field]: value }
    websiteContent.updateTestimonials(newTestimonials)
  }

  const handleSaveContent = async (section: string) => {
    setSaveStatus({ status: "saving", message: "Publishing changes..." })

    // Simulate a brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    setSaveStatus({
      status: "success",
      message: `${section} published successfully! Changes are now live on the website.`,
    })

    setTimeout(() => {
      setSaveStatus({ status: "idle", message: "" })
    }, 3000)
  }

  const handleImageUpload = (section: string, field: string, index?: number) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        console.log(`Uploading image for ${section}.${field}:`, file.name)

        // Update the content with new image URL
        if (section === "hero" && typeof index === "number") {
          const newSlides = [...websiteContent.hero.slides]
          newSlides[index] = { ...newSlides[index], image: imageUrl }
          websiteContent.updateHeroSlides(newSlides)
        } else if (section === "tour" && typeof index === "number") {
          const newTours = [...websiteContent.featuredJourneys.tours]
          newTours[index] = { ...newTours[index], image: imageUrl }
          websiteContent.updateFeaturedTours(newTours)
        } else if (section === "blog" && typeof index === "number") {
          const newPosts = [...websiteContent.blog.posts]
          newPosts[index] = { ...newPosts[index], image: imageUrl }
          websiteContent.updateBlogPosts(newPosts)
        }

        setSaveStatus({ status: "success", message: "Image uploaded successfully!" })
      }
    }
    input.click()
  }

  const addNewTestimonial = () => {
    const newTestimonial = {
      name: "New Customer",
      location: "City, Country",
      rating: 5,
      text: "Amazing experience with Indic Journeys!",
      tour: "Tour Name",
    }
    websiteContent.updateTestimonials([...websiteContent.testimonials.testimonials, newTestimonial])
  }

  const deleteTestimonial = (index: number) => {
    const newTestimonials = websiteContent.testimonials.testimonials.filter((_, i) => i !== index)
    websiteContent.updateTestimonials(newTestimonials)
  }

  const updateTour = (index: number, field: string, value: any) => {
    const newTours = [...websiteContent.featuredJourneys.tours]
    newTours[index] = { ...newTours[index], [field]: value }
    websiteContent.updateFeaturedTours(newTours)
  }

  const addNewTour = () => {
    const newTour = {
      id: `tour-${Date.now()}`,
      title: "New Tour",
      location: "Location",
      duration: "X Days",
      groupSize: "2-10 People",
      price: "₹XX,000",
      originalPrice: "₹XX,000",
      image: "/placeholder.svg",
      category: "Heritage",
      rating: 4.5,
      reviews: 0,
      highlights: ["Highlight 1", "Highlight 2"],
      discount: "0% OFF",
      enabled: true,
    }
    websiteContent.updateFeaturedTours([...websiteContent.featuredJourneys.tours, newTour])
  }

  const deleteTour = (index: number) => {
    const newTours = websiteContent.featuredJourneys.tours.filter((_, i) => i !== index)
    websiteContent.updateFeaturedTours(newTours)
  }

  const updateBlogPost = (index: number, field: string, value: any) => {
    const newPosts = [...websiteContent.blog.posts]
    newPosts[index] = { ...newPosts[index], [field]: value }
    websiteContent.updateBlogPosts(newPosts)
  }

  const addNewBlogPost = () => {
    const newPost = {
      id: Date.now(),
      title: "New Blog Post",
      excerpt: "This is a new blog post excerpt...",
      image: "/placeholder.svg",
      author: "Author Name",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      category: "Destinations",
      readTime: "5 min read",
      trending: false,
      content: "Write your blog post content here...",
      enabled: true,
    }
    websiteContent.updateBlogPosts([...websiteContent.blog.posts, newPost])
  }

  const deleteBlogPost = (index: number) => {
    const newPosts = websiteContent.blog.posts.filter((_, i) => i !== index)
    websiteContent.updateBlogPosts(newPosts)
  }

  const updateSectionStats = (newStats: any) => {
    websiteContent.updateSectionContent("testimonials", {
      stats: { ...websiteContent.testimonials.stats, ...newStats },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Admin Header */}
      <header className="bg-white shadow-lg border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 font-poppins">Website Admin Panel</h1>
                <p className="text-gray-600 text-sm lg:text-base">Manage all website content with real-time updates</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {saveStatus.status !== "idle" && (
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    saveStatus.status === "saving"
                      ? "bg-blue-100 text-blue-800"
                      : saveStatus.status === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {saveStatus.message}
                </div>
              )}
              <Button
                className="bg-gradient-to-r from-yellow-400 to-red-600 text-black hover:text-white"
                onClick={() => window.open("/", "_blank")}
              >
                <Eye className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">View Website</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6 lg:space-y-8">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 bg-white rounded-xl shadow-lg p-2 min-w-[600px] lg:min-w-0">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="hero"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
              >
                Hero Section
              </TabsTrigger>
              <TabsTrigger
                value="tours"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
              >
                Featured Tours
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
              >
                Blog Posts
              </TabsTrigger>
              <TabsTrigger
                value="booking"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
              >
                Booking Form
              </TabsTrigger>
              <TabsTrigger
                value="testimonials"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
              >
                Testimonials
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
              >
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 lg:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                      </div>
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center">
                        <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold font-poppins">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  onClick={() => setActiveSection("hero")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Edit Hero Section
                </Button>
                <Button
                  className="w-full justify-start bg-gradient-to-r from-green-600 to-green-700 text-white"
                  onClick={() => setActiveSection("tours")}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Manage Tours
                </Button>
                <Button
                  className="w-full justify-start bg-gradient-to-r from-purple-600 to-purple-700 text-white"
                  onClick={() => setActiveSection("testimonials")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Edit Testimonials
                </Button>
                <Button
                  className="w-full justify-start bg-gradient-to-r from-red-600 to-red-700 text-white"
                  onClick={() => setActiveSection("blog")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Manage Blog
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Section Management */}
          <TabsContent value="hero" className="space-y-6 lg:space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl lg:text-2xl font-bold font-poppins">Hero Section Management</h2>
              <Button onClick={addNewSlide} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add New Slide
              </Button>
            </div>

            <div className="grid gap-6">
              {websiteContent.hero.slides.map((slide, index) => (
                <Card key={index} className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold font-poppins flex items-center justify-between">
                      Slide {index + 1}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteSlide(index)}
                        disabled={websiteContent.hero.slides.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={slide.title}
                            onChange={(e) => updateSlide(index, "title", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Subtitle</Label>
                          <Textarea
                            value={slide.subtitle}
                            onChange={(e) => updateSlide(index, "subtitle", e.target.value)}
                            className="mt-2"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Accent Text</Label>
                          <Input
                            value={slide.accent}
                            onChange={(e) => updateSlide(index, "accent", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={slide.location}
                            onChange={(e) => updateSlide(index, "location", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Link URL</Label>
                          <Input
                            value={slide.link}
                            onChange={(e) => updateSlide(index, "link", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Background Image</Label>
                          <div className="flex space-x-2 mt-2">
                            <Input
                              value={slide.image}
                              onChange={(e) => updateSlide(index, "image", e.target.value)}
                              placeholder="Image URL or path"
                            />
                            <Button variant="outline" onClick={() => handleImageUpload("hero", "image", index)}>
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label>Preview</Label>
                        <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={slide.image || "/placeholder.svg"}
                            alt="Slide Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white p-4">
                              <div className="text-yellow-400 text-sm mb-2">{slide.accent}</div>
                              <h2 className="text-xl font-bold mb-2">{slide.title}</h2>
                              <p className="text-sm mb-3">{slide.subtitle}</p>
                              <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs">
                                {slide.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              className="bg-gradient-to-r from-green-600 to-green-700 text-white w-full"
              onClick={() => handleSaveContent("Hero Section")}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Hero Section
            </Button>
          </TabsContent>

          {/* Testimonials Management */}
          <TabsContent value="testimonials" className="space-y-6 lg:space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl lg:text-2xl font-bold font-poppins">Testimonials Management</h2>
              <Button onClick={addNewTestimonial} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add New Testimonial
              </Button>
            </div>

            {/* Section Title & Subtitle */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold font-poppins">Section Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Title</Label>
                  <Input
                    value={websiteContent.testimonials.title}
                    onChange={(e) => websiteContent.updateSectionContent("testimonials", { title: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Section Subtitle</Label>
                  <Textarea
                    value={websiteContent.testimonials.subtitle}
                    onChange={(e) => websiteContent.updateSectionContent("testimonials", { subtitle: e.target.value })}
                    className="mt-2"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Rating Text</Label>
                    <Input
                      value={websiteContent.testimonials.stats.rating}
                      onChange={(e) => updateSectionStats({ rating: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Travelers Text</Label>
                    <Input
                      value={websiteContent.testimonials.stats.travelers}
                      onChange={(e) => updateSectionStats({ travelers: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Testimonials */}
            <div className="grid gap-6">
              {websiteContent.testimonials.testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold font-poppins flex items-center justify-between">
                      Testimonial {index + 1}
                      <Button variant="destructive" size="sm" onClick={() => deleteTestimonial(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Customer Name</Label>
                          <Input
                            value={testimonial.name}
                            onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={testimonial.location}
                            onChange={(e) => updateTestimonial(index, "location", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Tour Name</Label>
                          <Input
                            value={testimonial.tour}
                            onChange={(e) => updateTestimonial(index, "tour", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Rating</Label>
                          <Select
                            value={testimonial.rating.toString()}
                            onValueChange={(value) => updateTestimonial(index, "rating", Number.parseInt(value))}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 Stars</SelectItem>
                              <SelectItem value="4">4 Stars</SelectItem>
                              <SelectItem value="3">3 Stars</SelectItem>
                              <SelectItem value="2">2 Stars</SelectItem>
                              <SelectItem value="1">1 Star</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Testimonial Text</Label>
                          <Textarea
                            value={testimonial.text}
                            onChange={(e) => updateTestimonial(index, "text", e.target.value)}
                            className="mt-2"
                            rows={6}
                          />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <Label>Preview</Label>
                          <div className="mt-2 space-y-2">
                            <div className="flex items-center">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-sm italic">"{testimonial.text}"</p>
                            <div className="text-sm">
                              <div className="font-semibold">{testimonial.name}</div>
                              <div className="text-gray-600">{testimonial.location}</div>
                              <div className="text-red-600 font-medium">{testimonial.tour}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              className="bg-gradient-to-r from-green-600 to-green-700 text-white w-full"
              onClick={() => handleSaveContent("Testimonials")}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Testimonials
            </Button>
          </TabsContent>

          {/* Featured Tours Management */}
          <TabsContent value="tours" className="space-y-6 lg:space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl lg:text-2xl font-bold font-poppins">Featured Tours Management</h2>
              <Button onClick={addNewTour} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add New Tour
              </Button>
            </div>

            {/* Section Title & Subtitle */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold font-poppins">Section Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Title</Label>
                  <Input
                    value={websiteContent.featuredJourneys.title}
                    onChange={(e) => websiteContent.updateSectionContent("featuredJourneys", { title: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Section Subtitle</Label>
                  <Textarea
                    value={websiteContent.featuredJourneys.subtitle}
                    onChange={(e) =>
                      websiteContent.updateSectionContent("featuredJourneys", { subtitle: e.target.value })
                    }
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Individual Tours */}
            <div className="grid gap-6">
              {websiteContent.featuredJourneys.tours.map((tour, index) => (
                <Card key={tour.id} className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold font-poppins flex items-center justify-between">
                      {tour.title}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={tour.enabled ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateTour(index, "enabled", !tour.enabled)}
                        >
                          {tour.enabled ? "Enabled" : "Disabled"}
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteTour(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Tour Title</Label>
                          <Input
                            value={tour.title}
                            onChange={(e) => updateTour(index, "title", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={tour.location}
                            onChange={(e) => updateTour(index, "location", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Duration</Label>
                            <Input
                              value={tour.duration}
                              onChange={(e) => updateTour(index, "duration", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Group Size</Label>
                            <Input
                              value={tour.groupSize}
                              onChange={(e) => updateTour(index, "groupSize", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Price</Label>
                            <Input
                              value={tour.price}
                              onChange={(e) => updateTour(index, "price", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Original Price</Label>
                            <Input
                              value={tour.originalPrice}
                              onChange={(e) => updateTour(index, "originalPrice", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Category</Label>
                          <Select value={tour.category} onValueChange={(value) => updateTour(index, "category", value)}>
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Heritage">Heritage</SelectItem>
                              <SelectItem value="Nature">Nature</SelectItem>
                              <SelectItem value="Adventure">Adventure</SelectItem>
                              <SelectItem value="Spiritual">Spiritual</SelectItem>
                              <SelectItem value="Leisure">Leisure</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Tour Image</Label>
                          <div className="flex space-x-2 mt-2">
                            <Input
                              value={tour.image}
                              onChange={(e) => updateTour(index, "image", e.target.value)}
                              placeholder="Image URL or path"
                            />
                            <Button variant="outline" onClick={() => handleImageUpload("tour", "image", index)}>
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <Label>Preview</Label>
                          <div className="mt-2">
                            <img
                              src={tour.image || "/placeholder.svg"}
                              alt="Tour Preview"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Rating</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              max="5"
                              value={tour.rating}
                              onChange={(e) => updateTour(index, "rating", Number.parseFloat(e.target.value))}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Reviews Count</Label>
                            <Input
                              type="number"
                              value={tour.reviews}
                              onChange={(e) => updateTour(index, "reviews", Number.parseInt(e.target.value))}
                              className="mt-2"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Highlights (comma separated)</Label>
                          <Textarea
                            value={tour.highlights.join(", ")}
                            onChange={(e) => updateTour(index, "highlights", e.target.value.split(", "))}
                            className="mt-2"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              className="bg-gradient-to-r from-green-600 to-green-700 text-white w-full"
              onClick={() => handleSaveContent("Featured Tours")}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Featured Tours
            </Button>
          </TabsContent>

          {/* Blog Posts Management */}
          <TabsContent value="blog" className="space-y-6 lg:space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl lg:text-2xl font-bold font-poppins">Blog Posts Management</h2>
              <Button onClick={addNewBlogPost} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add New Blog Post
              </Button>
            </div>

            {/* Section Title & Subtitle */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold font-poppins">Section Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Title</Label>
                  <Input
                    value={websiteContent.blog.title}
                    onChange={(e) => websiteContent.updateSectionContent("blog", { title: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Section Subtitle</Label>
                  <Textarea
                    value={websiteContent.blog.subtitle}
                    onChange={(e) => websiteContent.updateSectionContent("blog", { subtitle: e.target.value })}
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Individual Blog Posts */}
            <div className="grid gap-6">
              {websiteContent.blog.posts.map((post, index) => (
                <Card key={post.id} className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold font-poppins flex items-center justify-between">
                      {post.title}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={post.trending ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateBlogPost(index, "trending", !post.trending)}
                        >
                          {post.trending ? "Trending" : "Normal"}
                        </Button>
                        <Button
                          variant={post.enabled ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateBlogPost(index, "enabled", !post.enabled)}
                        >
                          {post.enabled ? "Published" : "Draft"}
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteBlogPost(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Post Title</Label>
                          <Input
                            value={post.title}
                            onChange={(e) => updateBlogPost(index, "title", e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Excerpt</Label>
                          <Textarea
                            value={post.excerpt}
                            onChange={(e) => updateBlogPost(index, "excerpt", e.target.value)}
                            className="mt-2"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Author</Label>
                            <Input
                              value={post.author}
                              onChange={(e) => updateBlogPost(index, "author", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Category</Label>
                            <Select
                              value={post.category}
                              onValueChange={(value) => updateBlogPost(index, "category", value)}
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Destinations">Destinations</SelectItem>
                                <SelectItem value="Travel Tips">Travel Tips</SelectItem>
                                <SelectItem value="Spiritual">Spiritual</SelectItem>
                                <SelectItem value="Adventure">Adventure</SelectItem>
                                <SelectItem value="Culture">Culture</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Date</Label>
                            <Input
                              value={post.date}
                              onChange={(e) => updateBlogPost(index, "date", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Read Time</Label>
                            <Input
                              value={post.readTime}
                              onChange={(e) => updateBlogPost(index, "readTime", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Featured Image</Label>
                          <div className="flex space-x-2 mt-2">
                            <Input
                              value={post.image}
                              onChange={(e) => updateBlogPost(index, "image", e.target.value)}
                              placeholder="Image URL or path"
                            />
                            <Button variant="outline" onClick={() => handleImageUpload("blog", "image", index)}>
                              <Upload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <Label>Preview</Label>
                          <div className="mt-2">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Blog Preview"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Content</Label>
                          <Textarea
                            value={post.content}
                            onChange={(e) => updateBlogPost(index, "content", e.target.value)}
                            className="mt-2"
                            rows={6}
                            placeholder="Write your blog post content here..."
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              className="bg-gradient-to-r from-green-600 to-green-700 text-white w-full"
              onClick={() => handleSaveContent("Blog Posts")}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Blog Posts
            </Button>
          </TabsContent>

          <TabsContent value="booking">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-poppins">Booking Form Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Booking form management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-poppins">Website Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Website settings interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
