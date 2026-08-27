import { Project } from "../project.type";

export type ListProjectsResponseDto = {
  projects: Project[];
  meta: { total: number };
};
