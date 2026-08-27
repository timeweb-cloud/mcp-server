import { KnowledgeBase } from "../knowledge-base.type";

export type GetKnowledgeBaseResponseDto = {
  knowledgebase: KnowledgeBase;
  response_id?: string;
};
