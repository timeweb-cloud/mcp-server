export interface CreateApiKeyRequestDto {
  name: string;
  expire?: string;
  is_able_to_delete?: boolean;
  roles?: any;
  projects?: number[] | null;
}
