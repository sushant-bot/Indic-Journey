"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Save, Search, Loader2, Filter } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ImageUploader } from "../image-uploader"

interface Tour {
  id?: string
  title: string
  slug: string
  location: string
  duration: string
  group_size: string
  price: string
  original_price?: string
  image?: string
  tour_type: "fixed-departure" | "customized" | "heritage-walk"
  category: string
  rating: number
  reviews: number
  highlights?: string[]
  description?: string
  enabled: boolean
  featured: boolean
}

interface ToursManagerProps {
  setIsLoading: (loading: boolean) => void
}

export default function ToursManager({ setIsLoading }: ToursManagerProps) {
  const [tours, setTours] = useState<Tour[]>([])
  const [filteredTours, setFilteredTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  useEffect(() => {
    loadTours()
  }, [])

  useEffect(() => {
    filterTours()
  }, [tours, searchTerm, filterType])

  const loadTours = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("tours").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setTours(data || [])
      setFilteredTours(data || [])
    } catch (error) {
      console.error("Error loading tours:", error)
      toast({
        title: "Error",
        description: "Failed to load tours",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterTours = () => {
    let filtered = [...tours]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter((tour) => tour.tour_type === filterType)
    }

    setFilteredTours(filtered)
  }

  const saveTour = async (tour: Tour) => {
    setSaving(true)
    setIsLoading(true)
    try {
      let result

      if (tour.id) {
        // Update existing tour
        const { data, error } = await supabase
          .from("tours")
          .update({
            title: tour.title,
            slug: tour.slug,
            location: tour.location,
            duration: tour.duration,
            group_size: tour.group_size,
            price: tour.price,
            original_price: tour.original_price,
            image: tour.image,
            tour_type: tour.tour_type,
            category: tour.category,
            rating: tour.rating,
            reviews: tour.reviews,
            highlights: tour.highlights,
            description: tour.description,
            enabled: tour.enabled,
            featured: tour.featured,
            updated_at: new Date().toISOString(),
          })
          .eq("id", tour.id)
          .select()
          .single()

        if (error) throw error
        result = data

        // Update in state
        setTours(tours.map((t) => (t.id === tour.id ? result : t)))
      } else {
        // Create new tour
        const { data, error } = await supabase
          .from("tours")
          .insert({
            title: tour.title,
            slug: tour.slug,
            location: tour.location,
            duration: tour.duration,
            group_size: tour.group_size,
            price: tour.price,
            original_price: tour.original_price,
            image: tour.image,
            tour_type: tour.tour_type,
            category: tour.category,
            rating: tour.rating,
            reviews: tour.reviews,
            highlights: tour.highlights,
            description: tour.description,
            enabled: tour.enabled,
            featured: tour.featured,
          })
          .select()
          .single()

        if (error) throw error
        result = data

        // Add to state
        setTours([result, ...tours])
      }

      toast({
        title: "Success",
        description: `Tour ${tour.id ? "updated" : "created"} successfully`,
      })

      setIsEditing(false)
      setSelectedTour(null)
    } catch (error) {
      console.error("Error saving tour:", error)
      toast({
        title: "Error",
        description: `Failed to ${tour.id ? "update" : "create"} tour`,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
      setIsLoading(false)
    }
  }

  const deleteTour = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("tours").delete().eq("id", id)

      if (error) throw error

      setTours(tours.filter((t) => t.id !== id))
      toast({
        title: "Success",
        description: "Tour deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting tour:", error)
      toast({
        title: "Error",
        description: "Failed to delete tour",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTour = () => {
    const newTour: Tour = {
      title: "New Tour",
      slug: "new-tour",
      location: "Location",
      duration: "X Days",
      group_size: "2-10 People",
      price: "₹0",
      image: "/placeholder.svg?height=400&width=600",
      tour_type: "fixed-departure",
      category: "Adventure",
      rating: 5,
      reviews: 0,
      highlights: ["Highlight 1", "Highlight 2", "Highlight 3"],
      description: "Tour description goes here",
      enabled: true,
      featured: false,
    }

    setSelectedTour(newTour)
    setIsEditing(true)
  }

  const handleEditTour = (tour: Tour) => {
    setSelectedTour(tour)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setSelectedTour(null)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof Tour, value: any) => {
    if (!selectedTour) return

    setSelectedTour({
      ...selectedTour,
      [field]: value,
    })
  }

  const handleHighlightsChange = (value: string) => {
    if (!selectedTour) return

    setSelectedTour({
      ...selectedTour,
      highlights: value.split("\n").filter((h) => h.trim() !== ""),
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tours Management</h2>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="h-10 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-48 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (isEditing && selectedTour) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{selectedTour.id ? "Edit Tour" : "Add New Tour"}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleCancelEdit} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={() => saveTour(selectedTour)} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Tour
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
                  <Label htmlFor="title">Tour Title</Label>
                  <Input
                    id="title"
                    value={selectedTour.title}
                    onChange={(e) => {
                      handleInputChange("title", e.target.value)
                      // Auto-generate slug if this is a new tour
                      if (!selectedTour.id) {
                        handleInputChange("slug", generateSlug(e.target.value))
                      }
                    }}
                    disabled={saving}
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={selectedTour.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    disabled={saving}
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be used in the URL: /tours/{selectedTour.slug}</p>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={selectedTour.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    disabled={saving}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={selectedTour.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <Label htmlFor="group_size">Group Size</Label>
                    <Input
                      id="group_size"
                      value={selectedTour.group_size}
                      onChange={(e) => handleInputChange("group_size", e.target.value)}
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={selectedTour.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <Label htmlFor="original_price">Original Price (optional)</Label>
                    <Input
                      id="original_price"
                      value={selectedTour.original_price || ""}
                      onChange={(e) => handleInputChange("original_price", e.target.value)}
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tour_type">Tour Type</Label>
                    <Select
                      value={selectedTour.tour_type}
                      onValueChange={(value) => handleInputChange("tour_type", value)}
                      disabled={saving}
                    >
                      <SelectTrigger id="tour_type">
                        <SelectValue placeholder="Select tour type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed-departure">Fixed Departure</SelectItem>
                        <SelectItem value="customized">Customized Holiday</SelectItem>
                        <SelectItem value="heritage-walk">Heritage Walk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={selectedTour.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={selectedTour.rating}
                      onChange={(e) => handleInputChange("rating", Number.parseFloat(e.target.value))}
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reviews">Number of Reviews</Label>
                    <Input
                      id="reviews"
                      type="number"
                      min="0"
                      value={selectedTour.reviews}
                      onChange={(e) => handleInputChange("reviews", Number.parseInt(e.target.value))}
                      disabled={saving}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={selectedTour.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    disabled={saving}
                  />
                </div>

                <div>
                  <Label htmlFor="highlights">Highlights (one per line)</Label>
                  <Textarea
                    id="highlights"
                    value={(selectedTour.highlights || []).join("\n")}
                    onChange={(e) => handleHighlightsChange(e.target.value)}
                    rows={4}
                    disabled={saving}
                  />
                </div>

                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enabled"
                      checked={selectedTour.enabled}
                      onCheckedChange={(checked) => handleInputChange("enabled", checked)}
                      disabled={saving}
                    />
                    <Label htmlFor="enabled">Enabled</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={selectedTour.featured}
                      onCheckedChange={(checked) => handleInputChange("featured", checked)}
                      disabled={saving}
                    />
                    <Label htmlFor="featured">Featured</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Tour Image</Label>
                <ImageUploader
                  currentImage={selectedTour.image || ""}
                  onImageSelected={(url) => handleInputChange("image", url)}
                  folder="tours"
                  disabled={saving}
                />

                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Preview</h3>
                  <div className="aspect-[4/3] relative rounded overflow-hidden mb-3">
                    <img
                      src={selectedTour.image || "/placeholder.svg?height=400&width=600"}
                      alt={selectedTour.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-lg">{selectedTour.title}</h4>
                  <p className="text-sm text-gray-500">{selectedTour.location}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{selectedTour.duration}</span>
                    <span className="font-semibold">{selectedTour.price}</span>
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
        <h2 className="text-2xl font-bold">Tours Management</h2>
        <Button onClick={handleAddTour}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Tour
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full sm:w-64">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>{filterType === "all" ? "All Types" : filterType.replace("-", " ")}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="fixed-departure">Fixed Departure</SelectItem>
              <SelectItem value="customized">Customized Holiday</SelectItem>
              <SelectItem value="heritage-walk">Heritage Walk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTours.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-500">No tours found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className={!tour.enabled ? "opacity-60" : ""}>
              <div className="aspect-[4/3] relative">
                <img
                  src={tour.image || "/placeholder.svg?height=400&width=600"}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  {tour.featured && (
                    <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">Featured</span>
                  )}
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      tour.tour_type === "fixed-departure"
                        ? "bg-blue-100 text-blue-800"
                        : tour.tour_type === "customized"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {tour.tour_type.replace("-", " ")}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg line-clamp-1">{tour.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{tour.location}</p>
                <div className="flex justify-between text-sm mb-4">
                  <span>{tour.duration}</span>
                  <span className="font-semibold">{tour.price}</span>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditTour(tour)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => tour.id && deleteTour(tour.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
