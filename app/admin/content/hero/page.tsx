"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Plus, Save, Trash2, Loader2 } from "lucide-react"
import { ImageUploader } from "@/components/admin/image-uploader"

interface HeroSlide {
  id?: string
  title: string
  subtitle: string
  image: string
  accent: string
  location: string
  link: string
}

export default function HeroSectionPage() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadHeroSlides()
  }, [])

  const loadHeroSlides = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("website_content").select("content").eq("section", "hero").single()

      if (error) {
        if (error.code !== "PGRST116") {
          // Not a "no rows returned" error
          throw error
        }
        // No data found, set default slide
        setHeroSlides([
          {
            title: "Explore India's Rich Heritage",
            subtitle: "Discover the beauty and culture of incredible India",
            image: "/placeholder.svg?height=600&width=1200",
            accent: "Experience the Magic",
            location: "India",
            link: "/contact",
          },
        ])
        return
      }

      if (data && data.content && data.content.slides) {
        setHeroSlides(data.content.slides)
      } else {
        // Default slide if none exists
        setHeroSlides([
          {
            title: "Explore India's Rich Heritage",
            subtitle: "Discover the beauty and culture of incredible India",
            image: "/placeholder.svg?height=600&width=1200",
            accent: "Experience the Magic",
            location: "India",
            link: "/contact",
          },
        ])
      }
    } catch (error) {
      console.error("Error loading hero slides:", error)
      toast.error("Failed to load hero slides")
      // Set default slide
      setHeroSlides([
        {
          title: "Explore India's Rich Heritage",
          subtitle: "Discover the beauty and culture of incredible India",
          image: "/placeholder.svg?height=600&width=1200",
          accent: "Experience the Magic",
          location: "India",
          link: "/contact",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const saveHeroSlides = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from("website_content").upsert(
        {
          section: "hero",
          content: { slides: heroSlides },
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section" },
      )

      if (error) {
        throw error
      }

      toast.success("Hero slides saved successfully")
    } catch (error) {
      console.error("Error saving hero slides:", error)
      toast.error("Failed to save hero slides")
    } finally {
      setSaving(false)
    }
  }

  const addHeroSlide = () => {
    const newSlide: HeroSlide = {
      title: "New Slide",
      subtitle: "Add your subtitle here",
      image: "/placeholder.svg?height=600&width=1200",
      accent: "Accent Text",
      location: "Location",
      link: "/contact",
    }
    setHeroSlides([...heroSlides, newSlide])
  }

  const updateHeroSlide = (index: number, field: keyof HeroSlide, value: string) => {
    const updatedSlides = [...heroSlides]
    updatedSlides[index] = { ...updatedSlides[index], [field]: value }
    setHeroSlides(updatedSlides)
  }

  const deleteHeroSlide = (index: number) => {
    if (heroSlides.length <= 1) {
      toast.error("You must have at least one slide")
      return
    }

    const updatedSlides = heroSlides.filter((_, i) => i !== index)
    setHeroSlides(updatedSlides)
    toast.success("Slide deleted successfully")
  }

  return (
    <AdminLayout title="Hero Section Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">
            Manage the hero section slides that appear on the homepage. You can add, edit, or delete slides.
          </p>
          <div className="flex items-center space-x-2">
            <Button onClick={addHeroSlide} disabled={saving}>
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
            <Button onClick={saveHeroSlides} disabled={saving} variant="default">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {[...Array(5)].map((_, j) => (
                        <Skeleton key={j} className="h-10 w-full" />
                      ))}
                    </div>
                    <Skeleton className="h-64 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {heroSlides.map((slide, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Slide {index + 1}</CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteHeroSlide(index)}
                    disabled={heroSlides.length <= 1 || saving}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`title-${index}`}>Title</Label>
                        <Input
                          id={`title-${index}`}
                          value={slide.title}
                          onChange={(e) => updateHeroSlide(index, "title", e.target.value)}
                          disabled={saving}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`subtitle-${index}`}>Subtitle</Label>
                        <Textarea
                          id={`subtitle-${index}`}
                          value={slide.subtitle}
                          onChange={(e) => updateHeroSlide(index, "subtitle", e.target.value)}
                          rows={3}
                          disabled={saving}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`accent-${index}`}>Accent Text</Label>
                        <Input
                          id={`accent-${index}`}
                          value={slide.accent}
                          onChange={(e) => updateHeroSlide(index, "accent", e.target.value)}
                          disabled={saving}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`location-${index}`}>Location</Label>
                        <Input
                          id={`location-${index}`}
                          value={slide.location}
                          onChange={(e) => updateHeroSlide(index, "location", e.target.value)}
                          disabled={saving}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`link-${index}`}>Link URL</Label>
                        <Input
                          id={`link-${index}`}
                          value={slide.link}
                          onChange={(e) => updateHeroSlide(index, "link", e.target.value)}
                          disabled={saving}
                        />
                      </div>
                      <div>
                        <Label>Image</Label>
                        <div className="mt-2">
                          <ImageUploader
                            currentImage={slide.image}
                            onImageSelected={(url) => updateHeroSlide(index, "image", url)}
                            folder="hero"
                            disabled={saving}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Preview</Label>
                      <div className="relative h-64 rounded-lg overflow-hidden border">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${slide.image})` }}
                        >
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
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
