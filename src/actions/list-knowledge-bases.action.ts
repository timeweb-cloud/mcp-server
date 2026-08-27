import { knowledgeBasesApiClient } from "../api";
import { KnowledgeBase } from "../types/knowledge-base.type";

export const listKnowledgeBasesAction = async (): Promise<KnowledgeBase[]> => {
  return await knowledgeBasesApiClient.listKnowledgeBasesV2();
};
