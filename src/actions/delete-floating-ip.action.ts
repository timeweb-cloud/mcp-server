import { dbaasApiClient } from "../api";

export const deleteFloatingIpAction = async (
  floatingIpId: string
): Promise<void> => {
  await dbaasApiClient.deleteFloatingIp(floatingIpId);
};
