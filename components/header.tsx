"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, Star, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Fixed Departures", href: "/fixed-departures" },
    { name: "Customized Holidays", href: "/customized-holidays" },
    { name: "Heritage Walks", href: "/heritage-walks" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      {/* Compact Top Bar - Mobile Optimized */}
      <div className="bg-gradient-to-r from-yellow-400 to-red-600 text-black py-1.5 px-4 text-xs sm:text-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="flex items-center space-x-1.5">
              <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="font-semibold">+91 9371131975</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1.5">
              <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="font-medium">15+ Years Experience</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="flex items-center space-x-1.5">
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
              <span className="font-semibold">4.9/5 • 500+ Travelers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Enhanced Mobile Design */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100" : "bg-white shadow-lg"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo - Enhanced Mobile Size */}
            <Link href="/" className="flex items-center space-x-3 lg:space-x-4 group">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Indic Journeys Logo"
                  width={44}
                  height={44}
                  className="transition-transform duration-300 group-hover:scale-110 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                />
              </div>
              <div>
                <span className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-300 font-poppins">
                  Indic Journeys
                </span>
                <div className="text-xs sm:text-sm text-gray-500 font-medium font-open-sans">
                  Explore • Experience • Evolve
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-700 hover:text-yellow-500 transition-all duration-300 font-medium text-base xl:text-lg group font-open-sans"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-red-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-black hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold px-6 py-3 text-base"
                >
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <button
              className="lg:hidden p-3 hover:bg-gray-100 rounded-xl transition-colors duration-300 border border-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
            </button>
          </div>

          {/* Mobile Navigation - Enhanced */}
          {isMenuOpen && (
            <div className="lg:hidden py-6 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-yellow-600 transition-all duration-300 font-medium py-4 px-6 hover:bg-yellow-50 rounded-xl transform hover:translate-x-2 font-open-sans text-lg block border-l-4 border-transparent hover:border-yellow-400"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-6 px-6">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block w-full">
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-black hover:text-white font-semibold py-4 text-lg rounded-xl shadow-lg">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
