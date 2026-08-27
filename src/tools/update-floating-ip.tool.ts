import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateFloatingIpAction } from "../actions/update-floating-ip.action";
import { UpdateFloatingIpRequestDto } from "../types/dto/update-floating-ip-request.dto";

const inputSchema = {
  floating_ip_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID плавающего IP"),
  comment: z
    .string()
    .optional()
    .describe("Комментарий к плавающему IP (опц.)"),
  ptr: z
    .string()
    .optional()
    .describe("PTR-запись (обратная DNS-запись) для плавающего IP (опц.)"),
};

const handler = async (params: {
  floating_ip_id: string;
  comment?: string;
  ptr?: string;
}) => {
  try {
    if (params.comment === undefined && params.ptr === undefined) {
      return createToolResponse(
        `❌ Нужно указать хотя бы одно поле для изменения: comment или ptr`
      );
    }

    const data: UpdateFloatingIpRequestDto = {};
    if (params.comment !== undefined) data.comment = params.comment;
    if (params.ptr !== undefined) data.ptr = params.ptr;

    const ip = await updateFloatingIpAction(params.floating_ip_id, data);

    return createToolResponse(`✅ Плавающий IP ${ip.id} обновлён

• IP адрес: ${ip.ip ?? "не назначен"}
• Комментарий: ${ip.comment ?? "—"}
• PTR: ${ip.ptr ?? "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при обновлении плавающего IP. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      `❌ Неизвестная ошибка при обновлении плавающего IP`
    );
  }
};

export const updateFloatingIpTool = {
  name: ToolNames.UPDATE_FLOATING_IP,
  title: "Изменение плавающего IP",
  description:
    "Изменяет комментарий и/или PTR-запись плавающего IP по его ID",
  inputSchema,
  handler,
};
