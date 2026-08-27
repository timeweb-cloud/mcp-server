import { KnowledgeBaseDocument } from "../knowledge-base.type";

export type ListKnowledgeBaseDocumentsResponseDto = {
  knowledgebase_documents: KnowledgeBaseDocument[];
  meta: { total: number; limit: number; offset: number };
  response_id?: string;
};
