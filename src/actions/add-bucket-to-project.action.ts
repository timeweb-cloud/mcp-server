import { projectsApiClient } from "../api/projects";
import { ProjectResource } from "../types/project.type";

export const addBucketToProjectAction = async (
  projectId: number,
  resourceId: number
): Promise<ProjectResource> => {
  return await projectsApiClient.addBucketToProject(projectId, resourceId);
};
