"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Save, Star, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ImageUploader } from "../image-uploader"

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

interface TestimonialsManagerProps {
  setIsLoading: (loading: boolean) => void
}

export default function TestimonialsManager({ setIsLoading }: TestimonialsManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setTestimonials(data || [])
    } catch (error) {
      console.error("Error loading testimonials:", error)
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveTestimonial = async (testimonial: Testimonial) => {
    setSaving(true)
    setIsLoading(true)
    try {
      let result

      if (testimonial.id) {
        // Update existing testimonial
        const { data, error } = await supabase
          .from("testimonials")
          .update({
            name: testimonial.name,
            location: testimonial.location,
            rating: testimonial.rating,
            text: testimonial.text,
            tour: testimonial.tour,
            image: testimonial.image,
            enabled: testimonial.enabled,
            updated_at: new Date().toISOString(),
          })
          .eq("id", testimonial.id)
          .select()
          .single()

        if (error) throw error
        result = data

        // Update in state
        setTestimonials(testimonials.map((t) => (t.id === testimonial.id ? result : t)))
      } else {
        // Create new testimonial
        const { data, error } = await supabase
          .from("testimonials")
          .insert({
            name: testimonial.name,
            location: testimonial.location,
            rating: testimonial.rating,
            text: testimonial.text,
            tour: testimonial.tour,
            image: testimonial.image,
            enabled: testimonial.enabled,
          })
          .select()
          .single()

        if (error) throw error
        result = data

        // Add to state
        setTestimonials([result, ...testimonials])
      }

      toast({
        title: "Success",
        description: `Testimonial ${testimonial.id ? "updated" : "created"} successfully`,
      })

      setIsEditing(false)
      setSelectedTestimonial(null)
    } catch (error) {
      console.error("Error saving testimonial:", error)
      toast({
        title: "Error",
        description: `Failed to ${testimonial.id ? "update" : "create"} testimonial`,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
      setIsLoading(false)
    }
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id)

      if (error) throw error

      setTestimonials(testimonials.filter((t) => t.id !== id))
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTestimonial = () => {
    const newTestimonial: Testimonial = {
      name: "New Customer",
      location: "City, Country",
      rating: 5,
      text: "This was an amazing experience!",
      tour: "Tour Name",
      enabled: true,
    }

    setSelectedTestimonial(newTestimonial)
    setIsEditing(true)
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setSelectedTestimonial(null)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof Testimonial, value: any) => {
    if (!selectedTestimonial) return

    setSelectedTestimonial({
      ...selectedTestimonial,
      [field]: value,
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Testimonials Management</h2>
        </div>
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
      </div>
    )
  }

  if (isEditing && selectedTestimonial) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{selectedTestimonial.id ? "Edit Testimonial" : "Add New Testimonial"}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleCancelEdit} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={() => saveTestimonial(selectedTestimonial)} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Testimonial
                </>
              )}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    value={selectedTestimonial.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={saving}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={selectedTestimonial.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    disabled={saving}
                  />
                </div>

                <div>
                  <Label htmlFor="tour">Tour Name</Label>
                  <Input
                    id="tour"
                    value={selectedTestimonial.tour || ""}
                    onChange={(e) => handleInputChange("tour", e.target.value)}
                    disabled={saving}
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Select
                    value={selectedTestimonial.rating.toString()}
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

                <div>
                  <Label htmlFor="text">Testimonial Text</Label>
                  <Textarea
                    id="text"
                    value={selectedTestimonial.text}
                    onChange={(e) => handleInputChange("text", e.target.value)}
                    rows={5}
                    disabled={saving}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enabled"
                    checked={selectedTestimonial.enabled}
                    onCheckedChange={(checked) => handleInputChange("enabled", checked)}
                    disabled={saving}
                  />
                  <Label htmlFor="enabled">Enabled</Label>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Customer Image (Optional)</Label>
                <ImageUploader
                  currentImage={selectedTestimonial.image || ""}
                  onImageSelected={(url) => handleInputChange("image", url)}
                  folder="testimonials"
                  disabled={saving}
                />

                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Preview</h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {selectedTestimonial.image ? (
                        <img
                          src={selectedTestimonial.image || "/placeholder.svg"}
                          alt={selectedTestimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          {selectedTestimonial.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold">{selectedTestimonial.name}</h4>
                        <span className="text-xs text-gray-500 ml-2">{selectedTestimonial.location}</span>
                      </div>
                      <div className="flex text-yellow-400 my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < selectedTestimonial.rating ? "fill-current" : "stroke-current fill-none"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{selectedTestimonial.text}</p>
                      {selectedTestimonial.tour && (
                        <p className="text-xs text-gray-500 mt-2">Tour: {selectedTestimonial.tour}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Testimonials Management</h2>
        <Button onClick={handleAddTestimonial}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-500">No testimonials found</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
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
                    <Button variant="outline" size="sm" onClick={() => handleEditTestimonial(testimonial)}>
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
    </div>
  )
}
