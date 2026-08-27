import { TokenStatistic } from "../token-statistic.type";

export type GetKnowledgeBaseStatisticResponseDto = {
  knowledgebase_statistics: TokenStatistic[];
  meta: { total: number };
  response_id?: string;
};
