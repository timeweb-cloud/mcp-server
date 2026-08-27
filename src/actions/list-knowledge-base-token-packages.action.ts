import { aiAgentsApiClient } from "../api";
import { TokenPackage } from "../types/token-package.type";

export const listKnowledgeBaseTokenPackagesAction = async (): Promise<
  TokenPackage[]
> => {
  return await aiAgentsApiClient.listKnowledgeBaseTokenPackages();
};
