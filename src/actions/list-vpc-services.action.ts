import { dbaasApiClient } from "../api";
import { VpcService } from "../types/vpc-service.type";

export const listVpcServicesAction = async (
  vpcId: string
): Promise<VpcService[]> => {
  return await dbaasApiClient.listVpcServices(vpcId);
};
