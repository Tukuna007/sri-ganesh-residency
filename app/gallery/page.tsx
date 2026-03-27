import LayoutWrapper from '../layout-wrapper'
import { constructMetadata } from '@/lib/seo/metadata'
import GalleryContent from '@/components/gallery-content'
import Image from 'next/image'

export const metadata = constructMetadata({
  title: 'Gallery',
  description: 'Visual journey through Sri Ganesh Residency. Explore our luxurious rooms, elegant lobby, and modern interiors.',
})

import Breadcrumbs from '@/components/breadcrumb'

export default function GalleryPage() {
  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-background">
        {/* Header/Hero Section */}
        <div className="relative h-[65vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 scale-105 gpu-accel transition-transform duration-[3000ms] hover:scale-100 ease-out">
            <Image
              src="/images/rooms-hero.png" 
              alt="The Residency Gallery"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
            <div className="mb-10 animate-fade-in [animation-delay:200ms]">
              <div className="inline-block px-6 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                <Breadcrumbs items={[{ label: 'Gallery' }]} variant="dark" />
              </div>
            </div>
            <div className="inline-block py-2 px-6 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full mb-8 animate-fade-in [animation-delay:400ms] transition-transform hover:scale-105 duration-500 gpu-accel text-white">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Visual Journey</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-10 leading-[0.9] animate-fade-in [animation-delay:600ms] italic tracking-tighter drop-shadow-2xl">
              The Gallery
            </h1>
            <div className="w-24 h-1 bg-primary/40 mx-auto mb-10 rounded-full animate-fade-in [animation-delay:700ms]" />
            <p className="text-xl text-white max-w-3xl mx-auto font-light leading-relaxed animate-fade-in [animation-delay:800ms] gpu-accel drop-shadow-md">
              Experience the comfort and elegance of Sri Ganesh Residency through our curated visual storytelling. Explore our modern sanctuaries and architectural precision.
            </p>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <GalleryContent />
      </main>
    </LayoutWrapper>
  )
}
