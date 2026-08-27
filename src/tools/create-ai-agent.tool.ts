import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createAiAgentAction } from "../actions/create-ai-agent.action";
import { CreateAiAgentRequestDto } from "../types/dto/create-ai-agent-request.dto";

const inputSchema = {
  name: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - название агента"),
  description: z.string().optional().describe("Описание агента"),
  access_type: z
    .enum(["public", "private"])
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип доступа: public или private"),
  model_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID модели (см. list_ai_models)"),
  token_package_id: z
    .number()
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID пакета токенов (см. list_ai_agent_token_packages)"
    ),
  system_prompt: z
    .string()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - системный промпт агента"),
  refine_query: z
    .boolean()
    .optional()
    .describe("Уточнять ли запрос перед обработкой (по умолчанию false)"),
  temperature: z.number().optional().describe("temperature модели"),
  top_p: z.number().optional().describe("top_p модели"),
  max_tokens: z.number().optional().describe("Максимум токенов в ответе"),
  frequency_penalty: z.number().optional().describe("frequency_penalty"),
  presence_penalty: z.number().optional().describe("presence_penalty"),
  project_id: z.number().optional().describe("ID проекта"),
};

const handler = async (params: {
  name: string;
  description?: string;
  access_type: "public" | "private";
  model_id: number;
  token_package_id: number;
  system_prompt: string;
  refine_query?: boolean;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  project_id?: number;
}) => {
  try {
    const body: CreateAiAgentRequestDto = {
      name: params.name,
      description: params.description,
      access_type: params.access_type,
      model_id: params.model_id,
      token_package_id: params.token_package_id,
      settings: {
        model: {
          ...(params.temperature !== undefined && {
            temperature: params.temperature,
          }),
          ...(params.top_p !== undefined && { top_p: params.top_p }),
          ...(params.max_tokens !== undefined && {
            max_tokens: params.max_tokens,
          }),
          ...(params.frequency_penalty !== undefined && {
            frequency_penalty: params.frequency_penalty,
          }),
          ...(params.presence_penalty !== undefined && {
            presence_penalty: params.presence_penalty,
          }),
        },
        system_prompt: params.system_prompt,
        refine_query: params.refine_query ?? false,
      },
      ...(params.project_id !== undefined && { project_id: params.project_id }),
    };

    const agent = await createAiAgentAction(body);

    return createToolResponse(`✅ AI-агент создан!

📋 Детали:
• ID: ${agent.id}
• Название: ${agent.name}
• Статус: ${agent.status}
• Тип доступа: ${agent.access_type}
• Модель ID: ${agent.model_id}
${agent.total_tokens !== undefined ? `• Всего токенов: ${agent.total_tokens}` : ""}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания AI-агента. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании агента");
  }
};

export const createAiAgentTool = {
  name: ToolNames.CREATE_AI_AGENT,
  title: "Создание AI-агента",
  description:
    "Создаёт нового AI-агента. Обязательны: name, access_type, model_id, token_package_id, system_prompt. Перед вызовом получи model_id через list_ai_models и token_package_id через list_ai_agent_token_packages.",
  inputSchema,
  handler,
};
