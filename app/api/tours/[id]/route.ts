import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("tours").select("*").eq("id", params.id).single()

    if (error) {
      console.error("Error fetching tour:", error)
      return NextResponse.json({ error: "Failed to fetch tour" }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 })
    }

    // Update the tour
    const { data, error } = await supabase
      .from("tours")
      .update({
        title: body.title,
        slug: body.slug,
        description: body.description,
        content: body.content,
        price: body.price,
        duration: body.duration,
        location: body.location,
        image: body.image,
        category_id: body.category_id,
        featured: body.featured,
        featured_order: body.featured ? body.featured_order : null,
        enabled: body.enabled,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating tour:", error)
      return NextResponse.json({ error: "Failed to update tour" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("tours").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting tour:", error)
      return NextResponse.json({ error: "Failed to delete tour" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
