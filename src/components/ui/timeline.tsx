"use client";
import { useMotionValueEvent, useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "./badge";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface TimelineEntry {
  subTitle: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const t = useTranslations("HomePage.Products");

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="w-full bg-gray-50 dark:bg-neutral-950 font-poppins" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <Badge
          variant="secondary"
          className="bg-white hover:bg-white text-[#1e1e1e] px-4 py-1 text-sm font-medium shadow-[0px_1px_15px_rgba(0,255,0,0.3)] border-2 border-primary-green flex items-center gap-3 w-fit "
        >
          <Image src="/icons/products.svg" alt="" width={10} height={10} className="w-6 h-6" />
          {t("badge")}
        </Badge>
        <h2 className="text-3xl md:text-5xl mb-4 text-background-2 dark:text-white max-w-4xl mt-10 font-bold">
          {t("heading")}
        </h2>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between pt-10 md:pt-20 md:gap-28">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start flex-[0.15] md:flex-[0.4]">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <div className="md:pl-20 hidden md:block text-[#011821] space-y-2">
                <h4 className="text-lg font-poppins-medium">{item.subTitle}</h4>
                <h3 className="text-xl font-poppins-bold">{item.title}</h3>
                <p className="text-lg font-poppins-light">{item.description}</p>
              </div>
            </div>

            <div className="relative md:pl-4 w-full flex-1 md:flex-[0.6]">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500 pl-2 sm:pl-0">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary-green via-background-2 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
