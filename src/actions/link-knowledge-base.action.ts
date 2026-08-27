import { knowledgeBasesApiClient } from "../api";

export const linkKnowledgeBaseAction = async (
  id: number,
  agentId: number
): Promise<void> => {
  await knowledgeBasesApiClient.linkKnowledgeBaseToAgent(id, agentId);
};
