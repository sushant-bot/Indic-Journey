"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import {
  LayoutDashboard,
  Users,
  FileText,
  Map,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/admin/login")
        return
      }

      setIsAuthenticated(true)
    } catch (error) {
      console.error("Authentication error:", error)
      toast.error("Authentication error. Please log in again.")
      router.push("/admin/login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast.success("Logged out successfully")
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to log out")
    }
  }

  const toggleSubmenu = (menu: string) => {
    if (activeSubmenu === menu) {
      setActiveSubmenu(null)
    } else {
      setActiveSubmenu(menu)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="h-16 border-b bg-white flex items-center px-4">
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="flex flex-1">
          <div className="hidden md:block w-64 border-r bg-white p-4">
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
          <div className="flex-1 p-6">
            <Skeleton className="h-8 w-64 mb-6" />
            <div className="grid gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin",
    },
    {
      title: "Content Management",
      icon: <FileText className="h-5 w-5" />,
      submenu: [
        { title: "Hero Section", href: "/admin/content/hero" },
        { title: "About Section", href: "/admin/content/about" },
        { title: "Testimonials", href: "/admin/content/testimonials" },
        { title: "Blog Posts", href: "/admin/content/blog" },
      ],
    },
    {
      title: "Tour Management",
      icon: <Map className="h-5 w-5" />,
      submenu: [
        { title: "All Tours", href: "/admin/tours" },
        { title: "Categories", href: "/admin/tours/categories" },
        { title: "Featured Tours", href: "/admin/tours/featured" },
      ],
    },
    {
      title: "User Management",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users",
    },
    {
      title: "Inquiries",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/admin/inquiries",
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/admin/analytics",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-4 sticky top-0 z-30">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link href="/admin" className="flex items-center">
            <div className="bg-gradient-to-r from-yellow-400 to-red-600 w-8 h-8 rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">Admin Panel</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm">
              View Site
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar - Mobile */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <aside
          className={cn(
            "fixed left-0 top-16 bottom-0 w-64 bg-white border-r z-40 transform transition-transform md:translate-x-0 md:relative md:top-0",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <nav className="p-4 space-y-1 overflow-y-auto h-full pb-20">
            {menuItems.map((item, index) => (
              <div key={index} className="mb-1">
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-500">{item.icon}</span>
                        <span>{item.title}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          activeSubmenu === item.title ? "transform rotate-180" : "",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "pl-10 space-y-1 overflow-hidden transition-all",
                        activeSubmenu === item.title ? "max-h-40 mt-1" : "max-h-0",
                      )}
                    >
                      {item.submenu.map((subitem, subindex) => (
                        <Link
                          key={subindex}
                          href={subitem.href}
                          className="block p-2 rounded-md hover:bg-gray-100 transition-colors text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3 text-gray-500">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
