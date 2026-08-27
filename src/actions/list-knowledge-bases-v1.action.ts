import { knowledgeBasesApiClient } from "../api";
import { KnowledgeBase } from "../types/knowledge-base.type";

export const listKnowledgeBasesV1Action = async (): Promise<
  KnowledgeBase[]
> => {
  return await knowledgeBasesApiClient.listKnowledgeBases();
};
