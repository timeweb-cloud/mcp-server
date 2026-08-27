import { balancersApiClient } from "../api";

export const addBalancerIpsAction = async (
  balancerId: number,
  ips: string[]
): Promise<void> => {
  await balancersApiClient.addBalancerIps(balancerId, ips);
};
