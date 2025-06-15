"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Upload, X, Plus, GripVertical } from "lucide-react"
import { createClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

interface TourImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

interface TourImageManagerProps {
  tourId: string
  initialImages: TourImage[]
  onImagesChange: (images: TourImage[]) => void
}

export function TourImageManager({ tourId, initialImages = [], onImagesChange }: TourImageManagerProps) {
  const [images, setImages] = useState<TourImage[]>(initialImages)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    // Initialize with initial images if provided
    if (initialImages.length > 0) {
      setImages(initialImages)
    }
  }, [initialImages])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newImages: TourImage[] = [...images]
    const supabase = createClient()

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "Error",
            description: `File ${file.name} is too large (max 5MB)`,
            variant: "destructive",
          })
          continue
        }

        // Generate a unique filename
        const fileExt = file.name.split(".").pop()
        const fileName = `${tourId}/${uuidv4()}.${fileExt}`
        const filePath = `tours/${fileName}`

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage.from("images").upload(filePath, file)

        if (uploadError) {
          console.error("Error uploading image:", uploadError)
          toast({
            title: "Error",
            description: `Failed to upload ${file.name}`,
            variant: "destructive",
          })
          continue
        }

        // Get the public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(filePath)

        // Add to images array
        newImages.push({
          id: uuidv4(),
          url: publicUrl,
          alt: file.name.split(".")[0],
          isPrimary: newImages.length === 0, // First image is primary by default
        })
      }

      setImages(newImages)
      onImagesChange(newImages)

      if (files.length > 0) {
        toast({
          title: "Success",
          description: `${files.length} image(s) uploaded successfully`,
        })
      }
    } catch (error) {
      console.error("Error in image upload:", error)
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      // Reset the input
      e.target.value = ""
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    const removedImage = newImages.splice(index, 1)[0]

    // If removing the primary image, set the first remaining image as primary
    if (removedImage.isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true
    }

    setImages(newImages)
    onImagesChange(newImages)
  }

  const setPrimaryImage = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }))
    setImages(newImages)
    onImagesChange(newImages)
  }

  const updateImageAlt = (index: number, alt: string) => {
    const newImages = [...images]
    newImages[index].alt = alt
    setImages(newImages)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-grow">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="absolute inset-0 opacity-0 cursor-pointer"
            multiple
          />
          <div className="border rounded-md px-4 py-2 flex items-center justify-between">
            <span className="text-sm truncate">{uploading ? "Uploading..." : "Choose image files"}</span>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          </div>
        </div>
        <Button type="button" variant="outline" disabled={uploading}>
          <Plus className="h-4 w-4 mr-2" /> Add Images
        </Button>
      </div>

      {uploading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Uploading images...</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8 rounded-full opacity-90"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute top-2 left-2">
                  <GripVertical className="h-5 w-5 text-white drop-shadow-md cursor-move" />
                </div>
                {image.isPrimary && (
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">Primary</span>
                  </div>
                )}
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`alt-${image.id}`} className="text-xs">
                    Alt Text
                  </Label>
                  {!image.isPrimary && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => setPrimaryImage(index)}
                    >
                      Set as Primary
                    </Button>
                  )}
                </div>
                <Input
                  id={`alt-${image.id}`}
                  value={image.alt}
                  onChange={(e) => updateImageAlt(index, e.target.value)}
                  className="text-sm"
                  placeholder="Image description"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && !uploading && (
        <div className="border border-dashed rounded-md p-8 text-center">
          <p className="text-muted-foreground">No images added yet</p>
          <p className="text-sm text-muted-foreground mt-1">Upload images to showcase this tour</p>
        </div>
      )}
    </div>
  )
}
