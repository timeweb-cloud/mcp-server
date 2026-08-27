import { dbaasApiClient } from "../api";
import { FloatingIp } from "../types/floating-ip.type";
import { UpdateFloatingIpRequestDto } from "../types/dto/update-floating-ip-request.dto";

export const updateFloatingIpAction = async (
  floatingIpId: string,
  data: UpdateFloatingIpRequestDto
): Promise<FloatingIp> => {
  return await dbaasApiClient.updateFloatingIp(floatingIpId, data);
};
