import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listFirewallGroupsAction } from "../actions/list-firewall-groups.action";

const inputSchema = {};

const handler = async () => {
  try {
    const groups = await listFirewallGroupsAction();

    if (groups.length === 0) {
      return createToolResponse("Групп правил firewall нет.");
    }

    const lines = groups.map(
      (g) =>
        `• ID ${g.id} — ${g.name}\n  политика: ${g.policy}, описание: ${g.description || "—"}\n  создана: ${new Date(g.created_at).toLocaleString("ru-RU")}, обновлена: ${new Date(g.updated_at).toLocaleString("ru-RU")}`
    );

    return createToolResponse(
      `🛡️ Группы правил firewall (${groups.length}):\n\n${lines.join("\n\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка получения списка групп firewall. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      "❌ Неизвестная ошибка при получении групп firewall"
    );
  }
};

export const listFirewallGroupsTool = {
  name: ToolNames.LIST_FIREWALL_GROUPS,
  title: "Список групп правил firewall",
  description:
    "Возвращает все группы правил firewall аккаунта: ID, имя, описание, политика (ACCEPT/DROP), даты создания и обновления. Используй перед любой операцией над группой, чтобы получить её ID.",
  inputSchema,
  handler,
};
