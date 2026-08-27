import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { editApiKeyAction } from "../actions/edit-api-key.action";
import { EditApiKeyRequestDto } from "../types/dto/edit-api-key-request.dto";

const inputSchema = {
  token_id: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID API-токена (UUID)"),
  name: z.string().optional().describe("Новое имя токена (опц.)"),
  is_able_to_delete: z
    .boolean()
    .optional()
    .describe(
      "Разрешить/запретить удалять сервисы этим токеном без подтверждения (опц.)"
    ),
};

const handler = async (params: {
  token_id: string;
  name?: string;
  is_able_to_delete?: boolean;
}) => {
  try {
    if (params.name === undefined && params.is_able_to_delete === undefined) {
      return createToolResponse(
        `❌ Нужно указать хотя бы одно поле для изменения: name или is_able_to_delete`
      );
    }

    const data: EditApiKeyRequestDto = {};
    if (params.name !== undefined) data.name = params.name;
    if (params.is_able_to_delete !== undefined)
      data.is_able_to_delete = params.is_able_to_delete;

    const apiKey = await editApiKeyAction(params.token_id, data);

    return createToolResponse(`✅ API-токен ${apiKey.id} обновлён

• Имя: ${apiKey.name}
• Удаление сервисов: ${apiKey.is_able_to_delete ? "✅ разрешено" : "❌ запрещено"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при обновлении API-токена. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      `❌ Неизвестная ошибка при обновлении API-токена`
    );
  }
};

export const editApiKeyTool = {
  name: ToolNames.EDIT_API_KEY,
  title: "Изменение API-токена",
  description:
    "Изменяет имя и/или флаг is_able_to_delete API-токена по его ID",
  inputSchema,
  handler,
};
