import { BaseApiClient } from "./client";
import { Project, ProjectResource } from "../types/project.type";
import { ProjectResourceTypeEnum } from "../types/project-resource-type.enum";
import { ListProjectsResponseDto } from "../types/dto/list-projects-response.dto";
import { GetProjectResponseDto } from "../types/dto/get-project-response.dto";
import { CreateProjectRequestDto } from "../types/dto/create-project-request.dto";
import { UpdateProjectRequestDto } from "../types/dto/update-project-request.dto";
import { ProjectResourceResponseDto } from "../types/dto/project-resource-response.dto";
import { ListProjectResourcesResponseDto } from "../types/dto/list-project-resources-response.dto";
import {
  ListResourceServersResponseDto,
  ListResourceBalancersResponseDto,
  ListResourceBucketsResponseDto,
  ListResourceClustersResponseDto,
  ListResourceDatabasesResponseDto,
  ListResourceDedicatedResponseDto,
} from "../types/dto/list-resources-response.dto";
import { AddResourceToProjectRequestDto } from "../types/dto/add-resource-to-project-request.dto";
import { TransferProjectResourceRequestDto } from "../types/dto/transfer-project-resource-request.dto";

export class ProjectsApiClient extends BaseApiClient {
  /**
   * Получить список проектов аккаунта
   */
  async listProjects(): Promise<Project[]> {
    const response = await this.get<ListProjectsResponseDto>(
      "/api/v1/projects"
    );
    return response.projects;
  }

  /**
   * Получить проект по ID
   */
  async getProject(projectId: number): Promise<Project> {
    const response = await this.get<GetProjectResponseDto>(
      `/api/v1/projects/${projectId}`
    );
    return response.project;
  }

  /**
   * Создать новый проект
   */
  async createProject(data: CreateProjectRequestDto): Promise<Project> {
    const response = await this.post<GetProjectResponseDto>(
      "/api/v1/projects",
      data
    );
    return response.project;
  }

  /**
   * Изменить проект
   */
  async updateProject(
    projectId: number,
    data: UpdateProjectRequestDto
  ): Promise<Project> {
    const response = await this.put<GetProjectResponseDto>(
      `/api/v1/projects/${projectId}`,
      data
    );
    return response.project;
  }

  /**
   * Удалить проект
   */
  async deleteProject(projectId: number): Promise<void> {
    await this.delete<void>(`/api/v1/projects/${projectId}`);
  }

  /**
   * Получить все ресурсы проекта (комбинированный ответ)
   */
  async listProjectResources(
    projectId: number
  ): Promise<ListProjectResourcesResponseDto> {
    return await this.get<ListProjectResourcesResponseDto>(
      `/api/v1/projects/${projectId}/resources`
    );
  }

  // ---------- Балансировщики ----------
  async listProjectBalancers(projectId: number): Promise<any[]> {
    const response = await this.get<ListResourceBalancersResponseDto>(
      `/api/v1/projects/${projectId}/resources/balancers`
    );
    return response.balancers;
  }

  async addBalancerToProject(
    projectId: number,
    resourceId: number
  ): Promise<ProjectResource> {
    const body: AddResourceToProjectRequestDto = { resource_id: resourceId };
    const response = await this.post<ProjectResourceResponseDto>(
      `/api/v1/projects/${projectId}/resources/balancers`,
      body
    );
    return response.resource;
  }

  // ---------- Хранилища (buckets) ----------
  async listProjectBuckets(projectId: number): Promise<any[]> {
    const response = await this.get<ListResourceBucketsResponseDto>(
      `/api/v1/projects/${projectId}/resources/buckets`
    );
    return response.buckets;
  }

  async addBucketToProject(
    projectId: number,
    resourceId: number
  ): Promise<ProjectResource> {
    const body: AddResourceToProjectRequestDto = { resource_id: resourceId };
    const response = await this.post<ProjectResourceResponseDto>(
      `/api/v1/projects/${projectId}/resources/buckets`,
      body
    );
    return response.resource;
  }

  // ---------- Кластеры (k8s) ----------
  async listProjectClusters(projectId: number): Promise<any[]> {
    const response = await this.get<ListResourceClustersResponseDto>(
      `/api/v1/projects/${projectId}/resources/clusters`
    );
    return response.clusters;
  }

