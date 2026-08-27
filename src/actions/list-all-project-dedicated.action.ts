import { projectsApiClient } from "../api/projects";

export const listAllProjectDedicatedAction = async (): Promise<any[]> => {
  return await projectsApiClient.listAllResourceDedicated();
};
