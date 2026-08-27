import { knowledgeBasesApiClient } from "../api";
import { KnowledgeBase } from "../types/knowledge-base.type";

export const getKnowledgeBaseAction = async (
  id: number
): Promise<KnowledgeBase> => {
  return await knowledgeBasesApiClient.getKnowledgeBase(id);
};
