import { projectsApiClient } from "../api/projects";

export const listAllProjectBucketsAction = async (): Promise<any[]> => {
  return await projectsApiClient.listAllResourceBuckets();
};
