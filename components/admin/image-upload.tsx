"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Loader2, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onImageUploaded: (url: string) => void
  currentImage?: string
  folder?: string
  className?: string
}

export function ImageUpload({ onImageUploaded, currentImage, folder = "general", className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset states
    setError(null)
    setIsUploading(true)

    // Create a local preview
    const localPreview = URL.createObjectURL(file)
    setPreviewUrl(localPreview)

    try {
      // Create form data
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)

      // Upload to server
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to upload image")
      }

      // Call the callback with the uploaded image URL
      onImageUploaded(result.url)
    } catch (err) {
      console.error("Error uploading image:", err)
      setError(err instanceof Error ? err.message : "Failed to upload image")
      // Revert to previous image if there was one
      setPreviewUrl(currentImage || null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    onImageUploaded("")
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {previewUrl ? (
        <div className="relative rounded-md overflow-hidden border border-gray-200">
          <div className="aspect-video relative">
            <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          </div>
          <div className="absolute top-2 right-2 flex space-x-2">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-2">Click to upload an image</p>
          <p className="text-xs text-gray-400">PNG, JPG, WebP up to 5MB</p>
        </div>
      )}

      <input
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
        disabled={isUploading}
      />

      <label htmlFor="image-upload">
        <Button type="button" variant="outline" className="w-full" disabled={isUploading} asChild>
          <span>
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {previewUrl ? "Change Image" : "Upload Image"}
              </>
            )}
          </span>
        </Button>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
