import { BalancerRule } from "../balancer.type";

export type ListBalancerRulesResponseDto = {
  meta: { total: number };
  rules: BalancerRule[];
  response_id?: string;
};
