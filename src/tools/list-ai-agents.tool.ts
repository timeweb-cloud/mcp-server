import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listAiAgentsAction } from "../actions/list-ai-agents.action";

const inputSchema = {};

const handler = async () => {
  try {
    const agents = await listAiAgentsAction();

    if (agents.length === 0) {
      return createToolResponse("AI-агентов на аккаунте нет.");
    }

    const lines = agents.map((a) => {
      const tokens =
        a.total_tokens !== undefined
          ? `токены: ${a.used_tokens ?? 0}/${a.total_tokens}`
          : "";
      return `• ID ${a.id} — ${a.name}\n  статус: ${a.status}, доступ: ${a.access_type}, модель #${a.model_id}${tokens ? `, ${tokens}` : ""}`;
    });

    return createToolResponse(
      `AI-агенты (${agents.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка AI-агентов. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении агентов");
  }
};

export const listAiAgentsTool = {
  name: ToolNames.LIST_AI_AGENTS,
  title: "Список AI-агентов",
  description:
    "Возвращает список всех AI-агентов аккаунта: ID, название, статус, тип доступа, ID модели, использование токенов. Используй перед операциями над агентом для получения ID.",
  inputSchema,
  handler,
};
