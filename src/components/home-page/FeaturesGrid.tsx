import { BarChart3, Users, FileText, Calendar } from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      title: "AI Budget Forecasting",
      description:
        "Smart budget planning to cut in production costs with reliable cost predictions tailored to your project.",
      icon: BarChart3,
    },
    {
      title: "Crew Recommendations",
      description:
        "Find the right crew members based on project requirements, experience, and availability.",
      icon: Users,
    },
    {
      title: "Script Breakdown & Analysis",
      description:
        "Automated script analysis with AI-powered insights for better planning and execution.",
      icon: FileText,
    },
    {
      title: "Production Scheduling",
      description:
        "Optimize your production schedule with smart resource allocation and timeline management.",
      icon: Calendar,
    },
  ];

  return (
    <div className="container py-24">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
