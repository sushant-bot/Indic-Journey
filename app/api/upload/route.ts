import { type NextRequest, NextResponse } from "next/server"
import { uploadImage } from "@/lib/image-upload"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "general"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const result = await uploadImage(file, "website-images", folder)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in upload API:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
