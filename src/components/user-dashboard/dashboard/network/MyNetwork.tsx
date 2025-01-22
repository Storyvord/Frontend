import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MyNetwork = () => {
  const t = useTranslations("Dashboard");
  return (
    <div className=" p-2 pt-6">
      <header className=" flex justify-between items-center">
        <span className=" flex gap-2 items-center">
          <Image width={25} height={25} src="/icons/network.svg" alt="" />
          <h1 className=" text-xl font-poppins-medium md:text-lg">{t("my-network")}</h1>
        </span>
        <Button
          className=" flex gap-2 rounded-sm border border-gray-600"
          size="sm"
          variant="outline"
        >
          <Image width={20} height={20} src="/icons/plus-2.svg" alt="" /> {t("button.add")}
        </Button>
      </header>
      <main>
        <div className=" bg-white rounded-xl mt-2 p-3">
          {/* TODO: temporary code, this is only for demo. will change after apis will create */}
          <section className="space-y-3">
            <div className=" flex justify-between items-center ">
              <Image
                src="/profile-4.png"
                alt="picture"
                width={50}
                height={50}
                className=" rounded-full w-12 h-12"
              />
              <p className=" pr-6">Maria Rossi</p>
            </div>
            <div className=" flex justify-between items-center">
              <Image
                src="/profile-5.png"
                alt="picture"
                width={50}
                height={50}
                className=" rounded-full w-12 h-12"
              />
              <p className=" pr-6">Lucas Fernandez</p>
            </div>
            <div className=" flex justify-between items-center">
              <Image
                src="/profile-6.png"
                alt="picture"
                width={50}
                height={50}
                className=" rounded-full w-12 h-12"
              />
              <p className=" pr-6">Sarah Thompson</p>
            </div>
            <div className=" flex justify-between items-center">
              <Image
                src="/profile-7.png"
                alt="picture"
                width={50}
                height={50}
                className=" rounded-full w-12 h-12"
              />
              <p className=" pr-6">David Kim</p>
            </div>
          </section>
          <Link href="/dashboard/employees" className=" grid place-content-end cursor-pointer">
            <Image
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={30}
              height={30}
              className=" mt-3"
            />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default MyNetwork;
