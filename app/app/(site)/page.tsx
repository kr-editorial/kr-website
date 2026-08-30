import { AudienceSection } from "@/components/sections/audience-section";
import { CtaBandSection } from "@/components/sections/cta-band-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { PortfolioTeaserSection } from "@/components/sections/portfolio-teaser-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesOverviewSection } from "@/components/sections/services-overview-section";
import { ValuePropsSection } from "@/components/sections/value-props-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuePropsSection />
      <ServicesOverviewSection />
      <AudienceSection />
      <ProcessSection />
      <PortfolioTeaserSection />
      <MissionSection />
      <CtaBandSection />
    </>
  );
}
