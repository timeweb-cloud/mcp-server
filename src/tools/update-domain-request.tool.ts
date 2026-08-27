import { z } from "zod";
import { createToolResponse } from "../utils";
import { ToolNames } from "../types/tool-names.enum";
import { updateDomainRequestAction } from "../actions/domain-requests.action";
import { UpdateDomainRequestBodyDto } from "../types/dto/create-domain-request-request.dto";

const PAYMENT_TYPES = [
  "receipt",
  "card",
  "mobile-card",
  "wm",
  "webmoney",
  "yandex",
  "ya",
  "invoice",
  "sofort",
  "qiwi_wallet",
  "wechat",
] as const;

const inputSchema = {
  request_id: z
    .number()
    .describe("ОБЯЗАТЕЛЬНОЕ ПОЛЕ - ID заявки для оплаты/обновления"),
  money_source: z
    .enum(["use", "invoice", "free", "bonus"])
    .describe(
      "ОБЯЗАТЕЛЬНОЕ ПОЛЕ - способ оплаты: use (с баланса), invoice (платёжка), free (только для transfer), bonus"
    ),
  person_id: z.number().optional().describe("ID администратора домена"),
  payment_type: z
    .enum(PAYMENT_TYPES)
    .optional()
    .describe("Тип платёжной системы (ОБЯЗАТЕЛЕН для invoice)"),
  payer_id: z
    .number()
    .optional()
    .describe("ID плательщика (ОБЯЗАТЕЛЕН для invoice)"),
  auth_code: z
    .string()
    .optional()
    .describe("Код авторизации переноса (ОБЯЗАТЕЛЕН для free/transfer)"),
  bonus_id: z
    .number()
    .optional()
    .describe("ID бонуса (ОБЯЗАТЕЛЕН для bonus)"),
};

const handler = async (params: {
  request_id: number;
  money_source: "use" | "invoice" | "free" | "bonus";
  person_id?: number;
  payment_type?: (typeof PAYMENT_TYPES)[number];
  payer_id?: number;
  auth_code?: string;
  bonus_id?: number;
}) => {
  try {
    let body: UpdateDomainRequestBodyDto;

    if (params.money_source === "use") {
      body = {
        money_source: "use",
        ...(params.person_id !== undefined && { person_id: params.person_id }),
      };
    } else if (params.money_source === "invoice") {
      if (!params.payment_type || params.payer_id === undefined) {
        return createToolResponse(
          "❌ Для money_source=invoice нужны payment_type и payer_id."
        );
      }
      body = {
        money_source: "invoice",
        payment_type: params.payment_type,
        payer_id: params.payer_id,
        ...(params.person_id !== undefined && { person_id: params.person_id }),
      };
    } else if (params.money_source === "free") {
      if (!params.auth_code) {
        return createToolResponse(
          "❌ Для money_source=free нужен auth_code."
        );
      }
      body = {
        money_source: "free",
        auth_code: params.auth_code,
        ...(params.person_id !== undefined && { person_id: params.person_id }),
      };
    } else {
      if (params.bonus_id === undefined) {
        return createToolResponse(
          "❌ Для money_source=bonus нужен bonus_id."
        );
      }
      body = {
        money_source: "bonus",
        bonus_id: params.bonus_id,
        ...(params.person_id !== undefined && { person_id: params.person_id }),
      };
    }

    const r = await updateDomainRequestAction(params.request_id, body);
    return createToolResponse(`✅ Заявка ${r.id} обновлена!
• FQDN: ${r.fqdn}
• Статус: ${r.status ?? "—"}
• Источник оплаты: ${r.money_source ?? params.money_source}
• Сообщение: ${r.message ?? "—"}`);
  } catch (error) {
    if (error instanceof Error) {
      return createToolResponse(
        `❌ Ошибка обновления заявки ${params.request_id}. Причина: ${error.message}`
      );
    }
    return createToolResponse("❌ Неизвестная ошибка при обновлении заявки");
  }
};

export const updateDomainRequestTool = {
  name: ToolNames.UPDATE_DOMAIN_REQUEST,
  title: "Оплата/обновление заявки на домен",
  description:
    "Обновляет заявку на регистрацию/продление/трансфер, указывая источник оплаты: use (с баланса), invoice (платёжка), free (бесплатный трансфер), bonus.",
  inputSchema,
  handler,
};
