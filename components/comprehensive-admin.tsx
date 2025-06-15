"use client"

import { useState, useEffect } from "react"
import { getInquiries } from "@/lib/supabase-queries"
import type { Tour, Inquiry } from "@/lib/supabase"
import { useWebsiteContent } from "@/lib/website-content"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function ComprehensiveAdmin() {
  const websiteContent = useWebsiteContent()

  const [tours, setTours] = useState<Tour[]>([])
  const [saveStatus, setSaveStatus] = useState<{
    status: "idle" | "success" | "error"
    message: string
  }>({ status: "idle", message: "" })
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  useEffect(() => {
    // Load data from Supabase when component mounts
    const loadData = async () => {
      try {
        const [contentResult, inquiriesResult] = await Promise.all([websiteContent.loadFromSupabase(), getInquiries()])

        if (inquiriesResult) {
          setInquiries(inquiriesResult)
        }
      } catch (error) {
        console.error("Error loading admin data:", error)
      }
    }

    loadData()
  }, [])

  const handleContentChange = (key: keyof typeof websiteContent.content, value: string) => {
    websiteContent.updateContent(key, value)
  }

  const handleSaveContent = async () => {
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
        setSaveStatus({ status: "success", message: "Inquiry status updated successfully!" })
      } else {
        setSaveStatus({ status: "error", message: "Failed to update inquiry status" })
      }
    } catch (error) {
      console.error("Error updating inquiry status:", error)
      setSaveStatus({ status: "error", message: "Error updating inquiry status" })
    }
  }

  return (
    <Tabs defaultValue="content" className="w-[90vw] lg:w-[80vw] space-y-4">
      <TabsList>
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
          Inquiries ({inquiries.filter((i) => i.status === "new").length})
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xs lg:text-sm"
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="content" className="space-y-6 lg:space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-bold font-poppins">Website Content</h2>
          <Button onClick={handleSaveContent}>Save Content</Button>
        </div>

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
                    value={websiteContent.content.heroTitle}
                    onChange={(e) => handleContentChange("heroTitle", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="heroSubtitle">Subtitle</Label>
                  <Textarea
                    id="heroSubtitle"
                    value={websiteContent.content.heroSubtitle}
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
                    value={websiteContent.content.aboutTitle}
                    onChange={(e) => handleContentChange("aboutTitle", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="aboutDescription">Description</Label>
                  <Textarea
                    id="aboutDescription"
                    value={websiteContent.content.aboutDescription}
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
                    value={websiteContent.content.contactTitle}
                    onChange={(e) => handleContentChange("contactTitle", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactDescription">Description</Label>
                  <Textarea
                    id="contactDescription"
                    value={websiteContent.content.contactDescription}
                    onChange={(e) => handleContentChange("contactDescription", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Inquiries Management */}
      <TabsContent value="inquiries" className="space-y-6 lg:space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl lg:text-2xl font-bold font-poppins">Inquiries Management</h2>
          <div className="flex gap-2">
            <Button variant={selectedInquiry ? "default" : "outline"} onClick={() => setSelectedInquiry(null)}>
              All ({inquiries.length})
            </Button>
            <Button variant="outline" className="text-red-600 border-red-200">
              New ({inquiries.filter((i) => i.status === "new").length})
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id} className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold font-poppins flex items-center justify-between">
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
                        Email
                      </Button>
                      {inquiry.phone && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`tel:${inquiry.phone}`, "_blank")}
                        >
                          Call
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`https://wa.me/${inquiry.phone?.replace(/[^0-9]/g, "")}`, "_blank")}
                      >
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {inquiries.length === 0 && (
            <Card className="shadow-lg border-0">
              <CardContent className="p-8 text-center">
                <div className="text-gray-500">No inquiries found</div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>

      <TabsContent value="settings" className="space-y-6 lg:space-y-8">
        <h2 className="text-xl lg:text-2xl font-bold font-poppins">Settings</h2>
        <p>Here you can manage various settings for the website.</p>
      </TabsContent>
    </Tabs>
  )
}
