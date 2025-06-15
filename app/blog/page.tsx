import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, Search, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BlogPage() {
  const blogPosts = [
    {
      id: "hidden-gems-rajasthan",
      title: "10 Hidden Gems in Rajasthan You Must Visit",
      excerpt:
        "Discover the lesser-known treasures of the Land of Kings, from secret palaces to mystical temples that most tourists never see.",
      image: "/images/hawa-mahal-jaipur.jpg",
      author: "Priya Sharma",
      date: "Dec 15, 2024",
      category: "Destinations",
      readTime: "8 min read",
      trending: true,
    },
    {
      id: "kerala-backwaters-guide",
      title: "The Ultimate Guide to Kerala Backwaters",
      excerpt: "Everything you need to know about planning the perfect houseboat experience in God's Own Country.",
      image: "/images/kerala-backwaters-sunset.jpg",
      author: "Rajesh Kumar",
      date: "Dec 12, 2024",
      category: "Travel Tips",
      readTime: "12 min read",
      trending: false,
    },
    {
      id: "temples-tamil-nadu",
      title: "Spiritual Journey: Temples of Tamil Nadu",
      excerpt: "Explore the architectural marvels and spiritual significance of South India's most sacred temples.",
      image: "/images/konark-sun-temple.jpg",
      author: "Meera Nair",
      date: "Dec 10, 2024",
      category: "Spiritual",
      readTime: "15 min read",
      trending: true,
    },
    {
      id: "himachal-adventure",
      title: "Adventure Sports in Himachal Pradesh",
      excerpt: "From paragliding in Bir Billing to river rafting in Kullu, discover the thrill of mountain adventures.",
      image: "/images/golden-temple.jpg",
      author: "Vikram Singh",
      date: "Dec 8, 2024",
      category: "Adventure",
      readTime: "10 min read",
      trending: false,
    },
    {
      id: "goa-beyond-beaches",
      title: "Goa Beyond Beaches: Cultural Treasures",
      excerpt: "Explore the rich Portuguese heritage, spice plantations, and hidden cultural gems of Goa.",
      image: "/images/goa.jpeg",
      author: "Maria Fernandes",
      date: "Dec 5, 2024",
      category: "Culture",
      readTime: "9 min read",
      trending: false,
    },
    {
      id: "ladakh-photography-tips",
      title: "Photography Tips for Ladakh",
      excerpt: "Master the art of capturing Ladakh's stunning landscapes with these professional photography tips.",
      image: "/images/Ladakh.jpeg",
      author: "Arjun Mehta",
      date: "Dec 3, 2024",
      category: "Photography",
      readTime: "7 min read",
      trending: true,
    },
  ]

  const categories = [
    { name: "All Posts", count: 48, color: "bg-gray-500" },
    { name: "Destinations", count: 24, color: "bg-yellow-400" },
    { name: "Travel Tips", count: 18, color: "bg-red-500" },
    { name: "Spiritual", count: 15, color: "bg-purple-500" },
    { name: "Adventure", count: 12, color: "bg-green-500" },
    { name: "Culture", count: 20, color: "bg-blue-500" },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/Taj Mahal.jpeg" alt="Travel Blog" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Badge className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-6 py-2 text-lg mb-6 font-semibold">
            <BookOpen className="mr-2 h-4 w-4" />
            Travel Blog
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 font-poppins">
            Stories & <span className="text-yellow-400">Insights</span>
          </h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto font-open-sans leading-relaxed">
            Get inspired by travel stories, destination guides, and expert tips from our experienced travelers and local
            guides.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search articles, destinations, tips..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name.toLowerCase()}>
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
                  <SelectItem value="trending">Trending</SelectItem>
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

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Trending Badge */}
                      {post.trending && (
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          Trending
                        </Badge>
                      )}

                      {/* Category Badge */}
                      <Badge className="absolute top-4 right-4 bg-yellow-400 text-black">{post.category}</Badge>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {post.readTime}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors duration-300 font-poppins line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 font-open-sans">{post.excerpt}</p>

                      <Link href={`/blog/${post.id}`}>
                        <Button
                          variant="ghost"
                          className="group/btn p-0 h-auto text-red-600 hover:text-red-700 font-semibold"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-red-600 hover:from-yellow-500 hover:to-red-700 text-black hover:text-white px-12 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  <BookOpen className="mr-3 h-5 w-5" />
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-black font-poppins">Categories</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((category, index) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-300 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span className="font-medium text-gray-700 group-hover:text-black transition-colors">
                          {category.name}
                        </span>
                      </div>
                      <Badge variant="outline" className="bg-gray-100">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-yellow-400 to-red-500 text-white">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-bold mb-3 font-poppins">Stay Updated</h3>
                  <p className="mb-6 font-open-sans">
                    Get the latest travel stories and destination guides delivered to your inbox.
                  </p>
                  <Button className="w-full bg-white text-black hover:bg-gray-100 font-semibold">
                    Subscribe to Blog
                  </Button>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <h3 className="text-2xl font-bold text-black font-poppins">Popular Posts</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <div className="flex space-x-3 group cursor-pointer">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-black group-hover:text-red-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
