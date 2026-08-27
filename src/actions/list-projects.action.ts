import { projectsApiClient } from "../api/projects";
import { Project } from "../types/project.type";

export const listProjectsAction = async (): Promise<Project[]> => {
  return await projectsApiClient.listProjects();
};
