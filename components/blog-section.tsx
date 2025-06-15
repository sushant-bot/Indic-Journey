"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
//import { supabase } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image?: string
  slug: string
  author: string
  created_at: string
  category: string
}

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBlogPosts() {
      try {
        // For now, we'll just use the default blog posts since we're focusing on the image display
        setBlogPosts(getDefaultBlogPosts())
        
        // Commented out Supabase code for now
        /*
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("enabled", true)
          .order("created_at", { ascending: false })
          .limit(3)

        if (error) {
          console.error("Error loading blog posts:", error)
          setBlogPosts(getDefaultBlogPosts())
        } else {
          setBlogPosts(data || getDefaultBlogPosts())
        }
        */
      } catch (error) {
        console.error("Error:", error)
        setBlogPosts(getDefaultBlogPosts())
      } finally {
        setLoading(false)
      }
    }

    loadBlogPosts()
  }, [])

  function getDefaultBlogPosts(): BlogPost[] {
    return [
      {
        id: 1,
        title: "Best Time to Visit Rajasthan",
        excerpt: "Discover the perfect seasons to explore the royal state of Rajasthan and its magnificent palaces.",
        image: "/images/hawa-mahal-jaipur.jpg",
        slug: "best-time-visit-rajasthan",
        author: "Travel Expert",
        created_at: "2024-01-15",
        category: "Travel Tips",
      },
      {
        id: 2,
        title: "Hidden Gems of Kerala",
        excerpt:
          "Explore the lesser-known beautiful destinations in God's Own Country that will take your breath away.",
        image: "/images/kerala-backwaters-sunset.jpg",
        slug: "hidden-gems-kerala",
        author: "Local Guide",
        created_at: "2024-01-10",
        category: "Destinations",
      },
      {
        id: 3,
        title: "Cultural Festivals of India",
        excerpt:
          "Experience the vibrant colors and traditions of India's most celebrated festivals throughout the year.",
        image: "/images/garhwal-mountains.jpg",
        slug: "cultural-festivals-india",
        author: "Culture Enthusiast",
        created_at: "2024-01-05",
        category: "Culture",
      },
    ]
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-3 font-['Poppins']">Travel Stories & Tips</h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto font-['Open_Sans']">
            Discover inspiring travel stories, helpful tips, and insider knowledge from our experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={post.image || "/images/andaman-beach.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{new Date(post.created_at).toLocaleDateString()}</span>
                  <User className="h-4 w-4 mr-1" />
                  <span>{String(post.author)}</span>
                </div>

                <h3 className="text-xl font-bold text-black mb-3 font-['Poppins'] line-clamp-2">
                  {String(post.title)}
                </h3>

                <p className="text-gray-600 mb-4 font-['Open_Sans'] line-clamp-3">{String(post.excerpt)}</p>

                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full group">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              View All Articles
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
