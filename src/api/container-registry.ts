import { BaseApiClient } from "./client";
import {
  ContainerRegistry,
  ContainerRegistryPreset,
  ContainerRegistryRepository,
} from "../types/container-registry.type";
import { ListContainerRegistriesResponseDto } from "../types/dto/list-container-registries-response.dto";
import { GetContainerRegistryResponseDto } from "../types/dto/get-container-registry-response.dto";
import { CreateContainerRegistryRequestDto } from "../types/dto/create-container-registry-request.dto";
import { UpdateContainerRegistryRequestDto } from "../types/dto/update-container-registry-request.dto";
import { ListContainerRegistryPresetsResponseDto } from "../types/dto/list-container-registry-presets-response.dto";
import { ListContainerRegistryRepositoriesResponseDto } from "../types/dto/list-container-registry-repositories-response.dto";

export class ContainerRegistryApiClient extends BaseApiClient {
  /**
   * Получает список всех реестров контейнеров аккаунта
   */
  async listContainerRegistries(): Promise<ContainerRegistry[]> {
    const response = await this.get<ListContainerRegistriesResponseDto>(
      "/api/v1/container-registry"
    );
    return response.container_registry_list;
  }

  /**
   * Создаёт новый реестр контейнеров
   */
  async createContainerRegistry(
    data: CreateContainerRegistryRequestDto
  ): Promise<ContainerRegistry> {
    const response = await this.post<GetContainerRegistryResponseDto>(
      "/api/v1/container-registry",
      data
    );
    return response.container_registry;
  }

  /**
   * Получает информацию о реестре по ID
   */
  async getContainerRegistry(registryId: number): Promise<ContainerRegistry> {
    const response = await this.get<GetContainerRegistryResponseDto>(
      `/api/v1/container-registry/${registryId}`
    );
    return response.container_registry;
  }

  /**
   * Обновляет информацию о реестре
   */
  async updateContainerRegistry(
    registryId: number,
    data: UpdateContainerRegistryRequestDto
  ): Promise<ContainerRegistry> {
    const response = await this.patch<GetContainerRegistryResponseDto>(
      `/api/v1/container-registry/${registryId}`,
      data
    );
    return response.container_registry;
  }

  /**
   * Удаляет реестр контейнеров
   */
  async deleteContainerRegistry(registryId: number): Promise<void> {
    await this.delete<void>(`/api/v1/container-registry/${registryId}`);
  }

  /**
   * Получает список тарифов реестров контейнеров
   */
  async listContainerRegistryPresets(): Promise<ContainerRegistryPreset[]> {
    const response = await this.get<ListContainerRegistryPresetsResponseDto>(
      "/api/v1/container-registry/presets"
    );
    return response.container_registry_presets;
  }

  /**
   * Получает список репозиториев внутри реестра
   */
  async listContainerRegistryRepositories(
    registryId: number
  ): Promise<ContainerRegistryRepository[]> {
    const response =
      await this.get<ListContainerRegistryRepositoriesResponseDto>(
        `/api/v1/container-registry/${registryId}/repositories`
      );
    return response.container_registries_repositories;
  }
}

export const containerRegistryApiClient: ContainerRegistryApiClient =
  new ContainerRegistryApiClient();
