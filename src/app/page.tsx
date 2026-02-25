import CosmosBackground from "@/components/sections/CosmosBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutLeoSection from "@/components/sections/AboutLeoSection";
import NextMatchSection from "@/components/sections/NextMatchSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import PastEditionsSection from "@/components/sections/PastEditionsSection";
import CommunitySection from "@/components/sections/CommunitySection";
import CTASection from "@/components/sections/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <>
      <CosmosBackground />
      <div id="scroll-container" className="relative z-10">
        <HeroSection />
        <ScrollReveal>
          <AboutLeoSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <NextMatchSection />
        </ScrollReveal>
        <ScrollReveal staggerChildren={0.15}>
          <UpcomingEventsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <PastEditionsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <CommunitySection />
        </ScrollReveal>
        <ScrollReveal>
          <CTASection />
        </ScrollReveal>
      </div>
    </>
  );
}
