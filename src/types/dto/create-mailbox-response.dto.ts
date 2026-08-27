import { Mailbox, MailboxV2 } from "../mailbox.type";

export type CreateMailboxV1ResponseDto = {
  mailbox: Mailbox;
  response_id?: string;
};

export type CreateMailboxV2ResponseDto = {
  mailbox: MailboxV2;
  response_id?: string;
};
