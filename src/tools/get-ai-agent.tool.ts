import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getAiAgentAction } from "../actions/get-ai-agent.action";

const inputSchema = {
  agent_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID AI-агента"),
};

const handler = async (params: { agent_id: number }) => {
  try {
    const a = await getAiAgentAction(params.agent_id);

    const linesBlock = [
      `• ID: ${a.id}`,
      `• Название: ${a.name}`,
      a.description ? `• Описание: ${a.description}` : null,
      `• Статус: ${a.status}`,
      `• Тип доступа: ${a.access_type}`,
      `• Модель ID: ${a.model_id}`,
      a.token_package_id ? `• Пакет токенов: ${a.token_package_id}` : null,
      a.total_tokens !== undefined
        ? `• Токены: использовано ${a.used_tokens ?? 0} из ${a.total_tokens} (осталось ${a.remaining_tokens ?? 0})`
        : null,
      a.settings?.system_prompt
        ? `• System prompt: ${a.settings.system_prompt.slice(0, 200)}${a.settings.system_prompt.length > 200 ? "…" : ""}`
        : null,
      a.subscription_renewal_date
        ? `• Обновление подписки: ${new Date(a.subscription_renewal_date).toLocaleString("ru-RU")}`
        : null,
      a.created_at
        ? `• Создан: ${new Date(a.created_at).toLocaleString("ru-RU")}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    return createToolResponse(`📋 AI-агент ${a.id}:\n\n${linesBlock}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить агента ${params.agent_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении агента");
  }
};

export const getAiAgentTool = {
  name: ToolNames.GET_AI_AGENT,
  title: "Получение AI-агента",
  description:
    "Возвращает детальную информацию об AI-агенте по ID: название, статус, доступ, модель, пакет токенов, system prompt, остаток токенов.",
  inputSchema,
  handler,
};
