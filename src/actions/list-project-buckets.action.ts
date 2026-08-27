import { projectsApiClient } from "../api/projects";

export const listProjectBucketsAction = async (
  projectId: number
): Promise<any[]> => {
  return await projectsApiClient.listProjectBuckets(projectId);
};
