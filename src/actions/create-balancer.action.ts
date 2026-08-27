import { balancersApiClient } from "../api";
import { Balancer } from "../types/balancer.type";
import { CreateBalancerRequestDto } from "../types/dto/create-balancer-request.dto";

export const createBalancerAction = async (
  data: CreateBalancerRequestDto
): Promise<Balancer> => {
  return await balancersApiClient.createBalancer(data);
};
