import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AiSimplifies = () => {
  const t = useTranslations("HomePage.AiSimplifies");

  return (
    <section className="px-4 md:px-6 lg:px-10 xl:px-28 relative py-16">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-12 z-10">
        <div className="gradient-02 z-50 rounded-full" />
        {/* Left Section: Badge, Title, Description */}
        <div className="flex flex-col gap-5 items-start col-span-12 md:col-start-1 md:col-span-7 px-4 sm:px-6 md:px-0">
          <Badge
            variant="secondary"
            className="bg-white text-[#1e1e1e] px-4 py-1 text-sm font-medium shadow-[0px_1px_15px_rgba(0,255,0,0.3)] border-2 border-primary-green flex items-center gap-3 w-fit"
          >
            <Image src="/icons/ai.svg" alt="ai" width={10} height={10} className="w-6 h-6" />
            {t("badgeText")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins-bold leading-tight text-background-2">
            {t("title")}
          </h1>
          <p className="text-paragraph-2-medium">{t("description")}</p>
        </div>

        <div className=" col-start-1 col-span-1 md:col-start-9 md:col-span-4 space-y-6">
          {/* Trusted Badge */}
          <div className="p-6 z-30 rounded-xl bg-green-500 h-fit ml-auto lg:w-[80%] w-full">
            <h2 className="text-lg sm:text-xl text-white font-poppins-semibold tracking-wide">
              {t("trustedText")}
            </h2>
          </div>

          {/* Crew Suggestion Section */}
          <div className=" p-4 rounded-xl bg-[#0A0A41] text-white lg:w-[90%] w-full ml-auto">
            <h2 className="text-lg sm:text-xl md:text-heading-2">{t("crewSuggestion")}</h2>
            <div className="flex flex-col xl:flex-row gap-3 items-center mt-4">
              <Image
                src="/profile-group.svg"
                width={130}
                height={50}
                alt="logo"
                className="w-28 sm:w-36 md:w-40"
              />
              <p>{t("community")}</p>
            </div>
          </div>
        </div>
      </div>
      {/* left curve */}
      <Image
        className=" hidden md:block absolute z-50 bottom-0 left-0 rotate-12 w-48"
        src="/curve-image/img1.svg"
        alt=""
        width={100}
        height={100}
      />

      {/* right carve */}
      <Image
        className=" hidden md:block -z-10 absolute top-0 right-12 w-48"
        src="/curve-image/img1.svg"
        alt=""
        width={100}
        height={100}
        style={{ transform: "rotateX(180deg) rotateZ(10deg)" }}
      />
    </section>
  );
};

export default AiSimplifies;
