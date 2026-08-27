import { DedicatedServerAdditionalService } from "../dedicated-server.type";

export type ListDedicatedServerAdditionalServicesResponseDto = {
  meta: { total: number };
  dedicated_server_additional_services: DedicatedServerAdditionalService[];
};
