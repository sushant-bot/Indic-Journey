import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { WebsiteContentProvider } from "@/lib/website-content"

export const metadata: Metadata = {
  title: "Indic-journey",
  description: "",
  generator: "Next.js",
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
