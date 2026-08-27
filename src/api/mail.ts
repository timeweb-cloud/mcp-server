import { BaseApiClient } from "./client";
import { Mailbox, MailboxV2, MailDomainInfo } from "../types/mailbox.type";
import {
  ListMailboxesV1ResponseDto,
  ListMailboxesV2ResponseDto,
} from "../types/dto/list-mailboxes-response.dto";
import {
  GetMailboxV1ResponseDto,
  GetMailboxV2ResponseDto,
} from "../types/dto/get-mailbox-response.dto";
import {
  CreateMailboxV1RequestDto,
  CreateMailboxV2RequestDto,
} from "../types/dto/create-mailbox-request.dto";
import {
  CreateMailboxV1ResponseDto,
  CreateMailboxV2ResponseDto,
} from "../types/dto/create-mailbox-response.dto";
import {
  BatchCreateMailboxesV1RequestDto,
  BatchCreateMailboxesV2RequestDto,
} from "../types/dto/batch-create-mailboxes-request.dto";
import {
  BatchCreateMailboxesV1ResponseDto,
  BatchCreateMailboxesV2ResponseDto,
} from "../types/dto/batch-create-mailboxes-response.dto";
import {
  UpdateMailboxV1RequestDto,
  UpdateMailboxV2RequestDto,
} from "../types/dto/update-mailbox-request.dto";
import {
  UpdateMailboxV1ResponseDto,
  UpdateMailboxV2ResponseDto,
} from "../types/dto/update-mailbox-response.dto";
import { GetMailDomainInfoResponseDto } from "../types/dto/get-mail-domain-info-response.dto";
import { UpdateMailDomainInfoRequestDto } from "../types/dto/update-mail-domain-info-request.dto";
import { UpdateMailDomainInfoResponseDto } from "../types/dto/update-mail-domain-info-response.dto";

export class MailApiClient extends BaseApiClient {
  // ───── v2 (приоритетная версия API) ─────

  /**
   * Список всех почтовых ящиков аккаунта (API v2).
   */
  async listMailboxesV2(): Promise<MailboxV2[]> {
    const response = await this.get<ListMailboxesV2ResponseDto>(
      "/api/v2/mail"
    );
    return response.mailboxes;
  }

  /**
   * Получение одного почтового ящика (API v2).
   */
  async getMailboxV2(domain: string, mailbox: string): Promise<MailboxV2> {
    const response = await this.get<GetMailboxV2ResponseDto>(
      `/api/v2/mail/domains/${encodeURIComponent(domain)}/mailboxes/${encodeURIComponent(mailbox)}`
    );
    return response.mailbox;
  }

  /**
   * Создание почтового ящика (API v2).
   */
  async createMailboxV2(
    domain: string,
    data: CreateMailboxV2RequestDto
  ): Promise<MailboxV2> {
    const response = await this.post<CreateMailboxV2ResponseDto>(
      `/api/v2/mail/domains/${encodeURIComponent(domain)}`,
      data
    );
    return response.mailbox;
  }

  /**
   * Массовое создание почтовых ящиков (API v2). Тело — массив.
   */
  async batchCreateMailboxesV2(
    domain: string,
    data: BatchCreateMailboxesV2RequestDto
  ): Promise<BatchCreateMailboxesV2ResponseDto["mailboxes_batch"]> {
    const response = await this.post<BatchCreateMailboxesV2ResponseDto>(
      `/api/v2/mail/domains/${encodeURIComponent(domain)}/batch`,
      data
    );
    return response.mailboxes_batch;
  }

  /**
   * Изменение почтового ящика (API v2).
   */
  async updateMailboxV2(
    domain: string,
    mailbox: string,
    data: UpdateMailboxV2RequestDto
  ): Promise<Record<string, any>> {
    const response = await this.patch<UpdateMailboxV2ResponseDto>(
      `/api/v2/mail/domains/${encodeURIComponent(domain)}/mailboxes/${encodeURIComponent(mailbox)}`,
      data
    );
    return response.mailbox;
  }

  // ───── v1 (legacy, но всё ещё нужна для delete и domain info) ─────

  /**
   * Список всех почтовых ящиков аккаунта (API v1).
   */
  async listMailboxesV1(): Promise<Mailbox[]> {
    const response = await this.get<ListMailboxesV1ResponseDto>(
      "/api/v1/mail"
    );
    return response.mailboxes;
  }

  /**
   * Список почтовых ящиков одного домена (только v1).
   */
  async listMailboxesByDomain(domain: string): Promise<Mailbox[]> {
    const response = await this.get<ListMailboxesV1ResponseDto>(
      `/api/v1/mail/domains/${encodeURIComponent(domain)}`
    );
    return response.mailboxes;
  }

  /**
   * Получение одного почтового ящика (API v1).
   */
  async getMailboxV1(domain: string, mailbox: string): Promise<Mailbox> {
    const response = await this.get<GetMailboxV1ResponseDto>(
      `/api/v1/mail/domains/${encodeURIComponent(domain)}/mailboxes/${encodeURIComponent(mailbox)}`
    );
    return response.mailbox;
  }

  /**
   * Создание почтового ящика (API v1).
   */
  async createMailboxV1(
    domain: string,
    data: CreateMailboxV1RequestDto
  ): Promise<Mailbox> {
    const response = await this.post<CreateMailboxV1ResponseDto>(
      `/api/v1/mail/domains/${encodeURIComponent(domain)}`,
      data
    );
    return response.mailbox;
  }

  /**
   * Массовое создание почтовых ящиков (API v1).
   */
  async batchCreateMailboxesV1(
    domain: string,
    data: BatchCreateMailboxesV1RequestDto
  ): Promise<Mailbox[]> {
    const response = await this.post<BatchCreateMailboxesV1ResponseDto>(
      `/api/v1/mail/domains/${encodeURIComponent(domain)}/batch`,
      data
    );
    return response.mailboxes;
  }

  /**
   * Изменение почтового ящика (API v1).
   */
  async updateMailboxV1(
    domain: string,
    mailbox: string,
    data: UpdateMailboxV1RequestDto
  ): Promise<Mailbox> {
    const response = await this.patch<UpdateMailboxV1ResponseDto>(
      `/api/v1/mail/domains/${encodeURIComponent(domain)}/mailboxes/${encodeURIComponent(mailbox)}`,
      data
    );
    return response.mailbox;
  }

  /**
   * Удаление почтового ящика (только v1).
   */
  async deleteMailbox(domain: string, mailbox: string): Promise<void> {
    await this.delete<void>(
      `/api/v1/mail/domains/${encodeURIComponent(domain)}/mailboxes/${encodeURIComponent(mailbox)}`
    );
  }

  /**
   * Получение почтовой информации о домене.
   */
  async getMailDomainInfo(domain: string): Promise<MailDomainInfo> {
    const response = await this.get<GetMailDomainInfoResponseDto>(
      `/api/v1/mail/domains/${encodeURIComponent(domain)}/info`
    );
    return response.domain_info;
  }

  /**
   * Изменение почтовой информации о домене.
   */
  async updateMailDomainInfo(
    domain: string,
    data: UpdateMailDomainInfoRequestDto
  ): Promise<MailDomainInfo> {
    const response = await this.patch<UpdateMailDomainInfoResponseDto>(
      `/api/v1/mail/domains/${encodeURIComponent(domain)}/info`,
      data
    );
    return response.domain_info;
  }
}

export const mailApiClient: MailApiClient = new MailApiClient();
