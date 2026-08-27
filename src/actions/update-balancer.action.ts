import { balancersApiClient } from "../api";
import { Balancer } from "../types/balancer.type";
import { UpdateBalancerRequestDto } from "../types/dto/update-balancer-request.dto";

export const updateBalancerAction = async (
  balancerId: number,
  data: UpdateBalancerRequestDto
): Promise<Balancer> => {
  return await balancersApiClient.updateBalancer(balancerId, data);
};
