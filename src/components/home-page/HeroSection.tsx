import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CurvedLine } from "./CurvedLine";

export function HeroSection() {
  return (
    <section className="relative pt-36 pb-40">
      <CurvedLine />
      <div className="container text-center">
        <Badge
          variant="secondary"
          className="mb-6 bg-white text-[#1e1e1e] px-4 py-1 text-sm font-medium shadow-[0px_1px_15px_rgba(0,255,0,0.3)] border-2 border-primary-green text-paragraph-3-medium"
        >
          AI-Powered Insights For Your Film Production
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
          Revolutionising Film Production: From Planning to Budgeting in Minutes
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Empower your filmmaking process with AI-driven insights and budget optimization.
        </p>
        <Button className="bg-[#1e1e1e] text-white hover:bg-[#2e2e2e] text-lg px-8 py-6">
          Get Started
        </Button>
        <div className="mt-16 relative">
          <Image
            src="/placeholder.svg"
            alt="Storyvord Dashboard"
            width={1000}
            height={600}
            className="rounded-lg shadow-2xl mx-auto"
          />
          <div className="absolute -top-8 -left-8 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">AI Powered Insights</span>
          </div>
        </div>
      </div>
    </section>
  );
}
