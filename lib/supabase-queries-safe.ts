import { supabase } from "./supabase"

// Safe tour fetching with proper data transformation
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

  // Transform data to ensure category is properly handled
  return (
    data?.map((tour) => ({
      ...tour,
      categoryName: tour.category?.name || "Uncategorized",
      categorySlug: tour.category?.slug || "",
      categoryId: tour.category?.id || "",
    })) || []
  )
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

  // Transform data to ensure category is properly handled
  if (data) {
    return {
      ...data,
      categoryName: data.category?.name || "Uncategorized",
      categorySlug: data.category?.slug || "",
      categoryId: data.category?.id || "",
    }
  }

  return null
}

// Safe testimonials fetching
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

  return data || []
}

// Safe blog posts fetching
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

  return data || []
}

// Safe website content fetching
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

  return data || []
}

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

  return data || []
}
