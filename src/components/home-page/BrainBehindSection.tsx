import Image from "next/image";

export function BrainBehindSection() {
  return (
    <section className="py-20 bg-[#f8f8f8]">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">Brain Behind Storyvord</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3">
            <Image
              src="/placeholder.svg"
              alt="Founder"
              width={300}
              height={300}
              className="rounded-full mx-auto"
            />
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-gray-600 mb-4">
              With 15+ years of global experience in film and video production, James has
              contributed to blockbuster projects that left a mark in the industry. As a seasoned
              entrepreneur, he previously founded and successfully exited two production companies.
            </p>
            <p className="text-gray-600">
              James&apos; vision was to create a comprehensive ecosystem that combines human
              expertise with cutting-edge AI to revolutionize filmmaking and its associated
              experience. His goal is to empower creators worldwide to bring their stories to life
              seamlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
