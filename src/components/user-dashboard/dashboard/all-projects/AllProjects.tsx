"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

const AllProjects = ({ projects }: { projects: any }) => {
  console.log(projects);
  return (
    <div className="p-2 relative">
      <h1 className="text-xl">All Projects</h1>

      <main className="bg-white mt-2 rounded-3xl border-2 overflow-y-scroll h-72 hide-scrollbar">
        <div className=" bg-white rounded-xl p-3">
          {projects?.results?.map((project: any) => (
            <Link
              href={`/project-details/${project.project_id}`}
              target="_blank"
              key={project.project_id}
              className=" bg-gray-100 p-2 flex justify-between items-center mt-2 rounded-md"
            >
              <p>{project.name}</p>
              <div>
                {project?.status === "CANCELLED" && (
                  <p className="text-sm sm:text-base text-red-500 font-poppins-medium">CANCELLED</p>
                )}
                {project?.status === "COMPLETED" && (
                  <p className="text-sm sm:text-base text-green-500 font-poppins-medium">
                    COMPLETED
                  </p>
                )}
                {project?.status !== "COMPLETED" && project?.status !== "CANCELLED" && (
                  <p className="text-sm sm:text-base text-yellow-500 font-poppins-medium">
                    {project?.status}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllProjects;
