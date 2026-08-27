import { mailApiClient } from "../api";
import { MailDomainInfo } from "../types/mailbox.type";

export const updateMailDomainInfoAction = async (
  domain: string,
  email: string
): Promise<MailDomainInfo> => {
  return await mailApiClient.updateMailDomainInfo(domain, { email });
};
