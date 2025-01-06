import AiSimplifies from "@/components/home-page/AiSimplifies";
import { BrainBehindSection } from "@/components/home-page/BrainBehindSection";
import BrandSection from "@/components/home-page/BrandSection";
import { FeaturesSection } from "@/components/home-page/FeaturesSection";
import { Footer } from "@/components/home-page/Footer";
import { HeroSection } from "@/components/home-page/HeroSection";
import { PricingSection } from "@/components/home-page/PricingSection";
import { ProductSection } from "@/components/home-page/ProductSection";
import { SiteHeader } from "@/components/home-page/SiteHeader";
import { Testimonials } from "@/components/home-page/Testimonials";
import ToolsSection from "@/components/home-page/ToolsSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col max-w-[2000px] mx-auto">
      <SiteHeader />
      <main className="flex-1 px-4 md:px-6 lg:px-10 xl:px-28 mt-32">
        <HeroSection />
        <AiSimplifies />
        <FeaturesSection />
        <ProductSection />
        <BrandSection />
        <ToolsSection />
        <PricingSection />
        <Testimonials />
        {/* <BrainBehindSection /> */}
      </main>
      <Footer />
    </div>
  );
}
