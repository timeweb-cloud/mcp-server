import { projectsApiClient } from "../api/projects";

export const listAllProjectBalancersAction = async (): Promise<any[]> => {
  return await projectsApiClient.listAllResourceBalancers();
};
