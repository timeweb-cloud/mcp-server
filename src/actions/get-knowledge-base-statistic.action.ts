import {
  knowledgeBasesApiClient,
  KnowledgeBaseStatisticQuery,
} from "../api/knowledge-bases";
import { TokenStatistic } from "../types/token-statistic.type";

export const getKnowledgeBaseStatisticAction = async (
  id: number,
  query: KnowledgeBaseStatisticQuery = {}
): Promise<TokenStatistic[]> => {
  return await knowledgeBasesApiClient.getKnowledgeBaseStatistic(id, query);
};
