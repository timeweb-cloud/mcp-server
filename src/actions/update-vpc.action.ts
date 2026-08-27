import { dbaasApiClient } from "../api";
import { Vpc } from "../types/vpc.type";
import { UpdateVpcRequestDto } from "../types/dto/update-vpc-request.dto";

export const updateVpcAction = async (
  vpcId: string,
  data: UpdateVpcRequestDto
): Promise<Vpc> => {
  return await dbaasApiClient.updateVpc(vpcId, data);
};
