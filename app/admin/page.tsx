"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Users, Map, MessageSquare, FileText, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTours: 0,
    totalInquiries: 0,
    totalBlogPosts: 0,
    newInquiries: 0,
    activeUsers: 0,
  })
  const [recentInquiries, setRecentInquiries] = useState<any[]>([])
  const [popularTours, setPopularTours] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      // Fetch stats
      const [
        { count: usersCount },
        { count: toursCount },
        { count: inquiriesCount },
        { count: blogCount },
        { count: newInquiriesCount },
        { data: recentInquiriesData },
        { data: popularToursData },
      ] = await Promise.all([
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("tours").select("*", { count: "exact", head: true }),
        supabase.from("inquiries").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase
          .from("inquiries")
          .select("id, name, email, status, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase.from("tours").select("id, title, views, price").order("views", { ascending: false }).limit(5),
      ])

      setStats({
        totalUsers: usersCount || 0,
        totalTours: toursCount || 0,
        totalInquiries: inquiriesCount || 0,
        totalBlogPosts: blogCount || 0,
        newInquiries: newInquiriesCount || 0,
        activeUsers: Math.floor(Math.random() * 50) + 10, // Simulated active users
      })

      setRecentInquiries(recentInquiriesData || [])
      setPopularTours(popularToursData || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const chartData = [
    { name: "Jan", inquiries: 65, bookings: 28 },
    { name: "Feb", inquiries: 59, bookings: 25 },
    { name: "Mar", inquiries: 80, bookings: 36 },
    { name: "Apr", inquiries: 81, bookings: 43 },
    { name: "May", inquiries: 56, bookings: 24 },
    { name: "Jun", inquiries: 55, bookings: 27 },
    { name: "Jul", inquiries: 40, bookings: 18 },
  ]

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className="h-5 w-5" />}
            trend={{ value: "+12%", isPositive: true }}
            isLoading={isLoading}
          />
          <StatCard
            title="Total Tours"
            value={stats.totalTours}
            icon={<Map className="h-5 w-5" />}
            trend={{ value: "+5%", isPositive: true }}
            isLoading={isLoading}
          />
          <StatCard
            title="Total Inquiries"
            value={stats.totalInquiries}
            icon={<MessageSquare className="h-5 w-5" />}
            trend={{ value: "+18%", isPositive: true }}
            isLoading={isLoading}
          />
          <StatCard
            title="Blog Posts"
            value={stats.totalBlogPosts}
            icon={<FileText className="h-5 w-5" />}
            trend={{ value: "+3%", isPositive: true }}
            isLoading={isLoading}
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Inquiries & Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inquiries" fill="#FFE600" name="Inquiries" />
                    <Bar dataKey="bookings" fill="#E50000" name="Bookings" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              ) : recentInquiries.length > 0 ? (
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">{inquiry.name}</p>
                        <p className="text-sm text-gray-500">{formatDate(inquiry.created_at)}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          inquiry.status === "new"
                            ? "bg-blue-100 text-blue-800"
                            : inquiry.status === "contacted"
                              ? "bg-yellow-100 text-yellow-800"
                              : inquiry.status === "booked"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">No recent inquiries</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Sections */}
        <Tabs defaultValue="popular">
          <TabsList className="mb-4">
            <TabsTrigger value="popular">Popular Tours</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="stats">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <Card>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-40 mb-1" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                ) : popularTours.length > 0 ? (
                  <div className="space-y-4">
                    {popularTours.map((tour) => (
                      <div key={tour.id} className="flex justify-between items-center border-b pb-3">
                        <p className="font-medium">{tour.title}</p>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{tour.views || 0} views</span>
                          <span className="mx-2">•</span>
                          <span className="text-sm font-medium">{tour.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500">No tour data available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recent">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <p className="font-medium">New tour added</p>
                        <p className="text-sm text-gray-500">Kerala Backwaters</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <p className="font-medium">New user registered</p>
                        <p className="text-sm text-gray-500">john.doe@example.com</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">5 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <p className="font-medium">New inquiry received</p>
                        <p className="text-sm text-gray-500">Bhutan Tour Package</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">Yesterday</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Conversion Rate</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold">24.8%</p>
                      <span className="ml-2 text-sm text-green-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        3.2%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Avg. Booking Value</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold">₹24,500</p>
                      <span className="ml-2 text-sm text-green-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        5.3%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Bounce Rate</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold">42.1%</p>
                      <span className="ml-2 text-sm text-red-600 flex items-center">
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        1.8%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  isLoading: boolean
}

function StatCard({ title, value, icon, trend, isLoading }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {isLoading ? <Skeleton className="h-8 w-16 mt-1" /> : <p className="text-3xl font-bold">{value}</p>}
            {trend && !isLoading && (
              <p className={`text-xs mt-1 flex items-center ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
                {trend.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {trend.value} from last month
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
