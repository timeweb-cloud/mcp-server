import { AiModel } from "../ai-model.type";

export type ListAiModelsResponseDto = {
  models: AiModel[];
  meta: { total: number };
  response_id?: string;
};
