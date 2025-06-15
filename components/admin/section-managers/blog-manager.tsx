"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Save, Calendar, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ImageUploader } from "../image-uploader"

interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  author: string
  category: string
  created_at: string
  enabled: boolean
}

interface BlogManagerProps {
  setIsLoading: (loading: boolean) => void
}

export default function BlogManager({ setIsLoading }: BlogManagerProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    loadBlogPosts()
  }, [])

  const loadBlogPosts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setBlogPosts(data || [])
    } catch (error) {
      console.error("Error loading blog posts:", error)
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveBlogPost = async (post: BlogPost) => {
    setSaving(true)
    setIsLoading(true)
    try {
      let result

      if (post.id) {
        // Update existing post
        const { data, error } = await supabase
          .from("blog_posts")
          .update({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            image: post.image,
            author: post.author,
            category: post.category,
            created_at: post.created_at,
            updated_at: new Date().toISOString(),
            enabled: post.enabled,
          })
          .eq("id", post.id)
          .select()
          .single()

        if (error) throw error
        result = data

        // Update in state
        setBlogPosts(blogPosts.map((p) => (p.id === post.id ? result : p)))
      } else {
        // Create new post
        const { data, error } = await supabase
          .from("blog_posts")
          .insert({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            image: post.image,
            author: post.author,
            category: post.category,
            created_at: post.created_at,
            enabled: post.enabled,
          })
          .select()
          .single()

        if (error) throw error
        result = data

        // Add to state
        setBlogPosts([result, ...blogPosts])
      }

      toast({
        title: "Success",
        description: `Blog post ${post.id ? "updated" : "created"} successfully`,
      })

      setIsEditing(false)
      setSelectedPost(null)
    } catch (error) {
      console.error("Error saving blog post:", error)
      toast({
        title: "Error",
        description: `Failed to ${post.id ? "update" : "create"} blog post`,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
      setIsLoading(false)
    }
  }

  const deleteBlogPost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    setIsLoading(true)
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) throw error

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
    }
  }

  const handleAddBlogPost = () => {
    const today = new Date().toISOString().split("T")[0]

    const newPost: BlogPost = {
      title: "New Blog Post",
      slug: "new-blog-post",
      excerpt: "A brief summary of the blog post",
      content: "Full content of the blog post goes here...",
      image: "",
      author: "Admin",
      category: "General",
      created_at: today,
      enabled: true,
    }

    setSelectedPost(newPost)
    setIsEditing(true)
  }

  const handleEditBlogPost = (post: BlogPost) => {
    setSelectedPost(post)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setSelectedPost(null)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    if (!selectedPost) return

    setSelectedPost({
      ...selectedPost,
      [field]: value,
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Blog Management</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <div className="aspect-video">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (isEditing && selectedPost) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{selectedPost.id ? "Edit Blog Post" : "Add New Blog Post"}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleCancelEdit} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={() => saveBlogPost(selectedPost)} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Post
                </>
              )}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    value={selectedPost.title}
                    onChange={(e) => {
                      handleInputChange("title", e.target.value)
                      // Auto-generate slug if this is a new post
                      if (!selectedPost.id) {
                        handleInputChange("slug", generateSlug(e.target.value))
                      }
                    }}
                    disabled={saving}
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={selectedPost.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    disabled={saving}
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be used in the URL: /blog/{selectedPost.slug}</p>
                </div>

                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={selectedPost.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    disabled={saving}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={selectedPost.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    disabled={saving}
                  />
                </div>

                <div>
                  <Label htmlFor="created_at">Publish Date</Label>
                  <Input
                    id="created_at"
                    type="date"
                    value={selectedPost.created_at.split("T")[0]}
                    onChange={(e) => handleInputChange("created_at", e.target.value)}
                    disabled={saving}
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={selectedPost.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    rows={3}
                    disabled={saving}
                  />
                  <p className="text-xs text-gray-500 mt-1">A brief summary of the blog post (shown in listings)</p>
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={selectedPost.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    rows={10}
                    disabled={saving}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enabled"
                    checked={selectedPost.enabled}
                    onCheckedChange={(checked) => handleInputChange("enabled", checked)}
                    disabled={saving}
                  />
                  <Label htmlFor="enabled">Published</Label>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Featured Image</Label>
                <ImageUploader
                  currentImage={selectedPost.image || ""}
                  onImageSelected={(url) => handleInputChange("image", url)}
                  folder="blog"
                  disabled={saving}
                />

                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Preview</h3>
                  <div className="aspect-video rounded overflow-hidden mb-3">
                    <img
                      src={selectedPost.image || "/placeholder.svg?height=400&width=600"}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-lg">{selectedPost.title}</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(selectedPost.created_at)}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedPost.author}</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedPost.excerpt}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button onClick={handleAddBlogPost}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Post
        </Button>
      </div>

      {blogPosts.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-gray-500">No blog posts found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Card key={post.id} className={!post.enabled ? "opacity-60" : ""}>
              <div className="aspect-video">
                <img
                  src={post.image || "/placeholder.svg?height=400&width=600"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg line-clamp-1">{post.title}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{formatDate(post.created_at)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                  {!post.enabled && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-yellow-600">Draft</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditBlogPost(post)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => post.id && deleteBlogPost(post.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
