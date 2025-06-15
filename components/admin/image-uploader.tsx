"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Upload, Loader2, X } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface ImageUploaderProps {
  currentImage: string
  onImageSelected: (url: string) => void
  folder: string
  disabled?: boolean
}

export function ImageUploader({ currentImage, onImageSelected, folder, disabled = false }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Only image files are allowed",
        variant: "destructive",
      })
      return
    }

    // Create a preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    setUploading(true)
    try {
      // Generate a unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage.from("images").upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Get the public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath)

      onImageSelected(publicUrl)
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const clearImage = () => {
    setPreview(null)
    onImageSelected("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-grow">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled || uploading}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="border rounded-md px-4 py-2 flex items-center justify-between">
            <span className="text-sm truncate">{uploading ? "Uploading..." : "Choose an image file"}</span>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          </div>
        </div>
        {(currentImage || preview) && (
          <Button type="button" variant="destructive" size="icon" onClick={clearImage} disabled={disabled || uploading}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {(preview || currentImage) && (
        <div className="border rounded-md p-2">
          <img src={preview || currentImage} alt="Preview" className="max-h-48 object-contain mx-auto" />
        </div>
      )}
    </div>
  )
}
