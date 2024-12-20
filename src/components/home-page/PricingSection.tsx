import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function PricingSection() {
  const plans = [
    {
      name: "INDIE PACKAGE",
      price: "Free",
      features: [
        "1 User",
        "3 Project Limit",
        "Project Management Tools",
        "Basic Human Producer (additional cost)",
      ],
    },
    {
      name: "STUDIO PACKAGE",
      price: "$7,600",
      period: "annually",
      features: [
        "Everything from Indie Package",
        "5 Users",
        "20 Projects Limit",
        "Marketplace Access (Crew and Suppliers)",
        "Unlimited Support from Human Producer",
        "Access to Mobile App",
      ],
    },
    {
      name: "OSCAR PACKAGE",
      price: "$47,900",
      period: "annually",
      features: [
        "Everything from Studio Package",
        "Advanced Creative Tools",
        "20+ Users",
        "Departmental Tools for Specialized Inputs (VFX, Art, etc.)",
        "Dedicated Account Representative",
        "24/7 Premium Human Producer Support",
      ],
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Pricing</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${index === 1 ? "border-[#1e1e1e] border-2" : ""}`}
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-4xl font-bold mb-4">
                  {plan.price}
                  {plan.period && (
                    <span className="text-lg font-normal text-gray-500 ml-1">/{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#1e1e1e] text-white hover:bg-[#2e2e2e]">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
