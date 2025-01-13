"use client";
import ProjectCard from "@/components/crew/projects/ProjectCard";
import Tabs from "@/components/Tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  useAcceptInvitation,
  useGetInvitations,
  useRejectInvitation,
} from "@/lib/react-query/queriesAndMutations/crew/invitations";
import React, { useState, useEffect } from "react";

const tabs = ["In Progress", "Invitations", "Rejected"];
export type Project = {
  project_id: string;
  project_name: string;
  project_status: string;
  id: string;
  invites: { status: "PENDING" | "REJECTED" | "ACCEPTED"; invite_id: string }[];
  created_at: string;
  message: string;
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [pendingProjects, setPendingProjects] = useState<Project[]>([]);
  const [acceptedProjects, setAcceptedProjects] = useState<Project[]>([]);
  const [rejectedProjects, setRejectedProjects] = useState<Project[]>([]);
  const { toast } = useToast();

  const { data: projects } = useGetInvitations();

  const {
    mutateAsync: acceptInvitation,
    isPending: isAcceptLoading,
    isError: isAcceptError,
  } = useAcceptInvitation();

  const {
    mutateAsync: rejectInvitation,
    isPending: isRejectLoading,
    isError: isRejectError,
  } = useRejectInvitation();

  useEffect(() => {
    if (projects) {
      const pending: Project[] = [];
      const accepted: Project[] = [];
      const rejected: Project[] = [];

      projects?.data?.forEach((project: Project) => {
        if (project?.invites?.at(0)?.status === "PENDING") {
          pending.push(project);
        } else if (project?.invites?.at(0)?.status === "ACCEPTED") {
          accepted.push(project);
        } else if (project?.invites?.at(0)?.status === "REJECTED") {
          rejected.push(project);
        }
      });
      console.log(projects?.data);
      setPendingProjects(pending);
      setAcceptedProjects(accepted);
      setRejectedProjects(rejected);
    }
  }, [projects]);

  const handleAccept = async (inviteId: string) => {
    try {
      await acceptInvitation(inviteId);
      toast({ title: "Invitation accepted" });
    } catch (error) {
      toast({ title: "Failed to send accept request", variant: "destructive" });
    }
  };

  const handleReject = async (inviteId: string) => {
    try {
      await rejectInvitation(inviteId);
      toast({ title: "Invitation rejected" });
    } catch (error) {
      toast({ title: "Failed to send reject request", variant: "destructive" });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Projects</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <div className="p-4 mt-4 text-center font-mono">
        {activeTab === tabs[0] && (
          <>
            {acceptedProjects?.length === 0 && (
              <p className="text-gray-600 font-semibold">No project found</p>
            )}
            {acceptedProjects?.map((project: Project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </>
        )}
        {activeTab === tabs[1] && (
          <>
            {pendingProjects?.length === 0 && (
              <p className="text-gray-600 font-semibold">No project found</p>
            )}
            {pendingProjects?.map((project: Project) => (
              <ProjectCard
                key={project.project_id}
                project={project}
                handleAccept={handleAccept}
                handleReject={handleReject}
                isAcceptLoading={isAcceptLoading}
                isRejectLoading={isRejectLoading}
              />
            ))}
          </>
        )}

        {activeTab === tabs[2] && (
          <>
            {rejectedProjects?.length === 0 && (
              <p className="text-gray-600 font-semibold">No project found</p>
            )}
            {rejectedProjects?.map((project: Project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;
