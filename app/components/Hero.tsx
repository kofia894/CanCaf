'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[450px] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/hero.jpg')",
        }}
      >
        {/* Gradient Overlay - teal gradient for brand consistency */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/100 via-[#000000]/40 to-transparent" />
      </div>

      {/* Content - Bottom Left */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16 md:pb-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-montserrat)] leading-snug">
            Strengthening Cancer Care Capacity Across Africa
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-white/90">
            Building a future where quality cancer care is accessible to all Africans through training, awareness, and partnerships.
          </p>
          <div className="mt-6 md:mt-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#0F766E] rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#F59E0B] text-white rounded-md text-sm font-medium hover:bg-[#D4A017] transition-colors"
            >
              Our Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
