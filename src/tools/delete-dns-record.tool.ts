import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteDnsRecordAction } from "../actions/delete-dns-record.action";

const inputSchema = {
  fqdn: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена"),
  record_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID DNS-записи для удаления"),
};

const handler = async (params: { fqdn: string; record_id: number }) => {
  try {
    await deleteDnsRecordAction(params.fqdn, params.record_id);
    return createToolResponse(
      `✅ DNS-запись ${params.record_id} удалена для домена ${params.fqdn}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка удаления DNS-записи ${params.record_id} для "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении DNS-записи");
  }
};

export const deleteDnsRecordTool = {
  name: ToolNames.DELETE_DNS_RECORD,
  title: "Удаление DNS-записи",
  description:
    "Удаляет DNS-запись по ID для указанного домена. Использует API v2.",
  inputSchema,
  handler,
};
