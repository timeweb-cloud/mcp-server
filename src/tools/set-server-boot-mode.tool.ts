import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { setServerBootModeAction } from "../actions/set-server-boot-mode.action";
import { ServerBootMode } from "../api/servers";

const BOOT_MODES: ServerBootMode[] = ["default", "single", "recovery_disk"];

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  boot_mode: z
    .enum(["default", "single", "recovery_disk"])
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип загрузки: default (обычный), single (однопользовательский), recovery_disk (диск восстановления)"
    ),
};

const handler = async (params: {
  server_id: number;
  boot_mode: ServerBootMode;
}) => {
  if (!BOOT_MODES.includes(params.boot_mode)) {
    return createToolResponse(
      `❌ Неверный boot_mode: ${params.boot_mode}. Допустимые: ${BOOT_MODES.join(", ")}.`
    );
  }

  try {
    await setServerBootModeAction(params.server_id, params.boot_mode);
    return createToolResponse(
      `✅ Тип загрузки сервера ${params.server_id} установлен: ${params.boot_mode}.\n` +
        `Сервер будет перезагружен для применения изменения.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось изменить boot_mode сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при смене boot-mode");
  }
};

export const setServerBootModeTool = {
  name: ToolNames.SET_SERVER_BOOT_MODE,
  title: "Установка типа загрузки ОС сервера",
  description:
    "Меняет boot_mode сервера: default (штатный), single (однопользовательский — для восстановления root), recovery_disk (загрузка с диска восстановления). Сервер перезагружается.",
  inputSchema,
  handler,
};
