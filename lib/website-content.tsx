"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { getWebsiteContent, updateWebsiteContent } from "@/lib/supabase-queries"

interface WebsiteContentType {
  heroTitle: string
  heroSubtitle: string
  aboutTitle: string
  aboutDescription: string
  contactTitle: string
  contactDescription: string
  [key: string]: string
}

interface WebsiteContentContextType {
  content: WebsiteContentType
  updateContent: (key: keyof WebsiteContentType, value: string) => void
  loadFromSupabase: () => Promise<void>
  saveToSupabase: () => Promise<void>
  isLoading: boolean
  error: string | null
}

const defaultContent: WebsiteContentType = {
  heroTitle: "Discover India's Hidden Treasures",
  heroSubtitle: "Embark on a journey through the diverse landscapes and rich cultural heritage of India",
  aboutTitle: "About New Zip Indic",
  aboutDescription: "We specialize in creating unforgettable travel experiences across India",
  contactTitle: "Get in Touch",
  contactDescription: "Have questions or ready to plan your next adventure? Contact us today!",
}

const WebsiteContentContext = createContext<WebsiteContentContextType>({
  content: defaultContent,
  updateContent: () => {},
  loadFromSupabase: async () => {},
  saveToSupabase: async () => {},
  isLoading: false,
  error: null,
})

export function WebsiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<WebsiteContentType>(defaultContent)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateContent = (key: keyof WebsiteContentType, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }))
  }

  const loadFromSupabase = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getWebsiteContent()

      if (data && data.length > 0) {
        // Find the main content entry
        const mainContent = data.find((item) => item.section === "main")

        if (mainContent && mainContent.content) {
          setContent((prev) => ({ ...prev, ...mainContent.content }))
        }
      }
    } catch (err) {
      console.error("Error loading website content:", err)
      setError("Failed to load website content")
    } finally {
      setIsLoading(false)
    }
  }

  const saveToSupabase = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await updateWebsiteContent("main", content)
    } catch (err) {
      console.error("Error saving website content:", err)
      setError("Failed to save website content")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadFromSupabase()
  }, [])

  return (
    <WebsiteContentContext.Provider
      value={{
        content,
        updateContent,
        loadFromSupabase,
        saveToSupabase,
        isLoading,
        error,
      }}
    >
      {children}
    </WebsiteContentContext.Provider>
  )
}

export function useWebsiteContent() {
  return useContext(WebsiteContentContext)
}
