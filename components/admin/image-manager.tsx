"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "./image-upload"
import { supabase } from "@/lib/supabase"
import { Loader2, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageItem {
  name: string
  url: string
  size: number
  created_at: string
}

export function ImageManager() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("general")
  const { toast } = useToast()

  const folders = ["general", "tours", "hero", "testimonials", "blog"]

  useEffect(() => {
    loadImages()
  }, [selectedFolder])

  const loadImages = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.storage.from("website-images").list(selectedFolder, {
        sortBy: { column: "created_at", order: "desc" },
      })

      if (error) {
        throw error
      }

      // Filter out folders
      const files = data.filter((item) => !item.metadata)

      // Get URLs for each file
      const imagesWithUrls = await Promise.all(
        files.map(async (file) => {
          const { data: urlData } = supabase.storage
            .from("website-images")
            .getPublicUrl(`${selectedFolder}/${file.name}`)
          return {
            name: file.name,
            url: urlData.publicUrl,
            size: file.metadata?.size || 0,
            created_at: file.created_at || new Date().toISOString(),
          }
        }),
      )

      setImages(imagesWithUrls)
    } catch (error) {
      console.error("Error loading images:", error)
      toast({
        title: "Error",
        description: "Failed to load images",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUploaded = (url: string) => {
    // Reload images after upload
    loadImages()
    toast({
      title: "Success",
      description: "Image uploaded successfully",
    })
  }

  const handleDeleteImage = async (name: string) => {
    try {
      const { error } = await supabase.storage.from("website-images").remove([`${selectedFolder}/${name}`])

      if (error) {
        throw error
      }

      // Remove from state
      setImages(images.filter((img) => img.name !== name))
      toast({
        title: "Success",
        description: "Image deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      })
    }
  }

  const filteredImages = searchTerm
    ? images.filter((img) => img.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : images

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Image Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {folders.map((folder) => (
            <Button
              key={folder}
              variant={selectedFolder === folder ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFolder(folder)}
            >
              {folder}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Search Images</Label>
            <div className="relative mt-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by filename..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="pt-7">
            <Button onClick={loadImages} variant="outline" size="icon" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "↻"}
            </Button>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <ImageUpload onImageUploaded={handleImageUploaded} folder={selectedFolder} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <div key={image.name} className="relative group">
                <div className="aspect-square relative rounded-md overflow-hidden border border-gray-200">
                  <img src={image.url || "/placeholder.svg"} alt={image.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white text-black hover:bg-gray-100 w-full"
                      onClick={() => {
                        navigator.clipboard.writeText(image.url)
                        toast({
                          title: "Copied!",
                          description: "Image URL copied to clipboard",
                        })
                      }}
                    >
                      Copy URL
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleDeleteImage(image.name)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 truncate mt-1">{image.name}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">No images found in this folder</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
