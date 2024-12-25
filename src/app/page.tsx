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

import AiSimplifies from "@/components/home-page/AiSimplifies";
import { BrainBehindSection } from "@/components/home-page/BrainBehindSection";
import { FeaturesSection } from "@/components/home-page/FeaturesSection";
import { Footer } from "@/components/home-page/Footer";
import { HeroSection } from "@/components/home-page/HeroSection";
import { PricingSection } from "@/components/home-page/PricingSection";
import { SiteHeader } from "@/components/home-page/SiteHeader";
import { TimelineDemo } from "@/components/home-page/TimelineDemo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col max-w-[2000px] mx-auto">
      <SiteHeader />
      <main className="flex-1 px-6 lg:px-10 xl:px-28">
        <HeroSection />
        <AiSimplifies />
        <FeaturesSection />
        {/* <TimelineDemo /> */}
        <PricingSection />
        <BrainBehindSection />
      </main>
      <Footer />
    </div>
  );
}
