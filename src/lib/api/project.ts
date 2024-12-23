import { ProjectFormFieldType } from "@/components/user-dashboard/dashboard/CreateProjectForm";
import { NEW_API_URL_V2, USER_API } from "@/constant/constant";
import { customFetch } from "./api";
import { ProjectDetails, ProjectRequirements, ShootingSchedule } from "@/types/project";

export const createProject = async (formData: any) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/firstproject/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const getProjects = async () => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/projects/`, {
    method: "GET",
  });
};

export const getProjectDetails = async ({ project_id }: { project_id: string }) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/projects/${project_id}/`, {
    method: "GET",
  });
};

export const getShootDetails = async (project_id: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/shooting-details/?project_id=${project_id}`, {
    method: "GET",
  });
};

export const getProjectRequirements = async (project_id: string) => {
  return customFetch(
    `${NEW_API_URL_V2}/project/v2/project-requirements/?project_id=${project_id}`,
    {
      method: "GET",
    }
  );
};

export const editProjectDetails = async ({
  projectData,
  projectId,
}: {
  projectData: ProjectDetails;
  projectId: string;
}) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/projects/${projectId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
};

export const editShootDetails = async ({
  shootDetails,
  projectId,
}: {
  shootDetails: ShootingSchedule[];
  projectId: string;
}) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/shooting-details/?project_id=${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shootDetails),
  });
};

export const editProjectRequirements = async ({
  requirementData,
  reqId,
}: {
  requirementData: ProjectRequirements;
  reqId: number;
}) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/project-requirements/${reqId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requirementData),
  });
};

export const deleteProject = async (projectId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/projects/${projectId}/`, {
    method: "DELETE",
  });
};

export const editProject = async ({
  projectData,
  projectId,
}: {
  projectData: ProjectFormFieldType;
  projectId: string;
}) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/firstproject/${projectId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
};

export const editProjectStatus = async ({
  status,
  projectId,
}: {
  status: ProjectFormFieldType;
  projectId: string;
}) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/projects/${projectId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};
