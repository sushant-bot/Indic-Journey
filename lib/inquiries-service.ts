import { createServerClient } from "./supabase"

// Get all inquiries with optional status filter
export async function getInquiries(status?: string) {
  const supabaseAdmin = createServerClient()
  let query = supabaseAdmin.from("inquiries").select("*")

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching inquiries:", error)
    return []
  }

  return data
}

// Get a single inquiry by ID
export async function getInquiryById(id: string) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin.from("inquiries").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching inquiry:", error)
    return null
  }

  return data
}

// Update inquiry status
export async function updateInquiryStatus(id: string, status: string) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating inquiry status:", error)
    return null
  }

  return data
}

// Update inquiry notes
export async function updateInquiryNotes(id: string, notes: string) {
  const supabaseAdmin = createServerClient()
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .update({
      notes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating inquiry notes:", error)
    return null
  }

  return data
}

// Delete an inquiry
export async function deleteInquiry(id: string) {
  const supabaseAdmin = createServerClient()
  const { error } = await supabaseAdmin.from("inquiries").delete().eq("id", id)

  if (error) {
    console.error("Error deleting inquiry:", error)
    return false
  }

  return true
}
