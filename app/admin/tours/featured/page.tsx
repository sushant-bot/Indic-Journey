"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Save, Loader2, ArrowUp, ArrowDown } from "lucide-react"

interface Tour {
  id: string
  title: string
  slug: string
  price: number
  duration: string
  location: string
  category: string
  featured: boolean
  enabled: boolean
  image?: string
  featured_order?: number
}

export default function FeaturedToursPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadTours()
  }, [])

  const loadTours = async () => {
    setLoading(true)
    try {
      // Load all tours
      const { data: allTours, error: toursError } = await supabase
        .from("tours")
        .select("*")
        .eq("enabled", true)
        .order("title", { ascending: true })

      if (toursError) {
        throw toursError
      }

      // Load featured tours with order
      const { data: featured, error: featuredError } = await supabase
        .from("tours")
        .select("*")
        .eq("featured", true)
        .order("featured_order", { ascending: true })

      if (featuredError) {
        throw featuredError
      }

      setTours(allTours || [])
      setFeaturedTours(featured || [])
    } catch (error) {
      console.error("Error loading tours:", error)
      toast.error("Failed to load tours")
    } finally {
      setLoading(false)
    }
  }

  const toggleFeatured = (tour: Tour) => {
    if (tour.featured) {
      // Remove from featured
      setFeaturedTours(featuredTours.filter((t) => t.id !== tour.id))
    } else {
      // Add to featured
      const newOrder = featuredTours.length > 0 ? Math.max(...featuredTours.map((t) => t.featured_order || 0)) + 1 : 1
      setFeaturedTours([...featuredTours, { ...tour, featured: true, featured_order: newOrder }])
    }
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const newFeatured = [...featuredTours]
    const temp = newFeatured[index]
    newFeatured[index] = newFeatured[index - 1]
    newFeatured[index - 1] = temp
    setFeaturedTours(newFeatured)
  }

  const moveDown = (index: number) => {
    if (index === featuredTours.length - 1) return
    const newFeatured = [...featuredTours]
    const temp = newFeatured[index]
    newFeatured[index] = newFeatured[index + 1]
    newFeatured[index + 1] = temp
    setFeaturedTours(newFeatured)
  }

  const saveFeaturedTours = async () => {
    setSaving(true)
    try {
      // First, reset all tours to not featured
      await supabase.from("tours").update({ featured: false, featured_order: null }).neq("id", "placeholder")

      // Then update each featured tour with its new order
      for (let i = 0; i < featuredTours.length; i++) {
        const tour = featuredTours[i]
        await supabase
          .from("tours")
          .update({ featured: true, featured_order: i + 1 })
          .eq("id", tour.id)
      }

      toast.success("Featured tours saved successfully")
    } catch (error) {
      console.error("Error saving featured tours:", error)
      toast.error("Failed to save featured tours")
    } finally {
      setSaving(false)
      loadTours() // Reload to get the latest data
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <AdminLayout title="Featured Tours">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">
            Select and arrange tours to be featured on the homepage. Drag tours to change their order.
          </p>
          <Button onClick={saveFeaturedTours} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Featured Tours
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured Tours</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded" />
                        <div className="flex-grow">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : featuredTours.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No tours are currently featured.</p>
                  <p className="text-sm mt-2">Select tours from the list on the right to feature them.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {featuredTours.map((tour, index) => (
                    <div key={tour.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => moveDown(index)}
                            disabled={index === featuredTours.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={tour.image || "/placeholder.svg?height=100&width=100"}
                            alt={tour.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{tour.title}</h4>
                          <p className="text-xs text-gray-500">
                            {tour.location} • {tour.duration}
                          </p>
                        </div>
                        <Badge className="mr-2">{formatPrice(tour.price)}</Badge>
                        <Button variant="outline" size="sm" onClick={() => toggleFeatured(tour)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Tours</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded" />
                        <div className="flex-grow">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {tours
                    .filter((tour) => !featuredTours.some((ft) => ft.id === tour.id))
                    .map((tour) => (
                      <div key={tour.id} className="border rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={tour.image || "/placeholder.svg?height=100&width=100"}
                              alt={tour.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{tour.title}</h4>
                            <p className="text-xs text-gray-500">
                              {tour.location} • {tour.duration}
                            </p>
                          </div>
                          <Badge className="mr-2">{formatPrice(tour.price)}</Badge>
                          <Button variant="outline" size="sm" onClick={() => toggleFeatured(tour)}>
                            Feature
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
