import { balancersApiClient } from "../api";

export const deleteBalancerRuleAction = async (
  balancerId: number,
  ruleId: number
): Promise<void> => {
  await balancersApiClient.deleteBalancerRule(balancerId, ruleId);
};
