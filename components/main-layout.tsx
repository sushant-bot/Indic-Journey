import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
