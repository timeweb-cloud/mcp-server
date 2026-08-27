import { ApiKey } from "../api-key.type";

export interface ListApiKeysResponseDto {
  meta: {
    total: number;
  };
  api_keys: ApiKey[];
}
