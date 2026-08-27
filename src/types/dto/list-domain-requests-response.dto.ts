import { DomainRequest } from "../domain-request.type";

export type ListDomainRequestsResponseDto = {
  requests: DomainRequest[];
  meta: { total: number };
};

export type GetDomainRequestResponseDto = {
  request: DomainRequest;
};
