"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Calendar, CreditCard, Bell, Settings, LogOut, Eye, Download } from "lucide-react"

export function CustomerPortal() {
  const [activeBookings] = useState([
    {
      id: "IJ2024001",
      tour: "Golden Triangle Classic",
      dates: "Jan 15 - Jan 22, 2024",
      status: "confirmed",
      travelers: 2,
      amount: "₹50,000",
      paymentStatus: "paid",
    },
    {
      id: "IJ2024002",
      tour: "Kerala Backwaters",
      dates: "Feb 10 - Feb 16, 2024",
      status: "pending",
      travelers: 4,
      amount: "₹88,000",
      paymentStatus: "partial",
    },
  ])

  const [pastBookings] = useState([
    {
      id: "IJ2023045",
      tour: "Ladakh Adventure",
      dates: "Sep 5 - Sep 13, 2023",
      status: "completed",
      travelers: 2,
      amount: "₹70,000",
      rating: 5,
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-black font-['Poppins']">Welcome back, Priya!</h1>
                <p className="text-gray-600">Manage your bookings and travel preferences</p>
              </div>
            </div>
            <Button variant="outline" className="hover:bg-red-50 hover:border-red-300">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl shadow-lg p-2">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
            >
              Preferences
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            {/* Active Bookings */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black font-['Poppins'] flex items-center">
                  <Calendar className="mr-3 h-6 w-6 text-yellow-500" />
                  Active Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-black">{booking.tour}</h3>
                        <p className="text-gray-600">{booking.dates}</p>
                      </div>
                      <Badge
                        className={`${booking.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"} text-white`}
                      >
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Booking ID:</span>
                        <p className="font-semibold">{booking.id}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Travelers:</span>
                        <p className="font-semibold">{booking.travelers} People</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Amount:</span>
                        <p className="font-semibold">{booking.amount}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment:</span>
                        <Badge variant={booking.paymentStatus === "paid" ? "default" : "secondary"}>
                          {booking.paymentStatus}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-4">
                      <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Voucher
                      </Button>
                      {booking.paymentStatus === "partial" && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Complete Payment
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Past Bookings */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black font-['Poppins']">Past Bookings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pastBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-black">{booking.tour}</h3>
                        <p className="text-gray-600">{booking.dates}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500 text-white">Completed</Badge>
                        <div className="flex items-center">
                          {[...Array(booking.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Book Again
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black font-['Poppins']">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Priya" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Sharma" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="priya.sharma@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+91 9876543210" />
                </div>

                <Button className="bg-gradient-to-r from-yellow-400 to-red-500 text-white">Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black font-['Poppins'] flex items-center">
                  <Settings className="mr-3 h-6 w-6 text-yellow-500" />
                  Travel Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Email notifications for booking updates</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>SMS alerts for travel reminders</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span>Marketing emails about new destinations</span>
                    </label>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-yellow-400 to-red-500 text-white">Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black font-['Poppins']">Customer Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Bell className="mr-2 h-4 w-4" />
                        Report an Issue
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MapPin className="mr-2 h-4 w-4" />
                        Request Itinerary Change
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Cancel Booking
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact Information</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="font-semibold">24/7 Support Hotline</p>
                        <p className="text-gray-600">+91-9320131910</p>
                      </div>
                      <div>
                        <p className="font-semibold">Email Support</p>
                        <p className="text-gray-600">support@indicjourneys.com</p>
                      </div>
                      <div>
                        <p className="font-semibold">Emergency Contact</p>
                        <p className="text-gray-600">+91-9320031910</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
