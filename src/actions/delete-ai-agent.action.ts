import { aiAgentsApiClient } from "../api";

export const deleteAiAgentAction = async (agentId: number): Promise<void> => {
  await aiAgentsApiClient.deleteAgent(agentId);
};
