import { aiAgentsApiClient } from "../api";
import { AiModel } from "../types/ai-model.type";

export const listAiModelsAction = async (): Promise<AiModel[]> => {
  return await aiAgentsApiClient.listModels();
};
