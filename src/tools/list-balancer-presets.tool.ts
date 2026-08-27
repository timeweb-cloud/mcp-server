import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listBalancerPresetsAction } from "../actions/list-balancer-presets.action";

const inputSchema = {};

const handler = async () => {
  try {
    const presets = await listBalancerPresetsAction();

    if (presets.length === 0) {
      return createToolResponse("Тарифы для балансировщиков не найдены.");
    }

    const lines = presets.map(
      (p) =>
        `• ID ${p.id} — ${p.description_short}\n  ${p.description}\n  Пропускная способность: ${p.bandwidth}, реплик: ${p.replica_count}, RPS: ${p.request_per_second}, локация: ${p.location}\n  Цена: ${p.price}`
    );

    return createToolResponse(
      `Тарифы для балансировщиков (${presets.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения тарифов балансировщиков. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении тарифов балансировщиков"
    );
  }
};

export const listBalancerPresetsTool = {
  name: ToolNames.LIST_BALANCER_PRESETS,
  title: "Тарифы балансировщиков",
  description:
    "Возвращает список доступных тарифов (preset) для балансировщиков. Используй перед create_balancer, чтобы выбрать preset_id.",
  inputSchema,
  handler,
};
