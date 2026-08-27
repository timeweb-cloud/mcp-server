import { aiAgentsApiClient } from "../api";
import { AiAgent } from "../types/ai-agent.type";

export const getAiAgentAction = async (agentId: number): Promise<AiAgent> => {
  return await aiAgentsApiClient.getAgent(agentId);
};
