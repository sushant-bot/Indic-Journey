import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/images/logo.png" alt="Indic Journeys Logo" width={48} height={48} className="rounded-lg" />
              <span className="text-2xl sm:text-3xl font-bold">Indic Journeys</span>
            </div>
            <p className="text-gray-300 font-['Open_Sans'] text-base sm:text-lg leading-relaxed">
              Crafting transformative travel experiences across India and the world. Your journey of exploration,
              experience, and evolution starts here.
            </p>
            <div className="flex space-x-4">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-yellow-400 hover:text-black transition-all duration-300 w-12 h-12"
              >
                <Facebook className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-yellow-400 hover:text-black transition-all duration-300 w-12 h-12"
              >
                <Instagram className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-yellow-400 hover:text-black transition-all duration-300 w-12 h-12"
              >
                <Twitter className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-yellow-400 hover:text-black transition-all duration-300 w-12 h-12"
              >
                <Youtube className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 font-['Poppins']">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-base sm:text-lg font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-base sm:text-lg font-medium"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/fixed-departures"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-base sm:text-lg font-medium"
                >
                  Fixed Departures
                </Link>
              </li>
              <li>
                <Link
                  href="/customized-holidays"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-base sm:text-lg font-medium"
                >
                  Customized Holidays
                </Link>
              </li>
              <li>
                <Link
                  href="/heritage-walks"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-base sm:text-lg font-medium"
                >
                  Heritage Walks
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-base sm:text-lg font-medium"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 font-['Poppins']">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/fixed-departures"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-base sm:text-lg font-medium"
                >
                  Group Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/customized-holidays"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-base sm:text-lg font-medium"
                >
                  Custom Itineraries
                </Link>
              </li>
              <li>
                <Link
                  href="/heritage-walks"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-base sm:text-lg font-medium"
                >
                  Heritage Walks
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-base sm:text-lg font-medium"
                >
                  Travel Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 font-['Poppins']">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 mt-1 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-base sm:text-lg font-medium">
                  403 - Anandvan Residency, Lane A-31, Opp. Moti Bakery, Dhayari - 411041
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-yellow-400" />
                <a
                  href="tel:+919371131975"
                  className="text-gray-300 text-base sm:text-lg font-medium hover:text-yellow-400 transition-colors"
                >
                  +91-9371131975
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-yellow-400" />
                <a
                  href="mailto:indicjourneys@gmail.com"
                  className="text-gray-300 text-base sm:text-lg font-medium hover:text-yellow-400 transition-colors"
                >
                  indicjourneys@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-white mb-4 text-base sm:text-lg">Subscribe to Newsletter</h4>
              <div className="flex space-x-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-base h-12 rounded-xl"
                />
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 h-12 rounded-xl transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 sm:mt-16 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
            <p className="text-gray-400 text-sm sm:text-base font-['Open_Sans'] text-center sm:text-left">
              © 2024 Indic Journeys. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-6 sm:space-x-8">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-yellow-400 text-sm sm:text-base transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-yellow-400 text-sm sm:text-base transition-colors font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="/cancellation"
                className="text-gray-400 hover:text-yellow-400 text-sm sm:text-base transition-colors font-medium"
              >
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
