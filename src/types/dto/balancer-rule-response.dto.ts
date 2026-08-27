import { BalancerRule } from "../balancer.type";

export type BalancerRuleResponseDto = {
  rule: BalancerRule;
  response_id?: string;
};
