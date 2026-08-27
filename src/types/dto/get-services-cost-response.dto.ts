import { ServicePrice } from "../service-price.type";

export type GetServicesCostResponseDto = {
  services_costs: ServicePrice[];
  meta: { total: number };
};
