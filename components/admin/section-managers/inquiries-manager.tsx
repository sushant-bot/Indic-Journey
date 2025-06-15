"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, Mail, Phone, Calendar, Loader2, Check, X } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  tour?: string
  status: "new" | "contacted" | "booked" | "closed"
  created_at: string
  notes?: string
}

interface InquiriesManagerProps {
  setIsLoading: (loading: boolean) => void
}

export default function InquiriesManager({ setIsLoading }: InquiriesManagerProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [notes, setNotes] = useState("")

  useEffect(() => {
    loadInquiries()
  }, [])

  useEffect(() => {
    filterInquiries()
  }, [inquiries, searchTerm, statusFilter])

  const loadInquiries = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setInquiries(data || [])
      setFilteredInquiries(data || [])
    } catch (error) {
      console.error("Error loading inquiries:", error)
      toast({
        title: "Error",
        description: "Failed to load inquiries",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterInquiries = () => {
    let filtered = [...inquiries]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.phone.includes(searchTerm) ||
          (inquiry.message && inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter)
    }

    setFilteredInquiries(filtered)
  }

  const updateInquiryStatus = async (id: string, status: "new" | "contacted" | "booked" | "closed") => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error

      // Update in state
      setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)))

      toast({
        title: "Success",
        description: "Inquiry status updated successfully",
      })
    } catch (error) {
      console.error("Error updating inquiry status:", error)
      toast({
        title: "Error",
        description: "Failed to update inquiry status",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveNotes = async () => {
    if (!selectedInquiry) return

    setSaving(true)
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({
          notes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedInquiry.id)

      if (error) throw error

      // Update in state
      setInquiries(inquiries.map((inq) => (inq.id === selectedInquiry.id ? { ...inq, notes } : inq)))

      toast({
        title: "Success",
        description: "Notes saved successfully",
      })
    } catch (error) {
      console.error("Error saving notes:", error)
      toast({
        title: "Error",
        description: "Failed to save notes",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
      setIsLoading(false)
    }
  }

  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry)
    setNotes(inquiry.notes || "")
    setIsViewOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>
      case "contacted":
        return <Badge className="bg-yellow-500">Contacted</Badge>
      case "booked":
        return <Badge className="bg-green-500">Booked</Badge>
      case "closed":
        return <Badge className="bg-gray-500">Closed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Inquiries Management</h2>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inquiries Management</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full sm:w-64">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>{statusFilter === "all" ? "All Statuses" : statusFilter}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-500">No inquiries found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{inquiry.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        <span>{inquiry.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        <span>{inquiry.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(inquiry.created_at)}</span>
                      </div>
                    </div>
                    {inquiry.tour && (
                      <p className="text-sm">
                        <span className="font-medium">Tour:</span> {inquiry.tour}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(inquiry.status)}
                    <Button variant="outline" size="sm" onClick={() => handleViewInquiry(inquiry)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        {selectedInquiry && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Inquiry from {selectedInquiry.name}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">Name</Label>
                  <p className="font-medium">{selectedInquiry.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Status</Label>
                  <div>{getStatusBadge(selectedInquiry.status)}</div>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Email</Label>
                  <p className="font-medium">{selectedInquiry.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Phone</Label>
                  <p className="font-medium">{selectedInquiry.phone}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Date</Label>
                  <p className="font-medium">{formatDate(selectedInquiry.created_at)}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">Tour</Label>
                  <p className="font-medium">{selectedInquiry.tour || "Not specified"}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-500">Message</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p>{selectedInquiry.message}</p>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-500">Update Status</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Button
                    size="sm"
                    variant={selectedInquiry.status === "new" ? "default" : "outline"}
                    onClick={() => updateInquiryStatus(selectedInquiry.id, "new")}
                  >
                    New
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedInquiry.status === "contacted" ? "default" : "outline"}
                    onClick={() => updateInquiryStatus(selectedInquiry.id, "contacted")}
                  >
                    Contacted
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedInquiry.status === "booked" ? "default" : "outline"}
                    onClick={() => updateInquiryStatus(selectedInquiry.id, "booked")}
                  >
                    Booked
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedInquiry.status === "closed" ? "default" : "outline"}
                    onClick={() => updateInquiryStatus(selectedInquiry.id, "closed")}
                  >
                    Closed
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
              <Button onClick={saveNotes} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Save Notes
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
