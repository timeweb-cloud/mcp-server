import { aiAgentsApiClient } from "../api";
import { AiAgent } from "../types/ai-agent.type";

export const listAiAgentsAction = async (): Promise<AiAgent[]> => {
  return await aiAgentsApiClient.listAgents();
};
