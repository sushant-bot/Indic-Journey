"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MapPin, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getWebsiteContent } from "@/lib/supabase-queries"

interface HeroSlide {
  title: string
  subtitle: string
  image: string
  accent: string
  location: string
  link: string
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<HeroSlide[]>([
    {
      title: "Dev Bhoomi Uttarakhand",
      subtitle: "Enchanting Experiences on this Spiritual Canvas",
      image: "/images/tera-manzil-temple.jpg",
      accent: "Experience the Divine",
      location: "Tera Manzila Mandir, Rishikesh",
      link: "/contact",
    },
    {
      title: "In Search of Moksh",
      subtitle: "Explore the City of the God of Gods",
      image: "/images/varanasi-ghats.jpg",
      accent: "Faith • Worship • Salvation",
      location: "Varanasi, Uttar Pradesh",
      link: "/contact",
    },
    {
      title: "Nature, Mountains, Monasteries",
      subtitle: "Country of Gross National Happiness",
      image: "/images/thimphu-bhutan.jpg",
      accent: "Explore the Land of the Thunder Dragon",
      location: "Thimphu, Bhutan",
      link: "/contact",
    },
    {
      title: "Cambodia",
      subtitle: "Explore the Angkor Marvels",
      image: "/images/angkor-wat.jpg",
      accent: "Indic Culture Beyond India",
      location: "Angkor Temple Complex, Cambodia",
      link: "/contact",
    },
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    interface HeroContent {
      slides: HeroSlide[]
    }

    const loadHeroContent = async () => {
      try {
        const content = await getWebsiteContent("hero")
        if (
          content &&
          content[0]?.content &&
          (content[0].content as HeroContent).slides
        ) {
          setSlides((content[0].content as HeroContent).slides)
        }
      } catch (error) {
        console.error("Error loading hero content:", error)
        // Keep default slides if database fails
      } finally {
        setIsLoading(false)
      }
    }

    loadHeroContent()
  }, [])

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 6000)
      return () => clearInterval(timer)
    }
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (isLoading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-400 mx-auto"></div>
          <p className="mt-6 text-gray-600 text-lg font-medium">Loading your journey...</p>
        </div>
      </section>
    )
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images with Smooth Transitions */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover object-center"
            priority={index === 0}
            sizes="100vw"
          />
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        </div>
      ))}

      {/* Centered Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center text-white max-w-5xl mx-auto">
            {/* Accent Text */}
            <div className="mb-6 animate-fade-in">
              <span className="inline-flex items-center px-6 py-3 text-sm lg:text-base font-semibold bg-yellow-400/20 text-yellow-400 rounded-full border-2 border-yellow-400/40 backdrop-blur-md shadow-lg">
                <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 mr-2 animate-pulse" />
                {currentSlideData.accent}
              </span>
            </div>

            {/* Main Title - Centered */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 lg:mb-8 font-poppins leading-tight animate-slide-up">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                {currentSlideData.title}
              </span>
            </h1>

            {/* Subtitle - Centered */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-100 mb-8 lg:mb-10 font-open-sans leading-relaxed font-medium drop-shadow-lg animate-slide-up animation-delay-200">
              {currentSlideData.subtitle}
            </p>

            {/* Location Badge - Centered */}
            <div className="flex justify-center mb-10 lg:mb-12 animate-slide-up animation-delay-300">
              <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-md rounded-full px-6 py-4 lg:px-8 lg:py-5 border-2 border-white/30 shadow-xl">
                <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400 flex-shrink-0 animate-pulse" />
                <span className="text-base lg:text-lg xl:text-xl font-semibold">{currentSlideData.location}</span>
              </div>
            </div>

            {/* CTA Buttons - Centered */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center animate-slide-up animation-delay-400">
              <Link href={currentSlideData.link}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-black hover:text-white font-bold px-8 py-4 lg:px-12 lg:py-6 text-base lg:text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl group rounded-full border-2 border-white/20 shadow-xl"
                >
                  Send Query
                  <Sparkles className="ml-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:rotate-12 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/tours">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/70 text-white hover:bg-white hover:text-black font-bold px-8 py-4 lg:px-12 lg:py-6 text-base lg:text-xl transition-all duration-300 transform hover:scale-105 rounded-full backdrop-blur-md bg-white/10 hover:shadow-xl"
                >
                  Explore All Tours
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 lg:mt-12 animate-slide-up animation-delay-500">
              <p className="text-sm lg:text-base text-gray-300 font-open-sans">
                ✨ 15+ Years Experience • 500+ Happy Travelers • 4.9/5 Rating
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-yellow-400/80 text-white hover:text-black p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 lg:h-8 lg:w-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 hover:bg-yellow-400/80 text-white hover:text-black p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 lg:h-8 lg:w-8" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3 lg:space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 lg:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black/50 border border-white/30 ${
                index === currentSlide
                  ? "bg-yellow-400 w-8 lg:w-12 shadow-lg"
                  : "bg-white/40 w-2.5 lg:w-3 hover:bg-white/60 hover:w-4 lg:hover:w-6"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 lg:bottom-28 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="w-5 h-8 lg:w-6 lg:h-10 border-2 border-white/70 rounded-full flex justify-center items-start p-1 bg-white/10 backdrop-blur-sm">
          <div className="w-1 h-2 lg:w-1.5 lg:h-3 bg-white/90 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
