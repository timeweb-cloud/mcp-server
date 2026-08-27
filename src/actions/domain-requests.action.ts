import { domainsApiClient } from "../api";
import { DomainRequest } from "../types/domain-request.type";
import {
  CreateDomainRequestRequestDto,
  UpdateDomainRequestBodyDto,
} from "../types/dto/create-domain-request-request.dto";

export const listDomainRequestsAction = async (): Promise<DomainRequest[]> => {
  return await domainsApiClient.listDomainRequests();
};

export const getDomainRequestAction = async (
  requestId: number
): Promise<DomainRequest> => {
  return await domainsApiClient.getDomainRequest(requestId);
};

export const createDomainRequestAction = async (
  data: CreateDomainRequestRequestDto
): Promise<DomainRequest> => {
  return await domainsApiClient.createDomainRequest(data);
};

export const updateDomainRequestAction = async (
  requestId: number,
  data: UpdateDomainRequestBodyDto
): Promise<DomainRequest> => {
  return await domainsApiClient.updateDomainRequest(requestId, data);
};
