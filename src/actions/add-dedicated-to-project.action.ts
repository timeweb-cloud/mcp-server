import { projectsApiClient } from "../api/projects";
import { ProjectResource } from "../types/project.type";

export const addDedicatedToProjectAction = async (
  projectId: number,
  resourceId: number
): Promise<ProjectResource> => {
  return await projectsApiClient.addDedicatedToProject(projectId, resourceId);
};
