import { BalancerProto } from "../balancer.type";

export type CreateBalancerRuleRequestDto = {
  balancer_proto: BalancerProto;
  balancer_port: number;
  server_proto: BalancerProto;
  server_port: number;
};

export type UpdateBalancerRuleRequestDto = CreateBalancerRuleRequestDto;
