import { balancersApiClient } from "../api";
import { BalancerRule } from "../types/balancer.type";
import { UpdateBalancerRuleRequestDto } from "../types/dto/create-balancer-rule-request.dto";

export const updateBalancerRuleAction = async (
  balancerId: number,
  ruleId: number,
  data: UpdateBalancerRuleRequestDto
): Promise<BalancerRule> => {
  return await balancersApiClient.updateBalancerRule(balancerId, ruleId, data);
};
