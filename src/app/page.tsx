// import Navbar from "@/components/homepage/Navbar";
// import Hero from "@/components/homepage/Hero";
// import About from "@/components/homepage/About";
// import Work from "@/components/homepage/Work";
// import GetStarted from "@/components/homepage/GetStarted";
// import Location from "@/components/homepage/Location";
// import Testimonials from "@/components/homepage/Testimonials";
// import Footer from "@/components/homepage/Footer";

// const Page = () => {
//   return (
//     <div className="width-full overflow-x-hidden">
//       <Navbar/>
//       <Hero />
//       <About />
//       <Work />
//       <GetStarted />
//       <Location />
//       <Testimonials />
//       <Footer/>
//     </div>
//   );
// };

// export default Page;

import { BrainBehindSection } from "@/components/home-page/BrainBehindSection";
import { FeaturesSection } from "@/components/home-page/FeaturesSection";
import { Footer } from "@/components/home-page/Footer";
import { HeroSection } from "@/components/home-page/HeroSection";
import { PricingSection } from "@/components/home-page/PricingSection";
import { SiteHeader } from "@/components/home-page/SiteHeader";
import { ToolsSection } from "@/components/home-page/ToolsSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ToolsSection />
        <PricingSection />
        <BrainBehindSection />
      </main>
      <Footer />
    </div>
  );
}
