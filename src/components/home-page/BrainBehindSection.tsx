import Image from "next/image";

export function BrainBehindSection() {
  return (
    <section className="py-20 bg-white mb-6">
      <div className="container grid grid-cols-12">
        <h2 className="text-5xl col-start-3 col-span-8 font-bold mb-12 text-center text-[#111111]">
          Brain Behind Storyvord
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-2 border-b-2 border-t-2 border-primary-green col-start-2 col-span-10 pl-[20%] mt-[8%] relative">
          {/* Blur Element */}
          <div className="absolute w-[150px] h-[150px] left-[15%] -top-[10%] bg-[#22cb66e7] blur-[100px]  rounded-full z-20" />

          <div className="relative h-full w-full z-30">
            {/* Left Vertical Line */}
            <div className="absolute left-0 top-[-50%] h-[200%] w-[1px] bg-primary-green" />

            <Image
              src="/gaurav.svg"
              alt="Founder"
              width={200}
              height={200}
              className="mx-auto w-[100%] h-[100%] object-cover "
            />

            {/* Right Vertical Line */}
            <div className="absolute right-0 top-[-50%] h-[200%] w-[1px] bg-primary-green" />
          </div>

          <div className="px-3">
            <p className="text-gray-600 mb-2">
              With 12+ years of global experience in film and video production, Gaurav has
              contributed to blockbuster projects like Fast & Furious 7 and The Crown. A visionary
              entrepreneur, he previously founded CamArt, a leading film equipment rental portal for
              international producers. Armed with an MBA in International Business (UK) and business
              certifications from Harvard University, Gaurav brings unmatched expertise to
              revolutionize filmmaking with AI.
            </p>
            <div className=" flex items-center gap-3">
              <h3 className="text-lg font-poppins-semibold">Gaurav Sharma</h3>
              <p className="text-gray-600">Chief Executive Officer @Storyvord</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
