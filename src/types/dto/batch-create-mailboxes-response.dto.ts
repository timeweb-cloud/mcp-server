import { Mailbox, MailboxesBatchV2 } from "../mailbox.type";

export type BatchCreateMailboxesV1ResponseDto = {
  mailboxes: Mailbox[];
  response_id?: string;
};

export type BatchCreateMailboxesV2ResponseDto = {
  mailboxes_batch: MailboxesBatchV2;
  response_id?: string;
};
