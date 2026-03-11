'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

interface GalleryImageProps {
  _key: string
  url: string
  thumbUrl: string
  caption: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImageProps[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
    document.body.style.overflow = 'unset'
  }, [])

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
    }
  }, [selectedIndex, images.length])

  const goToNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
    }
  }, [selectedIndex, images.length])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, closeLightbox, goToPrevious, goToNext])

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={image._key}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:ring-offset-2"
          >
            <Image
              src={image.thumbUrl}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                <svg className="w-6 h-6 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </div>
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm truncate">{image.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close gallery"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-white rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-white rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Image Container - using img tag for natural sizing */}
          <div
            className="flex items-center justify-center px-16 py-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[selectedIndex].url}
              alt={images[selectedIndex].alt}
              className="max-w-[90vw] max-h-[75vh] w-auto h-auto object-contain rounded-lg"
            />
          </div>

          {/* Caption and Counter */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="max-w-4xl mx-auto text-center">
              {images[selectedIndex].caption && (
                <p className="text-white text-lg mb-2">{images[selectedIndex].caption}</p>
              )}
              <p className="text-white/60 text-sm">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
