"use client";
import Image from "next/image";
import React from "react";
import SequentialAnimation from "../SequentialAnimation";
import { Timeline } from "../ui/timeline";
import { useTranslations } from "next-intl";

const crew = [
  "/product/crew/crew1.svg",
  "/product/crew/crew2.svg",
  "/product/crew/crew3.svg",
  "/product/crew/crew4.svg",
  "/product/crew/crew5.svg",
];
const budget = [
  "/product/budget/budget1.svg",
  "/product/budget/budget2.svg",
  "/product/budget/budget3.svg",
  "/product/budget/budget4.svg",
  "/product/budget/budget5.svg",
  "/product/budget/budget6.svg",
  "/product/budget/budget7.svg",
];
const compliance = [
  "/product/compliance/compliance1.svg",
  "/product/compliance/compliance2.svg",
  "/product/compliance/compliance3.svg",
  "/product/compliance/compliance4.svg",
  "/product/compliance/compliance5.svg",
  "/product/compliance/compliance6.svg",
];
const callsheet = [
  "/product/callsheet/callsheet1.svg",
  "/product/callsheet/callsheet2.svg",
  "/product/callsheet/callsheet3.svg",
];

export function ProductSection() {
  const t = useTranslations("HomePage.Products");
  const data = [
    {
      subTitle: t("data.0.subTitle"),
      title: t("data.0.title"),
      description: t("data.0.description"),
      content: (
        <div>
          <div className="space-y-2 pb-4">
            <Image src="/icons/crew.svg" alt="" width={30} height={30} className="w-10 h-10" />
            <h1 className="text-[#011821] dark:text-neutral-200 text-xs md:text-2xl font-poppins-semibold mb-8">
              Hold tight! AI is analyzing profiles to suggest your dream crew.
            </h1>
          </div>
          <div className="h-[50vh] md:h-[80vh] w-full">
            <SequentialAnimation svgs={crew} />
          </div>
        </div>
      ),
    },
    {
      subTitle: t("data.1.subTitle"),
      title: t("data.1.title"),
      description: t("data.1.description"),
      content: (
        <div>
          <div className="space-y-2 pb-4">
            <Image src="/icons/budget.svg" alt="" width={30} height={30} className="w-10 h-10" />
            <h1 className="text-[#011821] dark:text-neutral-200 text-xs md:text-2xl font-poppins-semibold mb-8">
              AI is analyzing and optimizing your budget. It&apos;s almost ready!
            </h1>
          </div>
          <div className="h-[50vh] md:h-[80vh] w-full">
            <SequentialAnimation svgs={budget} />
          </div>
        </div>
      ),
    },
    {
      subTitle: t("data.2.subTitle"),
      title: t("data.2.title"),
      description: t("data.2.description"),
      content: (
        <div className="h-[50vh] md:h-[80vh] w-full">
          <h1 className="text-[#011821] dark:text-neutral-200 text-xs md:text-2xl font-poppins-semibold mb-8">
            {t("data.2.content")}
          </h1>
          <SequentialAnimation svgs={compliance} />
        </div>
      ),
    },
    {
      subTitle: t("data.3.subTitle"),
      title: t("data.3.title"),
      description: t("data.3.description"),
      content: (
        <div className="h-[50vh] md:h-[80vh] w-full">
          <h1 className="text-[#011821] dark:text-neutral-200 text-xs md:text-2xl font-poppins-semibold mb-8">
            {t("data.3.content")}
          </h1>
          <SequentialAnimation svgs={callsheet} />
        </div>
      ),
    },
  ];

  return (
    <section className="px-4 md:px-6 lg:px-10 xl:px-28">
      <div className="w-full pb-12 pt-10" id="product">
        <Timeline data={data} />
      </div>
    </section>
  );
}
