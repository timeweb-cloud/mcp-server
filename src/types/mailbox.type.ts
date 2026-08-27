/**
 * Почтовый ящик (API v1).
 * Схема повторяет /components/schemas/mailbox из OpenAPI.
 */
export type Mailbox = {
  auto_reply?: {
    is_enabled: boolean;
    message: string;
    subject: string;
  };
  spam_filter?: {
    is_enabled: boolean;
    action: "move_to_directory" | "forward" | "delete" | "tag";
    forward_to: string;
    white_list: string[];
  };
  forwarding_incoming?: {
    is_enabled: boolean;
    is_delete_messages: boolean;
    incoming_list: string[];
  };
  forwarding_outgoing?: {
    is_enabled: boolean;
    outgoing_to: string;
  };
  comment?: string;
  fqdn?: string;
  mailbox?: string;
  mailbox_size?: number;
  used_space?: number;
  webmail?: boolean;
  [key: string]: any;
};

/**
 * Почтовый ящик (API v2).
 * Схема повторяет /components/schemas/mailbox-v2 из OpenAPI.
 */
export type MailboxV2 = {
  idn_name: string;
  autoreply_message: string;
  autoreply_status: boolean;
  autoreply_subject: string;
  comment: string;
  filter_action: "directory" | "forward" | "delete" | "tag";
  filter_status: boolean;
  forward_list: string[];
  forward_status: boolean;
  outgoing_control: boolean;
  outgoing_email: string;
  password: string;
  spambox: string;
  white_list: string[];
  webmail?: boolean;
  dovecot?: boolean;
  fqdn?: string;
  leave_messages?: boolean;
  mailbox?: string;
  owner_full_name?: string;
  [key: string]: any;
};

/**
 * Почтовая информация о домене.
 * Схема повторяет /components/schemas/domain-info.
 */
export type MailDomainInfo = {
  email: string;
  used: number;
  [key: string]: any;
};

/**
 * Результат массового создания почтовых ящиков (API v2).
 */
export type MailboxesBatchV2 = {
  mailboxes: MailboxV2[];
  errors: any[];
};
