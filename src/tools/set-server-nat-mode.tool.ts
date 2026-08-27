import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { setServerNatModeAction } from "../actions/set-server-nat-mode.action";
import { ServerNatMode } from "../api/servers";

const NAT_MODES: ServerNatMode[] = ["dnat_and_snat", "snat", "no_nat"];

const inputSchema = {
  server_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID сервера"),
  nat_mode: z
    .enum(["dnat_and_snat", "snat", "no_nat"])
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - правило маршрутизации: dnat_and_snat (входящий + исходящий), snat (только исходящий), no_nat (только локальная сеть)"
    ),
};

const handler = async (params: {
  server_id: number;
  nat_mode: ServerNatMode;
}) => {
  if (!NAT_MODES.includes(params.nat_mode)) {
    return createToolResponse(
      `❌ Неверный nat_mode: ${params.nat_mode}. Допустимые: ${NAT_MODES.join(", ")}.`
    );
  }

  try {
    await setServerNatModeAction(params.server_id, params.nat_mode);
    return createToolResponse(
      `✅ NAT-режим сервера ${params.server_id} установлен: ${params.nat_mode}.`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось изменить NAT-режим сервера ${params.server_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при смене NAT-режима");
  }
};

export const setServerNatModeTool = {
  name: ToolNames.SET_SERVER_NAT_MODE,
  title: "Установка NAT-режима сервера в локальной сети",
  description:
    "Меняет правила маршрутизации трафика: dnat_and_snat (полный доступ), snat (только исходящий), no_nat (изоляция в локальной сети).",
  inputSchema,
  handler,
};
