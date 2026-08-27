export type AiModel = {
  id: number;
  provider_id?: number;
  name: string;
  public_name?: string;
  type: "llm" | "embedding";
  is_deprecated?: boolean;
  is_reasoning?: boolean;
  version?: string;
  params_info?: any;
  [key: string]: any;
};
