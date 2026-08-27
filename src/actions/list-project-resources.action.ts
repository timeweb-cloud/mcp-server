import { projectsApiClient } from "../api/projects";
import { ListProjectResourcesResponseDto } from "../types/dto/list-project-resources-response.dto";

export const listProjectResourcesAction = async (
  projectId: number
): Promise<ListProjectResourcesResponseDto> => {
  return await projectsApiClient.listProjectResources(projectId);
};
