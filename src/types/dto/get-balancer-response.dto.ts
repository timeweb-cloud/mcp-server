import { Balancer } from "../balancer.type";

export type GetBalancerResponseDto = {
  balancer: Balancer;
  response_id?: string;
};
