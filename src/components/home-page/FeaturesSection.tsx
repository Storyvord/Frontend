import { Badge } from "../ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const t = useTranslations("HomePage.FeaturesSection");

  const features = [
    {
      icon: "/icons/budget.svg",
      title: t("features.0.title"),
      description: t("features.0.description"),
    },
    {
      icon: "/icons/crew.svg",
      title: t("features.1.title"),
      description: t("features.1.description"),
    },
    {
      icon: "/icons/script.svg",
      title: t("features.2.title"),
      description: t("features.2.description"),
    },
    {
      icon: "/icons/calendar.svg",
      title: t("features.3.title"),
      description: t("features.3.description"),
    },
  ];

  return (
    <section className="px-4 py-16 md:px-6 lg:px-10 xl:px-28 relative">
      <div>
        <Badge
          variant="secondary"
          className="bg-white hover:bg-white text-[#1e1e1e] px-4 py-1 text-sm font-medium shadow-[0px_1px_15px_rgba(0,255,0,0.3)] border-2 border-primary-green flex items-center gap-3 w-fit "
        >
          <Image src="/icons/production.svg" alt="ai" width={10} height={10} className="w-6 h-6" />
          <p>{t("badgeText")}</p>
        </Badge>
        <p className=" text-xl font-poppins-medium mt-8">{t("introText")}</p>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 xl:gap-12 mt-8 relative z-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center rounded-2xl shadow-md bg-[#FAFAFA] p-4 z-10"
            >
              <div className=" rounded-full p-4 mb-8 self-start">
                <Image
                  src={feature.icon}
                  alt="icon"
                  width={10}
                  height={10}
                  className="w-10 md:w-14 h-10 md:h-14"
                />
              </div>
              <h3
                className={cn(
                  " text-[1rem] md:text-2xl font-poppins-semibold text-left mb-2",
                  index % 2 !== 0 ? "text-background-2" : "text-primary-green"
                )}
              >
                {feature.title}
              </h3>
              <p className="text-gray-600 text-[0.8rem] md:text-base text-justify">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="gradient-01 z-0" />
    </section>
  );
}
