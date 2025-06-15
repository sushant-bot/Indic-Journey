"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Loader2, MoreHorizontal, Plus, Eye, Pencil, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase"

interface Tour {
  id: string
  title: string
  slug: string
  location: string
  price: number
  featured: boolean
  enabled: boolean
  category: {
    name: string
  } | null
}

export default function ToursPage() {
  const router = useRouter()
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("tours")
          .select(`
            id, 
            title, 
            slug, 
            location, 
            price, 
            featured, 
            enabled,
            category:tour_categories(name)
          `)
          .order("created_at", { ascending: false })

        if (error) {
          throw new Error(error.message)
        }

        setTours(data || [])
      } catch (error) {
        console.error("Error fetching tours:", error)
        toast({
          title: "Error",
          description: "Failed to load tours",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  const handleDelete = async (id: string) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from("tours").delete().eq("id", deleteId)

      if (error) {
        throw new Error(error.message)
      }

      setTours((prev) => prev.filter((tour) => tour.id !== deleteId))
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
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
      setDeleteId(null)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tours</h1>
        <Button onClick={() => router.push("/admin/tours/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Tour
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tours</CardTitle>
          <CardDescription>Manage your tours and packages</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : tours.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center space-y-3">
              <p className="text-center text-muted-foreground">No tours found</p>
              <Button onClick={() => router.push("/admin/tours/new")}>
                <Plus className="mr-2 h-4 w-4" /> Add Your First Tour
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tours.map((tour) => (
                    <TableRow key={tour.id}>
                      <TableCell className="font-medium">{tour.title}</TableCell>
                      <TableCell>{tour.category?.name || "Uncategorized"}</TableCell>
                      <TableCell>{tour.location}</TableCell>
                      <TableCell>₹{tour.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {tour.enabled ? (
                            <Badge variant="outline" className="border-green-500 text-green-500">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-gray-500 text-gray-500">
                              Disabled
                            </Badge>
                          )}
                          {tour.featured && (
                            <Badge variant="outline" className="border-blue-500 text-blue-500">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link href={`/admin/tours/view/${tour.id}`} passHref>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/admin/tours/edit/${tour.id}`} passHref>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => handleDelete(tour.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the tour and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
