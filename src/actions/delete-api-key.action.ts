import { authApiClient } from "../api";

export const deleteApiKeyAction = async (tokenId: string): Promise<void> => {
  await authApiClient.deleteApiKey(tokenId);
};
