import { BarChart3, Users, FileText, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function FeaturesSection() {
  const features = [
    {
      icon: "/icons/budget.svg",
      title: "AI Budget Forecasting",
      description:
        "Intelligent budget planning to optimize production costs with reliable predictions tailored to your project.",
    },
    {
      icon: "/icons/crew.svg",
      title: "Crew Recommendations",
      description:
        "Find the ideal crew members based on project requirements, experience, and availability.",
    },
    {
      icon: "/icons/script.svg",
      title: "Script Breakdown & Analysis",
      description:
        "Automated script analysis with AI-powered insights for enhanced planning and execution.",
    },
    {
      icon: "/icons/calendar.svg",
      title: "Production Scheduling",
      description:
        "Streamline your production schedule with intelligent resource allocation and timeline management.",
    },
  ];

  return (
    <section className="py-20 container">
      <Badge
        variant="secondary"
        className="bg-white text-[#1e1e1e] px-4 py-1 text-sm font-medium shadow-[0px_1px_15px_rgba(0,255,0,0.3)] border-2 border-primary-green flex items-center gap-3 w-fit "
      >
        Ready to Streamline Your Production?
      </Badge>
      <p className=" text-xl font-poppins-medium mt-8">
        Join thousands of filmmakers using our platform to create seamless productions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mt-8 relative z-10">
        {/* <div className="gradient-03 z-0" /> */}
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center rounded-2xl shadow-sm bg-[#FAFAFA] p-4"
          >
            <div className=" rounded-full p-4 mb-8 self-start">
              <Image src={feature.icon} alt="icon" width={10} height={10} className="w-14 h-14" />
            </div>
            <h3
              className={cn(
                "text-2xl font-poppins-semibold text-left mb-2",
                index % 2 !== 0 ? "text-background-2" : "text-primary-green"
              )}
            >
              {feature.title}
            </h3>
            <p className="text-gray-600 text-base text-justify">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
