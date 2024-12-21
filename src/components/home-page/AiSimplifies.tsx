import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AiSimplifies = () => {
  const t = useTranslations("HomePage.AiSimplifies");

  return (
    <section className="container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-12 pt-16 relative">
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins-bold leading-tight text-[#111111]">
          {t("title")}
        </h1>
        <p className="text-paragraph-2-medium">{t("description")}</p>
      </div>

      {/* Right Section: Trusted Badge */}
      <div className="p-6 rounded-xl bg-green-500 col-span-12 md:col-start-10 md:col-span-3 h-fit mx-auto md:mx-0">
        <h2 className="text-lg sm:text-xl text-white font-poppins-semibold tracking-wide">
          {t("trustedText")}
        </h2>
      </div>

      {/* Crew Suggestion Section */}
      <div className="mt-0 sm:-mt-[2%] md:-mt-[27%] p-4 rounded-xl bg-[#0A0A41] text-white col-span-12 md:col-start-9 md:col-span-4 mx-auto md:mx-0">
        <h2 className="text-lg sm:text-xl md:text-heading-2">{t("crewSuggestion")}</h2>
        <div className="flex gap-3 items-center">
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
    </section>
  );
};

export default AiSimplifies;
