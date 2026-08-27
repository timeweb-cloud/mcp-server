import { balancersApiClient } from "../api";
import { BalancerPreset } from "../types/balancer.type";

export const listBalancerPresetsAction = async (): Promise<BalancerPreset[]> => {
  return await balancersApiClient.listBalancerPresets();
};
