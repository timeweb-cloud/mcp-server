import { dbaasApiClient } from "../api";

export const deleteDatabaseInstanceAction = async (
  clusterId: number,
  instanceId: number
): Promise<void> => {
  await dbaasApiClient.deleteDatabaseInstance(clusterId, instanceId);
};
