import { projectsApiClient } from "../api/projects";
import { ProjectResource } from "../types/project.type";

export const addClusterToProjectAction = async (
  projectId: number,
  resourceId: number
): Promise<ProjectResource> => {
  return await projectsApiClient.addClusterToProject(projectId, resourceId);
};
