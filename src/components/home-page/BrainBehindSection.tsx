import { useTranslations } from "next-intl";
import Image from "next/image";

export function BrainBehindSection() {
  const t = useTranslations("HomePage.BrainBehindSection");

  return (
    <section className="py-20 bg-white md:mb-6">
      <div className=" grid grid-cols-12">
        <h2 className="text-5xl col-start-3 col-span-8 font-bold mb-12 text-center text-[#111111]">
          {t("title")}
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-2 md:border-b-2 md:border-t-2 border-primary-green lg:col-start-2 lg:col-span-10 col-span-12 lg:pl-[20%] pl-[5%] mt-[8%] relative">
          {/* Blur Element */}
          <div className="absolute w-[150px] h-[150px] left-[15%] -top-[10%] bg-[#22cb66e7] blur-[100px]  rounded-full z-20" />

          <div className="relative h-full w-full z-30 min-w-60">
            {/* Left Vertical Line */}
            <div className="absolute left-0 top-[-50%] h-[200%] w-[1px] bg-primary-green hidden md:block" />

            <Image
              src="/gaurav.svg"
              alt="Founder"
              width={200}
              height={200}
              className="mx-auto md:w-[100%] md:h-[100%] object-cover "
            />

            {/* Right Vertical Line */}
            <div className="absolute right-0 top-[-50%] h-[200%] w-[1px] bg-primary-green hidden md:block" />
          </div>

          <div className="md:px-3 text-justify mt-6 md:mt-0">
            <p className="text-gray-600 mb-2">{t("bio")}</p>
            <div className=" flex flex-col md:flex-row items-center md:gap-3">
              <h3 className="text-lg font-poppins-semibold">{t("name")}</h3>
              <p className="text-gray-600">{t("role")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
