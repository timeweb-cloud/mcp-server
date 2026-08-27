import { balancersApiClient } from "../api";

export const listBalancerIpsAction = async (
  balancerId: number
): Promise<string[]> => {
  return await balancersApiClient.listBalancerIps(balancerId);
};
