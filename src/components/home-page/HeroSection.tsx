import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const t = useTranslations("HomePage");
  return (
    <div className="pt-24 md:pt-32 grid grid-cols-1 md:grid-cols-12 gap-y-6 items-center text-center relative">
      <div className="gradient-03 z-50" />

      {/* Badge Section */}
      <div className="col-span-12 md:col-start-5 md:col-span-4">
        <Badge
          variant="secondary"
          className="bg-white text-[#1e1e1e] px-4 py-1 md:py-2 text-sm font-medium shadow-[0px_1px_15px_rgba(0,255,0,0.3)] border-2 border-primary-green flex items-center gap-3 w-fit mx-auto"
        >
          <Image src="/icons/ai.svg" alt="ai" width={10} height={10} className="w-6 h-6" />
          <p className=" text-[0.85rem] md:text-[0.9rem]">{t("text")}</p>
        </Badge>
      </div>

      {/* Title Section */}
      <h1 className="col-span-12 md:col-start-2 md:col-span-10 text-2xl md:text-4xl lg:text-5xl font-poppins-bold md:mb-4 mb-2 text-background-2 flex flex-col justify-center items-center">
        <span>{t("title1")}</span>
        <span className="md:mt-4">{t("title2")}</span>
      </h1>

      {/* Description Section */}
      <p className="col-span-12 md:col-start-3 md:col-span-7 text-base md:text-xl text-gray-600 md:px-3 md:ml-[20%]">
        {t("description")}
      </p>

      {/* Button Section */}
      <div className="col-span-12">
        <Button
          className="  text-sm md:text-lg px-6 md:px-8 py-4 md:py-6 mx-auto"
          variant="storyvord"
        >
          <Link href="/auth/sign-in">{t("button.getStarted")}</Link>
        </Button>
      </div>

      {/* Image Section */}
      <div className="col-span-12 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <Image
          src="/project-dashboard.svg"
          alt="Storyvord Dashboard"
          width={1000}
          height={600}
          className="mx-auto w-full object-contain md:object-cover"
        />
      </div>
    </div>
  );
}
