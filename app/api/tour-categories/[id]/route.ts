import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    const { data, error } = await supabase.from("tour_categories").select("*").eq("id", params.id).single()

    if (error) {
      console.error("Error fetching category:", error)
      return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
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
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    // Update the category
    const { data, error } = await supabase
      .from("tour_categories")
      .update({
        name: body.name,
        slug: body.slug,
        description: body.description,
        image: body.image,
        enabled: body.enabled,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating category:", error)
      return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
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

    // First check if there are any tours using this category
    const { data: tours, error: toursError } = await supabase
      .from("tours")
      .select("id")
      .eq("category_id", params.id)
      .limit(1)

    if (toursError) {
      console.error("Error checking for tours:", toursError)
      return NextResponse.json({ error: "Failed to check for tours using this category" }, { status: 500 })
    }

    if (tours && tours.length > 0) {
      return NextResponse.json({ error: "Cannot delete category that is being used by tours" }, { status: 400 })
    }

    // If no tours are using this category, delete it
    const { error } = await supabase.from("tour_categories").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting category:", error)
      return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
