import { aiAgentsApiClient } from "../api";
import { AiAgent } from "../types/ai-agent.type";
import { CreateAiAgentRequestDto } from "../types/dto/create-ai-agent-request.dto";

export const createAiAgentAction = async (
  data: CreateAiAgentRequestDto
): Promise<AiAgent> => {
  return await aiAgentsApiClient.createAgent(data);
};
