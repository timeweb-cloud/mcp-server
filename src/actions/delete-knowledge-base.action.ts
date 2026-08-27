import { knowledgeBasesApiClient } from "../api";

export const deleteKnowledgeBaseAction = async (id: number): Promise<void> => {
  await knowledgeBasesApiClient.deleteKnowledgeBase(id);
};
