import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-8 font-poppins">About Indic Journeys</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-gray-700 mb-6 font-open-sans">
                At Indic Journeys, we believe that travel is not just about visiting places—it's about creating
                transformative experiences that connect you with diverse cultures, ancient wisdom, and breathtaking
                landscapes.
              </p>
              <p className="text-lg text-gray-700 mb-6 font-open-sans">
                With years of expertise in crafting personalized travel experiences, we specialize in immersive journeys
                across India and around the world, ensuring every trip becomes a story worth telling.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-1 bg-yellow-400"></div>
                <span className="text-red-600 font-semibold">Your Journey, Our Passion</span>
              </div>
            </div>
            <div className="relative">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Travel Experience"
                    className="w-full h-80 object-cover"
                  />
                </CardContent>
              </Card>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-2xl">15+</span>
              </div>
              <div className="absolute -bottom-2 -right-2 text-black font-semibold text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
