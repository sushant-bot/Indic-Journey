"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    const phoneNumber = "919371131975" // Updated phone number
    const message = "Hi! I'm interested in your travel packages. Can you help me plan my trip?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 group-hover:animate-bounce" />
        </Button>
      </div>

      {/* Floating WhatsApp Widget */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 w-80 max-w-[calc(100vw-2rem)]">
          <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Indic Journeys</h3>
                <p className="text-xs opacity-90">Typically replies instantly</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">Hi there! 👋 How can we help you plan your perfect journey today?</p>
            </div>

            <Button onClick={handleWhatsAppClick} className="w-full bg-green-500 hover:bg-green-600 text-white">
              Start Conversation
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
