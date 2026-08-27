import { mailApiClient } from "../api";
import { Mailbox } from "../types/mailbox.type";
import { BatchCreateMailboxesV1RequestDto } from "../types/dto/batch-create-mailboxes-request.dto";

export const batchCreateMailboxesV1Action = async (
  domain: string,
  data: BatchCreateMailboxesV1RequestDto
): Promise<Mailbox[]> => {
  return await mailApiClient.batchCreateMailboxesV1(domain, data);
};
