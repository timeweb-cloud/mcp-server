import { balancersApiClient } from "../api";

export const removeBalancerIpsAction = async (
  balancerId: number,
  ips: string[]
): Promise<void> => {
  await balancersApiClient.removeBalancerIps(balancerId, ips);
};
