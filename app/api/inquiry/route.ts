import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("inquiries")
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        tour_type: body.tourType,
        destination: body.destination,
        travel_dates: body.travelDates,
        group_size: body.groupSize ? Number.parseInt(body.groupSize) : null,
        budget: body.budget,
        message: body.message,
        status: "new",
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating inquiry:", error)
      return NextResponse.json({ success: false, message: "Failed to submit inquiry" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data, message: "Inquiry submitted successfully" })
  } catch (error) {
    console.error("Error processing inquiry:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
