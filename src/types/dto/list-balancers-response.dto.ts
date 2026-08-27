import { Balancer } from "../balancer.type";

export type ListBalancersResponseDto = {
  meta: { total: number };
  balancers: Balancer[];
  response_id?: string;
};
