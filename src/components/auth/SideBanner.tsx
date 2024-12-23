"use client";
import Image from "next/image";
import Logo from "@/assets/app-logo.svg";
import Banner from "@/assets/login-image.jpg";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useTranslations } from "next-intl";

const SideBanner = () => {
  const router = useRouter();
  const t = useTranslations("Auth.banner");

  return (
    <div className="md:w-6/12 md:block hidden">
      <div className="relative">
        <div className="absolute top-6 left-10 cursor-pointer" onClick={() => router.push("/")}>
          <Image src={Logo} alt="app-logo" />
        </div>
        <Image src={Banner} className="h-screen object-cover" alt="login-image" />
        <div className="absolute bottom-6 left-10">
          <h2 className="text-3xl leading-[3rem] font-normal text-[#111111] font-poppins">
            {t("heading1")} <br /> {t("heading2")}{" "}
            <span className="text-3xl font-normal text-white bg-[#22CB67] pl-1 pr-1">
              {t("highlighted")}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SideBanner;
