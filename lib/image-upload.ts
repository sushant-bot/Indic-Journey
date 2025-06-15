import { supabase } from "./supabase"

export async function uploadImage(file: File, bucket = "website-images", folder = "general") {
  try {
    // Create a unique file name
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    // Upload the file
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file)

    if (error) {
      throw error
    }

    // Get the public URL
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

    return {
      path: filePath,
      url: urlData.publicUrl,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

export async function deleteImage(path: string, bucket = "website-images") {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path])

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error("Error deleting image:", error)
    throw error
  }
}
