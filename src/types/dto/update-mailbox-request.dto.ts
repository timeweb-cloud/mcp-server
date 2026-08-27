/**
 * Тело PATCH /api/v1/mail/domains/{domain}/mailboxes/{mailbox}.
 * Оставляем свободным — вложенные блоки имеют oneOf-варианты.
 */
export type UpdateMailboxV1RequestDto = {
  comment?: string;
  password?: string;
  auto_reply?: any;
  spam_filter?: any;
  forwarding_incoming?: any;
  forwarding_outgoing?: any;
};

/**
 * Тело PATCH /api/v2/mail/domains/{domain}/mailboxes/{mailbox}.
 */
export type UpdateMailboxV2RequestDto = {
  password?: string;
  comment?: string;
  owner_full_name?: string;
  spam_protection_settings?: any;
  forward_settings?: any;
  autoreply_settings?: any;
  outgoing_settings?: any;
};
