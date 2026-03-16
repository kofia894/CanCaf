import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cancaf.org';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CanCAF - Cancer Care Africa Foundation",
    template: "%s | CanCAF",
  },
  description: "CanCAF (Cancer Care Africa Foundation) is dedicated to strengthening cancer care capacity through training, awareness, partnerships, and capacity building initiatives.",
  keywords: [
    "cancer care",
    "Africa",
    "cancer foundation",
    "oncology",
    "cancer awareness",
    "cancer training",
    "healthcare Africa",
    "cancer prevention",
    "cancer treatment",
    "CanCAF",
    "Cancer Care Africa Foundation",
    "oncology nurses",
    "cancer genetic counselling",
    "CGCP-ON Africa",
    "Ghana healthcare",
    "African healthcare",
  ],
  authors: [{ name: "CanCAF", url: siteUrl }],
  creator: "Cancer Care Africa Foundation",
  publisher: "Cancer Care Africa Foundation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CanCAF - Cancer Care Africa Foundation",
    title: "CanCAF - Strengthening Cancer Care",
    description: "CanCAF is dedicated to strengthening cancer care capacity through training, awareness, partnerships, and capacity building initiatives.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CanCAF - Cancer Care Africa Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CanCAF - Cancer Care Africa Foundation",
    description: "Strengthening Cancer Care Capacity",
    creator: "@CCancaf",
    site: "@CCancaf",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en": `${siteUrl}/en`,
      "fr": `${siteUrl}/fr`,
      "ar": `${siteUrl}/ar`,
      "pt": `${siteUrl}/pt`,
      "sw": `${siteUrl}/sw`,
      "am": `${siteUrl}/am`,
      "es": `${siteUrl}/es`,
    },
  },
  category: "healthcare",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0F766E" },
    { media: "(prefers-color-scheme: dark)", color: "#0F766E" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The html/body tags are in app/[locale]/layout.tsx
  // This root layout just passes through to the locale layout
  return children as React.ReactElement;
}
