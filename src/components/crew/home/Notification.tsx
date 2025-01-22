import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Notification = () => {
  return (
    <div className=" p-2 pt-6">
      <header className=" flex justify-between items-center">
        <span className=" flex gap-2 items-center">
          <Image width={25} height={25} src="/icons/network.svg" alt="" />
          <h1 className=" text-xl font-poppins-medium md:text-lg">Notification</h1>
        </span>
      </header>
      <main>
        <div className=" bg-white rounded-xl mt-2 p-3">
          {/* TODO: temporary code, this is only for demo. will change after apis will create */}
          <section className="space-y-3">
            <div className=" flex gap-4 items-center ">
              <Image
                src="/profile-4.png"
                alt="picture"
                width={50}
                height={50}
                className=" rounded-full w-12 h-12"
              />
              <div>
                <h4>You fixed a bug.</h4>
                <p className="text-gray-400 text-xs">Just now</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Notification;
