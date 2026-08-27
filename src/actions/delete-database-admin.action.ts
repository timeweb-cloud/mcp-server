import { dbaasApiClient } from "../api";

export const deleteDatabaseAdminAction = async (
  clusterId: number,
  adminId: number
): Promise<void> => {
  await dbaasApiClient.deleteDatabaseAdmin(clusterId, adminId);
};
