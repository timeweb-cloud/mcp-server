import { AiAgent } from "../ai-agent.type";

export type GetAiAgentResponseDto = {
  agent: AiAgent;
  response_id?: string;
};
