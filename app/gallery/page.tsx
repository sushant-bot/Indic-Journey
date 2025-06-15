import { MainLayout } from "@/components/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, Share2, Camera, MapPin, Download, Filter } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GalleryPage() {
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
      description: "The iconic Taj Mahal captured during the golden hour, showcasing its ethereal beauty.",
    },
    {
      id: 2,
      src: "/images/kerala-backwaters.png",
      title: "Kerala Backwaters",
      location: "Alleppey, Kerala",
      category: "nature",
      likes: 189,
      photographer: "Priya Nair",
      description: "Serene backwaters of Kerala with traditional houseboats floating peacefully.",
    },
    {
      id: 3,
      src: "/images/varanasi-ganga.png",
      title: "Varanasi Ganga Aarti",
      location: "Varanasi, UP",
      category: "spiritual",
      likes: 156,
      photographer: "Amit Kumar",
      description: "The mesmerizing evening Ganga Aarti ceremony at the sacred ghats of Varanasi.",
    },
    {
      id: 4,
      src: "/images/ladakh-mountains.png",
      title: "Ladakh Mountains",
      location: "Leh, Ladakh",
      category: "adventure",
      likes: 298,
      photographer: "Sarah Johnson",
      description: "Breathtaking mountain landscapes of Ladakh with crystal clear blue skies.",
    },
    {
      id: 5,
      src: "/images/rajasthan-palace.png",
      title: "Hawa Mahal",
      location: "Jaipur, Rajasthan",
      category: "heritage",
      likes: 167,
      photographer: "Vikram Singh",
      description: "The magnificent Palace of Winds showcasing Rajasthani architectural brilliance.",
    },
    {
      id: 6,
      src: "/images/himachal-mountains.png",
      title: "Himachal Mountains",
      location: "Manali, Himachal",
      category: "nature",
      likes: 203,
      photographer: "Maya Patel",
      description: "Snow-capped peaks of Himachal Pradesh creating a stunning natural panorama.",
    },
    {
      id: 7,
      src: "/images/goa-beach.png",
      title: "Goa Beach Sunset",
      location: "Goa",
      category: "nature",
      likes: 145,
      photographer: "Ravi Menon",
      description: "Golden sunset over the pristine beaches of Goa with palm trees silhouetted.",
    },
    {
      id: 8,
      src: "/images/temple-architecture.png",
      title: "South Indian Temple",
      location: "Tamil Nadu",
      category: "heritage",
      likes: 178,
      photographer: "Meera Nair",
      description: "Intricate stone carvings and towering gopurams of ancient South Indian temples.",
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/taj-mahal.png" alt="Gallery Hero" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Badge className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-6 py-2 text-lg mb-6 font-semibold">
            <Camera className="mr-2 h-4 w-4" />
            Photo Gallery
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-poppins">
            Captured <span className="text-yellow-400">Moments</span>
          </h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto font-open-sans leading-relaxed">
            Explore breathtaking destinations through the lens of our travelers. Every image tells a story of adventure,
            culture, and unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search photos by location, category..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="px-6 py-3 rounded-full transition-all duration-300 font-semibold hover:bg-yellow-50 hover:border-yellow-400 hover:scale-105 border-2"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 bg-white/20">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <Card
                key={image.id}
                className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
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
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white text-black shadow-lg w-8 h-8"
                    >
                      <Heart className="h-4 w-4" />
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
                      <Download className="h-4 w-4" />
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

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900 font-poppins">{image.title}</h3>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm font-semibold">{image.likes}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-open-sans mb-2">{image.description}</p>
                  <p className="text-gray-500 text-xs font-open-sans">by {image.photographer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-black hover:text-white px-12 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            <Camera className="mr-3 h-5 w-5" />
            Load More Photos
          </Button>
          <p className="text-gray-500 mt-4 font-open-sans">Showing 8 of 150+ stunning photographs</p>
        </div>
      </section>
    </MainLayout>
  )
}
