import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateDomainAction } from "../actions/update-domain.action";

const inputSchema = {
  fqdn: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена"),
  is_autoprolong_enabled: z
    .boolean()
    .optional()
    .describe("Включить/выключить автопродление домена"),
  linked_ip: z
    .string()
    .nullable()
    .optional()
    .describe("Привязать IP-адрес к домену (null — отвязать)"),
};

const handler = async (params: {
  fqdn: string;
  is_autoprolong_enabled?: boolean;
  linked_ip?: string | null;
}) => {
  try {
    if (
      params.is_autoprolong_enabled === undefined &&
      params.linked_ip === undefined
    ) {
      return createToolResponse(
        "❌ Нужно указать хотя бы одно из полей: is_autoprolong_enabled или linked_ip."
      );
    }

    const body: { is_autoprolong_enabled?: boolean; linked_ip?: string | null } =
      {};
    if (params.is_autoprolong_enabled !== undefined) {
      body.is_autoprolong_enabled = params.is_autoprolong_enabled;
    }
    if (params.linked_ip !== undefined) {
      body.linked_ip = params.linked_ip;
    }

    const d = await updateDomainAction(params.fqdn, body);

    return createToolResponse(`✅ Домен ${d.fqdn} обновлён!
• Автопродление: ${d.is_autoprolong_enabled ? "да" : "нет"}
• Статус: ${d.domain_status}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления домена "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении домена");
  }
};

export const updateDomainTool = {
  name: ToolNames.UPDATE_DOMAIN,
  title: "Обновление параметров домена",
  description:
    "Включает/выключает автопродление домена и/или меняет привязанный IP-адрес. FQDN обязателен.",
  inputSchema,
  handler,
};
