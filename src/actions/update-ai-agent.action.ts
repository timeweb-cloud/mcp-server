import { aiAgentsApiClient } from "../api";
import { AiAgent } from "../types/ai-agent.type";
import { UpdateAiAgentRequestDto } from "../types/dto/update-ai-agent-request.dto";

export const updateAiAgentAction = async (
  agentId: number,
  data: UpdateAiAgentRequestDto
): Promise<AiAgent> => {
  return await aiAgentsApiClient.updateAgent(agentId, data);
};
