import HeroSection from "@/components/sections/HeroSection";
import AboutLeoSection from "@/components/sections/AboutLeoSection";
import NextMatchSection from "@/components/sections/NextMatchSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import PastEditionsSection from "@/components/sections/PastEditionsSection";
import CommunitySection from "@/components/sections/CommunitySection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutLeoSection />
      <NextMatchSection />
      <UpcomingEventsSection />
      <PastEditionsSection />
      <CommunitySection />
      <CTASection />
    </>
  );
}