  async addClusterToProject(
    projectId: number,
    resourceId: number
  ): Promise<ProjectResource> {
    const body: AddResourceToProjectRequestDto = { resource_id: resourceId };
    const response = await this.post<ProjectResourceResponseDto>(
      `/api/v1/projects/${projectId}/resources/clusters`,
      body
    );
    return response.resource;
  }

  // ---------- Серверы ----------
  async listProjectServers(projectId: number): Promise<any[]> {
    const response = await this.get<ListResourceServersResponseDto>(
      `/api/v1/projects/${projectId}/resources/servers`
    );
    return response.servers;
  }

  async addServerToProject(
    projectId: number,
    resourceId: number
  ): Promise<ProjectResource> {
    const body: AddResourceToProjectRequestDto = { resource_id: resourceId };
    const response = await this.post<ProjectResourceResponseDto>(
      `/api/v1/projects/${projectId}/resources/servers`,
      body
    );
    return response.resource;
  }

  // ---------- Базы данных ----------
  async listProjectDatabases(projectId: number): Promise<any[]> {
    const response = await this.get<ListResourceDatabasesResponseDto>(
      `/api/v1/projects/${projectId}/resources/databases`
    );
    return response.databases;
  }

  async addDatabaseToProject(
    projectId: number,
    resourceId: number
  ): Promise<ProjectResource> {
    const body: AddResourceToProjectRequestDto = { resource_id: resourceId };
    const response = await this.post<ProjectResourceResponseDto>(
      `/api/v1/projects/${projectId}/resources/databases`,
      body
    );
    return response.resource;
  }

  // ---------- Выделенные серверы ----------
  async listProjectDedicated(projectId: number): Promise<any[]> {
    const response = await this.get<ListResourceDedicatedResponseDto>(
      `/api/v1/projects/${projectId}/resources/dedicated`
    );
    return response.dedicated_servers;
  }

  async addDedicatedToProject(
    projectId: number,
    resourceId: number
  ): Promise<ProjectResource> {
    const body: AddResourceToProjectRequestDto = { resource_id: resourceId };
    const response = await this.post<ProjectResourceResponseDto>(
      `/api/v1/projects/${projectId}/resources/dedicated`,
      body
    );
    return response.resource;
  }

  // ---------- Ресурсы всего аккаунта с project_id ----------
  async listAllResourceBalancers(): Promise<any[]> {
    const response = await this.get<ListResourceBalancersResponseDto>(
      "/api/v1/projects/resources/balancers"
    );
    return response.balancers;
  }

  async listAllResourceServers(): Promise<any[]> {
    const response = await this.get<ListResourceServersResponseDto>(
      "/api/v1/projects/resources/servers"
    );
    return response.servers;
  }

  async listAllResourceBuckets(): Promise<any[]> {
    const response = await this.get<ListResourceBucketsResponseDto>(
      "/api/v1/projects/resources/buckets"
    );
    return response.buckets;
  }

  async listAllResourceClusters(): Promise<any[]> {
    const response = await this.get<ListResourceClustersResponseDto>(
      "/api/v1/projects/resources/clusters"
    );
    return response.clusters;
  }

  async listAllResourceDatabases(): Promise<any[]> {
    const response = await this.get<ListResourceDatabasesResponseDto>(
      "/api/v1/projects/resources/databases"
    );
    return response.databases;
  }

  async listAllResourceDedicated(): Promise<any[]> {
    const response = await this.get<ListResourceDedicatedResponseDto>(
      "/api/v1/projects/resources/dedicated"
    );
    return response.dedicated_servers;
  }

  /**
   * Перенести ресурс в другой проект
   */
  async transferProjectResource(
    fromProjectId: number,
    toProjectId: number,
    resourceId: number,
    resourceType: ProjectResourceTypeEnum
  ): Promise<ProjectResource> {
    const body: TransferProjectResourceRequestDto = {
      to_project: toProjectId,
      resource_id: resourceId,
      resource_type: resourceType,
    };
    const response = await this.put<ProjectResourceResponseDto>(
      `/api/v1/projects/${fromProjectId}/resources/transfer`,
      body
    );
    return response.resource;
  }
}

export const projectsApiClient: ProjectsApiClient = new ProjectsApiClient();
