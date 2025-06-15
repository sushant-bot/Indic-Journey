import { NextResponse } from "next/server"
import { getTestimonials } from "@/lib/supabase-queries"

export async function GET() {
  try {
    const testimonials = await getTestimonials(true) // Only enabled testimonials

    return NextResponse.json({ success: true, data: testimonials })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
