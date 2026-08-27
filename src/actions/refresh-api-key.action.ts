import { authApiClient } from "../api";
import { CreatedApiKey } from "../types/api-key.type";
import { RefreshApiKeyRequestDto } from "../types/dto/refresh-api-key-request.dto";

export const refreshApiKeyAction = async (
  tokenId: string,
  data: RefreshApiKeyRequestDto = {}
): Promise<CreatedApiKey> => {
  return await authApiClient.refreshApiKey(tokenId, data);
};
