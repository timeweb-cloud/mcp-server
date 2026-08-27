import { dbaasApiClient } from "../api";
import { FloatingIp } from "../types/floating-ip.type";

export const getFloatingIpAction = async (
  floatingIpId: string
): Promise<FloatingIp> => {
  return await dbaasApiClient.getFloatingIp(floatingIpId);
};
