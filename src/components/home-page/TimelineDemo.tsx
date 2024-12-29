import Image from "next/image";
import React from "react";
import { Timeline } from "../ui/timeline.tsx";
import SequentialAnimation from "../SequentialAnimation";

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

export function TimelineDemo() {
  const data = [
    {
      subTitle: "Find Your Crew",
      title: "Intelligent matches at your fingertips",
      description:
        "Match with the perfect team members based on skill, experience, and availability.",
      content: (
        <div>
          <div className=" space-y-2 pb-4">
            <Image src="/icons/crew.svg" alt="" width={30} height={30} className=" w-10 h-10" />
            <h1 className="text-[#011821] dark:text-neutral-200 text-xs md:text-2xl font-poppins-semibold mb-8">
              Hold tight! AI is analyzing profiles to suggest your dream crew.
            </h1>
          </div>
          <div className="h-[80vh] w-full">
            <SequentialAnimation svgs={crew} className=" bg-white" />
          </div>
        </div>
      ),
    },
    {
      subTitle: "Optimize Budgets",
      title: "AI-powered forecasting at your fingertips",
      description: "Transform hours of manual budget planning into just 15 minutes. ",
      content: (
        <div>
          <div className=" space-y-2 pb-4">
            <Image src="/icons/budget.svg" alt="" width={30} height={30} className=" w-10 h-10" />
            <h1 className="text-[#011821] dark:text-neutral-200 text-xs md:text-2xl font-poppins-semibold mb-8">
              AI is analyzing and optimizing your budget is almost ready!
            </h1>
          </div>
          <div className="h-[80vh] w-full">
            <SequentialAnimation svgs={budget} className=" h-full" />
          </div>
        </div>
      ),
    },
    {
      subTitle: "Global Film Compliance",
      title: "Effortless navigation at your fingertips",
      description:
        "Streamline international filming with AI-powered tools that deliver real-time updates on local regulations and cultural nuances.",
      content: (
        <div>
          {/* <div className=" space-y-2 pb-4">
            <Image
              src="/icons/compliance.svg"
              alt=""
              width={30}
              height={30}
              className=" w-10 h-10"
            />
            <h1 className="text-[#011821] dark:text-neutral-200 text-xs md:text-2xl font-poppins-semibold mb-8">
              Stay on top with effortless compliance solutions.
            </h1>
          </div> */}
          <div className="h-[80vh] w-full">
            <SequentialAnimation svgs={compliance} className=" h-full" />
          </div>
        </div>
      ),
    },
    {
      subTitle: "Smart Call Sheets",
      title: "Seamless scheduling",
      description:
        "Simplify production planning with AI-driven call sheets that adapt to changes, ensuring accuracy and efficiency for every shoot.",
      content: (
        <div>
          {/* <div className=" space-y-2 pb-4">
            <Image
              src="/icons/callsheet.svg"
              alt=""
              width={30}
              height={30}
              className=" w-10 h-10"
            />
            <h1 className="text-[#011821] dark:text-neutral-200 text-xs md:text-2xl font-poppins-semibold mb-8">
              AI is crafting the ultimate call sheet to simplify your production day.
            </h1>
          </div> */}
          <div className="h-[80vh] w-full">
            <SequentialAnimation svgs={callsheet} className=" h-full" />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full pb-12 pt-10" id="product">
      <Timeline data={data} />
    </div>
  );
}
