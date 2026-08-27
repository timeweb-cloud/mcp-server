import { Domain } from "../domain.type";

export type ListDomainsResponseDto = {
  domains: Domain[];
  meta: { total: number };
};
