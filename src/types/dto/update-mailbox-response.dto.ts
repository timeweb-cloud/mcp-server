import { Mailbox } from "../mailbox.type";

export type UpdateMailboxV1ResponseDto = {
  mailbox: Mailbox;
  response_id?: string;
};

export type UpdateMailboxV2ResponseDto = {
  // API v2 возвращает mailbox-response (облегчённую форму)
  mailbox: Record<string, any>;
  response_id?: string;
};
