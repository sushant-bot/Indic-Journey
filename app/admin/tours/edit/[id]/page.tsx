"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { TourImageManager } from "@/components/admin/tour-image-manager"
import { Loader2, ArrowLeft, Save, Calendar, MapPin, Clock, DollarSign, Info, X, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
}

interface TourImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

interface Tour {
  id: string
  title: string
  slug: string
  description: string
  content: string
  price: number
  sale_price?: number
  duration: string
  location: string
  image: string
  images?: TourImage[]
  category_id: string
  featured: boolean
  featured_order: number | null
  enabled: boolean
  start_date?: string | null
  end_date?: string | null
  max_people?: number | null
  min_people?: number | null
  included_services?: string[]
  excluded_services?: string[]
  highlights?: string[]
  tags?: string[]
  meta_title?: string
  meta_description?: string
}

export default function EditTourPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [tour, setTour] = useState<Tour | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<TourImage[]>([])
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [newTag, setNewTag] = useState("")
  const [newHighlight, setNewHighlight] = useState("")
  const [newIncluded, setNewIncluded] = useState("")
  const [newExcluded, setNewExcluded] = useState("")

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const supabase = createClient()
        console.log("Fetching tour with ID:", params.id)

        const { data, error } = await supabase.from("tours").select("*").eq("id", params.id).single()

        if (error) {
          console.error("Supabase error fetching tour:", error)
          throw new Error(`Database error: ${error.message}`)
        }

        if (!data) {
          throw new Error("Tour not found")
        }

        console.log("Tour data fetched:", data)

        // Parse JSON fields if they exist
        const parsedTour = {
          ...data,
          images: data.images ? (typeof data.images === "string" ? JSON.parse(data.images) : data.images) : [],
          included_services: data.included_services
            ? typeof data.included_services === "string"
              ? JSON.parse(data.included_services)
              : data.included_services
            : [],
          excluded_services: data.excluded_services
            ? typeof data.excluded_services === "string"
              ? JSON.parse(data.excluded_services)
              : data.excluded_services
            : [],
          highlights: data.highlights
            ? typeof data.highlights === "string"
              ? JSON.parse(data.highlights)
              : data.highlights
            : [],
          tags: data.tags ? (typeof data.tags === "string" ? JSON.parse(data.tags) : data.tags) : [],
        }

        setTour(parsedTour)

        // Set images
        if (parsedTour.images && parsedTour.images.length > 0) {
          setImages(parsedTour.images)
        } else if (parsedTour.image) {
          // Create a single image from the main image field
          setImages([
            {
              id: "main-image",
              url: parsedTour.image,
              alt: parsedTour.title,
              isPrimary: true,
            },
          ])
        }

        // Set dates if they exist
        if (parsedTour.start_date) {
          setStartDate(new Date(parsedTour.start_date))
        }
        if (parsedTour.end_date) {
          setEndDate(new Date(parsedTour.end_date))
        }
      } catch (error) {
        console.error("Error fetching tour:", error)
        setError(error instanceof Error ? error.message : "Failed to load tour details")
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load tour details",
          variant: "destructive",
        })
      }
    }

    const fetchCategories = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("tour_categories").select("id, name").order("name")

        if (error) {
          throw new Error(`Database error: ${error.message}`)
        }

        setCategories(data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast({
          title: "Warning",
          description: "Failed to load categories. You can still edit other tour details.",
          variant: "default",
        })
      }
    }

    Promise.all([fetchTour(), fetchCategories()])
      .catch((err) => console.error("Error in Promise.all:", err))
      .finally(() => setLoading(false))
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTour((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTour((prev) => (prev ? { ...prev, [name]: value === "" ? null : Number(value) } : null))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTour((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setTour((prev) => (prev ? { ...prev, [name]: checked } : null))
  }

  const handleImagesChange = (newImages: TourImage[]) => {
    setImages(newImages)

    // Update the main image with the primary image
    const primaryImage = newImages.find((img) => img.isPrimary)
    if (primaryImage && tour) {
      setTour({
        ...tour,
        image: primaryImage.url,
      })
    }
  }

  const addTag = () => {
    if (!newTag.trim()) return
    if (!tour) return

    const updatedTags = [...(tour.tags || []), newTag.trim()]
    setTour({
      ...tour,
      tags: updatedTags,
    })
    setNewTag("")
  }

  const removeTag = (index: number) => {
    if (!tour || !tour.tags) return

    const updatedTags = [...tour.tags]
    updatedTags.splice(index, 1)
    setTour({
      ...tour,
      tags: updatedTags,
    })
  }

  const addHighlight = () => {
    if (!newHighlight.trim()) return
    if (!tour) return

    const updatedHighlights = [...(tour.highlights || []), newHighlight.trim()]
    setTour({
      ...tour,
      highlights: updatedHighlights,
    })
    setNewHighlight("")
  }

  const removeHighlight = (index: number) => {
    if (!tour || !tour.highlights) return

    const updatedHighlights = [...tour.highlights]
    updatedHighlights.splice(index, 1)
    setTour({
      ...tour,
      highlights: updatedHighlights,
    })
  }

  const addIncluded = () => {
    if (!newIncluded.trim()) return
    if (!tour) return

    const updatedIncluded = [...(tour.included_services || []), newIncluded.trim()]
    setTour({
      ...tour,
      included_services: updatedIncluded,
    })
    setNewIncluded("")
  }

  const removeIncluded = (index: number) => {
    if (!tour || !tour.included_services) return

    const updatedIncluded = [...tour.included_services]
    updatedIncluded.splice(index, 1)
    setTour({
      ...tour,
      included_services: updatedIncluded,
    })
  }

  const addExcluded = () => {
    if (!newExcluded.trim()) return
    if (!tour) return

    const updatedExcluded = [...(tour.excluded_services || []), newExcluded.trim()]
    setTour({
      ...tour,
      excluded_services: updatedExcluded,
    })
    setNewExcluded("")
  }

  const removeExcluded = (index: number) => {
    if (!tour || !tour.excluded_services) return

    const updatedExcluded = [...tour.excluded_services]
    updatedExcluded.splice(index, 1)
    setTour({
      ...tour,
      excluded_services: updatedExcluded,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tour) return

    setSaving(true)
    try {
      const supabase = createClient()

      // Prepare the data for update
      const updateData = {
        ...tour,
        images: JSON.stringify(images),
        start_date: startDate ? format(startDate, "yyyy-MM-dd") : null,
        end_date: endDate ? format(endDate, "yyyy-MM-dd") : null,
        updated_at: new Date().toISOString(),
        // Ensure arrays are stored as JSON strings
        included_services: JSON.stringify(tour.included_services || []),
        excluded_services: JSON.stringify(tour.excluded_services || []),
        highlights: JSON.stringify(tour.highlights || []),
        tags: JSON.stringify(tour.tags || []),
      }

      const { data, error } = await supabase.from("tours").update(updateData).eq("id", params.id).select().single()

      if (error) {
        throw new Error(`Failed to update tour: ${error.message}`)
      }

      toast({
        title: "Success",
        description: "Tour updated successfully",
      })
      router.push("/admin/tours")
    } catch (error) {
      console.error("Error updating tour:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update tour",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="mt-2">{error}</p>
        <Button onClick={() => router.push("/admin/tours")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tours
        </Button>
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Tour not found</h1>
        <p className="mt-2">The requested tour could not be found or may have been deleted.</p>
        <Button onClick={() => router.push("/admin/tours")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tours
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" onClick={() => router.push("/admin/tours")} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Edit Tour</h1>
        </div>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="basic" className="flex items-center">
              <Info className="h-4 w-4 mr-2" /> Basic Info
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" /> Details
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              Images
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Features
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              SEO
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0-2.73.73l-.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the core details about this tour</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tour Title</Label>
                    <Input id="title" name="title" value={tour.title || ""} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input id="slug" name="slug" value={tour.slug || ""} onChange={handleInputChange} required />
                    <p className="text-xs text-muted-foreground">
                      This will be used in the URL: yoursite.com/tours/
                      <span className="font-mono">{tour.slug || "example-slug"}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={tour.description || ""}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Brief overview of the tour (displayed in listings)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Keep this concise (150-200 characters) for tour listings and previews
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Full Description</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={tour.content || ""}
                    onChange={handleInputChange}
                    rows={10}
                    placeholder="Detailed description of the tour experience"
                  />
                  <p className="text-xs text-muted-foreground">You can use markdown formatting for rich text</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" /> Pricing & Duration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Regular Price (₹)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={tour.price || 0}
                        onChange={handleNumberChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sale_price">Sale Price (₹)</Label>
                      <Input
                        id="sale_price"
                        name="sale_price"
                        type="number"
                        value={tour.sale_price || ""}
                        onChange={handleNumberChange}
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={tour.duration || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., 5 Days / 4 Nights"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="min_people">Minimum People</Label>
                      <Input
                        id="min_people"
                        name="min_people"
                        type="number"
                        value={tour.min_people || ""}
                        onChange={handleNumberChange}
                        placeholder="Optional"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max_people">Maximum People</Label>
                      <Input
                        id="max_people"
                        name="max_people"
                        type="number"
                        value={tour.max_people || ""}
                        onChange={handleNumberChange}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" /> Location & Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={tour.location || ""}
                      onChange={handleInputChange}
                      placeholder="e.g., Jaipur, Rajasthan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={tour.category_id || ""}
                      onValueChange={(value) => handleSelectChange("category_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tour.tags?.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center text-sm"
                        >
                          <span>{tag}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => removeTag(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        className="flex-grow"
                      />
                      <Button type="button" onClick={addTag} size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" /> Tour Dates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground",
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground",
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            disabled={(date) => (startDate ? date < startDate : false)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Tour Images</CardTitle>
                <CardDescription>
                  Upload and manage images for this tour. The primary image will be used as the main display image.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TourImageManager tourId={tour.id} initialImages={images} onImagesChange={handleImagesChange} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tour Highlights</CardTitle>
                  <CardDescription>Key features that make this tour special</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {tour.highlights?.map((highlight, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <span>{highlight}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeHighlight(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {(!tour.highlights || tour.highlights.length === 0) && (
                      <p className="text-sm text-muted-foreground italic">No highlights added yet</p>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Input
                        value={newHighlight}
                        onChange={(e) => setNewHighlight(e.target.value)}
                        placeholder="Add a highlight"
                        className="flex-grow"
                      />
                      <Button type="button" onClick={addHighlight}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Included Services</CardTitle>
                  <CardDescription>Services included in the tour price</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {tour.included_services?.map((service, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <span>{service}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeIncluded(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {(!tour.included_services || tour.included_services.length === 0) && (
                      <p className="text-sm text-muted-foreground italic">No included services added yet</p>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Input
                        value={newIncluded}
                        onChange={(e) => setNewIncluded(e.target.value)}
                        placeholder="Add included service"
                        className="flex-grow"
                      />
                      <Button type="button" onClick={addIncluded}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Excluded Services</CardTitle>
                  <CardDescription>Services not included in the tour price</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {tour.excluded_services?.map((service, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <span>{service}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExcluded(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {(!tour.excluded_services || tour.excluded_services.length === 0) && (
                      <p className="text-sm text-muted-foreground italic">No excluded services added yet</p>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Input
                        value={newExcluded}
                        onChange={(e) => setNewExcluded(e.target.value)}
                        placeholder="Add excluded service"
                        className="flex-grow"
                      />
                      <Button type="button" onClick={addExcluded}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize this tour for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    name="meta_title"
                    value={tour.meta_title || ""}
                    onChange={handleInputChange}
                    placeholder="SEO title (leave blank to use tour title)"
                  />
                  <p className="text-xs text-muted-foreground">Recommended length: 50-60 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    name="meta_description"
                    value={tour.meta_description || ""}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="SEO description (leave blank to use tour description)"
                  />
                  <p className="text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Tour Settings</CardTitle>
                <CardDescription>Configure visibility and featured status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Featured Tour</h3>
                    <p className="text-sm text-muted-foreground">
                      Display this tour in the featured section on the homepage
                    </p>
                  </div>
                  <Switch
                    checked={tour.featured || false}
                    onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  />
                </div>

                {tour.featured && (
                  <div className="space-y-2">
                    <Label htmlFor="featured_order">Featured Order</Label>
                    <Input
                      id="featured_order"
                      name="featured_order"
                      type="number"
                      value={tour.featured_order || 0}
                      onChange={handleNumberChange}
                      placeholder="Display order (lower numbers appear first)"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Enable Tour</h3>
                    <p className="text-sm text-muted-foreground">Make this tour visible on the website</p>
                  </div>
                  <Switch
                    checked={tour.enabled || false}
                    onCheckedChange={(checked) => handleSwitchChange("enabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
