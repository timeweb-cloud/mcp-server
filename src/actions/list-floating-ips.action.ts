import { dbaasApiClient } from "../api";
import { ListFloatingIpsResponseDto } from "../types/dto/list-floating-ips-response.dto";

export const listFloatingIpsAction =
  async (): Promise<ListFloatingIpsResponseDto> => {
    return await dbaasApiClient.listFloatingIps();
  };
