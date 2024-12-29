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
    },
    {
      id: 2,
      title: t("tool.1.title"),
      description: t("tool.1.description"),
    },
    {
      id: 3,
      title: t("tool.2.title"),
      description: t("tool.2.description"),
    },
    {
      id: 4,
      title: t("tool.3.title"),
      description: t("tool.3.description"),
    },
    {
      id: 5,
      title: t("tool.4.title"),
      description: t("tool.4.description"),
    },
    {
      id: 6,
      title: t("tool.5.title"),
      description: t("tool.5.description"),
    },
    {
      id: 7,
      title: t("tool.6.title"),
      description: t("tool.6.description"),
    },
  ];

  return (
    <div className=" pb-12">
      <h1 className="text-2xl sm:text-3xl font-poppins-semibold mt-6 md:text-4xl">
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
        <CarouselContent className="flex gap-0 md:gap-5 items-center">
          {tools.map(({ title, id, description }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              {/* <Image
                src={path}
                alt={name}
                width={200}
                height={56}
                className="h-9 sm:h-14 w-auto object-contain"
              /> */}
              <div className="border text-background-2 p-4 rounded-xl bg-[#8DE1AF] h-full flex flex-col justify-start min-h-28">
                <h3 className="font-poppins-semibold text-lg">{title}</h3>
                <p className=" text-sm">{description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ToolsSection;
