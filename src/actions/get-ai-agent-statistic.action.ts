import { aiAgentsApiClient, AgentStatisticQuery } from "../api/ai-agents";
import { TokenStatistic } from "../types/token-statistic.type";

export const getAiAgentStatisticAction = async (
  agentId: number,
  query: AgentStatisticQuery = {}
): Promise<TokenStatistic[]> => {
  return await aiAgentsApiClient.getAgentStatistic(agentId, query);
};
