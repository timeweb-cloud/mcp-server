import { BaseApiClient } from "./client";
import { ServerPreset } from "../types/server-preset.type";
import { ServerOs } from "../types/server-os.type";
import { ServerConfigurator } from "../types/server-configurator.type";
import { ServerSoftware } from "../types/server-software.type";
import { Location } from "../types/location.type";
import { ListServerPresetsResponseDto } from "../types/dto/list-server-presets-response.dto";
import { ListServerOsResponseDto } from "../types/dto/list-server-os-response.dto";
import { ListServerConfiguratorsResponseDto } from "../types/dto/list-server-configurators-response.dto";
import { ListServerSoftwareResponseDto } from "../types/dto/list-server-software-response.dto";
import { ListLocationsResponseDto } from "../types/dto/list-locations-response.dto";

/**
 * API-клиент для справочных каталогов, необходимых перед созданием VPS:
 * тарифы, ОС, конфигураторы, ПО из маркетплейса и локации.
 */
export class CatalogsApiClient extends BaseApiClient {
  /**
   * Список тарифов (пресетов) для VPS-серверов.
   */
  async listServerPresets(): Promise<ServerPreset[]> {
    const response = await this.get<ListServerPresetsResponseDto>(
      "/api/v1/presets/servers"
    );
    return response.server_presets;
  }

  /**
   * Список операционных систем, доступных для установки на VPS.
   */
  async listServerOs(): Promise<ServerOs[]> {
    const response = await this.get<ListServerOsResponseDto>(
      "/api/v1/os/servers"
    );
    return response.servers_os;
  }

  /**
   * Список конфигураторов серверов (диапазоны CPU/RAM/Disk/Bandwidth/GPU).
   */
  async listServerConfigurators(): Promise<ServerConfigurator[]> {
    const response = await this.get<ListServerConfiguratorsResponseDto>(
      "/api/v1/configurator/servers"
    );
    return response.server_configurators;
  }

  /**
   * Список ПО из маркетплейса, доступного при создании VPS.
   */
  async listServerSoftware(): Promise<ServerSoftware[]> {
    const response = await this.get<ListServerSoftwareResponseDto>(
      "/api/v1/software/servers"
    );
    return response.servers_software;
  }

  /**
   * Список локаций и зон доступности.
   */
  async listLocations(): Promise<Location[]> {
    const response = await this.get<ListLocationsResponseDto>(
      "/api/v2/locations"
    );
    return response.locations;
  }
}

export const catalogsApiClient: CatalogsApiClient = new CatalogsApiClient();
