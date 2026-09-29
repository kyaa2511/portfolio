import { AboutPreview } from "@/components/sections/AboutPreview";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { HeroSection } from "@/components/sections/HeroSection";
import { OrbitBreakerSection } from "@/components/sections/OrbitBreakerSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <HeroSection />
      <CapabilitiesSection />
      <FeaturedWork />
      <ServicesSection />
      <AboutPreview />
      <OrbitBreakerSection />
      <ContactCTA />
    </main>
  );
}
