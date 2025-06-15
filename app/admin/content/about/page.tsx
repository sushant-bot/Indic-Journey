"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Save, Loader2, Plus, Trash2 } from "lucide-react"
import { ImageUploader } from "@/components/admin/image-uploader"

interface AboutContent {
  title: string
  subtitle: string
  description: string
  image: string
  features: {
    title: string
    description: string
    icon?: string
  }[]
}

export default function AboutSectionPage() {
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: "About New Zip Indic",
    subtitle: "Your Trusted Travel Partner Since 2005",
    description:
      "We are a premier travel agency specializing in customized tours across India. With over 15 years of experience, we provide exceptional travel experiences with attention to detail and personalized service.",
    image: "/placeholder.svg?height=600&width=800",
    features: [
      {
        title: "Expert Local Guides",
        description: "Our guides have deep knowledge of local culture, history, and hidden gems.",
      },
      {
        title: "Customized Itineraries",
        description: "Every journey is tailored to your preferences and interests.",
      },
      {
        title: "24/7 Support",
        description: "Our team is available around the clock to assist you during your travels.",
      },
    ],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadAboutContent()
  }, [])

  const loadAboutContent = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("website_content").select("content").eq("section", "about").single()

      if (error) {
        if (error.code !== "PGRST116") {
          // Not a "no rows returned" error
          throw error
        }
        // No data found, use default content
        return
      }

      if (data && data.content) {
        setAboutContent(data.content as AboutContent)
      }
    } catch (error) {
      console.error("Error loading about content:", error)
      toast.error("Failed to load about section content")
    } finally {
      setLoading(false)
    }
  }

  const saveAboutContent = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from("website_content").upsert(
        {
          section: "about",
          content: aboutContent,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section" },
      )

      if (error) {
        throw error
      }

      toast.success("About section content saved successfully")
    } catch (error) {
      console.error("Error saving about content:", error)
      toast.error("Failed to save about section content")
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof AboutContent, value: any) => {
    setAboutContent({
      ...aboutContent,
      [field]: value,
    })
  }

  const updateFeature = (index: number, field: string, value: string) => {
    const updatedFeatures = [...aboutContent.features]
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value }
    updateField("features", updatedFeatures)
  }

  const addFeature = () => {
    const newFeature = {
      title: "New Feature",
      description: "Feature description goes here",
    }
    updateField("features", [...aboutContent.features, newFeature])
  }

  const deleteFeature = (index: number) => {
    const updatedFeatures = aboutContent.features.filter((_, i) => i !== index)
    updateField("features", updatedFeatures)
  }

  return (
    <AdminLayout title="About Section Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Manage the about section content that appears on the website.</p>
          <Button onClick={saveAboutContent} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        {loading ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[...Array(3)].map((_, j) => (
                      <Skeleton key={j} className="h-10 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-64 w-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-24 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={aboutContent.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={aboutContent.subtitle}
                        onChange={(e) => updateField("subtitle", e.target.value)}
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={aboutContent.description}
                        onChange={(e) => updateField("description", e.target.value)}
                        rows={5}
                        disabled={saving}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>About Image</Label>
                    <ImageUploader
                      currentImage={aboutContent.image}
                      onImageSelected={(url) => updateField("image", url)}
                      folder="about"
                      disabled={saving}
                    />
                    <div className="mt-4 border rounded-lg p-4">
                      <img
                        src={aboutContent.image || "/placeholder.svg?height=600&width=800"}
                        alt="About"
                        className="w-full h-auto rounded"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Features</CardTitle>
                <Button onClick={addFeature} disabled={saving} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {aboutContent.features.map((feature, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Feature {index + 1}</h3>
                        <Button variant="destructive" size="sm" onClick={() => deleteFeature(index)} disabled={saving}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`feature-title-${index}`}>Title</Label>
                          <Input
                            id={`feature-title-${index}`}
                            value={feature.title}
                            onChange={(e) => updateFeature(index, "title", e.target.value)}
                            disabled={saving}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`feature-description-${index}`}>Description</Label>
                          <Textarea
                            id={`feature-description-${index}`}
                            value={feature.description}
                            onChange={(e) => updateFeature(index, "description", e.target.value)}
                            rows={2}
                            disabled={saving}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
