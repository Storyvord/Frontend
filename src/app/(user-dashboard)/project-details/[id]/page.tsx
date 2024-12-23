"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { useProjectControl } from "@/context/ProjectContext";
import {
  useDeleteProject,
  useEditProjectStatus,
  useGetProjectDetails,
  useGetProjectRequirements,
  useGetProjects,
  useGetShootDetails,
} from "@/lib/react-query/queriesAndMutations/project";

import LoadingPage from "@/components/projectdetails/LoadingPage";
import ProjectDetailsUI from "@/components/projectdetails/ProjectDetailsUI";
import Tasks from "@/components/user-dashboard/project-details/tasks/Tasks";
import ShootingSchedule from "@/components/user-dashboard/project-details/shootingSchedule/ShootingSchedule";
import WhatsGoingOn from "@/components/user-dashboard/project-details/whatsGoingOn/WhatsGoingOn";
import { useToast } from "@/components/ui/use-toast";
import ProjectDetailsCalendar from "@/components/user-dashboard/project-details/calendar/ProjectDetailsCalendar";
import Link from "next/link";

// Define available project statuses for selection
const projectStatuses = [
  { value: "COMPLETED", label: "COMPLETED" },
  { value: "CANCELLED", label: "CANCELLED" },
  { value: "PAUSED", label: "PAUSED" },
  { value: "PRE_PRODUCTION", label: "PRE_PRODUCTION" },
  { value: "POST_PRODUCTION", label: "POST_PRODUCTION" },
  { value: "RELEASED", label: "RELEASED" },
];

const ProjectDetails: React.FC = () => {
  // State to manage the selected project status
  const [selectedStatus, setSelectedStatus] = useState<{ value: string; label: string } | null>(
    null
  );
  const { toast } = useToast();

  // Get the project ID from the URL parameters
  const { id: projectId } = useParams<{ id: string }>();
  const router = useRouter();

  // Get the function to set the project in global context
  const { setProject } = useProjectControl();

  const {
    data: singleProject,
    isPending: projectDetailsLoading,
    isError,
  } = useGetProjectDetails(projectId);
  const { data: projectRequirements } = useGetProjectRequirements(projectId);
  const { data: shootDetails } = useGetShootDetails(projectId);

  // Mutation hook for deleting a project
  const { mutateAsync: deleteProject, isPending: deletingProject } = useDeleteProject();

  // Mutation hook for editing project status
  const { mutateAsync: editProjectStatus } = useEditProjectStatus(projectId);

  // Set the project in the global state when project details are loaded
  useEffect(() => {
    if (singleProject) {
      setProject({ id: singleProject?.project_id, name: singleProject?.name });
    }
  }, [singleProject, setProject]);

  // Handle project deletion, redirect to home after successful deletion
  const handleDeleteProject = async () => {
    if (projectId === "302e14ea-3fbd-413b-af5e-924f72a1b00a") {
      toast({
        title: "You can't delete this project",
        description: "as this is a Test project ",
      });
      return;
    }
    await deleteProject(projectId);
    router.replace("/dashboard");
  };

  // Handle status change for the project
  const handleChangeStatus = async (selectedOption: any) => {
    setSelectedStatus(selectedOption); // Update local state with the selected status

    // Call mutation to update project status in the backend
    try {
      await editProjectStatus({ status: selectedOption.value, projectId });
      toast({
        title: "Status updated successfully",
        description: `Project status changed to ${selectedOption.label}`,
      });
    } catch (e) {
      toast({
        title: "Failed to update status",
        // description: `Project status not changed to ${selectedOption.label}`,
      });
    }
  };

  // Navigate to the edit form for the current project
  const handleEditForm = () => {
    router.push(`/dashboard/edit-project/?projectId=${projectId}`);
  };

  // Show loading page while project details are being fetched
  if (projectDetailsLoading) {
    return <LoadingPage />;
  }

  // Display error message if fetching project details fails
  if (isError) {
    return <div className="w-full text-center text-red-700">Failed to fetch project details</div>;
  }

  // Render the UI component for displaying project details
  return (
    <>
      <ProjectDetailsUI
        projectDetails={singleProject}
        projectRequirements={projectRequirements}
        shootDetails={shootDetails}
        selectedStatus={selectedStatus}
        deletingProject={deletingProject}
        projectStatuses={projectStatuses}
        handleChangeStatus={handleChangeStatus}
        handleDeleteProject={handleDeleteProject}
        handleEditForm={handleEditForm}
      />
      <main className=" sm:p-4">
        <div className=" relative mt-6 p-2 rounded-lg group">
          <Link
            href={`/project-details/${projectId}/reports`}
            className=" flex gap-3 bg-green-500 bg-opacity-10 px-4 py-3 border-2 border-green-500 rounded-md w-fit group-hover:animate-bounce"
          >
            <Image src="/icons/ai.svg" alt="icons" width={20} height={20} />
            Get AI Suggestions
          </Link>
          <button className="rounded-t-lg rounded-br-lg absolute -top-8 left-40 shadow-lg shadow-gray-400 bg-gradient-to-r from-[#22CB67] to-[#092579] text-white font-semibold p-2 text-lg">
            It&apos;s Free
          </button>
        </div>
        <section className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Tasks />
          <ShootingSchedule />
          <WhatsGoingOn />
        </section>
        <ProjectDetailsCalendar />
      </main>
    </>
  );
};

export default ProjectDetails;
