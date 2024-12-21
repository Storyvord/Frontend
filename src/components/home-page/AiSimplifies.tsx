import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";

const AiSimplifies = () => {
  return (
    <section className="container grid grid-cols-12 pt-16 relative">
      <div className="gradient-02 z-50 rounded-full" />
      <div className=" flex flex-col gap-5 item-start col-start-1 col-span-7">
        <Badge
          variant="secondary"
          className="bg-white text-[#1e1e1e] px-4 py-1 text-sm font-medium shadow-[0px_1px_15px_rgba(0,255,0,0.3)] border-2 border-primary-green flex items-center gap-3 w-fit"
        >
          <Image src="/icons/ai.svg" alt="ai" width={10} height={10} className="w-6 h-6" />
          How AI Simplifies Filmmaking for You
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins-bold leading-9 text-[#111111]  ">
          AI That Thinks Like a <br /> Producer
        </h1>
        <p className=" text-paragraph-2-medium">
          From accurate budget calculations to intelligent crew recommendations, <br /> AI ensures
          your production is seamless, efficient, and creative.
        </p>
      </div>
      <div className=" p-6 rounded-xl bg-green-500 col-start-10 col-span-3 h-fit ">
        <h2 className=" text-xl text-white font-poppins-semibold tracking-wide">
          Trusted by Leading <br /> Filmmakers Globally.
        </h2>
      </div>
      <div className=" -mt-[27%] p-4 rounded-xl bg-[#0A0A41] text-white col-start-9 col-span-4 ">
        <h2 className=" text-heading-2 ">
          AI suggests the perfect <br /> crew for you.
        </h2>
        <div className=" flex gap-3">
          <Image src="/profile-group.svg" width={130} height={50} alt="logo" className=" w-40" />
          <p>Join our Community, We are waiting for you</p>
        </div>
      </div>
    </section>
  );
};

export default AiSimplifies;
