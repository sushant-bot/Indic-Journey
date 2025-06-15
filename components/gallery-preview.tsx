"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, Share2, Camera, MapPin } from "lucide-react"
import Link from "next/link"

export function GalleryPreview() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [likedImages, setLikedImages] = useState<number[]>([])

  const categories = [
    { id: "all", name: "All Photos", count: 150 },
    { id: "heritage", name: "Heritage", count: 45 },
    { id: "nature", name: "Nature", count: 38 },
    { id: "spiritual", name: "Spiritual", count: 32 },
    { id: "adventure", name: "Adventure", count: 35 },
  ]

  const galleryImages = [
    {
      id: 1,
      src: "/images/taj-mahal.png",
      title: "Taj Mahal at Sunrise",
      location: "Agra, India",
      category: "heritage",
      likes: 234,
      photographer: "Rahul Sharma",
    },
    {
      id: 2,
      src: "/images/kerala-backwaters.png",
      title: "Kerala Backwaters",
      location: "Alleppey, Kerala",
      category: "nature",
      likes: 189,
      photographer: "Priya Nair",
    },
    {
      id: 3,
      src: "/images/varanasi-ganga.png",
      title: "Varanasi Ganga Aarti",
      location: "Varanasi, UP",
      category: "spiritual",
      likes: 156,
      photographer: "Amit Kumar",
    },
    {
      id: 4,
      src: "/images/ladakh-mountains.png",
      title: "Ladakh Mountains",
      location: "Leh, Ladakh",
      category: "adventure",
      likes: 298,
      photographer: "Sarah Johnson",
    },
    {
      id: 5,
      src: "/images/rajasthan-palace.png",
      title: "Hawa Mahal",
      location: "Jaipur, Rajasthan",
      category: "heritage",
      likes: 167,
      photographer: "Vikram Singh",
    },
    {
      id: 6,
      src: "/images/himachal-mountains.png",
      title: "Himachal Mountains",
      location: "Manali, Himachal",
      category: "nature",
      likes: 203,
      photographer: "Maya Patel",
    },
  ]

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const toggleLike = (imageId: number) => {
    setLikedImages((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-6 py-2 text-lg mb-6 font-semibold">
            <Camera className="mr-2 h-4 w-4" />
            Photo Gallery
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-poppins">
            Captured{" "}
            <span className="text-transparent bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text">Moments</span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-open-sans leading-relaxed">
            Explore breathtaking destinations through the lens of our travelers. Every image tells a story of adventure,
            culture, and unforgettable experiences.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-semibold ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-yellow-400 to-red-500 text-white shadow-lg transform scale-105"
                  : "hover:bg-yellow-50 hover:border-yellow-400 hover:scale-105 border-2"
              }`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 bg-white/20">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredImages.map((image, index) => (
            <Card
              key={image.id}
              className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1 font-poppins">{image.title}</h3>
                    <div className="flex items-center text-white/80 text-sm font-open-sans">
                      <MapPin className="h-4 w-4 mr-1" />
                      {image.location}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-black shadow-lg w-8 h-8"
                    onClick={() => toggleLike(image.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        likedImages.includes(image.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-black shadow-lg w-8 h-8"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-black shadow-lg w-8 h-8"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>

                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-yellow-400 text-black capitalize font-semibold">
                  {image.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1 font-poppins">{image.title}</h3>
                    <p className="text-gray-600 text-sm font-open-sans">by {image.photographer}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      {image.likes + (likedImages.includes(image.id) ? 1 : 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/gallery">
            <Button
              size="lg"
              className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-12 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <Camera className="mr-3 h-5 w-5" />
              View Complete Gallery
            </Button>
          </Link>
          <p className="text-gray-500 mt-4 font-open-sans">Discover 150+ stunning photographs from our journeys</p>
        </div>
      </div>
    </section>
  )
}
