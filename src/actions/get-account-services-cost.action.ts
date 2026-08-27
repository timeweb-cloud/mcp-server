import { accountApiClient } from "../api";
import { ServicePrice } from "../types/service-price.type";

export const getAccountServicesCostAction = async (): Promise<
  ServicePrice[]
> => {
  return await accountApiClient.getServicesCost();
};
