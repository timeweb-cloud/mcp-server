import { mailApiClient } from "../api";
import { MailboxV2 } from "../types/mailbox.type";

export const listMailboxesAction = async (): Promise<MailboxV2[]> => {
  return await mailApiClient.listMailboxesV2();
};
