import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { listVpcServicesAction } from "../actions/list-vpc-services.action";

const inputSchema = {
  vpc_id: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID VPC"),
};

const handler = async (params: { vpc_id: string }) => {
  try {
    const services = await listVpcServicesAction(params.vpc_id);

    if (!services || services.length === 0) {
      return createToolResponse(`💡 В VPC ${params.vpc_id} нет сервисов.`);
    }

    const lines = services.map(
      (s) =>
        `• ID ${s.id} — ${s.name} | тип: ${s.type} | локальный IP: ${s.local_ip ?? "—"} | публичный IP: ${s.public_ip ?? "—"}`
    );

    return createToolResponse(
      `📋 Сервисы в VPC ${params.vpc_id} (всего: ${services.length}):\n${lines.join("\n")}`
    );
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка при получении сервисов VPC. Причина: ${error.message}`
      );
    }
    return createToolResponse(
      `❌ Неизвестная ошибка при получении сервисов VPC`
    );
  }
};

export const listVpcServicesTool = {
  name: ToolNames.LIST_VPC_SERVICES,
  title: "Сервисы в VPC",
  description:
    "Возвращает список сервисов (server / balancer / dbaas), привязанных к VPC",
  inputSchema,
  handler,
};
