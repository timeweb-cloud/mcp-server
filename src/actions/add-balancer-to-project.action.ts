import { projectsApiClient } from "../api/projects";
import { ProjectResource } from "../types/project.type";

export const addBalancerToProjectAction = async (
  projectId: number,
  resourceId: number
): Promise<ProjectResource> => {
  return await projectsApiClient.addBalancerToProject(projectId, resourceId);
};
