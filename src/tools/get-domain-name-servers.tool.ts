import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getDomainNameServersAction } from "../actions/get-domain-name-servers.action";

const inputSchema = {
  fqdn: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена"),
};

const handler = async (params: { fqdn: string }) => {
  try {
    const groups = await getDomainNameServersAction(params.fqdn);
    if (groups.length === 0) {
      return createToolResponse(
        `У домена ${params.fqdn} нет настроенных name-серверов.`
      );
    }
    const blocks = groups.map((g) => {
      const items = g.items
        .map(
          (i) =>
            `  • ${i.host}${i.ips.length ? ` (${i.ips.join(", ")})` : ""}`
        )
        .join("\n");
      return `• Делегирование разрешено: ${g.is_delegation_allowed ? "да" : "нет"}
• Статус задачи: ${g.task_status}
${items}`;
    });
    return createToolResponse(
      `Name-серверы домена ${params.fqdn}:\n\n${blocks.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения name-серверов "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении name-серверов"
    );
  }
};

export const getDomainNameServersTool = {
  name: ToolNames.GET_DOMAIN_NAME_SERVERS,
  title: "Name-серверы домена",
  description:
    "Возвращает список name-серверов домена (host + IP-адреса), статус делегирования и задачи обновления NS.",
  inputSchema,
  handler,
};
