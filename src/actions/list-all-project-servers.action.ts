import { projectsApiClient } from "../api/projects";

export const listAllProjectServersAction = async (): Promise<any[]> => {
  return await projectsApiClient.listAllResourceServers();
};
