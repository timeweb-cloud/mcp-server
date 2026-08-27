import { aiAgentsApiClient } from "../api";
import { TokenPackage } from "../types/token-package.type";

export const listAiAgentTokenPackagesAction = async (): Promise<
  TokenPackage[]
> => {
  return await aiAgentsApiClient.listAgentTokenPackages();
};
