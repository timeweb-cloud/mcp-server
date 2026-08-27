import { BaseApiClient } from "./client";
import {
  DedicatedServer,
  DedicatedServerPreset,
  DedicatedServerAdditionalService,
  DedicatedServerLocation,
} from "../types/dedicated-server.type";
import { ListDedicatedServersResponseDto } from "../types/dto/list-dedicated-servers-response.dto";
import { GetDedicatedServerResponseDto } from "../types/dto/get-dedicated-server-response.dto";
import { CreateDedicatedServerRequestDto } from "../types/dto/create-dedicated-server-request.dto";
import { UpdateDedicatedServerRequestDto } from "../types/dto/update-dedicated-server-request.dto";
import { ListDedicatedServerPresetsResponseDto } from "../types/dto/list-dedicated-server-presets-response.dto";
import { ListDedicatedServerAdditionalServicesResponseDto } from "../types/dto/list-dedicated-server-additional-services-response.dto";

export class DedicatedServersApiClient extends BaseApiClient {
  /**
   * Получает список всех выделенных серверов аккаунта
   */
  async listDedicatedServers(): Promise<DedicatedServer[]> {
    const response = await this.get<ListDedicatedServersResponseDto>(
      "/api/v1/dedicated-servers"
    );
    return response.dedicated_servers;
  }

  /**
   * Создаёт новый выделенный сервер
   */
  async createDedicatedServer(
    data: CreateDedicatedServerRequestDto
  ): Promise<DedicatedServer> {
    const response = await this.post<GetDedicatedServerResponseDto>(
      "/api/v1/dedicated-servers",
      data
    );
    return response.dedicated_server;
  }

  /**
   * Получает детальную информацию по одному выделенному серверу
   */
  async getDedicatedServer(dedicatedId: number): Promise<DedicatedServer> {
    const response = await this.get<GetDedicatedServerResponseDto>(
      `/api/v1/dedicated-servers/${dedicatedId}`
    );
    return response.dedicated_server;
  }

  /**
   * Обновляет параметры выделенного сервера (имя, комментарий)
   */
  async updateDedicatedServer(
    dedicatedId: number,
    data: UpdateDedicatedServerRequestDto
  ): Promise<DedicatedServer> {
    const response = await this.patch<GetDedicatedServerResponseDto>(
      `/api/v1/dedicated-servers/${dedicatedId}`,
      data
    );
    return response.dedicated_server;
  }

  /**
   * Удаляет выделенный сервер
   */
  async deleteDedicatedServer(dedicatedId: number): Promise<void> {
    await this.delete<void>(`/api/v1/dedicated-servers/${dedicatedId}`);
  }

  /**
   * Получает список тарифов выделенных серверов (опционально по локации)
   */
  async listDedicatedServerPresets(
    location?: DedicatedServerLocation
  ): Promise<DedicatedServerPreset[]> {
    const path = location
      ? `/api/v1/presets/dedicated-servers?location=${location}`
      : "/api/v1/presets/dedicated-servers";
    const response =
      await this.get<ListDedicatedServerPresetsResponseDto>(path);
    return response.dedicated_servers_presets;
  }

  /**
   * Получает список дополнительных услуг для указанного тарифа выделенного сервера
   */
  async listDedicatedServerAdditionalServices(
    presetId: number
  ): Promise<DedicatedServerAdditionalService[]> {
    const response =
      await this.get<ListDedicatedServerAdditionalServicesResponseDto>(
        `/api/v1/presets/dedicated-servers/${presetId}/additional-services`
      );
    return response.dedicated_server_additional_services;
  }
}

export const dedicatedServersApiClient: DedicatedServersApiClient =
  new DedicatedServersApiClient();
