import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

const BrandSection = () => {
  const t = useTranslations("HomePage.Brand");
  const brandImages = [
    "nhs.svg",
    "terumo.svg",
    "bbc.svg",
    "pg.svg",
    "cnn.svg",
    "emirates.svg",
    "jaguar.svg",
    "abbott.svg",
    "syngenata.svg",
    "ripple.svg",
  ];
  return (
    <section
      id="clients"
      className="flex flex-col gap-8 pb-12 lg:flex-row lg:items-end md:justify-between px-4 md:px-6 lg:px-10 xl:px-28 relative"
    >
      {/* Text Section */}
      <div className="lg:flex-[0.25] text-center md:text-left">
        <Badge
          variant="secondary"
          className="bg-white text-[#1e1e1e] px-4 py-1 text-sm font-medium shadow-[0px_1px_15px_rgba(0,255,0,0.3)] border-2 border-primary-green inline-flex items-center gap-3 w-fit mx-auto md:mx-0"
        >
          {t("clients")}
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-poppins-semibold mt-6 md:text-4xl">
          {t("heading")}
        </h2>
      </div>

      {/* Brand Logos */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:flex-[0.75]">
        {brandImages.map((item) => (
          <div
            className="h-16 p-4 rounded-xl border shadow-[0px_0px_5px_rgba(0,255,0,0.2)] flex items-center justify-center"
            key={item}
          >
            <Image
              src={`/brand/${item}`}
              alt={`Brand logo ${item}`}
              width={30}
              height={30}
              className="w-auto h-auto max-w-full max-h-full"
            />
          </div>
        ))}
      </div>
      {/* right carve */}
      <Image
        className=" hidden md:block -z-10 absolute top-14 right-0 w-64"
        src="/curve-image/img4.svg"
        alt=""
        width={100}
        height={100}
      />
    </section>
  );
};

export default BrandSection;
