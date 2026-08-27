import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateAiAgentAction } from "../actions/update-ai-agent.action";
import { UpdateAiAgentRequestDto } from "../types/dto/update-ai-agent-request.dto";

const inputSchema = {
  agent_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID агента"),
  name: z.string().optional().describe("Новое название"),
  description: z.string().optional().describe("Новое описание"),
  access_type: z
    .enum(["public", "private"])
    .optional()
    .describe("Новый тип доступа"),
  status: z.enum(["active", "suspended"]).optional().describe("Новый статус"),
  token_package_id: z.number().optional().describe("Новый пакет токенов"),
  system_prompt: z.string().optional().describe("Новый system prompt"),
  refine_query: z.boolean().optional().describe("Уточнять запрос"),
  temperature: z.number().optional().describe("temperature"),
  top_p: z.number().optional().describe("top_p"),
  max_tokens: z.number().optional().describe("Максимум токенов"),
  frequency_penalty: z.number().optional().describe("frequency_penalty"),
  presence_penalty: z.number().optional().describe("presence_penalty"),
  project_id: z.number().optional().describe("ID проекта"),
};

const handler = async (params: {
  agent_id: number;
  name?: string;
  description?: string;
  access_type?: "public" | "private";
  status?: "active" | "suspended";
  token_package_id?: number;
  system_prompt?: string;
  refine_query?: boolean;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  project_id?: number;
}) => {
  try {
    const body: UpdateAiAgentRequestDto = {};
    if (params.name !== undefined) body.name = params.name;
    if (params.description !== undefined) body.description = params.description;
    if (params.access_type !== undefined) body.access_type = params.access_type;
    if (params.status !== undefined) body.status = params.status;
    if (params.token_package_id !== undefined)
      body.token_package_id = params.token_package_id;
    if (params.project_id !== undefined) body.project_id = params.project_id;

    const modelSettings: Record<string, number> = {};
    if (params.temperature !== undefined)
      modelSettings.temperature = params.temperature;
    if (params.top_p !== undefined) modelSettings.top_p = params.top_p;
    if (params.max_tokens !== undefined)
      modelSettings.max_tokens = params.max_tokens;
    if (params.frequency_penalty !== undefined)
      modelSettings.frequency_penalty = params.frequency_penalty;
    if (params.presence_penalty !== undefined)
      modelSettings.presence_penalty = params.presence_penalty;

    const hasSettings =
      params.system_prompt !== undefined ||
      params.refine_query !== undefined ||
      Object.keys(modelSettings).length > 0;

    if (hasSettings) {
      body.settings = {
        ...(params.system_prompt !== undefined && {
          system_prompt: params.system_prompt,
        }),
        ...(params.refine_query !== undefined && {
          refine_query: params.refine_query,
        }),
        ...(Object.keys(modelSettings).length > 0 && {
          model: modelSettings as any,
        }),
      } as any;
    }

    const agent = await updateAiAgentAction(params.agent_id, body);
    return createToolResponse(`✅ AI-агент ${agent.id} обновлён.
• Название: ${agent.name}
• Статус: ${agent.status}
• Тип доступа: ${agent.access_type}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось обновить агента ${params.agent_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении агента");
  }
};

export const updateAiAgentTool = {
  name: ToolNames.UPDATE_AI_AGENT,
  title: "Обновление AI-агента",
  description:
    "Обновляет параметры AI-агента: имя, описание, статус, access_type, пакет токенов, system prompt и настройки модели. Передавай только поля, которые нужно изменить.",
  inputSchema,
  handler,
};
