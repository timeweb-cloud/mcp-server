import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateVpcAction } from "../actions/update-vpc.action";
import { UpdateVpcRequestDto } from "../types/dto/update-vpc-request.dto";

const inputSchema = {
  vpc_id: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID VPC"),
  name: z.string().optional().describe("Новое имя VPC (опц.)"),
  description: z.string().optional().describe("Новое описание VPC (опц.)"),
};

const handler = async (params: {
  vpc_id: string;
  name?: string;
  description?: string;
}) => {
  try {
    if (params.name === undefined && params.description === undefined) {
      return createToolResponse(
        `❌ Нужно указать хотя бы одно поле для изменения: name или description`
      );
    }

    const data: UpdateVpcRequestDto = {};
    if (params.name !== undefined) data.name = params.name;
    if (params.description !== undefined) data.description = params.description;

    const vpc = await updateVpcAction(params.vpc_id, data);

    return createToolResponse(`✅ VPC ${vpc.id} обновлена

• Название: ${vpc.name}
• Описание: ${vpc.description ?? "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при обновлении VPC. Причина: ${error.message}`
      );
    }
    return createToolResponse(`❌ Неизвестная ошибка при обновлении VPC`);
  }
};

export const updateVpcTool = {
  name: ToolNames.UPDATE_VPC,
  title: "Изменение VPC",
  description: "Изменяет имя и/или описание VPC по её ID",
  inputSchema,
  handler,
};
