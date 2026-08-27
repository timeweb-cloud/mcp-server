import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { addSubdomainAction } from "../actions/add-subdomain.action";

const inputSchema = {
  fqdn: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя основного домена"),
  subdomain_fqdn: z
    .string()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя создаваемого поддомена (например: sub.example.com)"
    ),
};

const handler = async (params: { fqdn: string; subdomain_fqdn: string }) => {
  try {
    const sub = await addSubdomainAction(params.fqdn, params.subdomain_fqdn);
    return createToolResponse(`✅ Поддомен создан!
• ID: ${sub.id}
• FQDN: ${sub.fqdn}
• Привязанный IP: ${sub.linked_ip ?? "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания поддомена "${params.subdomain_fqdn}" для "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании поддомена");
  }
};

export const addSubdomainTool = {
  name: ToolNames.ADD_SUBDOMAIN,
  title: "Добавление поддомена",
  description:
    "Создаёт поддомен у указанного основного домена. Нужны FQDN основного домена и FQDN поддомена.",
  inputSchema,
  handler,
};
