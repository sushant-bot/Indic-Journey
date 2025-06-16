"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { Save, Loader2 } from "lucide-react"
import { ImageUploader } from "@/components/admin/image-uploader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SiteSettings {
  site_name: string
  site_description: string
  contact_email: string
  contact_phone: string
  contact_address: string
  social_media: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    linkedin?: string
  }
  logo?: string
  favicon?: string
  footer_text: string
  seo: {
    meta_title: string
    meta_description: string
    meta_keywords: string
  }
  maintenance_mode: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: "New Zip Indic",
    site_description: "Your trusted travel partner for exploring India",
    contact_email: "info@newzipindic.com",
    contact_phone: "+91 1234567890",
    contact_address: "123 Travel Street, New Delhi, India",
    social_media: {
      facebook: "https://facebook.com/newzipindic",
      instagram: "https://www.instagram.com/indic.journeys?igsh=dnpxMWRlNXQxazc1",
    },
    footer_text: "© 2023 New Zip Indic. All rights reserved.",
    seo: {
      meta_title: "New Zip Indic - Your Trusted Travel Partner",
      meta_description: "Discover the beauty of India with our customized tours and travel packages.",
      meta_keywords: "india travel, tours, holidays, travel agency, tourism",
    },
    maintenance_mode: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("website_content")
        .select("content")
        .eq("section", "settings")
        .single()

      if (error) {
        if (error.code !== "PGRST116") {
          // Not a "no rows returned" error
          throw error
        }
        // No data found, use default settings
        return
      }

      if (data && data.content) {
        setSettings(data.content as SiteSettings)
      }
    } catch (error) {
      console.error("Error loading settings:", error)
      toast.error("Failed to load settings")
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from("website_content").upsert(
        {
          section: "settings",
          content: settings,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section" },
      )

      if (error) {
        throw error
      }

      toast.success("Settings saved successfully")
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof SiteSettings, value: any) => {
    setSettings({
      ...settings,
      [field]: value,
    })
  }

  const updateNestedField = (parent: keyof SiteSettings, field: string, value: any) => {
    setSettings({
      ...settings,
      [parent]: {
        ...settings[parent],
        [field]: value,
      },
    })
  }

  return (
    <AdminLayout title="Website Settings">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Configure your website settings</p>
          <Button onClick={saveSettings} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
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
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Tabs defaultValue="general">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="site_name">Site Name</Label>
                      <Input
                        id="site_name"
                        value={settings.site_name}
                        onChange={(e) => updateField("site_name", e.target.value)}
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="site_description">Site Description</Label>
                      <Textarea
                        id="site_description"
                        value={settings.site_description}
                        onChange={(e) => updateField("site_description", e.target.value)}
                        rows={3}
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="footer_text">Footer Text</Label>
                      <Input
                        id="footer_text"
                        value={settings.footer_text}
                        onChange={(e) => updateField("footer_text", e.target.value)}
                        disabled={saving}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contact_email">Email Address</Label>
                      <Input
                        id="contact_email"
                        type="email"
                        value={settings.contact_email}
                        onChange={(e) => updateField("contact_email", e.target.value)}
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact_phone">Phone Number</Label>
                      <Input
                        id="contact_phone"
                        value={settings.contact_phone}
                        onChange={(e) => updateField("contact_phone", e.target.value)}
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact_address">Address</Label>
                      <Textarea
                        id="contact_address"
                        value={settings.contact_address}
                        onChange={(e) => updateField("contact_address", e.target.value)}
                        rows={3}
                        disabled={saving}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={settings.social_media.facebook || ""}
                        onChange={(e) => updateNestedField("social_media", "facebook", e.target.value)}
                        placeholder="https://facebook.com/yourpage"
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={settings.social_media.instagram || ""}
                        onChange={(e) => updateNestedField("social_media", "instagram", e.target.value)}
                        placeholder="https://instagram.com/yourhandle"
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={settings.social_media.twitter || ""}
                        onChange={(e) => updateNestedField("social_media", "twitter", e.target.value)}
                        placeholder="https://twitter.com/yourhandle"
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input
                        id="youtube"
                        value={settings.social_media.youtube || ""}
                        onChange={(e) => updateNestedField("social_media", "youtube", e.target.value)}
                        placeholder="https://youtube.com/yourchannel"
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={settings.social_media.linkedin || ""}
                        onChange={(e) => updateNestedField("social_media", "linkedin", e.target.value)}
                        placeholder="https://linkedin.com/company/yourcompany"
                        disabled={saving}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="meta_title">Meta Title</Label>
                      <Input
                        id="meta_title"
                        value={settings.seo.meta_title}
                        onChange={(e) => updateNestedField("seo", "meta_title", e.target.value)}
                        disabled={saving}
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters</p>
                    </div>
                    <div>
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        value={settings.seo.meta_description}
                        onChange={(e) => updateNestedField("seo", "meta_description", e.target.value)}
                        rows={3}
                        disabled={saving}
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
                    </div>
                    <div>
                      <Label htmlFor="meta_keywords">Meta Keywords</Label>
                      <Input
                        id="meta_keywords"
                        value={settings.seo.meta_keywords}
                        onChange={(e) => updateNestedField("seo", "meta_keywords", e.target.value)}
                        disabled={saving}
                      />
                      <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="branding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Branding</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label>Logo</Label>
                      <ImageUploader
                        currentImage={settings.logo || ""}
                        onImageSelected={(url) => updateField("logo", url)}
                        folder="branding"
                        disabled={saving}
                      />
                      {settings.logo && (
                        <div className="mt-4 border rounded-lg p-4 bg-gray-50 flex items-center justify-center">
                          <img src={settings.logo || "/placeholder.svg"} alt="Logo" className="max-w-full" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <Label>Favicon</Label>
                      <ImageUploader
                        currentImage={settings.favicon || ""}
                        onImageSelected={(url) => updateField("favicon", url)}
                        folder="branding"
                        disabled={saving}
                      />
                      {settings.favicon && (
                        <div className="mt-4 border rounded-lg p-4 bg-gray-50 flex items-center justify-center">
                          <img src={settings.favicon || "/placeholder.svg"} alt="Favicon" className="max-w-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
                      <Switch
                        id="maintenance_mode"
                        checked={settings.maintenance_mode}
                        onCheckedChange={(checked) => updateField("maintenance_mode", checked)}
                        disabled={saving}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AdminLayout>
  )
}
