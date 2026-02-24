'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className="bg-[#F5F7FA] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left Content */}
          <div>
            {/* Tag */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 bg-[#F59E0B] rounded-full"></span>
              <span className="text-sm text-zinc-900">About Us</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-semibold text-zinc-900 font-[family-name:var(--font-montserrat)] leading-[1.15] mb-4">
              Transforming Cancer Care Across Africa
            </h2>

            {/* Subtext */}
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Cancer Care Africa Foundation (CanCAF) is committed to building stronger cancer care systems across Africa. Our work focuses on training health professionals, promoting cancer awareness and early detection, supporting policy dialogue, and strengthening partnerships to improve equitable access to quality cancer services.
            </p>

            {/* CTA Button */}
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-5 py-2.5 border border-zinc-900 rounded-full text-sm font-medium text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors group"
            >
              Learn More
              <svg
                className="w-4 h-4"
                viewBox="0 0 256 256"
                fill="currentColor"
              >
                <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
              </svg>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-zinc-200">
              <Image
                src="/home/hero.jpg"
                alt="Community gathering in Africa"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
