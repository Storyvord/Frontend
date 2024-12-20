import { BarChart3, Users, FileText, Calendar } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: BarChart3,
      title: "AI Budget Forecasting",
      description:
        "Intelligent budget planning to optimize production costs with reliable predictions tailored to your project.",
    },
    {
      icon: Users,
      title: "Crew Recommendations",
      description:
        "Find the ideal crew members based on project requirements, experience, and availability.",
    },
    {
      icon: FileText,
      title: "Script Breakdown & Analysis",
      description:
        "Automated script analysis with AI-powered insights for enhanced planning and execution.",
    },
    {
      icon: Calendar,
      title: "Production Scheduling",
      description:
        "Streamline your production schedule with intelligent resource allocation and timeline management.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Join thousands of filmmakers using our platform to create seamless productions.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-[#e6f7f0] rounded-full p-4 mb-4">
                <feature.icon className="w-6 h-6 text-[#1e1e1e]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
