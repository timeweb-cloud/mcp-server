import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateDomainNameServersAction } from "../actions/update-domain-name-servers.action";

const nameServerSchema = z.object({
  host: z.string().describe("Хост name-сервера, например ns1.timeweb.ru"),
  ips: z
    .array(z.string())
    .optional()
    .describe("Список IP-адресов name-сервера (опц.)"),
});

const inputSchema = {
  fqdn: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена"),
  name_servers: z
    .array(nameServerSchema)
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - новый список name-серверов (каждый с host и опционально ips)"
    ),
};

const handler = async (params: {
  fqdn: string;
  name_servers: { host: string; ips?: string[] }[];
}) => {
  try {
    if (params.name_servers.length === 0) {
      return createToolResponse(
        "❌ Список name_servers не может быть пустым."
      );
    }
    const groups = await updateDomainNameServersAction(params.fqdn, {
      name_servers: params.name_servers,
    });
    const count = groups.reduce((n, g) => n + g.items.length, 0);
    return createToolResponse(
      `✅ Name-серверы домена ${params.fqdn} обновлены (записей: ${count}).\nСтатус задачи: ${groups[0]?.task_status ?? "—"}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления name-серверов "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при обновлении name-серверов"
    );
  }
};

export const updateDomainNameServersTool = {
  name: ToolNames.UPDATE_DOMAIN_NAME_SERVERS,
  title: "Обновление name-серверов домена",
  description:
    "Заменяет список name-серверов у домена. Принимает массив объектов {host, ips?}.",
  inputSchema,
  handler,
};
