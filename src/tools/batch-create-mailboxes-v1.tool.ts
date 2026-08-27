import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { batchCreateMailboxesV1Action } from "../actions/batch-create-mailboxes-v1.action";

const mailboxItemSchema = z.object({
  login: z.string().describe("Имя ящика (часть до @)"),
  password: z.string().describe("Пароль ящика"),
  owner_full_name: z.string().optional().describe("ФИО владельца (опц.)"),
  comment: z.string().optional().describe("Комментарий (опц.)"),
});

const inputSchema = {
  domain: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена"),
  mailboxes: z
    .array(mailboxItemSchema)
    .min(1)
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - массив объектов с настройками ящиков"),
};

const handler = async (params: {
  domain: string;
  mailboxes: Array<{
    login: string;
    password: string;
    owner_full_name?: string;
    comment?: string;
  }>;
}) => {
  try {
    const created = await batchCreateMailboxesV1Action(params.domain, {
      mailboxes: params.mailboxes,
    });

    const lines = created.map((m) => {
      const full =
        m.mailbox && m.fqdn ? `${m.mailbox}@${m.fqdn}` : (m.mailbox ?? "—");
      return `  • ${full}`;
    });

    return createToolResponse(
      `✅ Массовое создание (API v1) завершено. Создано: ${created.length}\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка массового создания (v1). Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при массовом создании ящиков (v1)"
    );
  }
};

export const batchCreateMailboxesV1Tool = {
  name: ToolNames.BATCH_CREATE_MAILBOXES_V1,
  title: "Массовое создание почтовых ящиков (API v1)",
  description:
    "Создаёт несколько ящиков на домене через API v1. Предпочитай batch_create_mailboxes (v2).",
  inputSchema,
  handler,
};
