import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import FocusAreasSection from "../components/FocusAreasSection";
import ImpactStatsSection from "../components/ImpactStatsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section - pt accounts for fixed navbar height */}
      <div className="pt-[126px] lg:pt-[176px]">
        <Hero />
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Focus Areas Section */}
      <FocusAreasSection />

      {/* Impact Stats Section */}
      <ImpactStatsSection />
    </div>
  );
}
