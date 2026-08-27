import { mailApiClient } from "../api";
import { Mailbox } from "../types/mailbox.type";

export const listMailboxesV1Action = async (): Promise<Mailbox[]> => {
  return await mailApiClient.listMailboxesV1();
};
