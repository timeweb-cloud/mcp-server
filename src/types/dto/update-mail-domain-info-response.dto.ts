import { MailDomainInfo } from "../mailbox.type";

export type UpdateMailDomainInfoResponseDto = {
  domain_info: MailDomainInfo;
  response_id?: string;
};
