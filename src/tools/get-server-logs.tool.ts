import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getServerLogsAction } from "../actions/get-server-logs.action";

const inputSchema = {
  server_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  order: z
    .enum(["asc", "desc"])
    .default("desc")
    .describe(
      "НЕ ОБЯЗАТЕЛЬНОЕ ПОЛЕ - порядок сортировки по дате (по умолчанию: desc — сначала новые)"
    ),
};

const handler = async (params: {
  server_id: number;
  order?: "asc" | "desc";
}) => {
  try {
    const logs = await getServerLogsAction(
      params.server_id,
      params.order ?? "desc"
    );

    if (logs.length === 0) {
      return createToolResponse(
        `На сервере ${params.server_id} нет событий в логах.`
      );
    }

    const lines = logs
      .slice(0, 50)
      .map((l) => `• ${l.logged_at} — ${l.event}`);

    const suffix = logs.length > 50 ? `\n\n... и ещё ${logs.length - 50}` : "";
    return createToolResponse(
      `Логи сервера ${params.server_id} (${logs.length} событий):\n\n${lines.join("\n")}${suffix}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось получить логи сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при получении логов");
  }
};

export const getServerLogsTool = {
  name: ToolNames.GET_SERVER_LOGS,
  title: "Логи событий сервера",
  description:
    "Возвращает лог жизненного цикла сервера: install, reboot, shutdown, reinstall и пр. Полезно для диагностики (почему сервер сейчас в off, когда последний reinstall). Это НЕ application logs и НЕ syslog — только события уровня гипервизора.",
  inputSchema,
  handler,
};
