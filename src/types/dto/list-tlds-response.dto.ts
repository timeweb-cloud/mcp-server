import { TopLevelDomain } from "../top-level-domain.type";

export type ListTldsResponseDto = {
  top_level_domains: TopLevelDomain[];
  meta: { total: number };
};

export type GetTldResponseDto = {
  top_level_domain: TopLevelDomain;
};
