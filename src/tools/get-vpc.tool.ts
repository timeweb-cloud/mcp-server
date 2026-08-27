import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { getVpcAction } from "../actions/get-vpc.action";

const inputSchema = {
  vpc_id: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID VPC"),
};

const handler = async (params: { vpc_id: string }) => {
  try {
    const vpc = await getVpcAction(params.vpc_id);

    return createToolResponse(`📋 VPC ${vpc.id}

• Название: ${vpc.name}
• Описание: ${vpc.description ?? "—"}
• Подсеть IPv4: ${vpc.subnet_v4}
• Локация: ${vpc.location}
• Зона доступности: ${vpc.availability_zone}
• Тип: ${vpc.type}
• Публичный IP: ${vpc.public_ip ?? "—"}
• Занятые адреса: ${vpc.busy_address.length > 0 ? vpc.busy_address.join(", ") : "—"}
• Создана: ${new Date(vpc.created_at).toLocaleString("ru-RU")}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при получении VPC. Причина: ${error.message}`
      );
    }
    return createToolResponse(`❌ Неизвестная ошибка при получении VPC`);
  }
};

export const getVpcTool = {
  name: ToolNames.GET_VPC,
  title: "Получение VPC",
  description: "Возвращает детальную информацию о виртуальной приватной сети (VPC) по её ID",
  inputSchema,
  handler,
};
