import { Check, Divide } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Description } from "@radix-ui/react-toast";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function PricingSection() {
  const t = useTranslations("HomePage.PricingSection");

  const plans = [
    {
      icon: "/icons/price/indie.svg",
      tag: t("plans.0.tag"),
      name: t("plans.0.name"),
      description: t("plans.0.description"),
      price: t("plans.0.price"),
      period: t("plans.0.period"),
      features: [
        t("plans.0.features.0"),
        t("plans.0.features.1"),
        t("plans.0.features.2"),
        t("plans.0.features.3"),
      ],
    },
    {
      icon: "/icons/price/studio.svg",
      tag: t("plans.1.tag"),
      name: t("plans.1.name"),
      popular: true,
      description: t("plans.1.description"),
      price: t("plans.1.price"),
      period: t("plans.1.period"),
      features: [
        t("plans.1.features.0"),
        t("plans.1.features.1"),
        t("plans.1.features.2"),
        t("plans.1.features.3"),
        t("plans.1.features.4"),
        t("plans.1.features.5"),
      ],
    },
    {
      icon: "/icons/price/oscar.svg",
      tag: t("plans.2.tag"),
      name: t("plans.2.name"),
      description: t("plans.2.description"),
      price: t("plans.2.price"),
      period: t("plans.2.period"),
      features: [
        t("plans.2.features.0"),
        t("plans.2.features.1"),
        t("plans.2.features.2"),
        t("plans.2.features.3"),
        t("plans.2.features.4"),
        t("plans.2.features.5"),
      ],
    },
  ];

  return (
    <section className="py-10">
      <div className="container">
        <Badge
          variant="secondary"
          className="bg-white text-[#1e1e1e] px-4 py-1 text-sm font-medium shadow-[0px_1px_15px_rgba(0,255,0,0.3)] border-2 border-primary-green flex items-center gap-3 w-fit"
        >
          Our Price
        </Badge>
        <div className="grid gap-8 md:grid-cols-3 mt-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col text-[#170F49] pt-8 rounded-3xl hover-border-2 hover:border-primary-green transition-transform duration-300 hover:-translate-y-2 relative ${index === 1 ? "shadow-[0px_0px_30px_rgba(0,255,0,0.4)] " : ""}`}
            >
              {plan?.popular && (
                <div className="absolute w-fit top-5 right-0 bg-gradient-to-r from-[#03256c] to-green-500 text-white text-center py-1 px-3 rounded-md">
                  {t("popular")}
                </div>
              )}
              <CardHeader>
                <CardTitle className=" flex gap-4 font-poppins">
                  <Image src={plan.icon} alt="icon" width={10} height={10} className="w-14 h-14" />
                  <div className="">
                    <p className=" text-start text-sm text-[#6F6C90]">{plan.tag}</p>
                    <h3 className=" text-start text-xl font-poppins-bold">{plan.name}</h3>
                  </div>
                </CardTitle>
                <p className=" text-start text-sm text-gray-500">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-1 mt-6">
                <div className="text-4xl font-bold mb-4">
                  {plan.price}
                  {plan.period && (
                    <span className="text-lg font-normal text-gray-500 ml-1">/{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-4">
                  <p className=" text-start text-sm font-poppins-medium">{t("featuresHeading")}</p>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span className="text-sm font-poppins-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  {t("buttonText")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
