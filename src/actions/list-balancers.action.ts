import { balancersApiClient } from "../api";
import { Balancer } from "../types/balancer.type";

export const listBalancersAction = async (
  limit?: number,
  offset?: number
): Promise<Balancer[]> => {
  return await balancersApiClient.listBalancers(limit, offset);
};
