import { Metadata } from "next";
import Hero from "../components/Hero";
import HomeNewsSection from "../components/HomeNewsSection";
import FlagshipProgramSection from "../components/FlagshipProgramSection";
import ImpactStatsSection from "../components/ImpactStatsSection";
import { client, LATEST_NEWS_QUERY, fetchOptions, NewsItem } from "@/app/lib/sanity";

export const metadata: Metadata = {
  title: "CanCAF - Strengthening Cancer Care",
  description: "CanCAF (Cancer Care Africa Foundation) is dedicated to strengthening cancer care capacity through training, awareness, partnerships, and capacity building initiatives.",
  openGraph: {
    title: "CanCAF - Strengthening Cancer Care",
    description: "Dedicated to strengthening cancer care capacity through training, awareness, partnerships, and capacity building.",
    type: "website",
  },
};

export default async function Home() {
  // Fetch latest news from Sanity
  const news = await client.fetch<NewsItem[]>(LATEST_NEWS_QUERY, {}, fetchOptions);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section - full bleed, navbar overlays on top */}
      <Hero />

      {/* News Section */}
      <HomeNewsSection news={news} />

      {/* Flagship Program Section */}
      <FlagshipProgramSection />

      {/* Impact Stats Section - Cancer figures */}
      <ImpactStatsSection />
    </div>
  );
}
