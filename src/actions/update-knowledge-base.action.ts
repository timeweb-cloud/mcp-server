import { knowledgeBasesApiClient } from "../api";
import { KnowledgeBase } from "../types/knowledge-base.type";
import { UpdateKnowledgeBaseRequestDto } from "../types/dto/update-knowledge-base-request.dto";

export const updateKnowledgeBaseAction = async (
  id: number,
  data: UpdateKnowledgeBaseRequestDto
): Promise<KnowledgeBase> => {
  return await knowledgeBasesApiClient.updateKnowledgeBase(id, data);
};
