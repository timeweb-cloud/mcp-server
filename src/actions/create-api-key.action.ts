import { authApiClient } from "../api";
import { CreatedApiKey } from "../types/api-key.type";
import { CreateApiKeyRequestDto } from "../types/dto/create-api-key-request.dto";

export const createApiKeyAction = async (
  data: CreateApiKeyRequestDto
): Promise<CreatedApiKey> => {
  return await authApiClient.createApiKey(data);
};
