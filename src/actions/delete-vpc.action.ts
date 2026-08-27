import { dbaasApiClient } from "../api";

export const deleteVpcAction = async (vpcId: string): Promise<void> => {
  await dbaasApiClient.deleteVpc(vpcId);
};
