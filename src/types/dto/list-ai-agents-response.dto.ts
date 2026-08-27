import { AiAgent } from "../ai-agent.type";

export type ListAiAgentsResponseDto = {
  agents: AiAgent[];
  meta: { total: number };
  response_id?: string;
};
