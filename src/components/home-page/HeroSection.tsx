import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("HomePage");
  return (
    <div className="container pt-36 grid grid-cols-12 gap-y-6 items-center text-center relative">
      <div className="gradient-03 z-50" />
      <div className="col-start-5	col-span-4">
        <Badge
          variant="secondary"
          className="bg-white text-[#1e1e1e] px-4 py-1 text-sm font-medium shadow-[0px_1px_15px_rgba(0,255,0,0.3)] border-2 border-primary-green flex items-center gap-3 w-fit mx-auto"
        >
          <Image src="/icons/ai.svg" alt="ai" width={10} height={10} className="w-6 h-6" />
          AI-Powered Insights For Your Film Production
        </Badge>
      </div>

      <h1 className="col-start-2 col-span-10 text-3xl md:text-4xl lg:text-5xl font-poppins-bold mb-6 text-background-2 flex flex-col justify-center items-center">
        <span>{t("title")}</span>
        <span className=" mt-2">Planning to Budgeting in Minutes</span>
      </h1>

      <p className="col-start-3 col-span-7 text-xl text-gray-600 mb-8 px-3 ml-[20%] ">
        Empower your filmmaking process with AI-driven insights and budget optimization.
      </p>

      <div className="col-span-12 ">
        <Button className="bg-background-2 text-white hover:bg-[#2e2e2e] text-lg px-8 py-6 mx-auto">
          Get Started
        </Button>
      </div>

      <div className="col-span-12 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <Image
          src="/project-dashboard.svg"
          alt="Storyvord Dashboard"
          width={1000}
          height={600}
          className="mx-auto w-full object-cover"
        />
      </div>
    </div>
  );
}
