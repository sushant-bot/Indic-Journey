import { NextResponse } from "next/server"
import { getTours, createTour, updateTour, deleteTour } from "@/lib/supabase-queries"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tourType = searchParams.get("tour_type") as "fixed-departure" | "customized" | null
    const category = searchParams.get("category")
    const featured = searchParams.get("featured") === "true"

    const filters: any = {}

    if (tourType) filters.tour_type = tourType
    if (category) filters.category = category
    if (featured) filters.featured = true

    const tours = await getTours(filters)

    return NextResponse.json({ success: true, data: tours })
  } catch (error) {
    console.error("Error fetching tours:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const tourData = await request.json()

    // Generate slug from title
    const slug = tourData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const tour = await createTour({
      ...tourData,
      slug,
      group_size: tourData.groupSize,
      original_price: tourData.originalPrice,
      tour_type: tourData.tourType || "fixed-departure",
    })

    if (!tour) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create tour",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: tour,
      message: "Tour created successfully",
    })
  } catch (error) {
    console.error("Error creating tour:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Tour ID is required",
        },
        { status: 400 },
      )
    }

    // Transform field names for database
    const dbUpdates: any = { ...updates }
    if (updates.groupSize) {
      dbUpdates.group_size = updates.groupSize
      delete dbUpdates.groupSize
    }
    if (updates.originalPrice) {
      dbUpdates.original_price = updates.originalPrice
      delete dbUpdates.originalPrice
    }
    if (updates.tourType) {
      dbUpdates.tour_type = updates.tourType
      delete dbUpdates.tourType
    }

    const tour = await updateTour(id, dbUpdates)

    if (!tour) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update tour",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: tour,
      message: "Tour updated successfully",
    })
  } catch (error) {
    console.error("Error updating tour:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Tour ID is required",
        },
        { status: 400 },
      )
    }

    const success = await deleteTour(id)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete tour",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Tour deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting tour:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
