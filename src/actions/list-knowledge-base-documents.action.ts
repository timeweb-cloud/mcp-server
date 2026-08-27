import {
  knowledgeBasesApiClient,
  ListKnowledgeBaseDocumentsQuery,
} from "../api/knowledge-bases";
import { KnowledgeBaseDocument } from "../types/knowledge-base.type";

export const listKnowledgeBaseDocumentsAction = async (
  id: number,
  query: ListKnowledgeBaseDocumentsQuery = {}
): Promise<{ documents: KnowledgeBaseDocument[]; total: number }> => {
  return await knowledgeBasesApiClient.listKnowledgeBaseDocuments(id, query);
};
