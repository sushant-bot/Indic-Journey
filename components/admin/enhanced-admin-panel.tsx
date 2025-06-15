"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Upload, Save, Trash2, Plus, MapPin, Star, BookOpen, Loader2, Edit, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

// Types
interface TourCategory {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  display_order: number
  enabled: boolean
}

interface Tour {
  id: string
  title: string
  slug: string
  location: string
  duration: string
  group_size: string
  price: string
  original_price?: string
  image?: string
  category_id: string
  category?: {
    id: string
    name: string
    slug: string
  }
  rating: number
  reviews: number
  highlights?: string[]
  description?: string
  itinerary?: any[]
  inclusions?: string[]
  exclusions?: string[]
  discount?: string
  enabled: boolean
  featured: boolean
}

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  tour?: string
  image?: string
  enabled: boolean
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt?: string
  content: string
  image?: string
  author: string
  category: string
  read_time?: string
  trending: boolean
  enabled: boolean
}

interface HeroSlide {
  title: string
  subtitle: string
  image: string
  accent: string
  location: string
  link: string
}

interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  tour_type?: string
  destination?: string
  travel_dates?: string
  group_size?: number
  budget?: string
  message?: string
  status: "new" | "contacted" | "quoted" | "booked" | "cancelled"
  created_at: string
}

