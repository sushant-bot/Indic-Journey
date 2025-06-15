import { supabase } from "./supabase"
import { createServerClient } from "./supabase"

// Tour Categories
export async function getTourCategories(enabled?: boolean) {
  let query = supabase.from("tour_categories").select("*")

  if (enabled !== undefined) {
    query = query.eq("enabled", enabled)
  }

  query = query.order("display_order", { ascending: true })

  const { data, error } = await query

  if (error) {
    console.error("Error fetching tour categories:", error)
    return []
  }

  return data
}

export async function getTourCategoryBySlug(slug: string) {
  const { data, error } = await supabase.from("tour_categories").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching tour category:", error)
    return null
  }

  return data
}

// Tours
export async function getTours(filters?: {
  categoryId?: string
  categorySlug?: string
  featured?: boolean
  enabled?: boolean
}) {
  let query = supabase.from("tours").select(`
    *,
    category:tour_categories(id, name, slug)
  `)

  if (filters?.categoryId) {
    query = query.eq("category_id", filters.categoryId)
  }

  if (filters?.categorySlug) {
    query = query.eq("category.slug", filters.categorySlug)
  }

  if (filters?.featured !== undefined) {
    query = query.eq("featured", filters.featured)
  }

  if (filters?.enabled !== undefined) {
    query = query.eq("enabled", filters.enabled)
  }

  query = query.order("created_at", { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error("Error fetching tours:", error)
    return []
  }

  return data
}

export async function getTourBySlug(slug: string) {
  const { data, error } = await supabase
    .from("tours")
    .select(`
      *,
      category:tour_categories(id, name, slug)
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching tour:", error)
    return null
  }

  return data
}

export async function createTour(tour: any) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin.from("tours").insert(tour).select().single()

  if (error) {
    console.error("Error creating tour:", error)
    return null
  }

  return data
}

export async function updateTour(id: string, tour: any) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin.from("tours").update(tour).eq("id", id).select().single()

  if (error) {
    console.error("Error updating tour:", error)
    return null
  }

  return data
}

export async function deleteTour(id: string) {
  const supabaseAdmin = createServerClient()
  const { error } = await supabaseAdmin.from("tours").delete().eq("id", id)

  if (error) {
    console.error("Error deleting tour:", error)
    return false
  }

  return true
}

// Website Content
export async function getWebsiteContent(section?: string) {
  let query = supabase.from("website_content").select("*")

  if (section) {
    query = query.eq("section", section)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching website content:", error)
    return []
  }

  return data
}

export async function updateWebsiteContent(section: string, content: any) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin
    .from("website_content")
    .upsert({ section, content, updated_at: new Date().toISOString() }, { onConflict: "section" })
    .select()

  if (error) {
    console.error("Error updating website content:", error)
    return null
  }

  return data
}

// Testimonials
export async function getTestimonials(enabled?: boolean) {
  let query = supabase.from("testimonials").select("*")

  if (enabled !== undefined) {
    query = query.eq("enabled", enabled)
  }

  query = query.order("created_at", { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }

  return data
}

export async function createTestimonial(testimonial: any) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin.from("testimonials").insert(testimonial).select().single()

  if (error) {
    console.error("Error creating testimonial:", error)
    return null
  }

  return data
}

export async function updateTestimonial(id: string, testimonial: any) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin.from("testimonials").update(testimonial).eq("id", id).select().single()

  if (error) {
    console.error("Error updating testimonial:", error)
    return null
  }

  return data
}

export async function deleteTestimonial(id: string) {
  const supabaseAdmin = createServerClient()
  const { error } = await supabaseAdmin.from("testimonials").delete().eq("id", id)

  if (error) {
    console.error("Error deleting testimonial:", error)
    return false
  }

  return true
}

// Blog Posts
export async function getBlogPosts(enabled?: boolean) {
  let query = supabase.from("blog_posts").select("*")

  if (enabled !== undefined) {
    query = query.eq("enabled", enabled)
  }

  query = query.order("created_at", { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return null
  }

  return data
}

export async function createBlogPost(post: any) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin.from("blog_posts").insert(post).select().single()

  if (error) {
    console.error("Error creating blog post:", error)
    return null
  }

  return data
}

export async function updateBlogPost(id: string, post: any) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin.from("blog_posts").update(post).eq("id", id).select().single()

  if (error) {
    console.error("Error updating blog post:", error)
    return null
  }

  return data
}

export async function deleteBlogPost(id: string) {
  const supabaseAdmin = createServerClient()
  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog post:", error)
    return false
  }

  return true
}

// Inquiries
export async function createInquiry(inquiry: any) {
  const { data, error } = await supabase.from("inquiries").insert(inquiry).select().single()

  if (error) {
    console.error("Error creating inquiry:", error)
    return null
  }

  return data
}

export async function getInquiries() {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin.from("inquiries").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching inquiries:", error)
    return []
  }

  return data
}

export async function updateInquiryStatus(id: string, status: string) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating inquiry status:", error)
    return null
  }

  return data
}
