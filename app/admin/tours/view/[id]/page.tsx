"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, ArrowLeft, Pencil, Trash2, Eye } from "lucide-react"

interface Tour {
  id: string
  title: string
  slug: string
  description: string
  content: string
  price: number
  duration: string
  location: string
  image: string
  category_id: string
  category_name?: string
  featured: boolean
  featured_order: number | null
  enabled: boolean
  created_at: string
  updated_at: string
}

export default function ViewTourPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [tour, setTour] = useState<Tour | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const tourResponse = await fetch(`/api/tours/${params.id}`)
        if (!tourResponse.ok) throw new Error("Failed to fetch tour")
        const tourData = await tourResponse.json()

        // Fetch category name if category_id exists
        if (tourData.category_id) {
          const categoryResponse = await fetch(`/api/tour-categories/${tourData.category_id}`)
          if (categoryResponse.ok) {
            const categoryData = await categoryResponse.json()
            tourData.category_name = categoryData.name
          }
        }

        setTour(tourData)
      } catch (error) {
        console.error("Error fetching tour:", error)
        toast({
          title: "Error",
          description: "Failed to load tour details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTour()
  }, [params.id])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const response = await fetch(`/api/tours/${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete tour")

      toast({
        title: "Success",
        description: "Tour deleted successfully",
      })

      router.push("/admin/tours")
    } catch (error) {
      console.error("Error deleting tour:", error)
      toast({
        title: "Error",
        description: "Failed to delete tour",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!tour) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Tour not found</h1>
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
          <h1 className="text-2xl font-bold">{tour.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open(`/tours/${tour.slug}`, "_blank")}>
            <Eye className="mr-2 h-4 w-4" /> View on Site
          </Button>
          <Button variant="outline" onClick={() => router.push(`/admin/tours/edit/${tour.id}`)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the tour "{tour.title}" and remove it from
                  our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tour Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1">{tour.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Content</h3>
                  <div className="mt-1 whitespace-pre-wrap">{tour.content}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tour Image</CardTitle>
            </CardHeader>
            <CardContent>
              {tour.image ? (
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full rounded-md object-cover"
                />
              ) : (
                <div className="flex h-40 w-full items-center justify-center rounded-md bg-muted">
                  No image available
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tour Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                  <p className="mt-1 text-lg font-semibold">₹{tour.price.toLocaleString()}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Duration</h3>
                  <p className="mt-1">{tour.duration}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                  <p className="mt-1">{tour.location}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                  <p className="mt-1">{tour.category_name || "Uncategorized"}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <div className="mt-1 flex gap-2">
                    {tour.enabled ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Enabled
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Disabled
                      </Badge>
                    )}

                    {tour.featured && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Featured {tour.featured_order !== null ? `(#${tour.featured_order})` : ""}
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">URL Slug</h3>
                  <p className="mt-1 text-sm font-mono">{tour.slug}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                  <p className="mt-1 text-sm">
                    {new Date(tour.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                  <p className="mt-1 text-sm">
                    {new Date(tour.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
