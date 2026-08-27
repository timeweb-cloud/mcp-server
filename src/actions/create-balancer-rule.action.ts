import { balancersApiClient } from "../api";
import { BalancerRule } from "../types/balancer.type";
import { CreateBalancerRuleRequestDto } from "../types/dto/create-balancer-rule-request.dto";

export const createBalancerRuleAction = async (
  balancerId: number,
  data: CreateBalancerRuleRequestDto
): Promise<BalancerRule> => {
  return await balancersApiClient.createBalancerRule(balancerId, data);
};
