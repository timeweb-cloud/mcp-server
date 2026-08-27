import { accountApiClient } from "../api";
import { AccountStatus } from "../types/finances.type";

export const getAccountStatusAction = async (): Promise<AccountStatus> => {
  return await accountApiClient.getStatus();
};
