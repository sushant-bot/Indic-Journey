"use client"

import { useState, useEffect } from "react"
import { getInquiries, getTours, getTestimonials, getBlogPosts } from "@/lib/supabase-queries"
import type { Tour, Inquiry, Testimonial, BlogPost } from "@/lib/supabase"
import { useWebsiteContent } from "@/lib/website-content"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Loader2, Mail, Phone, MessageSquare } from "lucide-react"

export default function ComprehensiveAdminPanel() {
  const websiteContent = useWebsiteContent()

  const [activeTab, setActiveTab] = useState("content")
  const [tours, setTours] = useState<Tour[]>([])
  const [saveStatus, setSaveStatus] = useState<{
    status: "idle" | "loading" | "success" | "error"
    message: string
  }>({ status: "idle", message: "" })
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  // Load data based on active tab to improve performance
  useEffect(() => {
    const loadTabData = async () => {
      setIsLoading(true)
      try {
        switch (activeTab) {
          case "content":
            await websiteContent.loadFromSupabase()
            break
          case "inquiries":
            const inquiriesResult = await getInquiries()
            if (inquiriesResult) {
              setInquiries(inquiriesResult)
            }
            break
          case "tours":
            const toursResult = await getTours({})
            if (toursResult) {
              setTours(toursResult)
            }
            break
          case "testimonials":
            const testimonialsResult = await getTestimonials()
            if (testimonialsResult) {
              setTestimonials(testimonialsResult)
            }
            break
          case "blog":
            const blogResult = await getBlogPosts()
            if (blogResult) {
              setBlogPosts(blogResult)
            }
            break
        }
      } catch (error) {
        console.error(`Error loading ${activeTab} data:`, error)
        toast.error(`Failed to load ${activeTab} data`)
      } finally {
        setIsLoading(false)
      }
    }

    loadTabData()
  }, [activeTab])

  const handleContentChange = (key: keyof typeof websiteContent.content, value: string) => {
    websiteContent.updateContent(key, value)
  }

  const handleSaveContent = async () => {
    setSaveStatus({ status: "loading", message: "Saving content..." })
    try {
      await websiteContent.saveToSupabase()
      setSaveStatus({ status: "success", message: "Content saved successfully!" })
      toast.success("Content saved successfully!")
    } catch (error) {
      console.error("Error saving content:", error)
      setSaveStatus({ status: "error", message: "Failed to save content" })
      toast.error("Failed to save content")
    }
  }

  const handleInquiryStatusUpdate = async (inquiryId: string, newStatus: Inquiry["status"]) => {
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: inquiryId, status: newStatus }),
      })

      const result = await response.json()

      if (result.success) {
        setInquiries((prev) => prev.map((inq) => (inq.id === inquiryId ? { ...inq, status: newStatus } : inq)))
        toast.success("Inquiry status updated successfully!")
      } else {
        toast.error("Failed to update inquiry status")
      }
    } catch (error) {
      console.error("Error updating inquiry status:", error)
      toast.error("Error updating inquiry status")
    }
  }

  const filteredInquiries = filterStatus ? inquiries.filter((inquiry) => inquiry.status === filterStatus) : inquiries

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
      <TabsList className="w-full justify-start overflow-x-auto">
        <TabsTrigger
          value="content"
          className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
        >
          Content
        </TabsTrigger>
        <TabsTrigger
          value="inquiries"
          className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
        >
          Inquiries{" "}
          {inquiries.filter((i) => i.status === "new").length > 0 &&
            `(${inquiries.filter((i) => i.status === "new").length})`}
        </TabsTrigger>
        <TabsTrigger
          value="tours"
          className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
        >
          Tours
        </TabsTrigger>
        <TabsTrigger
          value="testimonials"
          className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
        >
          Testimonials
        </TabsTrigger>
        <TabsTrigger
          value="blog"
          className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
        >
          Blog
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
        >
          Settings
        </TabsTrigger>
      </TabsList>

      {/* Content Tab */}
      <TabsContent value="content" className="space-y-6 lg:space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-bold">Website Content</h2>
          <Button onClick={handleSaveContent} disabled={saveStatus.status === "loading"}>
            {saveStatus.status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Content"
            )}
          </Button>
        </div>

        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <div className="grid gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Manage the main hero section.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="heroTitle">Title</Label>
                    <Input
                      id="heroTitle"
                      value={websiteContent.content.heroTitle || ""}
                      onChange={(e) => handleContentChange("heroTitle", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="heroSubtitle">Subtitle</Label>
                    <Textarea
                      id="heroSubtitle"
                      value={websiteContent.content.heroSubtitle || ""}
                      onChange={(e) => handleContentChange("heroSubtitle", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>Manage the about section.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="aboutTitle">Title</Label>
                    <Input
                      id="aboutTitle"
                      value={websiteContent.content.aboutTitle || ""}
                      onChange={(e) => handleContentChange("aboutTitle", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="aboutDescription">Description</Label>
                    <Textarea
                      id="aboutDescription"
                      value={websiteContent.content.aboutDescription || ""}
                      onChange={(e) => handleContentChange("aboutDescription", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Contact Section</CardTitle>
                <CardDescription>Manage the contact section.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contactTitle">Title</Label>
                    <Input
                      id="contactTitle"
                      value={websiteContent.content.contactTitle || ""}
                      onChange={(e) => handleContentChange("contactTitle", e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contactDescription">Description</Label>
                    <Textarea
                      id="contactDescription"
                      value={websiteContent.content.contactDescription || ""}
                      onChange={(e) => handleContentChange("contactDescription", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </TabsContent>

      {/* Inquiries Management */}
      <TabsContent value="inquiries" className="space-y-6 lg:space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-bold">Inquiries Management</h2>
          <div className="flex gap-2">
            <Button variant={filterStatus === null ? "default" : "outline"} onClick={() => setFilterStatus(null)}>
              All ({inquiries.length})
            </Button>
            <Button
              variant={filterStatus === "new" ? "default" : "outline"}
              className={filterStatus !== "new" ? "text-red-600 border-red-200" : ""}
              onClick={() => setFilterStatus("new")}
            >
              New ({inquiries.filter((i) => i.status === "new").length})
            </Button>
            <Button
              variant={filterStatus === "contacted" ? "default" : "outline"}
              onClick={() => setFilterStatus("contacted")}
            >
              Contacted
            </Button>
            <Button
              variant={filterStatus === "booked" ? "default" : "outline"}
              onClick={() => setFilterStatus("booked")}
            >
              Booked
            </Button>
          </div>
        </div>

        {isLoading ? (
          <InquiriesSkeleton />
        ) : (
          <div className="grid gap-6">
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inquiry) => (
                <Card key={inquiry.id} className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          {inquiry.name}
                          <div className="text-sm font-normal text-gray-600">{inquiry.email}</div>
                        </div>
                        <Badge variant={inquiry.status === "new" ? "destructive" : "default"} className="capitalize">
                          {inquiry.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(inquiry.created_at).toLocaleDateString()}</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Contact Details</Label>
                          <div className="mt-1 space-y-1">
                            <div className="text-sm">
                              <strong>Email:</strong> {inquiry.email}
                            </div>
                            {inquiry.phone && (
                              <div className="text-sm">
                                <strong>Phone:</strong> {inquiry.phone}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Travel Details</Label>
                          <div className="mt-1 space-y-1">
                            {inquiry.tour_type && (
                              <div className="text-sm">
                                <strong>Tour Type:</strong> {inquiry.tour_type}
                              </div>
                            )}
                            {inquiry.destination && (
                              <div className="text-sm">
                                <strong>Destination:</strong> {inquiry.destination}
                              </div>
                            )}
                            {inquiry.travel_dates && (
                              <div className="text-sm">
                                <strong>Travel Dates:</strong> {inquiry.travel_dates}
                              </div>
                            )}
                            {inquiry.group_size && (
                              <div className="text-sm">
                                <strong>Group Size:</strong> {inquiry.group_size} people
                              </div>
                            )}
                            {inquiry.budget && (
                              <div className="text-sm">
                                <strong>Budget:</strong> {inquiry.budget}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Message</Label>
                          <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
                            {inquiry.message || "No message provided"}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Update Status</Label>
                          <Select
                            value={inquiry.status}
                            onValueChange={(value) => handleInquiryStatusUpdate(inquiry.id, value as Inquiry["status"])}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="quoted">Quoted</SelectItem>
                              <SelectItem value="booked">Booked</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => window.open(`mailto:${inquiry.email}`, "_blank")}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                          {inquiry.phone && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`tel:${inquiry.phone}`, "_blank")}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                          )}
                          {inquiry.phone && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                window.open(`https://wa.me/${inquiry.phone?.replace(/[^0-9]/g, "")}`, "_blank")
                              }
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              WhatsApp
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500">No inquiries found</div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </TabsContent>

      {/* Tours Tab */}
      <TabsContent value="tours" className="space-y-6 lg:space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-bold">Tours Management</h2>
          <Button>Add New Tour</Button>
        </div>

        {isLoading ? (
          <ToursSkeleton />
        ) : (
          <div className="grid gap-6">
            {tours.length > 0 ? (
              tours.map((tour) => (
                <Card key={tour.id} className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>{tour.title}</CardTitle>
                    <CardDescription>{tour.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p>
                          <strong>Price:</strong> {tour.price}
                        </p>
                        <p>
                          <strong>Duration:</strong> {tour.duration}
                        </p>
                        <p>
                          <strong>Type:</strong> {tour.tour_type}
                        </p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500">No tours found</div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </TabsContent>

      {/* Testimonials Tab */}
      <TabsContent value="testimonials" className="space-y-6 lg:space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-bold">Testimonials Management</h2>
          <Button>Add New Testimonial</Button>
        </div>

        {isLoading ? (
          <TestimonialsSkeleton />
        ) : (
          <div className="grid gap-6">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">"{testimonial.text}"</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div>Rating: {testimonial.rating}/5</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500">No testimonials found</div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </TabsContent>

      {/* Blog Tab */}
      <TabsContent value="blog" className="space-y-6 lg:space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-bold">Blog Management</h2>
          <Button>Add New Post</Button>
        </div>

        {isLoading ? (
          <BlogSkeleton />
        ) : (
          <div className="grid gap-6">
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <Card key={post.id} className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      By {post.author} • {post.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{post.excerpt || post.content.substring(0, 150)}...</p>
                    <div className="mt-4 flex justify-between items-center">
                      <Badge variant={post.enabled ? "default" : "outline"}>
                        {post.enabled ? "Published" : "Draft"}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="shadow-lg border-0">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-500">No blog posts found</div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </TabsContent>

      <TabsContent value="settings" className="space-y-6 lg:space-y-8">
        <h2 className="text-xl lg:text-2xl font-bold">Settings</h2>
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Website Settings</CardTitle>
            <CardDescription>Configure general website settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" placeholder="Your Website Name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input id="contactEmail" type="email" placeholder="contact@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" placeholder="+91 1234567890" />
            </div>
            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

// Skeleton loaders for better UX during loading states
function ContentSkeleton() {
  return (
    <div className="grid gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="shadow-lg border-0">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function InquiriesSkeleton() {
  return (
    <div className="grid gap-6">
      {[1, 2].map((i) => (
        <Card key={i} className="shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-32 mb-1" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-24 mt-4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-4 w-24 mt-4 mb-2" />
                <Skeleton className="h-10 w-full" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ToursSkeleton() {
  return (
    <div className="grid gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="shadow-lg border-0">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-1" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-end gap-2">
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-9 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function TestimonialsSkeleton() {
  return (
    <div className="grid gap-6">
      {[1, 2].map((i) => (
        <Card key={i} className="shadow-lg border-0">
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16 w-full mb-4" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-9 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function BlogSkeleton() {
  return (
    <div className="grid gap-6">
      {[1, 2].map((i) => (
        <Card key={i} className="shadow-lg border-0">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-1" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16 w-full mb-4" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-20" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-16" />
                <Skeleton className="h-9 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
