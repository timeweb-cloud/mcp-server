import { aiAgentsApiClient } from "../api";

export const addAiAgentTokenPackageAction = async (
  agentId: number,
  count?: number
): Promise<void> => {
  await aiAgentsApiClient.addAgentTokenPackage(agentId, { count });
};
