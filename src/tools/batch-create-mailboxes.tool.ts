import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { batchCreateMailboxesAction } from "../actions/batch-create-mailboxes.action";

const mailboxItemSchema = z.object({
  login: z.string().describe("Имя ящика (часть до @)"),
  password: z.string().describe("Пароль ящика"),
  owner_full_name: z.string().optional().describe("ФИО владельца (опц.)"),
  comment: z.string().optional().describe("Комментарий (опц.)"),
  filter_status: z.boolean().optional().describe("Спам-фильтр включён (опц.)"),
  filter_action: z
    .enum(["directory", "label"])
    .optional()
    .describe("Действие спам-фильтра, только если filter_status=true"),
});

const inputSchema = {
  domain: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена"),
  mailboxes: z
    .array(mailboxItemSchema)
    .min(1)
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - массив объектов с настройками ящиков для массового создания"
    ),
};

const handler = async (params: {
  domain: string;
  mailboxes: Array<{
    login: string;
    password: string;
    owner_full_name?: string;
    comment?: string;
    filter_status?: boolean;
    filter_action?: "directory" | "label";
  }>;
}) => {
  try {
    const batch = await batchCreateMailboxesAction(
      params.domain,
      params.mailboxes
    );

    const createdLines = batch.mailboxes.map((m) => {
      const full = m.mailbox && m.fqdn ? `${m.mailbox}@${m.fqdn}` : (m.mailbox ?? "—");
      return `  • ${full}`;
    });

    const errorsBlock =
      batch.errors.length > 0
        ? `\n\n⚠️ Ошибки (${batch.errors.length}):\n${batch.errors
            .map((e) => `  • ${JSON.stringify(e)}`)
            .join("\n")}`
        : "";

    return createToolResponse(
      `✅ Массовое создание завершено. Создано: ${batch.mailboxes.length}\n${createdLines.join("\n")}${errorsBlock}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка массового создания ящиков. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при массовом создании ящиков"
    );
  }
};

export const batchCreateMailboxesTool = {
  name: ToolNames.BATCH_CREATE_MAILBOXES,
  title: "Массовое создание почтовых ящиков",
  description:
    "Создаёт сразу несколько почтовых ящиков на одном домене (API v2). Возвращает список созданных ящиков и массив ошибок.",
  inputSchema,
  handler,
};
