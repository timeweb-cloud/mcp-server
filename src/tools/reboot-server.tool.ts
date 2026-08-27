import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { rebootServerAction } from "../actions/reboot-server.action";

const inputSchema = {
  server_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера для перезагрузки"),
};

const handler = async (params: { server_id: number }) => {
  try {
    await rebootServerAction(params.server_id);
    return createToolResponse(
      `✅ Команда мягкой перезагрузки (ACPI reboot) отправлена для сервера ${params.server_id}. Статус перейдёт в rebooting → on.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось перезагрузить сервер ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при перезагрузке");
  }
};

export const rebootServerTool = {
  name: ToolNames.REBOOT_SERVER,
  title: "Перезагрузка сервера",
  description:
    "Мягко перезагружает сервер через ACPI reboot. ОС корректно завершает процессы перед рестартом. Используй для применения обновлений ядра или сброса подвисшего состояния.",
  inputSchema,
  handler,
};
