import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getAiAgentStatisticAction } from "../actions/get-ai-agent-statistic.action";

const inputSchema = {
  agent_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID агента"),
  start_time: z
    .string()
    .optional()
    .describe("Начало диапазона (ISO 8601, например 2024-10-01T00:00:00.000Z)"),
  end_time: z
    .string()
    .optional()
    .describe("Конец диапазона (ISO 8601, например 2024-10-16T23:59:59.999Z)"),
  interval: z
    .number()
    .optional()
    .describe("Интервал агрегации в минутах (по умолчанию 60)"),
};

const handler = async (params: {
  agent_id: number;
  start_time?: string;
  end_time?: string;
  interval?: number;
}) => {
  try {
    const stats = await getAiAgentStatisticAction(params.agent_id, {
      startTime: params.start_time,
      endTime: params.end_time,
      interval: params.interval,
    });

    if (stats.length === 0) {
      return createToolResponse(
        `По агенту ${params.agent_id} нет статистики в указанном диапазоне.`
      );
    }

    const totalIn = stats.reduce((s, p) => s + (p.ingoing_tokens ?? 0), 0);
    const totalOut = stats.reduce((s, p) => s + (p.outgoing_tokens ?? 0), 0);

    const lines = stats
      .slice(0, 20)
      .map(
        (s) =>
          `• ${new Date(s.time).toLocaleString("ru-RU")} — вход: ${s.ingoing_tokens}, выход: ${s.outgoing_tokens}`
      );

    const more =
      stats.length > 20 ? `\n…и ещё ${stats.length - 20} точек` : "";

    return createToolResponse(`📊 Статистика агента ${params.agent_id} (${stats.length} точек):

Итого: вход ${totalIn}, выход ${totalOut} токенов

${lines.join("\n")}${more}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить статистику агента ${params.agent_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении статистики агента"
    );
  }
};

export const getAiAgentStatisticTool = {
  name: ToolNames.GET_AI_AGENT_STATISTIC,
  title: "Статистика использования токенов AI-агента",
  description:
    "Возвращает статистику использования токенов агента по временным интервалам. Параметры start_time/end_time в ISO 8601, interval в минутах (60 по умолчанию).",
  inputSchema,
  handler,
};
