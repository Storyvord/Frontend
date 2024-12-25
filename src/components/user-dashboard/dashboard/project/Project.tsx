"use client";
import React, { useEffect, useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { Project as ProjectType } from "@/types/project";
import { useGetProjects } from "@/lib/react-query/queriesAndMutations/project";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Project = ({ onGoingProjects }: { onGoingProjects: any }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Main container reference
  const scrollContentRef = useRef<HTMLDivElement>(null); // Inner div reference for project cards
  const [showArrows, setShowArrows] = useState(false); // State to toggle arrows

  const t = useTranslations("Dashboard");

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
  }, [onGoingProjects]);

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
          <h1 className=" text-lg md:text-xl">{t("your-ongoing-projects")}</h1>
        </span>
        <Link href="/dashboard/new-project">
          <Button className="md:hidden flex gap-2">
            <Image height={20} width={20} src="/icons/plus-2.svg" alt="plus-icon" />{" "}
            {t("button.new-project")}
          </Button>
        </Link>
      </header>

      <main
        ref={scrollContainerRef}
        className="w-full overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div ref={scrollContentRef} className="flex gap-6 w-max scrollbar-hide">
          <Link
            href="/dashboard/new-project"
            className="w-80 border rounded-2xl p-4 bg-white hidden md:flex flex-col gap-4 cursor-pointer"
          >
            <Image height={27} width={27} src="/icons/plus.svg" alt="plus icon" />
            <span>
              <h2 className="font-semibold text-lg mb-1">{t("createProject.title")}</h2>
              <p>{t("createProject.description")}</p>
            </span>
          </Link>
          {onGoingProjects?.length === 0 && (
            <p className=" my-auto md:pl-12 text-gray-500">No project found</p>
          )}
          {onGoingProjects.map((project: any) => (
            <Link key={project.project_id} href={`/project-details/${project.project_id}`}>
              <ProjectCard
                key={project.project_id}
                name={project.name}
                status={project.status}
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
