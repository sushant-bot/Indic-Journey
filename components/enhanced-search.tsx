"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Star, Clock } from "lucide-react"

export function EnhancedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    destination: "",
    duration: "",
    budget: "",
    category: "",
    groupSize: "",
  })

  const searchResults = [
    {
      id: 1,
      title: "Golden Triangle Classic",
      location: "Delhi - Agra - Jaipur",
      duration: "7 Days",
      price: "₹25,000",
      rating: 4.8,
      reviews: 156,
      category: "Heritage",
      image: "/placeholder.svg?height=200&width=300",
      highlights: ["Taj Mahal", "Red Fort", "Hawa Mahal"],
    },
    {
      id: 2,
      title: "Kerala Backwaters",
      location: "Kochi - Alleppey - Munnar",
      duration: "6 Days",
      price: "₹22,000",
      rating: 4.9,
      reviews: 203,
      category: "Nature",
      image: "/placeholder.svg?height=200&width=300",
      highlights: ["Houseboat", "Tea Gardens", "Spice Plantations"],
    },
    {
      id: 3,
      title: "Ladakh Adventure",
      location: "Leh - Nubra - Pangong",
      duration: "8 Days",
      price: "₹35,000",
      rating: 4.7,
      reviews: 89,
      category: "Adventure",
      image: "/placeholder.svg?height=200&width=300",
      highlights: ["High Altitude", "Desert Safari", "Monasteries"],
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4 font-['Poppins']">Find Your Perfect Journey</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search through our extensive collection of tours and find the perfect match for your travel dreams.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="shadow-xl border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search destinations, tours, or experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-yellow-400"
                />
              </div>
              <Button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 h-12">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold">
              <Filter className="mr-2 h-5 w-5 text-yellow-500" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              <Select
                value={filters.destination}
                onValueChange={(value) => setFilters({ ...filters, destination: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North India</SelectItem>
                  <SelectItem value="south">South India</SelectItem>
                  <SelectItem value="west">West India</SelectItem>
                  <SelectItem value="east">East India</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.duration} onValueChange={(value) => setFilters({ ...filters, duration: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 Days</SelectItem>
                  <SelectItem value="4-7">4-7 Days</SelectItem>
                  <SelectItem value="8-14">8-14 Days</SelectItem>
                  <SelectItem value="15+">15+ Days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.budget} onValueChange={(value) => setFilters({ ...filters, budget: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">₹10,000 - ₹25,000</SelectItem>
                  <SelectItem value="mid">₹25,000 - ₹50,000</SelectItem>
                  <SelectItem value="luxury">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="premium">₹1,00,000+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heritage">Heritage</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="spiritual">Spiritual</SelectItem>
                  <SelectItem value="leisure">Leisure</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.groupSize} onValueChange={(value) => setFilters({ ...filters, groupSize: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Group Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo Travel</SelectItem>
                  <SelectItem value="couple">Couple (2)</SelectItem>
                  <SelectItem value="family">Family (3-6)</SelectItem>
                  <SelectItem value="group">Group (7+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((tour) => (
            <Card
              key={tour.id}
              className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <Badge className="absolute top-4 left-4 bg-yellow-400 text-black">{tour.category}</Badge>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
                  {tour.price}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-red-600 transition-colors">
                  {tour.title}
                </h3>

                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {tour.location}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    {tour.rating} ({tour.reviews})
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 hover:bg-yellow-50 hover:border-yellow-400">
            Load More Results
          </Button>
        </div>
      </div>
    </section>
  )
}
