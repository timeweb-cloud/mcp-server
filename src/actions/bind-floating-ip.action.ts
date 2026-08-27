import { dbaasApiClient } from "../api";
import { BindFloatingIpRequestDto } from "../types/dto/bind-floating-ip-request.dto";

export const bindFloatingIpAction = async (
  floatingIpId: string,
  data: BindFloatingIpRequestDto
): Promise<void> => {
  await dbaasApiClient.bindFloatingIp(floatingIpId, data);
};
