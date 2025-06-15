import { NextResponse } from "next/server"
import { getTours, createTour } from "@/lib/supabase-queries"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const categorySlug = searchParams.get("categorySlug")
    const featured = searchParams.get("featured") === "true"
    const enabled = searchParams.get("enabled") === "true"

    const filters: any = {}
    if (categoryId) filters.categoryId = categoryId
    if (categorySlug) filters.categorySlug = categorySlug
    if (searchParams.has("featured")) filters.featured = featured
    if (searchParams.has("enabled")) filters.enabled = enabled

    const tours = await getTours(filters)

    return NextResponse.json({ success: true, data: tours })
  } catch (error) {
    console.error("Error fetching tours:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const tour = await createTour(data)

    if (!tour) {
      return NextResponse.json({ success: false, message: "Failed to create tour" }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: tour })
  } catch (error) {
    console.error("Error creating tour:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
