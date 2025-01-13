import React from "react";
import { Project } from "@/app/crew/projects/page";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  project: Project;
  handleAccept?: (referral_code: string) => void;
  isAcceptLoading?: boolean;
  handleReject?: (referral_code: string) => void;
  isRejectLoading?: boolean;
};

const ProjectCard = ({
  project,
  handleAccept,
  isAcceptLoading,
  handleReject,
  isRejectLoading,
}: Props) => {
  return (
    <div>
      <div
        key={project.id}
        className="p-4 mb-4 border rounded-lg shadow-md bg-white flex flex-col items-center gap-3 max-w-4xl mx-auto"
      >
        <h2 className="text-xl font-poppins-bold">{project.project_name}</h2>
        <p className=" font-poppins">
          <span className=" font-poppins-semibold">Status:</span> {project.project_status}
        </p>
        <p className=" font-poppins">
          <span className=" font-poppins-semibold">Created At:</span>{" "}
          {new Date(project.created_at).toLocaleString()}
        </p>
        {/* <Accordion type="single" collapsible className=" sm:w-[50%]">
          <AccordionItem value="item-1">
            <AccordionTrigger>Note</AccordionTrigger>
            <AccordionContent>{project.message}</AccordionContent>
          </AccordionItem>
        </Accordion> */}
        {project?.invites?.at(0)?.status === "PENDING" && (
          <div className="mt-4">
            {handleAccept && (
              <Button
                onClick={() => handleAccept(project?.invites?.at(0)?.invite_id!)}
                className="mr-2 bg-green-500 hover:bg-green-400 text-white rounded-lg"
                disabled={isAcceptLoading}
              >
                Accept
              </Button>
            )}
            {handleReject && (
              <Button
                onClick={() => handleReject(project?.invites?.at(0)?.invite_id!)}
                variant="destructive"
                disabled={isRejectLoading}
              >
                Reject
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
