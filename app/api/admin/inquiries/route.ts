import { NextResponse } from "next/server"
import { getInquiries, updateInquiryStatus, updateInquiryNotes, deleteInquiry } from "@/lib/inquiries-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const inquiries = await getInquiries(status || undefined)

    return NextResponse.json({ success: true, data: inquiries })
  } catch (error) {
    console.error("Error fetching inquiries:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status, notes } = await request.json()

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 },
      )
    }

    let updatedInquiry = null

    // Update status if provided
    if (status) {
      updatedInquiry = await updateInquiryStatus(id, status)
    }

    // Update notes if provided
    if (notes !== undefined) {
      updatedInquiry = await updateInquiryNotes(id, notes)
    }

    if (!updatedInquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update inquiry",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedInquiry,
      message: "Inquiry updated successfully",
    })
  } catch (error) {
    console.error("Error updating inquiry:", error)
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
          message: "ID is required",
        },
        { status: 400 },
      )
    }

    const success = await deleteInquiry(id)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete inquiry",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting inquiry:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
