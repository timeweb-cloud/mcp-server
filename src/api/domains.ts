import { BaseApiClient } from "./client";
import { Domain, DomainSubdomain } from "../types/domain.type";
import { DnsRecord, DnsRecordV2 } from "../types/dns-record.type";
import { DomainNameServer } from "../types/domain-name-server.type";
import { DomainRequest } from "../types/domain-request.type";
import { TopLevelDomain } from "../types/top-level-domain.type";
import { ListDomainsResponseDto } from "../types/dto/list-domains-response.dto";
import { GetDomainResponseDto } from "../types/dto/get-domain-response.dto";
import { UpdateDomainRequestDto } from "../types/dto/update-domain-request.dto";
import { CheckDomainResponseDto } from "../types/dto/check-domain-response.dto";
import { ListDnsRecordsResponseDto } from "../types/dto/list-dns-records-response.dto";
import {
  CreateDnsRecordRequestDto,
  CreateDnsRecordV2RequestDto,
} from "../types/dto/create-dns-record-request.dto";
import {
  CreateDnsRecordResponseDto,
  CreateDnsRecordV2ResponseDto,
} from "../types/dto/create-dns-record-response.dto";
import { AddSubdomainResponseDto } from "../types/dto/add-subdomain-response.dto";
import { DomainNameServersResponseDto } from "../types/dto/domain-name-servers-response.dto";
import { UpdateDomainNameServersRequestDto } from "../types/dto/update-domain-name-servers-request.dto";
import {
  ListDomainRequestsResponseDto,
  GetDomainRequestResponseDto,
} from "../types/dto/list-domain-requests-response.dto";
import {
  CreateDomainRequestRequestDto,
  UpdateDomainRequestBodyDto,
} from "../types/dto/create-domain-request-request.dto";
import {
  ListTldsResponseDto,
  GetTldResponseDto,
} from "../types/dto/list-tlds-response.dto";

export class DomainsApiClient extends BaseApiClient {
  /**
   * Получает список всех доменов аккаунта
   */
  async listDomains(): Promise<Domain[]> {
    const response = await this.get<ListDomainsResponseDto>("/api/v1/domains");
    return response.domains;
  }

