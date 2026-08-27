import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getAccountServicesCostAction } from "../actions/get-account-services-cost.action";

const inputSchema = {};

const handler = async () => {
  try {
    const services = await getAccountServicesCostAction();

    if (services.length === 0) {
      return createToolResponse("Сервисов с расходами на аккаунте не найдено.");
    }

    const grouped: Record<string, { count: number; total: number }> = {};
    for (const s of services) {
      const key = s.type || "unknown";
      if (!grouped[key]) grouped[key] = { count: 0, total: 0 };
      grouped[key].count += 1;
      grouped[key].total += s.total_cost ?? s.cost ?? 0;
    }

    const groupedLines = Object.entries(grouped)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([type, g]) => `• ${type}: ${g.count} шт, суммарно ${g.total.toFixed(2)}`);

    const top = services
      .slice()
      .sort((a, b) => (b.total_cost ?? 0) - (a.total_cost ?? 0))
      .slice(0, 10)
      .map((s) => {
        const cfg = s.configuration
          ? ` (CPU: ${s.configuration.cpu ?? "—"}, RAM: ${s.configuration.ram ?? "—"} MB)`
          : "";
        return `  • ${s.type}#${s.service_id ?? "?"}: ${s.total_cost ?? s.cost}${cfg}`;
      });

    return createToolResponse(
      `💸 Стоимость сервисов (${services.length} сервисов):\n\n` +
        `По типам:\n${groupedLines.join("\n")}\n\n` +
        `Топ-10 самых дорогих:\n${top.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить стоимость сервисов. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка");
  }
};

export const getAccountServicesCostTool = {
  name: ToolNames.GET_ACCOUNT_SERVICES_COST,
  title: "Стоимость сервисов аккаунта",
  description:
    "Возвращает детализацию расходов по всем сервисам (VPS, БД, S3, DNS и пр.). Полезно для ответа 'куда уходят деньги' и поиска самых дорогих ресурсов. Для общего баланса используй get_account_finances.",
  inputSchema,
  handler,
};
