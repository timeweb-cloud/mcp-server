import { BaseApiClient } from "./client";
import { ApiKey, CreatedApiKey } from "../types/api-key.type";
import { ListApiKeysResponseDto } from "../types/dto/list-api-keys-response.dto";
import { CreateApiKeyRequestDto } from "../types/dto/create-api-key-request.dto";
import { CreateApiKeyResponseDto } from "../types/dto/create-api-key-response.dto";
import { EditApiKeyRequestDto } from "../types/dto/edit-api-key-request.dto";
import { EditApiKeyResponseDto } from "../types/dto/edit-api-key-response.dto";
import { RefreshApiKeyRequestDto } from "../types/dto/refresh-api-key-request.dto";
import { RefreshApiKeyResponseDto } from "../types/dto/refresh-api-key-response.dto";

export class AuthApiClient extends BaseApiClient {
  /**
   * Получает список всех выпущенных API-токенов аккаунта
   */
  async listApiKeys(): Promise<ApiKey[]> {
    const response = await this.get<ListApiKeysResponseDto>(
      "/api/v1/auth/api-keys"
    );
    return response.api_keys;
  }

  /**
   * Создает новый API-токен. Токен показывается только один раз
   */
  async createApiKey(data: CreateApiKeyRequestDto): Promise<CreatedApiKey> {
    const response = await this.post<CreateApiKeyResponseDto>(
      "/api/v1/auth/api-keys",
      data
    );
    return response.api_key;
  }

  /**
   * Изменяет API-токен (имя и/или флаг is_able_to_delete)
   */
  async editApiKey(
    tokenId: string,
    data: EditApiKeyRequestDto
  ): Promise<ApiKey> {
    const response = await this.patch<EditApiKeyResponseDto>(
      `/api/v1/auth/api-keys/${tokenId}`,
      data
    );
    return response.api_key;
  }

  /**
   * Перевыпускает API-токен. Возвращает новое значение токена (показывается один раз)
   */
  async refreshApiKey(
    tokenId: string,
    data: RefreshApiKeyRequestDto = {}
  ): Promise<CreatedApiKey> {
    const response = await this.put<RefreshApiKeyResponseDto>(
      `/api/v1/auth/api-keys/${tokenId}`,
      data
    );
    return response.api_key;
  }

  /**
   * Удаляет API-токен по ID
   */
  async deleteApiKey(tokenId: string): Promise<void> {
    await this.delete<void>(`/api/v1/auth/api-keys/${tokenId}`);
  }
}

export const authApiClient: AuthApiClient = new AuthApiClient();
