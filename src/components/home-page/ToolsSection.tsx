"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

const ToolsSection = () => {
  const tools = [
    {
      id: 1,
      title: "Script",
      description: "Import your script",
    },
    {
      id: 2,
      title: "Budget",
      description: "Import your script",
    },
    {
      id: 3,
      title: "Announcements",
      description: "Import your script",
    },
    {
      id: 4,
      title: "Shooting scheduling",
      description: "Import your script",
    },
    {
      id: 5,
      title: "Script",
      description: "Import your script",
    },
    {
      id: 6,
      title: "Budget",
      description: "Import your script",
    },
  ];

  return (
    <div className=" pb-12">
      <h1 className="text-2xl sm:text-3xl font-poppins-semibold mt-6 md:text-4xl">
        Integrate the tools you already use
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
              <div className="border p-4 rounded-xl bg-[#8DE1AF] h-full flex flex-col justify-between">
                <h3 className="font-poppins-semibold text-lg truncate overflow-hidden whitespace-nowrap">
                  {title}
                </h3>
                <p>{description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ToolsSection;
