import { BaseApiClient } from "./client";
import { AccountStatus, Finances } from "../types/finances.type";
import { ServicePrice } from "../types/service-price.type";
import { GetFinancesResponseDto } from "../types/dto/get-finances-response.dto";
import { GetAccountStatusResponseDto } from "../types/dto/get-account-status-response.dto";
import { GetServicesCostResponseDto } from "../types/dto/get-services-cost-response.dto";

export class AccountApiClient extends BaseApiClient {
  /**
   * Получает платёжную информацию аккаунта (баланс, тариф, автоплатёж)
   */
  async getFinances(): Promise<Finances> {
    const response = await this.get<GetFinancesResponseDto>(
      "/api/v1/account/finances"
    );
    return response.finances;
  }

  /**
   * Получает статус аккаунта (блокировка, уведомления, смена пароля)
   */
  async getStatus(): Promise<AccountStatus> {
    const response = await this.get<GetAccountStatusResponseDto>(
      "/api/v1/account/status"
    );
    return response.status;
  }

  /**
   * Получает детализацию стоимости сервисов (какой VPS/БД/S3 сколько стоит)
   */
  async getServicesCost(): Promise<ServicePrice[]> {
    const response = await this.get<GetServicesCostResponseDto>(
      "/api/v1/account/services/cost"
    );
    return response.services_costs;
  }
}

export const accountApiClient: AccountApiClient = new AccountApiClient();
