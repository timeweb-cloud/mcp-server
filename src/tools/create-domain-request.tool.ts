import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { createDomainRequestAction } from "../actions/domain-requests.action";
import { CreateDomainRequestRequestDto } from "../types/dto/create-domain-request-request.dto";

const inputSchema = {
  action: z
    .enum(["register", "prolong", "transfer"])
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - тип заявки: register (регистрация), prolong (продление), transfer (перенос)"
    ),
  fqdn: z.string().describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - полное имя домена"),
  person_id: z
    .number()
    .optional()
    .describe(
      "ID администратора домена. ОБЯЗАТЕЛЕН для register. Для prolong опционален."
    ),
  period: z
    .string()
    .optional()
    .describe("Период регистрации/продления в формате ISO 8601, например P1Y"),
  is_autoprolong_enabled: z
    .boolean()
    .optional()
    .describe("Включить автопродление"),
  is_whois_privacy_enabled: z
    .boolean()
    .optional()
    .describe("Включить скрытие whois (недоступно для .ru и .рф)"),
  is_antispam_enabled: z
    .boolean()
    .optional()
    .describe("Антиспам (только для prolong)"),
  prime: z.string().optional().describe("Prime-тип (только для prolong)"),
  auth_code: z
    .string()
    .optional()
    .describe("Код авторизации для переноса домена. ОБЯЗАТЕЛЕН для transfer."),
};

const handler = async (params: {
  action: "register" | "prolong" | "transfer";
  fqdn: string;
  person_id?: number;
  period?: string;
  is_autoprolong_enabled?: boolean;
  is_whois_privacy_enabled?: boolean;
  is_antispam_enabled?: boolean;
  prime?: string;
  auth_code?: string;
}) => {
  try {
    let body: CreateDomainRequestRequestDto;

    if (params.action === "register") {
      if (params.person_id === undefined) {
        return createToolResponse(
          "❌ Для register заявки поле person_id обязательно."
        );
      }
      body = {
        action: "register",
        fqdn: params.fqdn,
        person_id: params.person_id,
        ...(params.period !== undefined && { period: params.period }),
        ...(params.is_autoprolong_enabled !== undefined && {
          is_autoprolong_enabled: params.is_autoprolong_enabled,
        }),
        ...(params.is_whois_privacy_enabled !== undefined && {
          is_whois_privacy_enabled: params.is_whois_privacy_enabled,
        }),
      };
    } else if (params.action === "prolong") {
      body = {
        action: "prolong",
        fqdn: params.fqdn,
        ...(params.person_id !== undefined && { person_id: params.person_id }),
        ...(params.period !== undefined && { period: params.period }),
        ...(params.is_autoprolong_enabled !== undefined && {
          is_autoprolong_enabled: params.is_autoprolong_enabled,
        }),
        ...(params.is_whois_privacy_enabled !== undefined && {
          is_whois_privacy_enabled: params.is_whois_privacy_enabled,
        }),
        ...(params.is_antispam_enabled !== undefined && {
          is_antispam_enabled: params.is_antispam_enabled,
        }),
        ...(params.prime !== undefined && { prime: params.prime }),
      };
    } else {
      if (!params.auth_code) {
        return createToolResponse(
          "❌ Для transfer заявки поле auth_code обязательно."
        );
      }
      body = {
        action: "transfer",
        fqdn: params.fqdn,
        auth_code: params.auth_code,
      };
    }

    const r = await createDomainRequestAction(body);

    return createToolResponse(`✅ Заявка создана!
• ID: ${r.id}
• FQDN: ${r.fqdn}
• Тип: ${r.type ?? params.action}
• Статус: ${r.status ?? "—"}
• Источник оплаты: ${r.money_source ?? "—"}
• Сообщение: ${r.message ?? "—"}

Следующий шаг — оплатить или обновить заявку через update_domain_request.`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка создания заявки на "${params.fqdn}". Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при создании заявки");
  }
};

export const createDomainRequestTool = {
  name: ToolNames.CREATE_DOMAIN_REQUEST,
  title: "Создание заявки на домен (регистрация/продление/трансфер)",
  description:
    "Создаёт заявку на операцию с доменом: регистрация (register), продление (prolong), перенос (transfer). Для register нужен person_id, для transfer — auth_code.",
  inputSchema,
  handler,
};
