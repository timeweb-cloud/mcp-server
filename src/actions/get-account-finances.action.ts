import { accountApiClient } from "../api";
import { Finances } from "../types/finances.type";

export const getAccountFinancesAction = async (): Promise<Finances> => {
  return await accountApiClient.getFinances();
};
