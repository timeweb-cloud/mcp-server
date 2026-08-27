import { BaseApiClient } from "./client";
import { NetworkDrive } from "../types/network-drive.type";
import { NetworkDrivePreset } from "../types/network-drive-preset.type";
import { NetworkDriveAvailableResource } from "../types/network-drive-available-resource.type";
import { ListNetworkDrivesResponseDto } from "../types/dto/list-network-drives-response.dto";
import { GetNetworkDriveResponseDto } from "../types/dto/get-network-drive-response.dto";
import { CreateNetworkDriveRequestDto } from "../types/dto/create-network-drive-request.dto";
import { CreateNetworkDriveResponseDto } from "../types/dto/create-network-drive-response.dto";
import { UpdateNetworkDriveRequestDto } from "../types/dto/update-network-drive-request.dto";
import { UpdateNetworkDriveResponseDto } from "../types/dto/update-network-drive-response.dto";
import { MountNetworkDriveRequestDto } from "../types/dto/mount-network-drive-request.dto";
import { ListNetworkDriveAvailableResourcesResponseDto } from "../types/dto/list-network-drive-available-resources-response.dto";
import { ListNetworkDrivePresetsResponseDto } from "../types/dto/list-network-drive-presets-response.dto";

export class NetworkDrivesApiClient extends BaseApiClient {
  /**
   * Получает список всех сетевых дисков аккаунта
   */
  async listNetworkDrives(): Promise<NetworkDrive[]> {
    const response = await this.get<ListNetworkDrivesResponseDto>(
      "/api/v1/network-drives"
    );
    return response.network_drives;
  }

  /**
   * Создаёт новый сетевой диск
   */
  async createNetworkDrive(
    data: CreateNetworkDriveRequestDto
  ): Promise<NetworkDrive> {
    const response = await this.post<CreateNetworkDriveResponseDto>(
      "/api/v1/network-drives",
      data
    );
    return response.network_drive;
  }

  /**
   * Получает информацию о сетевом диске по ID
   */
  async getNetworkDrive(networkDriveId: string): Promise<NetworkDrive> {
    const response = await this.get<GetNetworkDriveResponseDto>(
      `/api/v1/network-drives/${networkDriveId}`
    );
    return response.network_drive;
  }

  /**
   * Изменяет параметры сетевого диска (name, comment, size)
   */
  async updateNetworkDrive(
    networkDriveId: string,
    data: UpdateNetworkDriveRequestDto
  ): Promise<NetworkDrive> {
    const response = await this.patch<UpdateNetworkDriveResponseDto>(
      `/api/v1/network-drives/${networkDriveId}`,
      data
    );
    return response.network_drive;
  }

  /**
   * Удаляет сетевой диск по ID
   */
  async deleteNetworkDrive(networkDriveId: string): Promise<void> {
    await this.delete<void>(`/api/v1/network-drives/${networkDriveId}`);
  }

  /**
   * Подключает сетевой диск к сервису (например, к серверу)
   */
  async mountNetworkDrive(
    networkDriveId: string,
    data: MountNetworkDriveRequestDto
  ): Promise<void> {
    await this.post<void>(
      `/api/v1/network-drives/${networkDriveId}/mount`,
      data
    );
  }

  /**
   * Отключает сетевой диск от сервиса
   */
  async unmountNetworkDrive(networkDriveId: string): Promise<void> {
    await this.post<void>(`/api/v1/network-drives/${networkDriveId}/unmount`);
  }

  /**
   * Получает список сервисов, доступных для подключения сетевого диска
   */
  async listNetworkDriveAvailableResources(): Promise<
    NetworkDriveAvailableResource[]
  > {
    const response =
      await this.get<ListNetworkDriveAvailableResourcesResponseDto>(
        "/api/v1/network-drives/available-resources"
      );
    return response.available_resources;
  }

  /**
   * Получает список доступных тарифов для сетевого диска
   */
  async listNetworkDrivePresets(): Promise<NetworkDrivePreset[]> {
    const response = await this.get<ListNetworkDrivePresetsResponseDto>(
      "/api/v1/presets/network-drives"
    );
    return response.network_drive_presets;
  }
}

export const networkDrivesApiClient: NetworkDrivesApiClient =
  new NetworkDrivesApiClient();
