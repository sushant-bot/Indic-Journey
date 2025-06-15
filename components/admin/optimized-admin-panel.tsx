"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { Home, Settings, BookOpen, MessageSquare, Star, LayoutDashboard, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

// Lazy loaded components for better performance
import dynamic from "next/dynamic"

const HeroSectionManager = dynamic(() => import("./section-managers/hero-section-manager"), {
  loading: () => <SectionSkeleton title="Hero Section" />,
  ssr: false,
})

const ToursManager = dynamic(() => import("./section-managers/tours-manager"), {
  loading: () => <SectionSkeleton title="Tours" />,
  ssr: false,
})

const TestimonialsManager = dynamic(() => import("./section-managers/testimonials-manager"), {
  loading: () => <SectionSkeleton title="Testimonials" />,
  ssr: false,
})

const BlogManager = dynamic(() => import("./section-managers/blog-manager"), {
  loading: () => <SectionSkeleton title="Blog" />,
  ssr: false,
})

const InquiriesManager = dynamic(() => import("./section-managers/inquiries-manager"), {
  loading: () => <SectionSkeleton title="Inquiries" />,
  ssr: false,
})

const SettingsManager = dynamic(() => import("./section-managers/settings-manager"), {
  loading: () => <SectionSkeleton title="Settings" />,
  ssr: false,
})

// Simple skeleton loader for sections
function SectionSkeleton({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Dashboard stats component
function DashboardStats() {
  const [stats, setStats] = useState({
    tours: 0,
    testimonials: 0,
    blogPosts: 0,
    inquiries: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [{ count: toursCount }, { count: testimonialsCount }, { count: blogCount }, { count: inquiriesCount }] =
          await Promise.all([
            supabase.from("tours").select("*", { count: "exact", head: true }),
            supabase.from("testimonials").select("*", { count: "exact", head: true }),
            supabase.from("blog_posts").select("*", { count: "exact", head: true }),
            supabase.from("inquiries").select("*", { count: "exact", head: true }),
          ])

        setStats({
          tours: toursCount || 0,
          testimonials: testimonialsCount || 0,
          blogPosts: blogCount || 0,
          inquiries: inquiriesCount || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Tours" value={stats.tours} icon={<BookOpen className="h-5 w-5" />} loading={loading} />
      <StatCard title="Testimonials" value={stats.testimonials} icon={<Star className="h-5 w-5" />} loading={loading} />
      <StatCard title="Blog Posts" value={stats.blogPosts} icon={<BookOpen className="h-5 w-5" />} loading={loading} />
      <StatCard
        title="Inquiries"
        value={stats.inquiries}
        icon={<MessageSquare className="h-5 w-5" />}
        loading={loading}
      />
    </div>
  )
}

// Stat card component
function StatCard({
  title,
  value,
  icon,
  loading,
}: {
  title: string
  value: number
  icon: React.ReactNode
  loading: boolean
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {loading ? <Skeleton className="h-8 w-16 mt-1" /> : <p className="text-3xl font-bold">{value}</p>}
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

// Recent items component
function RecentItems() {
  const [recentInquiries, setRecentInquiries] = useState<any[]>([])
  const [recentTours, setRecentTours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentItems() {
      try {
        const [{ data: inquiriesData }, { data: toursData }] = await Promise.all([
          supabase
            .from("inquiries")
            .select("id, name, email, status, created_at")
            .order("created_at", { ascending: false })
            .limit(5),
          supabase
            .from("tours")
            .select("id, title, price, featured")
            .order("created_at", { ascending: false })
            .limit(5),
        ])

        setRecentInquiries(inquiriesData || [])
        setRecentTours(toursData || [])
      } catch (error) {
        console.error("Error fetching recent items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentItems()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
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
            <div className="space-y-3">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{inquiry.name}</p>
                    <p className="text-sm text-gray-500">{inquiry.email}</p>
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
            <p className="text-gray-500 text-center py-4">No recent inquiries</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Tours</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-40 mb-1" />
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          ) : recentTours.length > 0 ? (
            <div className="space-y-3">
              {recentTours.map((tour) => (
                <div key={tour.id} className="flex justify-between items-center border-b pb-2">
                  <p className="font-medium">{tour.title}</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      tour.featured ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tour.featured ? "Featured" : "Standard"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No tours available</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Main admin panel component
export default function OptimizedAdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-gray-500 text-sm">Manage your website content</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isLoading && (
            <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Processing...</span>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")}>
            <Home className="h-4 w-4 mr-2" />
            View Website
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="bg-white shadow-sm border p-1 rounded-lg">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="hero" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Home className="h-4 w-4 mr-2" />
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="tours" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <BookOpen className="h-4 w-4 mr-2" />
              Tours
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
            >
              <Star className="h-4 w-4 mr-2" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <BookOpen className="h-4 w-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <MessageSquare className="h-4 w-4 mr-2" />
              Inquiries
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-6">
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            }
          >
            <DashboardStats />
            <RecentItems />
          </Suspense>
        </TabsContent>

        <TabsContent value="hero">
          <Suspense fallback={<SectionSkeleton title="Hero Section" />}>
            <HeroSectionManager setIsLoading={setIsLoading} />
          </Suspense>
        </TabsContent>

        <TabsContent value="tours">
          <Suspense fallback={<SectionSkeleton title="Tours" />}>
            <ToursManager setIsLoading={setIsLoading} />
          </Suspense>
        </TabsContent>

        <TabsContent value="testimonials">
          <Suspense fallback={<SectionSkeleton title="Testimonials" />}>
            <TestimonialsManager setIsLoading={setIsLoading} />
          </Suspense>
        </TabsContent>

        <TabsContent value="blog">
          <Suspense fallback={<SectionSkeleton title="Blog" />}>
            <BlogManager setIsLoading={setIsLoading} />
          </Suspense>
        </TabsContent>

        <TabsContent value="inquiries">
          <Suspense fallback={<SectionSkeleton title="Inquiries" />}>
            <InquiriesManager setIsLoading={setIsLoading} />
          </Suspense>
        </TabsContent>

        <TabsContent value="settings">
          <Suspense fallback={<SectionSkeleton title="Settings" />}>
            <SettingsManager setIsLoading={setIsLoading} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
