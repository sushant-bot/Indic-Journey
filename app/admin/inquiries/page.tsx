"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Search, Eye, Trash2, Mail, Phone, Calendar, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  tour_name?: string
  status: "new" | "contacted" | "resolved" | "archived"
  created_at: string
  updated_at: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentInquiry, setCurrentInquiry] = useState<Inquiry | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadInquiries()
  }, [])

  useEffect(() => {
    filterInquiries()
  }, [inquiries, searchTerm, statusFilter])

  const loadInquiries = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/inquiries")
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to load inquiries")
      }

      const data = result.data

      setInquiries(data || [])
      setFilteredInquiries(data || [])
    } catch (error: any) {
      console.error("Error loading inquiries:", error)
      toast.error("Failed to load inquiries: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const filterInquiries = () => {
    let filtered = [...inquiries]

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (inquiry.tour_name && inquiry.tour_name.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredInquiries(filtered)
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return

    try {
      const response = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to delete inquiry")
      }

      setInquiries(inquiries.filter((inquiry) => inquiry.id !== id))
      toast.success("Inquiry deleted successfully")
    } catch (error: any) {
      console.error("Error deleting inquiry:", error)
      toast.error("Failed to delete inquiry: " + error.message)
    }
  }

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to update inquiry status")
      }

      setInquiries(inquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, status: status as any } : inquiry)))
      toast.success("Inquiry status updated")
    } catch (error: any) {
      console.error("Error updating inquiry status:", error)
      toast.error("Failed to update inquiry status: " + error.message)
    }
  }

  const viewInquiry = (inquiry: Inquiry) => {
    setCurrentInquiry(inquiry)
    setIsDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>
      case "contacted":
        return <Badge className="bg-yellow-500">Contacted</Badge>
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>
      case "archived":
        return <Badge variant="outline">Archived</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AdminLayout title="Inquiries Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Inquiries</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-grow">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-64 mb-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <Skeleton className="h-5 w-24" />
                      <div className="flex gap-2">
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredInquiries.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 my-8">No inquiries found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{inquiry.name}</h3>
                        {getStatusBadge(inquiry.status)}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <Mail className="h-3 w-3 mr-1" />
                        <span className="mr-3">{inquiry.email}</span>
                        <Phone className="h-3 w-3 mr-1" />
                        <span>{inquiry.phone}</span>
                      </div>
                      {inquiry.tour_name && (
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Tour:</span> {inquiry.tour_name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(inquiry.created_at)}</span>
                        <Clock className="h-3 w-3 ml-2 mr-1" />
                        <span>{formatTime(inquiry.created_at)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewInquiry(inquiry)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteInquiry(inquiry.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Select
                          value={inquiry.status}
                          onValueChange={(value) => updateInquiryStatus(inquiry.id, value)}
                        >
                          <SelectTrigger className="h-9 w-[130px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            {currentInquiry && (
              <>
                <DialogHeader>
                  <DialogTitle>Inquiry from {currentInquiry.name}</DialogTitle>
                  <DialogDescription>
                    Received on {formatDate(currentInquiry.created_at)} at {formatTime(currentInquiry.created_at)}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Email</p>
                      <p className="text-sm">{currentInquiry.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Phone</p>
                      <p className="text-sm">{currentInquiry.phone}</p>
                    </div>
                  </div>

                  {currentInquiry.tour_name && (
                    <div>
                      <p className="text-sm font-medium mb-1">Tour</p>
                      <p className="text-sm">{currentInquiry.tour_name}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-1">Message</p>
                    <div className="border rounded-md p-3 bg-gray-50">
                      <p className="text-sm whitespace-pre-wrap">{currentInquiry.message}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Status</p>
                    <Select
                      value={currentInquiry.status}
                      onValueChange={(value) => updateInquiryStatus(currentInquiry.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Close
                  </Button>
                  <Button asChild>
                    <a href={`mailto:${currentInquiry.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Reply via Email
                    </a>
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
