import { BaseApiClient } from "./client";
import {
  Balancer,
  BalancerPreset,
  BalancerRule,
  DeleteBalancerResult,
} from "../types/balancer.type";
import { ListBalancersResponseDto } from "../types/dto/list-balancers-response.dto";
import { GetBalancerResponseDto } from "../types/dto/get-balancer-response.dto";
import { CreateBalancerRequestDto } from "../types/dto/create-balancer-request.dto";
import { UpdateBalancerRequestDto } from "../types/dto/update-balancer-request.dto";
import { DeleteBalancerResponseDto } from "../types/dto/delete-balancer-response.dto";
import { ListBalancerIpsResponseDto } from "../types/dto/list-balancer-ips-response.dto";
import { ListBalancerRulesResponseDto } from "../types/dto/list-balancer-rules-response.dto";
import { BalancerRuleResponseDto } from "../types/dto/balancer-rule-response.dto";
import {
  CreateBalancerRuleRequestDto,
  UpdateBalancerRuleRequestDto,
} from "../types/dto/create-balancer-rule-request.dto";
import { ListBalancerPresetsResponseDto } from "../types/dto/list-balancer-presets-response.dto";

export class BalancersApiClient extends BaseApiClient {
  /**
   * Получает список всех балансировщиков аккаунта
   */
  async listBalancers(limit?: number, offset?: number): Promise<Balancer[]> {
    const query: string[] = [];
    if (typeof limit === "number") query.push(`limit=${limit}`);
    if (typeof offset === "number") query.push(`offset=${offset}`);
    const qs = query.length ? `?${query.join("&")}` : "";
    const response = await this.get<ListBalancersResponseDto>(
      `/api/v1/balancers${qs}`
    );
    return response.balancers;
  }

  /**
   * Получает детальную информацию о балансировщике
   */
  async getBalancer(balancerId: number): Promise<Balancer> {
    const response = await this.get<GetBalancerResponseDto>(
      `/api/v1/balancers/${balancerId}`
    );
    return response.balancer;
  }

  /**
   * Создаёт новый балансировщик
   */
  async createBalancer(data: CreateBalancerRequestDto): Promise<Balancer> {
    const response = await this.post<GetBalancerResponseDto>(
      `/api/v1/balancers`,
      data
    );
    return response.balancer;
  }

  /**
   * Обновляет параметры существующего балансировщика
   */
  async updateBalancer(
    balancerId: number,
    data: UpdateBalancerRequestDto
  ): Promise<Balancer> {
    const response = await this.patch<GetBalancerResponseDto>(
      `/api/v1/balancers/${balancerId}`,
      data
    );
    return response.balancer;
  }

  /**
   * Удаляет балансировщик. Поддерживает 2FA через hash и code
   */
  async deleteBalancer(
    balancerId: number,
    hash?: string,
    code?: string
  ): Promise<DeleteBalancerResult | null> {
    const query: string[] = [];
    if (hash) query.push(`hash=${encodeURIComponent(hash)}`);
    if (code) query.push(`code=${encodeURIComponent(code)}`);
    const qs = query.length ? `?${query.join("&")}` : "";
    const response = await this.delete<DeleteBalancerResponseDto | void>(
      `/api/v1/balancers/${balancerId}${qs}`
    );
    if (response && typeof response === "object" && "balancer_delete" in response) {
      return response.balancer_delete;
    }
    return null;
  }

  /**
   * Получает список IP-адресов балансировщика
   */
  async listBalancerIps(balancerId: number): Promise<string[]> {
    const response = await this.get<ListBalancerIpsResponseDto>(
      `/api/v1/balancers/${balancerId}/ips`
    );
    return response.ips;
  }

  /**
   * Добавляет IP-адреса к балансировщику
   */
  async addBalancerIps(balancerId: number, ips: string[]): Promise<void> {
    await this.post<void>(`/api/v1/balancers/${balancerId}/ips`, { ips });
  }

  /**
   * Удаляет IP-адреса из балансировщика.
   * DELETE с телом — используем makeRequest через post в данной базе не подходит;
   * BaseApiClient.delete не принимает body, поэтому используем axios через makeRequest напрямую.
   */
  async removeBalancerIps(balancerId: number, ips: string[]): Promise<void> {
    await this.deleteWithBody<void>(
      `/api/v1/balancers/${balancerId}/ips`,
      { ips }
    );
  }

  /**
   * DELETE-запрос с телом через базовый makeRequest (axios поддерживает тело в DELETE).
   * protected makeRequest доступен в подклассе напрямую.
   */
  private async deleteWithBody<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest<T>("DELETE", endpoint, data);
  }

  /**
   * Получает правила балансировщика
   */
  async listBalancerRules(balancerId: number): Promise<BalancerRule[]> {
    const response = await this.get<ListBalancerRulesResponseDto>(
      `/api/v1/balancers/${balancerId}/rules`
    );
    return response.rules;
  }

  /**
   * Создаёт правило для балансировщика
   */
  async createBalancerRule(
    balancerId: number,
    data: CreateBalancerRuleRequestDto
  ): Promise<BalancerRule> {
    const response = await this.post<BalancerRuleResponseDto>(
      `/api/v1/balancers/${balancerId}/rules`,
      data
    );
    return response.rule;
  }

  /**
   * Обновляет правило для балансировщика
   */
  async updateBalancerRule(
    balancerId: number,
    ruleId: number,
    data: UpdateBalancerRuleRequestDto
  ): Promise<BalancerRule> {
    const response = await this.patch<BalancerRuleResponseDto>(
      `/api/v1/balancers/${balancerId}/rules/${ruleId}`,
      data
    );
    return response.rule;
  }

  /**
   * Удаляет правило для балансировщика
   */
  async deleteBalancerRule(balancerId: number, ruleId: number): Promise<void> {
    await this.delete<void>(
      `/api/v1/balancers/${balancerId}/rules/${ruleId}`
    );
  }

  /**
   * Получает список тарифов для балансировщиков
   */
  async listBalancerPresets(): Promise<BalancerPreset[]> {
    const response = await this.get<ListBalancerPresetsResponseDto>(
      `/api/v1/presets/balancers`
    );
    return response.balancers_presets;
  }
}

export const balancersApiClient: BalancersApiClient = new BalancersApiClient();
