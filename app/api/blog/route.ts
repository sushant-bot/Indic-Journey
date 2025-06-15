import { NextResponse } from "next/server"
import { getBlogPosts } from "@/lib/supabase-queries"

export async function GET() {
  try {
    const posts = await getBlogPosts(true) // Only enabled posts

    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
