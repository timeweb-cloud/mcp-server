import { mailApiClient } from "../api";
import { MailboxesBatchV2 } from "../types/mailbox.type";
import { BatchCreateMailboxesV2RequestDto } from "../types/dto/batch-create-mailboxes-request.dto";

export const batchCreateMailboxesAction = async (
  domain: string,
  data: BatchCreateMailboxesV2RequestDto
): Promise<MailboxesBatchV2> => {
  return await mailApiClient.batchCreateMailboxesV2(domain, data);
};
