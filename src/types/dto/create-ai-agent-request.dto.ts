import { AgentSettings } from "../ai-agent.type";

export type CreateAiAgentRequestDto = {
  name: string;
  description?: string;
  access_type: "public" | "private";
  model_id: number;
  token_package_id: number;
  settings: AgentSettings;
  project_id?: number;
};
