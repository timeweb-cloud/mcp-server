import { dbaasApiClient } from "../api";
import { Vpc } from "../types/vpc.type";

export const getVpcAction = async (vpcId: string): Promise<Vpc> => {
  return await dbaasApiClient.getVpc(vpcId);
};
