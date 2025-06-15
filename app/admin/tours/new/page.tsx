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
import { toast } from "sonner"
import { Loader2, ArrowLeft, Save, Info } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { slugify } from "@/lib/utils"

interface Category {
  id: string
  name: string
}

export default function NewTourPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [price, setPrice] = useState<number | "">("")
  const [duration, setDuration] = useState("")
  const [location, setLocation] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [featured, setFeatured] = useState(false)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
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
        toast.error("Failed to load categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      setSlug(slugify(title))
    }
  }, [title])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!title || !slug || !price) {
      toast.error("Please fill in all required fields")
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()
      
      // Create the new tour
      const { data, error } = await supabase
        .from("tours")
        .insert({
          title,
          slug,
          description,
          content,
          price: Number(price),
          duration,
          location,
          category_id: categoryId || null,
          featured,
          enabled,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          images: JSON.stringify([]),
          included_services: JSON.stringify([]),
          excluded_services: JSON.stringify([]),
          highlights: JSON.stringify([]),
          tags: JSON.stringify([])
        })
        .select()
        .single()

      if (error) {
        if (error.code === "23505") {
          throw new Error("A tour with this slug already exists. Please use a different title or modify the slug.")
        }
        throw new Error(`Failed to create tour: ${error.message}`)
      }

      toast.success("Tour created successfully")
      router.push(`/admin/tours/edit/${data.id}`)
    } catch (error) {
      console.error("Error creating tour:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create tour")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" onClick={() => router.push("/admin/tours")} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Create New Tour</h1>
        </div>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Create Tour
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" /> Basic Information
            </CardTitle>
            <CardDescription>
              Enter the essential details to create your tour. You can add more information after creation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Tour Title *</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input 
                  id="slug" 
                  value={slug} 
                  onChange={(e) => setSlug(e.target.value)} 
                  required 
                />
                <p className="text-xs text-muted-foreground">
                  This will be used in the URL: yoursite.com/tours/<span className="font-mono">{slug || "example-slug"}</span>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Brief overview of the tour (displayed in listings)"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 5 Days / 4 Nights"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Jaipur, Rajasthan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Full Description</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="Detailed description of the tour experience"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-medium">Featured Tour</h3>
                  <p className="text-sm text-muted-foreground">
                    Display this tour in the featured section
                  </p>
                </div>
                <Switch checked={featured} onCheckedChange={setFeatured} />
              </div>

              <div className="flex items-\
