// Room data
export const ROOMS = [
  {
    id: 1,
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    category: 'Deluxe',
    price: 1900,
    guests: 2,
    available: 3,
    description: 'Elegant and comfortable room perfect for couples and small groups',
    amenities: ['King Size Bed', 'Modern Bathroom', 'Air Conditioning', 'Flat Screen TV', 'Free WiFi'],
    image: '/rooms/Deluxe/IMG-20251208-WA0018.jpg',
    images: ['/rooms/Deluxe/IMG-20251208-WA0018.jpg']
  },
  {
    id: 2,
    slug: 'double-deluxe-room',
    name: 'Double Deluxe Room',
    category: 'Deluxe',
    price: 2300,
    guests: 4,
    available: 4,
    description: 'Spacious room with 2 Queen Size Beds ideal for families and groups of 4',
    amenities: ['2 Queen Size Beds', 'Sitting Area', 'Modern Bathroom', 'Premium Amenities', 'City View'],
    image: '/rooms/Double Deluxe/WhatsApp Image 2026-03-21 at 12.57.32.jpeg',
    video: '/rooms/Double Deluxe/WhatsApp Video 2026-03-21 at 12.57.32.mp4',
    images: [
      '/rooms/Double Deluxe/WhatsApp Image 2026-03-21 at 12.57.32.jpeg',
      '/rooms/Double Deluxe/IMG-20251208-WA0014.jpg',
      '/rooms/Double Deluxe/IMG-20251208-WA0016.jpg'
    ]
  },
  {
    id: 3,
    slug: 'room-for-10-guests',
    name: 'Room for 10',
    category: 'Family',
    price: 4700,
    guests: 10,
    available: 1,
    description: 'Luxury room designed for larger groups, accommodates up to 10 guests',
    amenities: ['5 Queen Size Beds', '2 Attached Bathrooms', 'Changing Area', 'Modern A/C', 'Spacious Layout'],
    image: '/rooms/Quadruple room for 10 people/IMG-20251208-WA0007.jpg',
    images: [
      '/rooms/Quadruple room for 10 people/IMG-20251208-WA0007.jpg',
      '/rooms/Quadruple room for 10 people/IMG-20251208-WA0008.jpg',
      '/rooms/Quadruple room for 10 people/IMG-20251208-WA0010.jpg',
      '/rooms/Quadruple room for 10 people/IMG-20251208-WA0011.jpg',
      '/rooms/Quadruple room for 10 people/IMG-20251208-WA0012.jpg'
    ]
  },
  {
    id: 4,
    slug: 'quadruple-room-for-16-guests',
    name: 'Quadruple Room for 16',
    category: 'Family',
    price: 5700,
    guests: 16,
    available: 1,
    description: 'Our largest suite accommodating up to 16 guests with premium furnishings',
    amenities: ['8 Queen Size Beds', '3 Attached Bathrooms', 'Changing Area', 'Smart Climate Control', 'Expansive Living Space'],
    image: '/rooms/Quadruple room for 16 people/IMG-20251208-WA0000.jpg',
    images: [
      '/rooms/Quadruple room for 16 people/IMG-20251208-WA0000.jpg',
      '/rooms/Quadruple room for 16 people/IMG-20251208-WA0001.jpg',
      '/rooms/Quadruple room for 16 people/IMG-20251208-WA0002.jpg',
      '/rooms/Quadruple room for 16 people/IMG-20251208-WA0003.jpg',
      '/rooms/Quadruple room for 16 people/IMG-20251208-WA0004.jpg',
      '/rooms/Quadruple room for 16 people/IMG-20251208-WA0005.jpg',
      '/rooms/Quadruple room for 16 people/IMG-20251208-WA0006.jpg'
    ]
  }
]


// Amenities
export const AMENITIES = [
  {
    icon: 'Wifi',
    name: 'Free WiFi',
    description: 'High-speed internet connectivity throughout the hotel'
  },
  {
    icon: 'Clock',
    name: '24/7 Front Desk',
    description: 'Round-the-clock assistance for your convenience'
  },
  {
    icon: 'Tv',
    name: 'Modern Amenities',
    description: 'Air conditioning, flat-screen TV, and comfortable furnishings'
  },
  {
    icon: 'Coffee',
    name: 'Hot Beverages',
    description: 'Complimentary tea and coffee in your room'
  },
  {
    icon: 'Wind',
    name: 'Clean & Fresh',
    description: 'Daily housekeeping and well-maintained facilities'
  },
  {
    icon: 'Lock',
    name: 'Safe & Secure',
    description: 'Secure facilities with privacy and safety guaranteed'
  }
]

// Room categories for filtering
export const ROOM_CATEGORIES = [
  'All',
  'Deluxe',
  'Family'
]

// Price ranges
export const PRICE_RANGES = [
  { label: 'Under ₹2000', min: 0, max: 2000 },
  { label: '₹2000 - ₹3500', min: 2000, max: 3500 },
  { label: '₹3500 - ₹5000', min: 3500, max: 5000 },
  { label: '₹5000+', min: 5000, max: Infinity }
]

// Guest capacity
export const GUEST_CAPACITY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16]

// Hotel info
export const HOTEL_INFO = {
  name: 'Sri Ganesh Residency',
  tagline: 'Comfort & Hospitality',
  description: 'Experience comfortable and welcoming hospitality at Sri Ganesh Residency, your home away from home.',
  phone: '+91 917 189 9992',
  landline: '+91 877 222 9969',
  email: 'sriganeshresidencytpt@gmail.com',
  location: 'https://maps.app.goo.gl/kNqEiZk7XRPJVx9j6?g_st=com.google.maps.preview.copy',
  businessProfile: 'https://maps.app.goo.gl/jEHD8S3Gm57VMsvYA?g_st=com.google.maps.preview.copy'
}
