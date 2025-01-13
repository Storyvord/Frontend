"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ToolsSection = () => {
  const t = useTranslations("HomePage.Tools");
  const tools = [
    {
      id: 1,
      title: t("tool.0.title"),
      description: t("tool.0.description"),
      icon: "/icons/script2.svg",
    },
    {
      id: 2,
      title: t("tool.1.title"),
      description: t("tool.1.description"),
      icon: "/icons/storyboarding.svg",
    },
    {
      id: 3,
      title: t("tool.2.title"),
      description: t("tool.2.description"),
      icon: "/icons/shooting-scheduling.svg",
    },
    {
      id: 4,
      title: t("tool.3.title"),
      description: t("tool.3.description"),
      icon: "/icons/suppliers.svg",
    },
    {
      id: 5,
      title: t("tool.4.title"),
      description: t("tool.4.description"),
      icon: "/icons/announcements.svg",
    },
    {
      id: 6,
      title: t("tool.5.title"),
      description: t("tool.5.description"),
      icon: "/icons/production-design.svg",
    },
    {
      id: 7,
      title: t("tool.6.title"),
      description: t("tool.6.description"),
      icon: "/icons/production-calendar.svg",
    },
  ];

  return (
    <section className="py-16 relative">
      <div>
        <h1 className="text-2xl sm:text-3xl text-center font-poppins-semibold mt-6 md:text-4xl">
          {t("heading")}
        </h1>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full py-10"
        >
          <CarouselContent className="flex gap-0 md:gap-2 items-center">
            {tools.map(({ title, id, description, icon }) => (
              <CarouselItem key={id} className="basis-1/1 lg:basis-1/4 xl:basis-1/5 ">
                <div className="border text-white p-4 rounded-xl bg-[#57C38A] h-full flex items-start gap-3 min-h-28 z-30">
                  <Image src={icon} alt="" width={20} height={20} className=" mt-2 w-6 h-6" />
                  <div className="">
                    <h3 className="font-poppins-semibold text-lg whitespace-nowrap overflow-hidden text-ellipsis ">
                      {title}
                    </h3>
                    <p className=" text-sm">{description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <Image
        className=" hidden md:block -z-10 absolute top-28 left-0 w-64"
        src="/curve-image/img3.svg"
        alt=""
        width={100}
        height={100}
      />
      <Image
        className=" hidden md:block -z-10 absolute bottom-10 right-0 w-64"
        src="/curve-image/img2.svg"
        alt=""
        width={100}
        height={100}
      />
    </section>
  );
};

export default ToolsSection;
