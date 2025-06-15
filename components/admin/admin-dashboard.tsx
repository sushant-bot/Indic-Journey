"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  ImageIcon,
  FileText,
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  Upload,
  Save,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const stats = [
    { title: "Total Bookings", value: "1,234", change: "+12%", icon: Calendar },
    { title: "Revenue", value: "₹45,67,890", change: "+8%", icon: DollarSign },
    { title: "Active Tours", value: "28", change: "+3", icon: BarChart3 },
    { title: "Customers", value: "856", change: "+15%", icon: Users },
  ]

  const recentBookings = [
    { id: "IJ2024001", customer: "Priya Sharma", tour: "Golden Triangle", amount: "₹50,000", status: "confirmed" },
    { id: "IJ2024002", customer: "Rajesh Kumar", tour: "Kerala Backwaters", amount: "₹88,000", status: "pending" },
    { id: "IJ2024003", customer: "Sarah Johnson", tour: "Ladakh Adventure", amount: "₹70,000", status: "confirmed" },
  ]

  const [heroContent, setHeroContent] = useState({
    title: "Explore. Experience. Evolve.",
    subtitle: "Crafted Travel Stories across India & the World",
    backgroundImage: "/images/taj-mahal.png",
  })

  const [tours, setTours] = useState([
    {
      id: 1,
      title: "Golden Triangle Classic",
      location: "Delhi - Agra - Jaipur",
      duration: "7 Days",
      price: "₹25,000",
      image: "/images/taj-mahal.png",
      category: "Heritage",
      description: "Experience the iconic Golden Triangle with visits to Delhi, Agra, and Jaipur.",
    },
    {
      id: 2,
      title: "Kerala Backwaters",
      location: "Kochi - Alleppey - Munnar",
      duration: "6 Days",
      price: "₹22,000",
      image: "/images/kerala-backwaters.png",
      category: "Nature",
      description: "Cruise through serene backwaters and explore lush tea plantations.",
    },
  ])

  // Handler for updating a specific tour field
  const handleTourUpdate = (tourId: number, field: string, value: string) => {
    setTours(
      tours.map((tour) => {
        if (tour.id === tourId) {
          return { ...tour, [field]: value }
        }
        return tour
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Admin Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-poppins">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your travel website content</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-yellow-400 to-red-600 text-black hover:text-white">
              <Eye className="mr-2 h-4 w-4" />
              View Website
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-white rounded-xl shadow-lg p-2">
            <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Content
            </TabsTrigger>
            <TabsTrigger value="tours" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Tours
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Customers
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-poppins">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{booking.customer}</p>
                          <p className="text-sm text-gray-600">{booking.tour}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{booking.amount}</p>
                          <Badge className={booking.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-poppins">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Tour
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-green-600 to-green-700 text-white">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Images
                  </Button>
                  <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                    <FileText className="mr-2 h-4 w-4" />
                    Update Content
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-poppins flex items-center">
                  <FileText className="mr-3 h-6 w-6 text-yellow-500" />
                  Website Content Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Hero Section Editor */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold font-poppins">Hero Section</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="hero-title">Main Title</Label>
                        <Input
                          id="hero-title"
                          value={heroContent.title}
                          onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="hero-subtitle">Subtitle</Label>
                        <Textarea
                          id="hero-subtitle"
                          value={heroContent.subtitle}
                          onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                          className="mt-2"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="hero-image">Background Image</Label>
                        <div className="flex space-x-2 mt-2">
                          <Input
                            id="hero-image"
                            value={heroContent.backgroundImage}
                            onChange={(e) => setHeroContent({ ...heroContent, backgroundImage: e.target.value })}
                            placeholder="Image URL or path"
                          />
                          <Button variant="outline">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Preview</Label>
                      <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={heroContent.backgroundImage || "/placeholder.svg"}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-center text-white">
                            <h2 className="text-2xl font-bold mb-2">{heroContent.title}</h2>
                            <p className="text-sm">{heroContent.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                    <Save className="mr-2 h-4 w-4" />
                    Save Hero Section
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tours Management Tab */}
          <TabsContent value="tours" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold font-poppins">Tour Management</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add New Tour
              </Button>
            </div>

            <div className="grid gap-6">
              {tours.map((tour) => (
                <Card key={tour.id} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6 items-center">
                      <div className="relative">
                        <img
                          src={tour.image || "/placeholder.svg"}
                          alt={tour.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button size="sm" variant="secondary" className="absolute top-2 right-2">
                          <ImageIcon className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="md:col-span-2 space-y-3">
                        <div>
                          <Label>Tour Title</Label>
                          <Input
                            value={tour.title}
                            onChange={(e) => handleTourUpdate(tour.id, "title", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Duration</Label>
                            <Input
                              value={tour.duration}
                              onChange={(e) => handleTourUpdate(tour.id, "duration", e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Price</Label>
                            <Input
                              value={tour.price}
                              onChange={(e) => handleTourUpdate(tour.id, "price", e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={tour.description}
                            onChange={(e) => handleTourUpdate(tour.id, "description", e.target.value)}
                            className="mt-1"
                            rows={2}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-3 w-3" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-3 w-3" />
                          Preview
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs content would go here */}
          <TabsContent value="bookings">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-poppins">Booking Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Booking management interface would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-poppins">Customer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Customer management interface would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-poppins">Website Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Website settings interface would be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