  /**
   * Получает детальную информацию по домену
   */
  async getDomain(fqdn: string): Promise<Domain> {
    const response = await this.get<GetDomainResponseDto>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}`
    );
    return response.domain;
  }

  /**
   * Обновляет параметры домена (в т.ч. автопродление)
   */
  async updateDomain(
    fqdn: string,
    data: UpdateDomainRequestDto
  ): Promise<Domain> {
    const response = await this.patch<GetDomainResponseDto>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}`,
      data
    );
    return response.domain;
  }

  /**
   * Удаляет домен с аккаунта
   */
  async deleteDomain(fqdn: string): Promise<void> {
    await this.delete<void>(`/api/v1/domains/${encodeURIComponent(fqdn)}`);
  }

  /**
   * Добавляет домен на аккаунт
   */
  async addDomain(fqdn: string): Promise<void> {
    await this.post<void>(`/api/v1/add-domain/${encodeURIComponent(fqdn)}`);
  }

  /**
   * Проверяет, доступен ли домен для регистрации
   */
  async checkDomain(fqdn: string): Promise<boolean> {
    const response = await this.get<CheckDomainResponseDto>(
      `/api/v1/check-domain/${encodeURIComponent(fqdn)}`
    );
    return response.is_domain_available;
  }

  // ===== DNS records (v1) =====

  /**
   * Получает список пользовательских DNS-записей домена
   */
  async listDnsRecords(fqdn: string): Promise<DnsRecord[]> {
    const response = await this.get<ListDnsRecordsResponseDto>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}/dns-records`
    );
    return response.dns_records;
  }

  /**
   * Получает DNS-записи домена по умолчанию
   */
  async listDefaultDnsRecords(fqdn: string): Promise<DnsRecord[]> {
    const response = await this.get<ListDnsRecordsResponseDto>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}/default-dns-records`
    );
    return response.dns_records;
  }

  // ===== DNS records (v2 — предпочтительные для CRUD) =====

  /**
   * Создаёт DNS-запись (v2)
   */
  async createDnsRecord(
    fqdn: string,
    data: CreateDnsRecordV2RequestDto
  ): Promise<DnsRecordV2> {
    const response = await this.post<CreateDnsRecordV2ResponseDto>(
      `/api/v2/domains/${encodeURIComponent(fqdn)}/dns-records`,
      data
    );
    return response.dns_record;
  }

  /**
   * Обновляет DNS-запись по ID (v2)
   */
  async updateDnsRecord(
    fqdn: string,
    recordId: number,
    data: CreateDnsRecordV2RequestDto
  ): Promise<DnsRecordV2> {
    const response = await this.patch<CreateDnsRecordV2ResponseDto>(
      `/api/v2/domains/${encodeURIComponent(fqdn)}/dns-records/${recordId}`,
      data
    );
    return response.dns_record;
  }

  /**
   * Удаляет DNS-запись по ID (v2)
   */
  async deleteDnsRecord(fqdn: string, recordId: number): Promise<void> {
    await this.delete<void>(
      `/api/v2/domains/${encodeURIComponent(fqdn)}/dns-records/${recordId}`
    );
  }

  // ===== DNS records (v1 legacy, оставлены для совместимости) =====

  /**
   * Создаёт DNS-запись (v1, устаревший вариант)
   */
  async createDnsRecordV1(
    fqdn: string,
    data: CreateDnsRecordRequestDto
  ): Promise<DnsRecord> {
    const response = await this.post<CreateDnsRecordResponseDto>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}/dns-records`,
      data
    );
    return response.dns_record;
  }

  /**
   * Обновляет DNS-запись по ID (v1, устаревший вариант)
   */
  async updateDnsRecordV1(
    fqdn: string,
    recordId: number,
    data: CreateDnsRecordRequestDto
  ): Promise<DnsRecord> {
    const response = await this.patch<CreateDnsRecordResponseDto>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}/dns-records/${recordId}`,
      data
    );
    return response.dns_record;
  }

  /**
   * Удаляет DNS-запись по ID (v1, устаревший вариант)
   */
  async deleteDnsRecordV1(fqdn: string, recordId: number): Promise<void> {
    await this.delete<void>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}/dns-records/${recordId}`
    );
  }

  // ===== Поддомены =====

  /**
   * Добавляет поддомен
   */
  async addSubdomain(
    fqdn: string,
    subdomainFqdn: string
  ): Promise<DomainSubdomain> {
    const response = await this.post<AddSubdomainResponseDto>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}/subdomains/${encodeURIComponent(subdomainFqdn)}`
    );
    return response.subdomain;
  }

  /**
   * Удаляет поддомен
   */
  async deleteSubdomain(fqdn: string, subdomainFqdn: string): Promise<void> {
    await this.delete<void>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}/subdomains/${encodeURIComponent(subdomainFqdn)}`
    );
  }

  // ===== Name servers =====

  /**
   * Получает список name-серверов домена
   */
  async getNameServers(fqdn: string): Promise<DomainNameServer[]> {
    const response = await this.get<DomainNameServersResponseDto>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}/name-servers`
    );
    return response.name_servers;
  }

  /**
   * Обновляет name-серверы домена
   */
  async updateNameServers(
    fqdn: string,
    data: UpdateDomainNameServersRequestDto
  ): Promise<DomainNameServer[]> {
    const response = await this.put<DomainNameServersResponseDto>(
      `/api/v1/domains/${encodeURIComponent(fqdn)}/name-servers`,
      data
    );
    return response.name_servers;
  }

  // ===== Заявки на регистрацию/продление/трансфер =====

  /**
   * Получает список заявок
   */
  async listDomainRequests(): Promise<DomainRequest[]> {
    const response = await this.get<ListDomainRequestsResponseDto>(
      "/api/v1/domains-requests"
    );
    return response.requests;
  }

  /**
   * Получает заявку по ID
   */
  async getDomainRequest(requestId: number): Promise<DomainRequest> {
    const response = await this.get<GetDomainRequestResponseDto>(
      `/api/v1/domains-requests/${requestId}`
    );
    return response.request;
  }

  /**
   * Создаёт заявку (register / prolong / transfer)
   */
  async createDomainRequest(
    data: CreateDomainRequestRequestDto
  ): Promise<DomainRequest> {
    const response = await this.post<GetDomainRequestResponseDto>(
      "/api/v1/domains-requests",
      data
    );
    return response.request;
  }

  /**
   * Обновляет/оплачивает заявку (use / invoice / free / bonus)
   */
  async updateDomainRequest(
    requestId: number,
    data: UpdateDomainRequestBodyDto
  ): Promise<DomainRequest> {
    const response = await this.patch<GetDomainRequestResponseDto>(
      `/api/v1/domains-requests/${requestId}`,
      data
    );
    return response.request;
  }

  // ===== TLDs =====

  /**
   * Получает информацию обо всех доменных зонах
   */
  async listTlds(): Promise<TopLevelDomain[]> {
    const response = await this.get<ListTldsResponseDto>("/api/v1/tlds");
    return response.top_level_domains;
  }

  /**
   * Получает информацию о доменной зоне по ID
   */
  async getTld(tldId: number): Promise<TopLevelDomain> {
    const response = await this.get<GetTldResponseDto>(
      `/api/v1/tlds/${tldId}`
    );
    return response.top_level_domain;
  }
}

export const domainsApiClient: DomainsApiClient = new DomainsApiClient();
