"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Save, ArrowLeft, Loader2 } from "lucide-react"
import { ImageUploader } from "@/components/admin/image-uploader"

interface BlogPost {
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

export default function NewBlogPostPage() {
  const router = useRouter()
  const today = new Date().toISOString().split("T")[0]

  const [post, setPost] = useState<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    published_at: today,
    enabled: true,
    category: "",
  })
  const [saving, setSaving] = useState(false)

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    setPost({
      ...post,
      [field]: value,
    })

    // Auto-generate slug from title
    if (field === "title") {
      setPost((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }))
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
  }

  const savePost = async () => {
    // Validate required fields
    if (!post.title || !post.excerpt || !post.content || !post.author) {
      toast.error("Please fill in all required fields")
      return
    }

    setSaving(true)
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          author: post.author,
          published_at: post.published_at,
          enabled: post.enabled,
          category: post.category,
        })
        .select()
        .single()

      if (error) throw error

      toast.success("Blog post created successfully")
      router.push("/admin/content/blog")
    } catch (error) {
      console.error("Error creating blog post:", error)
      toast.error("Failed to create blog post")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout title="Create New Blog Post">
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
                Publish Post
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
                      placeholder="Enter post title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={post.slug}
                      onChange={(e) => handleInputChange("slug", e.target.value)}
                      disabled={saving}
                      placeholder="enter-post-slug"
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
                      placeholder="Brief summary of the post"
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
                      placeholder="Full post content"
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
                      placeholder="Author name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category (Optional)</Label>
                    <Input
                      id="category"
                      value={post.category || ""}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      disabled={saving}
                      placeholder="Post category"
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
