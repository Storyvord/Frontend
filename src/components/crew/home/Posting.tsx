import { Button } from "@/components/ui/button-old";
import Image from "next/image";
import React from "react";

const Posting = () => {
  return (
    <section className=" h-full">
      <header className=" flex justify-between items-center">
        <span className=" flex gap-2 items-center">
          <Image width={25} height={25} src="/send.svg" alt="" />
          <h1 className=" text-lg md:text-lg">Posting</h1>
        </span>
        <Button
          className=" flex gap-2 rounded-sm border border-gray-600"
          size="sm"
          variant="outline"
        >
          <Image width={20} height={20} src="/icons/jobs.svg" alt="" /> View Jobs
        </Button>
      </header>
      <div className="border bg-white rounded-3xl h-full p-4 w-full mt-3">
        {/* Scrollable section */}
        <section className="overflow-y-auto max-h-96 p-2 space-y-4">
          <div className="flex gap-4">
            <Image width={30} height={30} src="/icons/posting.svg" alt="" />
            <div>
              <h4 className="font-poppins-medium">Art Director</h4>
              <div className=" flex justify-between gap-10 w-full">
                <p className="text-sm text-gray-600">Company name</p>
                <p className="text-sm text-gray-600">Exp : 7yrs</p>
                <p className="text-sm text-gray-600">London, UK</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Image width={30} height={30} src="/icons/posting.svg" alt="" />
            <div>
              <h4 className="font-poppins-medium">Art Director</h4>
              <div className=" flex justify-between gap-10 w-full">
                <p className="text-sm text-gray-600">Company name</p>
                <p className="text-sm text-gray-600">Exp : 7yrs</p>
                <p className="text-sm text-gray-600">London, UK</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Image width={30} height={30} src="/icons/posting.svg" alt="" />
            <div>
              <h4 className="font-poppins-medium">Art Director</h4>
              <div className=" flex justify-between gap-10 w-full">
                <p className="text-sm text-gray-600">Company name</p>
                <p className="text-sm text-gray-600">Exp : 7yrs</p>
                <p className="text-sm text-gray-600">London, UK</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Image width={30} height={30} src="/icons/posting.svg" alt="" />
            <div>
              <h4 className="font-poppins-medium">Art Director</h4>
              <div className=" flex justify-between gap-10 w-full">
                <p className="text-sm text-gray-600">Company name</p>
                <p className="text-sm text-gray-600">Exp : 7yrs</p>
                <p className="text-sm text-gray-600">London, UK</p>
              </div>
            </div>
          </div>
        </section>
      </div>{" "}
    </section>
  );
};

export default Posting;
