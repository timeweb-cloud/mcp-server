import { balancersApiClient } from "../api";
import { Balancer } from "../types/balancer.type";

export const getBalancerAction = async (
  balancerId: number
): Promise<Balancer> => {
  return await balancersApiClient.getBalancer(balancerId);
};
