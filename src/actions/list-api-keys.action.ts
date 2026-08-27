import { authApiClient } from "../api";
import { ApiKey } from "../types/api-key.type";

export const listApiKeysAction = async (): Promise<ApiKey[]> => {
  return await authApiClient.listApiKeys();
};
