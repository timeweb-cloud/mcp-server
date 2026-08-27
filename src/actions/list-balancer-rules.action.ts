import { balancersApiClient } from "../api";
import { BalancerRule } from "../types/balancer.type";

export const listBalancerRulesAction = async (
  balancerId: number
): Promise<BalancerRule[]> => {
  return await balancersApiClient.listBalancerRules(balancerId);
};
