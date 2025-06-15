"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Save, ArrowLeft, Loader2 } from "lucide-react"
import { ImageUploader } from "@/components/admin/image-uploader"

interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  author: string
  published_at: string
  enabled: boolean
  category?: string
}

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadPost()
  }, [id])

  const loadPost = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single()

      if (error) {
        throw error
      }

      if (data) {
        // Ensure published_at is in YYYY-MM-DD format for the date input
        const formattedDate = data.published_at ? data.published_at.split("T")[0] : ""
        setPost({
          ...data,
          published_at: formattedDate,
        })
      } else {
        toast.error("Blog post not found")
        router.push("/admin/content/blog")
      }
    } catch (error) {
      console.error("Error loading blog post:", error)
      toast.error("Failed to load blog post")
      router.push("/admin/content/blog")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    if (!post) return

    setPost({
      ...post,
      [field]: value,
    })
  }

  const savePost = async () => {
    if (!post) return

    // Validate required fields
    if (!post.title || !post.excerpt || !post.content || !post.author) {
      toast.error("Please fill in all required fields")
      return
    }

    setSaving(true)
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          author: post.author,
          published_at: post.published_at,
          enabled: post.enabled,
          category: post.category,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error

      toast.success("Blog post updated successfully")
      router.push("/admin/content/blog")
    } catch (error) {
      console.error("Error updating blog post:", error)
      toast.error("Failed to update blog post")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Edit Blog Post">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-40 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!post) {
    return (
      <AdminLayout title="Blog Post Not Found">
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">The requested blog post could not be found</p>
          <Button onClick={() => router.push("/admin/content/blog")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog Posts
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Edit Blog Post">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => router.push("/admin/content/blog")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog Posts
          </Button>
          <Button onClick={savePost} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Post
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={post.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={post.slug}
                      onChange={(e) => handleInputChange("slug", e.target.value)}
                      disabled={saving}
                    />
                    <p className="text-xs text-gray-500 mt-1">This will be used in the URL: /blog/{post.slug}</p>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={post.excerpt}
                      onChange={(e) => handleInputChange("excerpt", e.target.value)}
                      rows={3}
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={post.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      rows={15}
                      disabled={saving}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={post.author}
                      onChange={(e) => handleInputChange("author", e.target.value)}
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category (Optional)</Label>
                    <Input
                      id="category"
                      value={post.category || ""}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      disabled={saving}
                    />
                  </div>

                  <div>
                    <Label htmlFor="published_at">Publish Date</Label>
                    <Input
                      id="published_at"
                      type="date"
                      value={post.published_at}
                      onChange={(e) => handleInputChange("published_at", e.target.value)}
                      disabled={saving}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enabled"
                      checked={post.enabled}
                      onCheckedChange={(checked) => handleInputChange("enabled", checked)}
                      disabled={saving}
                    />
                    <Label htmlFor="enabled">Published</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  currentImage={post.image || ""}
                  onImageSelected={(url) => handleInputChange("image", url)}
                  folder="blog"
                  disabled={saving}
                />

                {post.image && (
                  <div className="mt-4 border rounded-lg overflow-hidden">
                    <img src={post.image || "/placeholder.svg"} alt="Featured" className="w-full h-auto" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
