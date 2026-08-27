import { dbaasApiClient } from "../api";
import { VpcPort } from "../types/vpc-port.type";

export const listVpcPortsAction = async (vpcId: string): Promise<VpcPort[]> => {
  return await dbaasApiClient.listVpcPorts(vpcId);
};
