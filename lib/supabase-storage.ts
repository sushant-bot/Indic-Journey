import { supabase } from "./supabase"
import { v4 as uuidv4 } from "uuid"

/**
 * Uploads an image to Supabase Storage and returns the public URL
 */
export async function uploadImage(file: File, folder = "general"): Promise<string | null> {
  try {
    // Create a unique file name to prevent collisions
    const fileExt = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage.from("website-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Error uploading image:", error)
      return null
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage.from("website-images").getPublicUrl(data.path)

    return publicUrlData.publicUrl
  } catch (error) {
    console.error("Error in uploadImage:", error)
    return null
  }
}

/**
 * Deletes an image from Supabase Storage
 */
export async function deleteImage(url: string): Promise<boolean> {
  try {
    // Extract the path from the URL
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split("/")
    const bucketName = pathParts[1]
    const filePath = pathParts.slice(2).join("/")

    // Delete the file
    const { error } = await supabase.storage.from(bucketName).remove([filePath])

    if (error) {
      console.error("Error deleting image:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in deleteImage:", error)
    return false
  }
}

/**
 * Gets a signed URL for a private image
 */
export async function getSignedUrl(path: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage.from("website-images").createSignedUrl(path, 3600)

    if (error) {
      console.error("Error creating signed URL:", error)
      return null
    }

    return data.signedUrl
  } catch (error) {
    console.error("Error in getSignedUrl:", error)
    return null
  }
}
