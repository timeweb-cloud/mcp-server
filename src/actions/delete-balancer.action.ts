import { balancersApiClient } from "../api";
import { DeleteBalancerResult } from "../types/balancer.type";

export const deleteBalancerAction = async (
  balancerId: number,
  hash?: string,
  code?: string
): Promise<DeleteBalancerResult | null> => {
  return await balancersApiClient.deleteBalancer(balancerId, hash, code);
};
