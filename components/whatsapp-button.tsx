'use client'

import { MessageCircle } from 'lucide-react'
import { HOTEL_INFO } from '@/lib/constants'

export default function WhatsAppButton() {
  const phoneNumber = HOTEL_INFO.phone.replace(/\D/g, '') // Remove non-digit characters
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello%20Sri%20Ganesh%20Residency%2C%20I%20would%20like%20to%20inquire%20about%20your%20rooms%20and%20rates.`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  )
}
