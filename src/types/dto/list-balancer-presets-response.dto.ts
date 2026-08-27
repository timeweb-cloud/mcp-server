import { BalancerPreset } from "../balancer.type";

export type ListBalancerPresetsResponseDto = {
  meta: { total: number };
  balancers_presets: BalancerPreset[];
  response_id?: string;
};
