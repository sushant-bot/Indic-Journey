import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { WebsiteContentProvider } from "@/lib/website-content"

export const metadata: Metadata = {
  title: "Indic Journeys | International and Domestic Tours",
  description: "",
  generator: "Next.js",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <WebsiteContentProvider>{children}</WebsiteContentProvider>
      </body>
    </html>
  )
}