export function EnhancedAdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(false)
  const [tourCategories, setTourCategories] = useState<TourCategory[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)
  const [selectedSlide, setSelectedSlide] = useState<HeroSlide | null>(null)
  const [isEditingCategory, setIsEditingCategory] = useState(false)
  const [isEditingTour, setIsEditingTour] = useState(false)
  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false)
  const [isEditingBlogPost, setIsEditingBlogPost] = useState(false)
  const [isEditingSlide, setIsEditingSlide] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: string } | null>(null)
  const router = useRouter()

  // Load data
  useEffect(() => {
    if (activeTab === "dashboard" || activeTab === "categories") {
      loadTourCategories()
    }
    if (activeTab === "dashboard" || activeTab === "tours") {
      loadTours()
    }
    if (activeTab === "dashboard" || activeTab === "testimonials") {
      loadTestimonials()
    }
    if (activeTab === "dashboard" || activeTab === "blog") {
      loadBlogPosts()
    }
    if (activeTab === "dashboard" || activeTab === "hero") {
      loadHeroSlides()
    }
    if (activeTab === "dashboard" || activeTab === "inquiries") {
      loadInquiries()
    }
  }, [activeTab])

  // Load tour categories
  const loadTourCategories = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase
        .from("tour_categories")
        .select("*")
        .order("display_order", { ascending: true })

      if (data) {
        setTourCategories(data)
      }
    } catch (error) {
      console.error("Error loading tour categories:", error)
      toast({
        title: "Error",
        description: "Failed to load tour categories",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load tours
  const loadTours = async (categoryId?: string) => {
    setIsLoading(true)
    try {
      let query = supabase.from("tours").select(`
        *,
        category:tour_categories(id, name, slug)
      `)

      if (categoryId) {
        query = query.eq("category_id", categoryId)
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        setTours(data)
      }
    } catch (error) {
      console.error("Error loading tours:", error)
      toast({
        title: "Error",
        description: "Failed to load tours",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load testimonials
  const loadTestimonials = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

      if (data) {
        setTestimonials(data)
      }
    } catch (error) {
      console.error("Error loading testimonials:", error)
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load blog posts
  const loadBlogPosts = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

      if (data) {
        setBlogPosts(data)
      }
    } catch (error) {
      console.error("Error loading blog posts:", error)
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load hero slides
  const loadHeroSlides = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase.from("website_content").select("*").eq("section", "hero").single()

      if (data && data.content && data.content.slides) {
        setHeroSlides(data.content.slides)
      } else {
        // Default slides if none exist
        setHeroSlides([
          {
            title: "Dev Bhoomi Uttarakhand",
            subtitle: "Enchanting Experiences on this Spiritual Canvas",
            image: "/images/tera-manzil-temple.jpg",
            accent: "Experience the Divine",
            location: "Tera Manzila Mandir, Rishikesh",
            link: "/contact",
          },
        ])
      }
    } catch (error) {
      console.error("Error loading hero slides:", error)
      toast({
        title: "Error",
        description: "Failed to load hero slides",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load inquiries
  const loadInquiries = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false })

      if (data) {
        setInquiries(data)
      }
    } catch (error) {
      console.error("Error loading inquiries:", error)
      toast({
        title: "Error",
        description: "Failed to load inquiries",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle image upload
  const handleImageUpload = async (file: File, folder = "general"): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to upload image")
      }

      return result.url
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
      return null
    }
  }

  // Save hero slides
  const saveHeroSlides = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("website_content")
        .upsert(
          {
            section: "hero",
            content: { slides: heroSlides },
            updated_at: new Date().toISOString(),
          },
          { onConflict: "section" }
        )

      if (error) {
        throw error
      }

      toast({
        title: "Success",
        description: "Hero slides saved successfully",
      })
    } catch (error) {
      console.error("Error saving hero slides:", error)
      toast({
        title: "Error",
        description: "Failed to save hero slides",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Add new hero slide
  const addHeroSlide = () => {
    const newSlide: HeroSlide = {
      title: "New Slide",
      subtitle: "Add your subtitle here",
      image: "/placeholder.svg",
      accent: "Accent Text",
      location: "Location",
      link: "/contact",
    }
    setHeroSlides([...heroSlides, newSlide])
    setSelectedSlide(newSlide)
    setIsEditingSlide(true)
  }

  // Update hero slide
  const updateHeroSlide = (index: number, field: keyof HeroSlide, value: string) => {
    const updatedSlides = [...heroSlides]
    updatedSlides[index] = { ...updatedSlides[index], [field]: value }
    setHeroSlides(updatedSlides)
  }

  // Delete hero slide
  const deleteHeroSlide = (index: number) => {
    const updatedSlides = heroSlides.filter((_, i) => i !== index)
    setHeroSlides(updatedSlides)
    toast({
      title: "Success",
      description: "Slide deleted successfully",
    })
  }

  // Handle image upload for hero slide
  const handleHeroSlideImageUpload = async (index: number) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setIsLoading(true)
        const imageUrl = await handleImageUpload(file, "hero")
        if (imageUrl) {
          updateHeroSlide(index, "image", imageUrl)
          toast({
            title: "Success",
            description: "Image uploaded successfully",
          })
        }
        setIsLoading(false)
      }
    }
    input.click()
  }

  // Add new tour category
  const addTourCategory = async (category: Omit<TourCategory, "id">) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("tour_categories").insert(category).select().single()

      if (error) {
        throw error
      }

      setTourCategories([...tourCategories, data])
      toast({
        title: "Success",
        description: "Tour category added successfully",
      })
    } catch (error) {
      console.error("Error adding tour category:", error)
      toast({
        title: "Error",
        description: "Failed to add tour category",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update tour category
  const updateTourCategory = async (id: string, category: Partial<TourCategory>) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("tour_categories").update(category).eq("id", id).select().single()

      if (error) {
        throw error
      }

      setTourCategories(tourCategories.map((c) => (c.id === id ? data : c)))
      toast({
        title: "Success",
        description: "Tour category updated successfully",
      })
    } catch (error) {
      console.error("Error updating tour category:", error)
      toast({
        title: "Error",
        description: "Failed to update tour category",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Delete tour category
  const deleteTourCategory = async (id: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("tour_categories").delete().eq("id", id)

      if (error) {
        throw error
      }

      setTourCategories(tourCategories.filter((c) => c.id !== id))
      toast({
        title: "Success",
        description: "Tour category deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting tour category:", error)
      toast({
        title: "Error",
        description: "Failed to delete tour category",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setShowDeleteDialog(false)
      setItemToDelete(null)
    }
  }

  // Add new tour
  const addTour = async (tour: Omit<Tour, "id">) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("tours").insert(tour).select().single()

      if (error) {
        throw error
      }

      setTours([data, ...tours])
      toast({
        title: "Success",
        description: "Tour added successfully",
      })
    } catch (error) {
      console.error("Error adding tour:", error)
      toast({
        title: "Error",
        description: "Failed to add tour",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update tour
  const updateTour = async (id: string, tour: Partial<Tour>) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("tours").update(tour).eq("id", id).select().single()

      if (error) {
        throw error
      }

      setTours(tours.map((t) => (t.id === id ? data : t)))
      toast({
        title: "Success",
        description: "Tour updated successfully",
      })
    } catch (error) {
      console.error("Error updating tour:", error)
      toast({
        title: "Error",
        description: "Failed to update tour",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Delete tour
  const deleteTour = async (id: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("tours").delete().eq("id", id)

      if (error) {
        throw error
      }

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
      setShowDeleteDialog(false)
      setItemToDelete(null)
    }
  }

  // Add new testimonial
  const addTestimonial = async (testimonial: Omit<Testimonial, "id">) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("testimonials").insert(testimonial).select().single()

      if (error) {
        throw error
      }

      setTestimonials([data, ...testimonials])
      toast({
        title: "Success",
        description: "Testimonial added successfully",
      })
    } catch (error) {
      console.error("Error adding testimonial:", error)
      toast({
        title: "Error",
        description: "Failed to add testimonial",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update testimonial
  const updateTestimonial = async (id: string, testimonial: Partial<Testimonial>) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("testimonials").update(testimonial).eq("id", id).select().single()

      if (error) {
        throw error
      }

      setTestimonials(testimonials.map((t) => (t.id === id ? data : t)))
      toast({
        title: "Success",
        description: "Testimonial updated successfully",
      })
    } catch (error) {
      console.error("Error updating testimonial:", error)
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Delete testimonial
  const deleteTestimonial = async (id: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id)

      if (error) {
        throw error
      }

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
      setShowDeleteDialog(false)
      setItemToDelete(null)
    }
  }

  // Add new blog post
  const addBlogPost = async (post: Omit<BlogPost, "id">) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("blog_posts").insert(post).select().single()

      if (error) {
        throw error
      }

      setBlogPosts([data, ...blogPosts])
      toast({
        title: "Success",
        description: "Blog post added successfully",
      })
    } catch (error) {
      console.error("Error adding blog post:", error)
      toast({
        title: "Error",
        description: "Failed to add blog post",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update blog post
  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("blog_posts").update(post).eq("id", id).select().single()

      if (error) {
        throw error
      }

      setBlogPosts(blogPosts.map((p) => (p.id === id ? data : p)))
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      })
    } catch (error) {
      console.error("Error updating blog post:", error)
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Delete blog post
  const deleteBlogPost = async (id: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) {
        throw error
      }

      setBlogPosts(blogPosts.filter((p) => p.id !== id))
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting blog post:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setShowDeleteDialog(false)
      setItemToDelete(null)
    }
  }

  // Update inquiry status
  const updateInquiryStatus = async (id: string, status: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) {
        throw error
      }

      setInquiries(inquiries.map((i) => (i.id === id ? data : i)))
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

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return

    const { type, id } = itemToDelete

    switch (type) {
      case "category":
        deleteTourCategory(id)
        break
      case "tour":
        deleteTour(id)
        break
      case "testimonial":
        deleteTestimonial(id)
        break
      case "blog":
        deleteBlogPost(id)
        break
      default:
        break
    }
  }

  // Render dashboard
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Tours</p>
                <p className="text-3xl font-bold">{tours.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Categories</p>
                <p className="text-3xl font-bold">{tourCategories.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Filter className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Testimonials</p>
                <p className="text-3xl font-bold">{testimonials.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Blog Posts</p>
                <p className="text-3xl font-bold">{blogPosts.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center justify-between">
              <span>Recent Inquiries</span>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab("inquiries")}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inquiries.slice(0, 5).map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{inquiry.name}</p>
                    <p className="text-sm text-gray-500">{inquiry.email}</p>
                  </div>
                  <Badge
                    className={
                      inquiry.status === "new"
                        ? "bg-blue-100 text-blue-800"
                        : inquiry.status === "contacted"
                        ? "bg-yellow-100 text-yellow-800"
                        : inquiry.status === "quoted"
                        ? "bg-purple-100 text-purple-800"
                        : inquiry.status === "booked"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {inquiry.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center justify-between">
              <span>Featured Tours</span>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab("tours")}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tours
                .filter((tour) => tour.featured)
                .slice(0, 5)
                .map((tour) => (
                  <div key={tour.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{tour.title}</p>
                      <p className="text-sm text-gray-500">{tour.location}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{tour.price}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Render hero section management
  const renderHeroSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Hero Section Management</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={addHeroSlide}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Slide
          </Button>
          <Button onClick={saveHeroSlides} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {heroSlides.map((slide, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center justify-between">
                <span>Slide {index + 1}</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSlide(slide)
                      setIsEditingSlide(true)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteHeroSlide(index)}
                    disabled={heroSlides.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={slide.title}
                      onChange={(e) => updateHeroSlide(index, "title", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Textarea
                      value={slide.subtitle}
                      onChange={(e) => updateHeroSlide(index, "subtitle", e.target.value)}
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Accent Text</Label>
                      <Input
                        value={slide.accent}
                        onChange={(e) => updateHeroSlide(index, "accent", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={slide.location}
                        onChange={(e) => updateHeroSlide(index, "location", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Link URL</Label>
                    <Input
                      value={slide.link}
                      onChange={(e) => updateHeroSlide(index, "link", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Background Image</Label>
                    <div className="flex mt-1">
                      <Input
                        value={slide.image}
                        onChange={(e) => updateHeroSlide(index, "image", e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button
                        variant="secondary"
                        className="rounded-l-none"
                        onClick={() => handleHeroSlideImageUpload(index)}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Preview</Label>
                  <div className="mt-1 relative h-64 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <div className="inline-block bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm mb-2">
                          {slide.accent}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                        <p className="text-sm mb-4">{slide.subtitle}</p>
                        <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                          {slide.location}
                        </div>
                      </div>
                    </div>
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  // Render tour categories management
  const renderTourCategories = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tour Categories</h2>
        <Button onClick={() => {
          setSelectedCategory(null)
          setIsEditingCategory(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tourCategories.map((category) => (
          <Card key={category.id} className={!category.enabled ? "opacity-60" : ""}>
            <div className="relative h-40 overflow-hidden">
              <img
                src={category.image || "/placeholder.svg?height=200&width=400"}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{category.description || "No description"}</p>
              <div className="flex items-center justify-between">
                <Badge variant={category.enabled ? "default" : "outline"}>
                  {category.enabled ? "Active" : "Disabled"}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category)
                      setIsEditingCategory(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setItemToDelete({ type: "category", id: category.id })
                      setShowDeleteDialog(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Edit Dialog */}
      {isEditingCategory && (
        <Dialog open={isEditingCategory} onOpenChange={setIsEditingCategory}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    defaultValue={selectedCategory?.name || ""}
                    placeholder="e.g., Fixed Departures"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    defaultValue={selectedCategory?.slug || ""}
                    placeholder="e.g., fixed-departures"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue={selectedCategory?.description || ""}
                  placeholder="Brief description of this category"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    defaultValue={selectedCategory?.display_order || 0}
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enabled" className="block mb-2">Status</Label>
                  <div className="\
