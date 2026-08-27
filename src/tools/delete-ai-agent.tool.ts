import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteAiAgentAction } from "../actions/delete-ai-agent.action";

const inputSchema = {
  agent_id: z.number().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID агента"),
};

const handler = async (params: { agent_id: number }) => {
  try {
    await deleteAiAgentAction(params.agent_id);
    return createToolResponse(`✅ AI-агент ${params.agent_id} удалён.`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Не удалось удалить агента ${params.agent_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при удалении агента");
  }
};

export const deleteAiAgentTool = {
  name: ToolNames.DELETE_AI_AGENT,
  title: "Удаление AI-агента",
  description:
    "Удаляет AI-агента по ID. ⚠️ Операция необратима — подтверждай с пользователем.",
  inputSchema,
  handler,
};
