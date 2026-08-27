import { KnowledgeBase } from "../knowledge-base.type";

export type ListKnowledgeBasesResponseDto = {
  knowledgebases: KnowledgeBase[];
  meta: { total: number };
  response_id?: string;
};
