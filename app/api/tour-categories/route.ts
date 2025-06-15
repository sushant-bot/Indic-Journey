import { NextResponse } from "next/server"
import { getTourCategories } from "@/lib/supabase-queries"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const enabled = searchParams.get("enabled") === "true"

    const categories = await getTourCategories(enabled)

    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error("Error fetching tour categories:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabaseAdmin = createServerClient()
    const data = await request.json()

    const { data: category, error } = await supabaseAdmin.from("tour_categories").insert(data).select().single()

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    console.error("Error creating tour category:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
