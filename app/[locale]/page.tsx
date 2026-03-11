import Hero from "../components/Hero";
import HomeNewsSection from "../components/HomeNewsSection";
import FlagshipProgramSection from "../components/FlagshipProgramSection";
import ImpactStatsSection from "../components/ImpactStatsSection";
import { client, LATEST_NEWS_QUERY, fetchOptions, NewsItem } from "@/app/lib/sanity";

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
