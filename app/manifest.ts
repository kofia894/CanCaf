import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CanCAF - Cancer Care Africa Foundation',
    short_name: 'CanCAF',
    description: 'Strengthening Cancer Care Capacity',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0F766E',
    orientation: 'portrait-primary',
    categories: ['health', 'medical', 'nonprofit'],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/CancafLogoRemBg.png',
        sizes: '280x95',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
