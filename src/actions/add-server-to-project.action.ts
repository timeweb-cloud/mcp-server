import { projectsApiClient } from "../api/projects";
import { ProjectResource } from "../types/project.type";

export const addServerToProjectAction = async (
  projectId: number,
  resourceId: number
): Promise<ProjectResource> => {
  return await projectsApiClient.addServerToProject(projectId, resourceId);
};
