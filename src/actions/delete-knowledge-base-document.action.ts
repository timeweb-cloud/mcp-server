import { knowledgeBasesApiClient } from "../api";

export const deleteKnowledgeBaseDocumentAction = async (
  id: number,
  documentId: number
): Promise<void> => {
  await knowledgeBasesApiClient.deleteKnowledgeBaseDocument(id, documentId);
};
