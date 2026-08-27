import { TokenStatistic } from "../token-statistic.type";

export type GetAgentStatisticResponseDto = {
  agent_statistics: TokenStatistic[];
  meta: { total: number };
  response_id?: string;
};
