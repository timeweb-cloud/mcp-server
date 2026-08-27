import { dbaasApiClient } from "../api";

export const unbindFloatingIpAction = async (
  floatingIpId: string
): Promise<void> => {
  await dbaasApiClient.unbindFloatingIp(floatingIpId);
};
