import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { deleteVpcAction } from "../actions/delete-vpc.action";

const inputSchema = {
  vpc_id: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID VPC"),
};

const handler = async (params: { vpc_id: string }) => {
  try {
    await deleteVpcAction(params.vpc_id);
    return createToolResponse(`✅ VPC ${params.vpc_id} удалена.`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при удалении VPC. Причина: ${error.message}`
      );
    }
    return createToolResponse(`❌ Неизвестная ошибка при удалении VPC`);
  }
};

export const deleteVpcTool = {
  name: ToolNames.DELETE_VPC,
  title: "Удаление VPC",
  description: "Удаляет виртуальную приватную сеть (VPC) по её ID",
  inputSchema,
  handler,
};
