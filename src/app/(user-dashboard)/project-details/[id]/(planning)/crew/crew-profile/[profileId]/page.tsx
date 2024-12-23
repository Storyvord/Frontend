"use client";
import RatingSection from "@/components/user-dashboard/project-details/planning/crew/profile/RatingSection";
import ReviewCard from "@/components/user-dashboard/project-details/planning/crew/profile/ReviewCard";
import { Input } from "@/components/ui/input";
import { useGetCrewFullProfile } from "@/lib/react-query/queriesAndMutations/crew";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import CrewCard from "@/components/user-dashboard/project-details/planning/crew/CrewCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

type Profile = {
  id?: number;
  image: string;
  name: string;
  phone: string;
  location: string;
  languages: string;
  job_title: string;
  bio: string;
  experience: string;
  skills: string;
  standardRate: string;
  technicalProficiencies: string;
  specializations: string;
  drive: boolean;
  active: boolean;
  user?: number;
};

const CrewProfile = () => {
  const { profileId, id: projectId }: { profileId: string; id: string } = useParams();
  const [profile, setProfile] = useState<Profile | undefined>();

  const { data } = useGetCrewFullProfile(profileId);

  useEffect(() => {
    setProfile(data?.data?.at(0)?.crew_profile);
  }, [data]);

  return (
    <>
      <Link
        href={`/project-details/${projectId}/crew`}
        className="text-lg lg:text-xl font-semibold md:px-8 px-2 mt-3 flex gap-3 text-gray-700"
      >
        <Image src="/icons/left-arrow.svg" alt="language-icon" width={15} height={15} /> Crew
      </Link>
      <main className=" relative md:px-8 px-3 md:p-4 gap-4">
        <section className=" mt-4 lg:w-3/5 ">
          <div className=" flex justify-between">
            <div className="flex items-center gap-2 sm:flex-row sm:items-start">
              {profile?.image && (
                <Image
                  className="rounded-full object-fill"
                  src={profile?.image}
                  alt={profile?.name}
                  width={90}
                  height={90}
                />
              )}
              <div className="sm:ml-6 text-left mt-4 sm:mt-0">
                <h1 className="sm:text-xl text-md font-bold">{profile?.name}</h1>
                <h2 className="sm:text-lg text-sm text-gray-600">{profile?.job_title}</h2>
                <p className="text-gray-500 sm:text-lg text-sm">{profile?.location}</p>
              </div>
            </div>
            <div className=" flex gap-2 items-center text-sm">
              <Image
                src="/icons/star.svg"
                width={17}
                height={17}
                alt="star-icon"
                className=" mb-[2px]"
              />
              5.0 (2)
            </div>
          </div>

          <div className=" flex justify-between mt-3 text-md  border-b pb-3">
            <span className=" flex sm:gap-3 gap-1 items-center text-sm sm:text-md">
              <Image src="/icons/language.svg" alt="language-icon" width={15} height={15} />{" "}
              {profile?.languages}
            </span>
            <span className=" flex sm:gap-3 gap-1 items-center text-sm sm:text-md">
              <Image src="/icons/location.svg" alt="language-icon" width={15} height={15} /> 1000
              Miles
            </span>
            <span className=" flex sm:gap-3 gap-1 items-center text-sm sm:text-md">
              Day Rate: <p className=" text-green-500 ">{profile?.standardRate}</p>
            </span>
          </div>

          {/* portfolio */}
          <Carousel className=" mt-4 sm:p-3">
            <CarouselContent>
              <CarouselItem>
                <Image src="/portfolio-1.jpg" alt="portfolio" width={700} height={400} />
              </CarouselItem>
              <CarouselItem>
                <Image
                  className=" w-full h-[400px] object-cover"
                  src="/portfolio-1.png"
                  alt="portfolio"
                  width={700}
                  height={400}
                />
              </CarouselItem>
              <CarouselItem>
                <Image
                  className=" w-full h-[400px] object-cover"
                  src="/portfolio-1.jpg"
                  alt="portfolio"
                  width={700}
                  height={400}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className=" left-4 sm:w-12 sm:h-12" />
            <CarouselNext className=" right-4 sm:w-12 sm:h-12" />
          </Carousel>

          {/* temporary will change during api integration */}
          <section className=" lg:hidden block">
            <h3 className=" text-center text-lg font-semibold mt-16">
              Why AI Suggesting this crew.
            </h3>
            <div className=" mt-4 max-h-[400px] overflow-y-scroll  border border-green-500 bg-white">
              <p className="  px-4 py-2 bg-gradient-to-r from-green-500 to-gray-900 text-transparent bg-clip-text w-full">
                Based on the details you&apos;ve provided for your project, our AI has analyzed key
                factors such as the project&apos;s genre, budget, shooting locations, and production
                scale to suggest the most suitable crew members. Each recommendation is tailored to
                meet your project&apos;s specific needs, ensuring you have professionals with the
                right expertise. For example, if your project involves complex action sequences, our
                AI may prioritize experienced stunt coordinators and cinematographers with a history
                in high-paced environments.
              </p>
            </div>
            <Link
              // href={`/dashboard/message/?receiverId=${profile?.id}&name=${profile?.name}`}
              href="#"
              className=" mt-4 flex justify-between cursor-pointer rounded-2xl shadow-xl bg-white p-2"
            >
              {profile?.image && (
                <Image
                  className="rounded-full object-fill"
                  src={profile?.image}
                  alt={profile?.name}
                  width={50}
                  height={50}
                />
              )}
              <div>
                <h1 className=" text-lg text-gray-800 font-semibold">Message {profile?.name}</h1>
                <h3 className=" text-sm text-gray-500">
                  Average response time: <span className=" text-gray-800 font-bold">4 Hrs</span>
                </h3>
              </div>
              <Image src="/icons/up-arrow.svg" alt="language-icon" width={15} height={15} />
            </Link>
          </section>

          {/* basic detail */}
          <div className="mt-6 pt-6">
            <h3 className="text-md font-semibold">About</h3>
            <p className="mt-2 text-gray-700">{profile?.bio}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-md font-semibold text-gray-800">Experience</h4>
                <p className=" text-sm sm:text-md text-gray-700">{profile?.experience}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold text-gray-800">Languages</h4>
                <p className=" text-sm sm:text-md text-gray-700">{profile?.languages}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold text-gray-800">Skills</h4>
                <p className=" text-sm sm:text-md text-gray-700">{profile?.skills}</p>
              </div>
              <div>
                <h4 className="text-md font-semibold text-gray-800">Technical Proficiencies</h4>
                <p className=" text-sm sm:text-md text-gray-700">
                  {profile?.technicalProficiencies}
                </p>
              </div>
              <div>
                <h4 className="text-md font-semibold text-gray-800">Specializations</h4>
                <p className=" text-sm sm:text-md text-gray-700">{profile?.specializations}</p>
              </div>
            </div>
          </div>

          {/* recommendation */}
          <>
            <h1 className="text-xl text-gray-800 font-semibold mt-8 mb-2">Recommended for you</h1>
            <Carousel>
              <CarouselContent>
                <CarouselItem className=" lg:basis-1/2">
                  <CrewCard name="Robert" profile="/profile-5.png" />
                </CarouselItem>
                <CarouselItem className=" lg:basis-1/2">
                  <CrewCard name="Luci" profile="/profile-4.png" />
                </CarouselItem>
                <CarouselItem className=" lg:basis-1/2">
                  <CrewCard name="Mia" profile="/profile-3.png" />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-4 w-12 h-12" />
              <CarouselNext className=" right-4 w-12 h-12" />
            </Carousel>
          </>

          {/* review section */}
          <div className="mt-10">
            <h2 className=" text-xl text-gray-800 font-semibold">Review</h2>
            <RatingSection />
            <section className="md:flex block items-center justify-between my-6">
              <div className=" flex w-full md:w-3/4 ">
                <input placeholder="Search reviews" className=" p-2 rounded-l-md" />
                <button className=" bg-slate-900 text-white rounded-r-md w-12 grid place-content-center cursor-pointer">
                  <Image src="/icons/search.svg" width={15} height={15} alt="search" />
                </button>
              </div>
              <div className=" w-full flex gap-10 items-center md:justify-end md:mt-0 mt-4">
                <h2>Sort By</h2>
                <Select
                  options={[
                    { value: "most-relevant", label: "Most relevant" },
                    { value: "old", label: "Old" },
                    { value: "new", label: "New" },
                  ]}
                />
              </div>
            </section>
            <ReviewCard />
            <ReviewCard />
          </div>
        </section>
        <section className="hidden lg:block fixed w-1/4 right-8 top-20">
          <h3 className=" text-center text-lg font-semibold mt-16">Why AI Suggesting this crew.</h3>
          <div className=" mt-4 max-h-[400px] overflow-y-scroll  border border-green-500 bg-white">
            <p className="  px-4 py-2 bg-gradient-to-r from-green-500 to-gray-900 text-transparent bg-clip-text w-full">
              Based on the details you&apos;ve provided for your project, our AI has analyzed key
              factors such as the project&apos;s genre, budget, shooting locations, and production
              scale to suggest the most suitable crew members. Each recommendation is tailored to
              meet your project&apos;s specific needs, ensuring you have professionals with the
              right expertise. For example, if your project involves complex action sequences, our
              AI may prioritize experienced stunt coordinators and cinematographers with a history
              in high-paced environments.
            </p>
          </div>

          <Link
            // href={`/dashboard/message/?receiverId=${profile?.id}&name=${profile?.name}`}
            href="#"
            className=" mt-4 flex justify-between cursor-pointer rounded-2xl shadow-xl bg-white p-2"
          >
            {profile?.image && (
              <Image
                className="rounded-full object-fill"
                src={profile?.image}
                alt={profile?.name}
                width={50}
                height={50}
              />
            )}
            <div>
              <h1 className=" text-lg text-gray-800 font-semibold">Message {profile?.name}</h1>
              <h3 className=" text-sm text-gray-500">
                Average response time: <span className=" text-gray-800 font-bold">4 Hrs</span>
              </h3>
            </div>
            <Image src="/icons/up-arrow.svg" alt="language-icon" width={15} height={15} />
          </Link>
        </section>
      </main>
    </>
  );
};

export default CrewProfile;
