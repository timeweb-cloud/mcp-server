export type AgentModelSettings = {
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
};

export type AgentWidgetSettings = {
  whitelist_domains: string[];
  name: string;
  signature?: string;
  welcome_message: string;
  primary_color: string;
  font: string;
  icon_url?: string;
  chat_position: "bottom_right" | "bottom_left" | "top_right" | "top_left";
};

export type AgentSettings = {
  model: AgentModelSettings;
  system_prompt: string;
  refine_query: boolean;
  widget?: AgentWidgetSettings;
};

export type AiAgent = {
  id: number;
  name: string;
  description?: string;
  model_id: number;
  provider_id?: number;
  settings: AgentSettings;
  status: "active" | "blocked" | "deleted" | "suspended";
  access_type: "public" | "private";
  total_tokens?: number;
  used_tokens?: number;
  remaining_tokens?: number;
  token_package_id?: number;
  subscription_renewal_date?: string;
  project_id?: number;
  created_at?: string;
  [key: string]: any;
};
