import { knowledgeBasesApiClient } from "../api";
import { KnowledgeBase } from "../types/knowledge-base.type";
import { CreateKnowledgeBaseRequestDto } from "../types/dto/create-knowledge-base-request.dto";

export const createKnowledgeBaseAction = async (
  data: CreateKnowledgeBaseRequestDto
): Promise<KnowledgeBase> => {
  return await knowledgeBasesApiClient.createKnowledgeBase(data);
};
