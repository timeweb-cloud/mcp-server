import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteMailboxAction } from "../actions/delete-mailbox.action";

const inputSchema = {
  domain: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя домена"),
  mailbox: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - имя ящика для удаления"),
};

const handler = async (params: { domain: string; mailbox: string }) => {
  try {
    await deleteMailboxAction(params.domain, params.mailbox);
    return createToolResponse(
      `✅ Почтовый ящик ${params.mailbox}@${params.domain} удалён.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка удаления ящика. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении ящика");
  }
};

export const deleteMailboxTool = {
  name: ToolNames.DELETE_MAILBOX,
  title: "Удаление почтового ящика",
  description:
    "Безвозвратно удаляет почтовый ящик. Операция необратима — вся почта будет потеряна.",
  inputSchema,
  handler,
};
