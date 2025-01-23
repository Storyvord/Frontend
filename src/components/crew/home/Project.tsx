"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Project as ProjectType } from "@/types/project";
import { useGetProjects } from "@/lib/react-query/queriesAndMutations/project";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ProjectCard, { ShimmerCard } from "./ProjectCard";
import { useGetInvitations } from "@/lib/react-query/queriesAndMutations/crew/invitations";

type Project = {
  project_name: string;
  created_at: string;
  project_status: string;
  project_id: string;
};

const Project = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Main container reference
  const scrollContentRef = useRef<HTMLDivElement>(null); // Inner div reference for project cards
  const [showArrows, setShowArrows] = useState(false); // State to toggle arrows

  const { data: listOfProjects, isPending, isError } = useGetInvitations();

  useEffect(() => {
    // Check if scrollable content is wider than the container
    if (
      scrollContainerRef.current &&
      scrollContentRef.current &&
      scrollContentRef.current.scrollWidth > scrollContainerRef.current.clientWidth
    ) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  }, [listOfProjects]);

  // Function to handle left scroll
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Function to handle right scroll
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className=" group">
      <header className="flex justify-between mb-4">
        <span className="flex items-center gap-3">
          <Image height={27} width={27} src="/icons/project-2.svg" alt="plus-icon" />
          <h1 className=" text-lg md:text-xl">Your projects</h1>
        </span>
        <Link href="#">
          <Button className="flex gap-2 rounded-sm border-gray-600" size="sm">
            <Image height={20} width={20} src="/icons/plus-2.svg" alt="plus-icon" /> Manage Project
          </Button>
        </Link>
      </header>

      <main
        ref={scrollContainerRef}
        className="w-full overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {listOfProjects?.data?.length === 0 && !isPending && (
          <div className=" h-36 w-1/2 grid place-content-center mx-auto">
            <p className="text-gray-500">No project found</p>
            <Button
              className=" flex gap-2 rounded-sm border border-gray-600 mt-4"
              size="sm"
              variant="outline"
            >
              <Image width={20} height={20} src="/icons/jobs.svg" alt="" /> View Jobs
            </Button>
          </div>
        )}
        <div ref={scrollContentRef} className="flex gap-6 w-max scrollbar-hide">
          {isPending && new Array(4).fill("").map((_, index) => <ShimmerCard key={index} />)}
          {listOfProjects?.data?.map((project: Project) => (
            <Link key={project.project_id} href={`/project-details/${project.project_id}`}>
              <ProjectCard
                key={project.project_id}
                name={project.project_name}
                status={project.project_status}
                date={project.created_at}
              />
            </Link>
          ))}
        </div>
      </main>

      {showArrows && (
        <div className=" invisible group-hover:visible flex justify-between">
          <Button onClick={handleScrollLeft} className="px-4 py-2" variant="ghost">
            <Image src="/icons/left-arrow.svg" alt="left arrow" width={12} height={12} />
          </Button>
          <Button onClick={handleScrollRight} className="px-4 py-2 rotate-180" variant="ghost">
            <Image src="/icons/left-arrow.svg" alt="right arrow" width={12} height={12} />
          </Button>
        </div>
      )}
    </section>
  );
};

export default Project;
