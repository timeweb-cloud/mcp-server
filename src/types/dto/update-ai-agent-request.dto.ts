import { AgentSettings } from "../ai-agent.type";

export type UpdateAiAgentRequestDto = {
  name?: string;
  description?: string;
  access_type?: "public" | "private";
  status?: "active" | "suspended";
  token_package_id?: number;
  settings?: Partial<AgentSettings>;
  project_id?: number;
};
