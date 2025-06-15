"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Plus, Save, Loader2, Trash2, Edit } from "lucide-react"
import { ImageUploader } from "@/components/admin/image-uploader"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Category {
  id?: string
  name: string
  slug: string
  description: string
  image?: string
  enabled: boolean
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category>({
    name: "",
    slug: "",
    description: "",
    enabled: true,
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("tour_categories").select("*").order("name", { ascending: true })

      if (error) {
        throw error
      }

      setCategories(data || [])
    } catch (error) {
      console.error("Error loading categories:", error)
      toast.error("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  const saveCategory = async () => {
    if (!currentCategory.name || !currentCategory.slug) {
      toast.error("Name and slug are required")
      return
    }

    setSaving(true)
    try {
      let result

      if (isEditing && currentCategory.id) {
        // Update existing category
        const { data, error } = await supabase
          .from("tour_categories")
          .update({
            name: currentCategory.name,
            slug: currentCategory.slug,
            description: currentCategory.description,
            image: currentCategory.image,
            enabled: currentCategory.enabled,
            updated_at: new Date().toISOString(),
          })
          .eq("id", currentCategory.id)
          .select()
          .single()

        if (error) throw error
        result = data

        // Update in state
        setCategories(categories.map((c) => (c.id === currentCategory.id ? result : c)))
      } else {
        // Create new category
        const { data, error } = await supabase
          .from("tour_categories")
          .insert({
            name: currentCategory.name,
            slug: currentCategory.slug,
            description: currentCategory.description,
            image: currentCategory.image,
            enabled: currentCategory.enabled,
          })
          .select()
          .single()

        if (error) throw error
        result = data

        // Add to state
        setCategories([...categories, result])
      }

      toast.success(`Category ${isEditing ? "updated" : "created"} successfully`)
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving category:", error)
      toast.error(`Failed to ${isEditing ? "update" : "create"} category`)
    } finally {
      setSaving(false)
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      const { error } = await supabase.from("tour_categories").delete().eq("id", id)

      if (error) throw error

      setCategories(categories.filter((c) => c.id !== id))
      toast.success("Category deleted successfully")
    } catch (error) {
      console.error("Error deleting category:", error)
      toast.error("Failed to delete category")
    }
  }

  const editCategory = (category: Category) => {
    setCurrentCategory(category)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const addNewCategory = () => {
    resetForm()
    setIsEditing(false)
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setCurrentCategory({
      name: "",
      slug: "",
      description: "",
      enabled: true,
    })
  }

  const handleInputChange = (field: keyof Category, value: any) => {
    setCurrentCategory({
      ...currentCategory,
      [field]: value,
    })

    // Auto-generate slug from name if we're not editing
    if (field === "name" && !isEditing) {
      setCurrentCategory((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-"),
      }))
    }
  }

  return (
    <AdminLayout title="Tour Categories">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Manage tour categories to organize your tours</p>
          <Button onClick={addNewCategory}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <div className="aspect-video">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 my-8">No categories found</p>
              <Button onClick={addNewCategory}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Category
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id} className={!category.enabled ? "opacity-60" : ""}>
                <div className="aspect-video">
                  <img
                    src={category.image || "/placeholder.svg?height=300&width=500"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    {!category.enabled && (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        Disabled
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">/{category.slug}</p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{category.description}</p>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => editCategory(category)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => category.id && deleteCategory(category.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Category" : "Add New Category"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update the category information below"
                  : "Fill in the details to create a new tour category"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={currentCategory.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={saving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={currentCategory.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentCategory.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label>Category Image</Label>
                <ImageUploader
                  currentImage={currentCategory.image || ""}
                  onImageSelected={(url) => handleInputChange("image", url)}
                  folder="categories"
                  disabled={saving}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enabled"
                  checked={currentCategory.enabled}
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
              <Button onClick={saveCategory} disabled={saving}>
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
