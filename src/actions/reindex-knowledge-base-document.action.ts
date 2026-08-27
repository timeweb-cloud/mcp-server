import { knowledgeBasesApiClient } from "../api";

export const reindexKnowledgeBaseDocumentAction = async (
  id: number,
  documentId: number
): Promise<void> => {
  await knowledgeBasesApiClient.reindexKnowledgeBaseDocument(id, documentId);
};
