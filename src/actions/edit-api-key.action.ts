import { authApiClient } from "../api";
import { ApiKey } from "../types/api-key.type";
import { EditApiKeyRequestDto } from "../types/dto/edit-api-key-request.dto";

export const editApiKeyAction = async (
  tokenId: string,
  data: EditApiKeyRequestDto
): Promise<ApiKey> => {
  return await authApiClient.editApiKey(tokenId, data);
};
