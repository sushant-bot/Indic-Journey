import { NextResponse } from "next/server"
import emailService from "@/lib/email-service"
import { createInquiry } from "@/lib/supabase-queries"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "message"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, message: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Send email
    const emailResult = await emailService.sendContactEmail({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      tourType: body.tourType || "General Inquiry",
      travelers: body.travelers,
      destination: body.destination,
      message: body.message,
    })

    // Save to database
    try {
      await createInquiry({
        name: `${body.firstName} ${body.lastName}`,
        email: body.email,
        phone: body.phone,
        tour_type: body.tourType || "General Inquiry",
        destination: body.destination,
        message: body.message,
        status: "new",
      })
    } catch (dbError) {
      console.error("Error saving inquiry to database:", dbError)
      // Continue even if database save fails
    }

    return NextResponse.json(emailResult)
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ success: false, message: "Failed to process contact form" }, { status: 500 })
  }
}
