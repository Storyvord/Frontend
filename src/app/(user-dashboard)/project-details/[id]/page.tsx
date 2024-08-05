"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useCompleteProject,
  useDeleteProject,
  useGetProjectDetails,
} from "@/lib/react-query/queriesAndMutations";
import SelectedCrew from "@/components/projectdetails/SelectedCrew";
import LoadingPage from "@/components/projectdetails/LoadingPage";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDelete } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useProjectControl } from "@/context/ProjectContext";

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const {
    data: projectDetails,
    isLoading: projectDetailsLoading,
    error,
  } = useGetProjectDetails(params.id);

  
  const {setProject} =useProjectControl()

  useEffect(() => {
    setProject({id: projectDetails?.project_id, name:projectDetails?.name })
  }, [projectDetails, setProject])
  

  const { mutateAsync: deleteProject, isLoading: deletingProject } =
    useDeleteProject();

  const { mutateAsync: completeProject, isLoading: completingProject } =
    useCompleteProject(params.id);

  const router = useRouter();
  const handleDeleteProject = async () => {
    await deleteProject({ project_id: params.id });
    router.push("/dashboard/home");
  };

  const handleCompleteProject = async () => {
    await completeProject({ project_id: params.id });
    // setProjectStatus("COMPLETED");
  };

  if (projectDetailsLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="w-full text-center text-red-700 ">
        Failed to fetch project details
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 py-2 w-full h-auto px-4">
      <Card className="relative w-full h-full bg-white shadow-lg rounded-xl overflow-auto pt-2">
        <CardHeader className="sm:flex sm:flex-row-reverse sm:items-start sm:justify-between sm:space-y-0">
          <div className="flex gap-2 items-end justify-between sm:justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div>
                  <MdDelete className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 hover:text-red-400 cursor-pointer" />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the project and remove your project data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    onClick={handleDeleteProject}
                    className={`${deletingProject ? "disabled" : ""}`}
                  >
                    {deletingProject ? "Deleting..." : "Delete"}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    disabled={projectDetails?.status === "COMPLETED"}
                  >
                    <div onClick={handleCompleteProject}>
                      {completingProject ? (
                        <ReloadIcon className="h-5 w-5 animate-spin text-bold text-gray-500" />
                      ) : (
                        <GrStatusGood
                          className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer ${
                            projectDetails?.status === "COMPLETED"
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className={`${
                      projectDetails?.status === "COMPLETED" ? "hidden" : ""
                    } bg-transparent shadow-none border-none`}
                  >
                    <p className="text-sm text-green-500 bold">
                      Mark Project As Completed
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div>
                {projectDetails?.status === "INITIATED" && (
                  <div className="text-sm sm:text-base text-gray-500 font-bold">
                    INITIALIZED
                  </div>
                )}
                {projectDetails?.status === "COMPLETED" && (
                  <div className="text-sm sm:text-base text-green-500 font-bold">
                    COMPLETED
                  </div>
                )}
                {projectDetails?.status === "PLANNING" && (
                  <div className="text-sm sm:text-base text-yellow-500 font-bold">
                    PLANNING
                  </div>
                )}
              </div>
            </div>
          </div>
          <CardTitle className="sm:text-3xl font-bold text-gray-900 dark:text-white float-left">
            {projectDetails?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="font-sans p-0 flex flex-col gap-2 mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Content Type:
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails?.content_type}
            </p>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Description
            </h2>
            <CardDescription className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails?.brief}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Budget:
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails?.budget_amount}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Location:{" "}
            </h2>
            {projectDetails?.location_details?.length > 0 && (
              <div className="text-base text-gray-600 dark:text-gray-200 flex">
                {projectDetails?.location_details.map((item: any) => (
                  <p key={item.location}>{item.location}, &nbsp;</p>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Additional Details
            </h2>
            <CardDescription className="text-base text-gray-600 dark:text-gray-200">
              {projectDetails?.additional_details}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
      <div className="w-full h-auto mt-5">
        {/* <SelectedCrew
          project_id={projectDetails?.project_id}
          status={projectDetails?.status}
        /> */}
      </div>
    </div>
  );
};

export default ProjectPage;
