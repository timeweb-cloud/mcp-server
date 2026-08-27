import { knowledgeBasesApiClient } from "../api";

export const unlinkKnowledgeBaseAction = async (
  id: number,
  agentId: number
): Promise<void> => {
  await knowledgeBasesApiClient.unlinkKnowledgeBaseFromAgent(id, agentId);
};
