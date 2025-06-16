"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Save, Loader2, RefreshCw } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { ImageUploader } from "../image-uploader"

interface SiteSettings {
  site_name: string
  site_description: string
  contact_email: string
  contact_phone: string
  address: string
  facebook_url: string
  instagram_url: string
  twitter_url: string
  whatsapp_number: string
  logo_url: string
  footer_text: string
}

interface SettingsManagerProps {
  setIsLoading: (loading: boolean) => void
}

export default function SettingsManager({ setIsLoading }: SettingsManagerProps) {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: "New Zip Indic",
    site_description: "Your trusted travel partner",
    contact_email: "contact@example.com",
    contact_phone: "+91 1234567890",
    address: "123 Main Street, City, Country",
    facebook_url: "https://facebook.com",
    instagram_url: "https://www.instagram.com/indic.journeys?igsh=dnpxMWRlNXQxazc1",
    twitter_url: "https://twitter.com",
    whatsapp_number: "+911234567890",
    logo_url: "/images/logo.png",
    footer_text: "© 2023 New Zip Indic. All rights reserved.",
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
        if (error.code === "PGRST116") {
          // Record not found, we'll use the default settings
          console.log("No settings found, using defaults")
        } else {
          throw error
        }
      }

      if (data && data.content) {
        setSettings(data.content as SiteSettings)
      }
    } catch (error) {
      console.error("Error loading settings:", error)
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    setIsLoading(true)
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

      toast({
        title: "Success",
        description: "Settings saved successfully",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof SiteSettings, value: string) => {
    setSettings({
      ...settings,
      [field]: value,
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Site Settings</h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Site Settings</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={loadSettings} disabled={saving}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  value={settings.site_name}
                  onChange={(e) => handleInputChange("site_name", e.target.value)}
                  disabled={saving}
                />
              </div>

              <div>
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={settings.site_description}
                  onChange={(e) => handleInputChange("site_description", e.target.value)}
                  rows={3}
                  disabled={saving}
                />
              </div>

              <div>
                <Label htmlFor="footer_text">Footer Text</Label>
                <Input
                  id="footer_text"
                  value={settings.footer_text}
                  onChange={(e) => handleInputChange("footer_text", e.target.value)}
                  disabled={saving}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Logo</Label>
              <ImageUploader
                currentImage={settings.logo_url}
                onImageSelected={(url) => handleInputChange("logo_url", url)}
                folder="settings"
                disabled={saving}
              />

              <div className="mt-4 p-4 border rounded-lg">
                <div className="flex justify-center">
                  <img src={settings.logo_url || "/placeholder.svg"} alt="Site Logo" className="h-16 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={settings.contact_email}
                onChange={(e) => handleInputChange("contact_email", e.target.value)}
                disabled={saving}
              />
            </div>

            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={settings.contact_phone}
                onChange={(e) => handleInputChange("contact_phone", e.target.value)}
                disabled={saving}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
                disabled={saving}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                value={settings.facebook_url}
                onChange={(e) => handleInputChange("facebook_url", e.target.value)}
                disabled={saving}
              />
            </div>

            <div>
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                value={settings.instagram_url}
                onChange={(e) => handleInputChange("instagram_url", e.target.value)}
                disabled={saving}
              />
            </div>

            <div>
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <Input
                id="twitter_url"
                value={settings.twitter_url}
                onChange={(e) => handleInputChange("twitter_url", e.target.value)}
                disabled={saving}
              />
            </div>

            <div>
              <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
              <Input
                id="whatsapp_number"
                value={settings.whatsapp_number}
                onChange={(e) => handleInputChange("whatsapp_number", e.target.value)}
                disabled={saving}
                placeholder="Include country code, e.g., +911234567890"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
