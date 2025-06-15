"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2 } from "lucide-react"

interface ImageUploadProps {
  onUpload: (url: string) => void
  folder?: string
  className?: string
}

export function ImageUploadComponent({ onUpload, folder = "general", className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset states
    setError(null)
    setIsUploading(true)

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Create form data
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    try {
      // Upload to server
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      onUpload(data.url)
    } catch (err) {
      console.error("Error uploading image:", err)
      setError("Failed to upload image. Please try again.")
      setPreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const clearPreview = () => {
    setPreview(null)
    setError(null)
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {preview ? (
        <div className="relative mb-4">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-40 rounded-md" />
          <button
            onClick={clearPreview}
            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
            disabled={isUploading}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="mb-4 border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
        </div>
      )}

      <div className="flex items-center justify-center w-full">
        <label className="w-full">
          <Button type="button" variant={error ? "destructive" : "default"} className="w-full" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : error ? (
              "Try Again"
            ) : (
              "Select Image"
            )}
          </Button>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
        </label>
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}
