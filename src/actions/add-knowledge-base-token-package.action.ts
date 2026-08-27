import { knowledgeBasesApiClient } from "../api";

export const addKnowledgeBaseTokenPackageAction = async (
  id: number,
  count?: number
): Promise<void> => {
  await knowledgeBasesApiClient.addKnowledgeBaseTokenPackage(id, { count });
};
