import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabaseAdmin = createServerClient()

    const { data, error } = await supabaseAdmin.from("website_content").select("*")

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ success: false, message: "Failed to fetch content" }, { status: 500 })
    }

    // Transform the data to match the expected format
    const transformedData: any = {}

    if (data) {
      data.forEach((item) => {
        if (item.section === "hero") {
          transformedData.hero = { slides: item.content.slides || [] }
        } else if (item.section === "featured_journeys_meta") {
          transformedData.featuredJourneys = {
            title: item.content.title || "",
            subtitle: item.content.subtitle || "",
            tours: [], // Will be populated from tours table
          }
        } else if (item.section === "testimonials_meta") {
          transformedData.testimonials = {
            title: item.content.title || "",
            subtitle: item.content.subtitle || "",
            testimonials: [], // Will be populated from testimonials table
            stats: item.content.stats || {},
          }
        } else if (item.section === "blog_meta") {
          transformedData.blog = {
            title: item.content.title || "",
            subtitle: item.content.subtitle || "",
            posts: [], // Will be populated from blog_posts table
          }
        }
      })
    }

    return NextResponse.json({ success: true, data: transformedData })
  } catch (error) {
    console.error("Error fetching website content:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const supabaseAdmin = createServerClient()

    // Update each section separately
    const updates = []

    if (data.hero) {
      updates.push(
        supabaseAdmin.from("website_content").upsert(
          {
            section: "hero",
            content: { slides: data.hero.slides },
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "section",
          },
        ),
      )
    }

    if (data.featuredJourneys) {
      updates.push(
        supabaseAdmin.from("website_content").upsert(
          {
            section: "featured_journeys_meta",
            content: {
              title: data.featuredJourneys.title,
              subtitle: data.featuredJourneys.subtitle,
            },
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "section",
          },
        ),
      )
    }

    if (data.testimonials) {
      updates.push(
        supabaseAdmin.from("website_content").upsert(
          {
            section: "testimonials_meta",
            content: {
              title: data.testimonials.title,
              subtitle: data.testimonials.subtitle,
              stats: data.testimonials.stats,
            },
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "section",
          },
        ),
      )
    }

    if (data.blog) {
      updates.push(
        supabaseAdmin.from("website_content").upsert(
          {
            section: "blog_meta",
            content: {
              title: data.blog.title,
              subtitle: data.blog.subtitle,
            },
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "section",
          },
        ),
      )
    }

    const results = await Promise.all(updates)

    // Check for errors
    for (const result of results) {
      if (result.error) {
        console.error("Database update error:", result.error)
        return NextResponse.json({ success: false, message: "Failed to update content" }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, message: "Content updated successfully" })
  } catch (error) {
    console.error("Error updating website content:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
