"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Plus, Calendar, Trash2, Search, Edit } from "lucide-react"
import { useRouter } from "next/navigation"

interface BlogPost {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  author: string
  created_at: string
  enabled: boolean
  category?: string
}

export default function BlogPostsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    loadBlogPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [blogPosts, searchTerm])

  const loadBlogPosts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setBlogPosts(data || [])
      setFilteredPosts(data || [])
    } catch (error) {
      console.error("Error loading blog posts:", error)
      toast.error("Failed to load blog posts")
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    if (!searchTerm) {
      setFilteredPosts(blogPosts)
      return
    }

    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredPosts(filtered)
  }

  const deleteBlogPost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) throw error

      setBlogPosts(blogPosts.filter((post) => post.id !== id))
      toast.success("Blog post deleted successfully")
    } catch (error) {
      console.error("Error deleting blog post:", error)
      toast.error("Failed to delete blog post")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const navigateToEdit = (id?: string) => {
    if (id) {
      router.push(`/admin/content/blog/edit/${id}`)
    } else {
      router.push("/admin/content/blog/new")
    }
  }

  return (
    <AdminLayout title="Blog Posts Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => navigateToEdit()}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Post
          </Button>
        </div>

        {loading ? (
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
        ) : filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 my-8">No blog posts found</p>
              <Button onClick={() => navigateToEdit()}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Blog Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post) => (
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
                    <Button variant="outline" size="sm" onClick={() => navigateToEdit(post.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => post.id && deleteBlogPost(post.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
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
