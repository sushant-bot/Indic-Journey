import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, Clock, Share2, Heart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // This would normally fetch data based on the slug
  const post = {
    id: "hidden-gems-rajasthan",
    title: "10 Hidden Gems in Rajasthan You Must Visit",
    excerpt:
      "Discover the lesser-known treasures of the Land of Kings, from secret palaces to mystical temples that most tourists never see.",
    image: "/images/rajasthan-palace.png",
    author: "Priya Sharma",
    date: "Dec 15, 2024",
    category: "Destinations",
    readTime: "8 min read",
    content: `
      <p>Rajasthan, the Land of Kings, is renowned for its magnificent palaces, vibrant culture, and desert landscapes. While most travelers flock to the famous destinations like Jaipur, Udaipur, and Jodhpur, the state harbors numerous hidden gems that offer equally enchanting experiences without the crowds.</p>

      <h2>1. Bundi - The Blue City's Hidden Cousin</h2>
      <p>Often overshadowed by Jodhpur, Bundi is a picturesque town with stunning step wells, intricate frescoes, and a fairy-tale palace. The Taragarh Fort offers panoramic views of the town below, while the Bundi Palace showcases some of the finest Rajput architecture.</p>

      <h2>2. Shekhawati Region - Open Air Art Gallery</h2>
      <p>The Shekhawati region, comprising towns like Mandawa, Nawalgarh, and Fatehpur, is famous for its painted havelis. These merchant mansions feature elaborate frescoes depicting mythological scenes, historical events, and daily life from centuries past.</p>

      <h2>3. Kumbhalgarh Fort - The Great Wall of India</h2>
      <p>This UNESCO World Heritage site boasts the second-longest wall in the world after the Great Wall of China. The fort complex houses over 360 temples and offers breathtaking views of the Aravalli Hills.</p>

      <h2>4. Ranakpur Jain Temple - Architectural Marvel</h2>
      <p>Hidden in the Aravalli Mountains, this 15th-century temple is renowned for its intricate marble architecture. With 1,444 uniquely carved pillars, no two are alike, making it a masterpiece of Jain architecture.</p>

      <h2>5. Osian - The Khajuraho of Rajasthan</h2>
      <p>This ancient town houses beautifully carved Jain and Hindu temples dating back to the 8th-12th centuries. The Sachiya Mata Temple and Mahavira Temple are particularly noteworthy for their architectural brilliance.</p>

      <p>These hidden gems of Rajasthan offer authentic experiences away from tourist crowds, allowing you to immerse yourself in the state's rich heritage and culture. Each destination tells a unique story of Rajasthan's glorious past while providing opportunities for unforgettable memories.</p>
    `,
  }

  const relatedPosts = [
    {
      id: "kerala-backwaters-guide",
      title: "The Ultimate Guide to Kerala Backwaters",
      image: "/images/kerala-backwaters.png",
      category: "Travel Tips",
    },
    {
      id: "temples-tamil-nadu",
      title: "Spiritual Journey: Temples of Tamil Nadu",
      image: "/images/temple-architecture.png",
      category: "Spiritual",
    },
    {
      id: "himachal-adventure",
      title: "Adventure Sports in Himachal Pradesh",
      image: "/images/himachal-mountains.png",
      category: "Adventure",
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-white mb-4 hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            <Badge className="bg-yellow-400 text-black mb-4">{post.category}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white font-poppins">{post.title}</h1>
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Social Share */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t">
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-700">Share this article:</span>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Bio */}
            <Card className="shadow-lg border-0 mt-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-poppins">{post.author}</h3>
                    <p className="text-gray-600 font-open-sans">
                      Travel writer and photographer with over 10 years of experience exploring India's hidden
                      treasures. Passionate about sharing authentic travel experiences and cultural insights.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Table of Contents */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 font-poppins">Table of Contents</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#bundi" className="text-gray-600 hover:text-yellow-600 transition-colors">
                      1. Bundi - The Blue City's Hidden Cousin
                    </a>
                  </li>
                  <li>
                    <a href="#shekhawati" className="text-gray-600 hover:text-yellow-600 transition-colors">
                      2. Shekhawati Region - Open Air Art Gallery
                    </a>
                  </li>
                  <li>
                    <a href="#kumbhalgarh" className="text-gray-600 hover:text-yellow-600 transition-colors">
                      3. Kumbhalgarh Fort - The Great Wall of India
                    </a>
                  </li>
                  <li>
                    <a href="#ranakpur" className="text-gray-600 hover:text-yellow-600 transition-colors">
                      4. Ranakpur Jain Temple - Architectural Marvel
                    </a>
                  </li>
                  <li>
                    <a href="#osian" className="text-gray-600 hover:text-yellow-600 transition-colors">
                      5. Osian - The Khajuraho of Rajasthan
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Related Tours */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 font-poppins">Related Tours</h3>
                <div className="space-y-4">
                  <Link href="/tours/rajasthan-royal">
                    <div className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors cursor-pointer">
                      <h4 className="font-semibold text-gray-900">Royal Rajasthan Tour</h4>
                      <p className="text-sm text-gray-600">10 Days • ₹40,000</p>
                    </div>
                  </Link>
                  <Link href="/tours/heritage-rajasthan">
                    <div className="p-4 border rounded-lg hover:bg-yellow-50 transition-colors cursor-pointer">
                      <h4 className="font-semibold text-gray-900">Heritage Rajasthan</h4>
                      <p className="text-sm text-gray-600">8 Days • ₹32,000</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 font-poppins">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-yellow-400 text-black">{relatedPost.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg group-hover:text-yellow-600 transition-colors font-poppins">
                      {relatedPost.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
