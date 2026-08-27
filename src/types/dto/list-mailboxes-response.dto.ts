import { Mailbox, MailboxV2 } from "../mailbox.type";

export type ListMailboxesV1ResponseDto = {
  meta: { total: number };
  mailboxes: Mailbox[];
  response_id?: string;
};

export type ListMailboxesV2ResponseDto = {
  meta: { total: number };
  mailboxes: MailboxV2[];
  response_id?: string;
};
