"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Plus, Save, Star, Loader2, Search } from "lucide-react"
import { ImageUploader } from "@/components/admin/image-uploader"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Testimonial {
  id?: string
  name: string
  location: string
  rating: number
  text: string
  tour?: string
  image?: string
  enabled: boolean
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial>({
    name: "",
    location: "",
    rating: 5,
    text: "",
    tour: "",
    enabled: true,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadTestimonials()
  }, [])

  useEffect(() => {
    filterTestimonials()
  }, [testimonials, searchTerm])

  const loadTestimonials = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setTestimonials(data || [])
      setFilteredTestimonials(data || [])
    } catch (error) {
      console.error("Error loading testimonials:", error)
      toast.error("Failed to load testimonials")
    } finally {
      setLoading(false)
    }
  }

  const filterTestimonials = () => {
    if (!searchTerm) {
      setFilteredTestimonials(testimonials)
      return
    }

    const filtered = testimonials.filter(
      (testimonial) =>
        testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (testimonial.tour && testimonial.tour.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredTestimonials(filtered)
  }

  const saveTestimonial = async () => {
    if (!currentTestimonial.name || !currentTestimonial.text) {
      toast.error("Name and testimonial text are required")
      return
    }

    setSaving(true)
    try {
      let result

      if (isEditing && currentTestimonial.id) {
        // Update existing testimonial
        const { data, error } = await supabase
          .from("testimonials")
          .update({
            name: currentTestimonial.name,
            location: currentTestimonial.location,
            rating: currentTestimonial.rating,
            text: currentTestimonial.text,
            tour: currentTestimonial.tour,
            image: currentTestimonial.image,
            enabled: currentTestimonial.enabled,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentTestimonial.id)
          .select()
          .single()

        if (error) throw error
        result = data

        // Update in state
        setTestimonials(testimonials.map((t) => (t.id === currentTestimonial.id ? result : t)))
      } else {
        // Create new testimonial
        const { data, error } = await supabase
          .from("testimonials")
          .insert({
            name: currentTestimonial.name,
            location: currentTestimonial.location,
            rating: currentTestimonial.rating,
            text: currentTestimonial.text,
            tour: currentTestimonial.tour,
            image: currentTestimonial.image,
            enabled: currentTestimonial.enabled,
          })
          .select()
          .single()

        if (error) throw error
        result = data

        // Add to state
        setTestimonials([result, ...testimonials])
      }

      toast.success(`Testimonial ${isEditing ? "updated" : "created"} successfully`)
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving testimonial:", error)
      toast.error(`Failed to ${isEditing ? "update" : "create"} testimonial`)
    } finally {
      setSaving(false)
    }
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id)

      if (error) throw error

      setTestimonials(testimonials.filter((t) => t.id !== id))
      toast.success("Testimonial deleted successfully")
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      toast.error("Failed to delete testimonial")
    }
  }

  const editTestimonial = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const addNewTestimonial = () => {
    resetForm()
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentTestimonial({
      name: "",
      location: "",
      rating: 5,
      text: "",
      tour: "",
      enabled: true,
    })
  }

  const handleInputChange = (field: keyof Testimonial, value: any) => {
    setCurrentTestimonial({
      ...currentTestimonial,
      [field]: value,
    })
  }

  return (
    <AdminLayout title="Testimonials Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={addNewTestimonial}>
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-16 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 my-8">No testimonials found</p>
              <Button onClick={addNewTestimonial}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Testimonial
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className={!testimonial.enabled ? "opacity-60" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                      <div className="flex text-yellow-400 my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < testimonial.rating ? "fill-current" : "stroke-current fill-none"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{testimonial.text}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{testimonial.tour || "General Feedback"}</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => editTestimonial(testimonial)}>
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => testimonial.id && deleteTestimonial(testimonial.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update the testimonial information below"
                  : "Fill in the details to add a new testimonial"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    value={currentTestimonial.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={saving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={currentTestimonial.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select
                    value={currentTestimonial.rating.toString()}
                    onValueChange={(value) => handleInputChange("rating", Number.parseInt(value))}
                    disabled={saving}
                  >
                    <SelectTrigger id="rating">
                      <SelectValue placeholder="Select rating" />
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
                <div className="space-y-2">
                  <Label htmlFor="tour">Tour Name (Optional)</Label>
                  <Input
                    id="tour"
                    value={currentTestimonial.tour || ""}
                    onChange={(e) => handleInputChange("tour", e.target.value)}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="text">Testimonial Text</Label>
                <Textarea
                  id="text"
                  value={currentTestimonial.text}
                  onChange={(e) => handleInputChange("text", e.target.value)}
                  rows={4}
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label>Customer Image (Optional)</Label>
                <ImageUploader
                  currentImage={currentTestimonial.image || ""}
                  onImageSelected={(url) => handleInputChange("image", url)}
                  folder="testimonials"
                  disabled={saving}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enabled"
                  checked={currentTestimonial.enabled}
                  onCheckedChange={(checked) => handleInputChange("enabled", checked)}
                  disabled={saving}
                />
                <Label htmlFor="enabled">Enabled</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={saveTestimonial} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? "Update" : "Save"}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
