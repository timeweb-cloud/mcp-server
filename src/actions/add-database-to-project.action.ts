import { projectsApiClient } from "../api/projects";
import { ProjectResource } from "../types/project.type";

export const addDatabaseToProjectAction = async (
  projectId: number,
  resourceId: number
): Promise<ProjectResource> => {
  return await projectsApiClient.addDatabaseToProject(projectId, resourceId);
};
