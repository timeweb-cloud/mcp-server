import { knowledgeBasesApiClient } from "../api";

export const downloadKnowledgeBaseDocumentAction = async (
  id: number,
  documentId: number
): Promise<any> => {
  return await knowledgeBasesApiClient.downloadKnowledgeBaseDocument(
    id,
    documentId
  );
};
