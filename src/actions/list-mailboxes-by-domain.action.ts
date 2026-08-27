import { mailApiClient } from "../api";
import { Mailbox } from "../types/mailbox.type";

export const listMailboxesByDomainAction = async (
  domain: string
): Promise<Mailbox[]> => {
  return await mailApiClient.listMailboxesByDomain(domain);
};
