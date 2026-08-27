import { BaseApiClient } from "./client";
import { AiAgent } from "../types/ai-agent.type";
import { AiModel } from "../types/ai-model.type";
import { TokenPackage } from "../types/token-package.type";
import { TokenStatistic } from "../types/token-statistic.type";
import { ListAiAgentsResponseDto } from "../types/dto/list-ai-agents-response.dto";
import { GetAiAgentResponseDto } from "../types/dto/get-ai-agent-response.dto";
import { CreateAiAgentRequestDto } from "../types/dto/create-ai-agent-request.dto";
import { UpdateAiAgentRequestDto } from "../types/dto/update-ai-agent-request.dto";
import { GetAgentStatisticResponseDto } from "../types/dto/get-agent-statistic-response.dto";
import { AddTokenPackageRequestDto } from "../types/dto/add-token-package-request.dto";
import { ListAiModelsResponseDto } from "../types/dto/list-ai-models-response.dto";
import { ListTokenPackagesResponseDto } from "../types/dto/list-token-packages-response.dto";

export type AgentStatisticQuery = {
  startTime?: string;
  endTime?: string;
  interval?: number;
};

export class AiAgentsApiClient extends BaseApiClient {
  /**
   * Получает список AI агентов
   */
  async listAgents(): Promise<AiAgent[]> {
    const response = await this.get<ListAiAgentsResponseDto>(
      "/api/v1/cloud-ai/agents"
    );
    return response.agents;
  }

  /**
   * Получает данные AI агента по ID
   */
  async getAgent(agentId: number): Promise<AiAgent> {
    const response = await this.get<GetAiAgentResponseDto>(
      `/api/v1/cloud-ai/agents/${agentId}`
    );
    return response.agent;
  }

  /**
   * Создаёт AI агента
   */
  async createAgent(data: CreateAiAgentRequestDto): Promise<AiAgent> {
    const response = await this.post<GetAiAgentResponseDto>(
      "/api/v1/cloud-ai/agents",
      data
    );
    return response.agent;
  }

  /**
   * Обновляет AI агента
   */
  async updateAgent(
    agentId: number,
    data: UpdateAiAgentRequestDto
  ): Promise<AiAgent> {
    const response = await this.patch<GetAiAgentResponseDto>(
      `/api/v1/cloud-ai/agents/${agentId}`,
      data
    );
    return response.agent;
  }

  /**
   * Удаляет AI агента
   */
  async deleteAgent(agentId: number): Promise<void> {
    await this.delete<void>(`/api/v1/cloud-ai/agents/${agentId}`);
  }

  /**
   * Получает статистику использования токенов агента
   */
  async getAgentStatistic(
    agentId: number,
    query: AgentStatisticQuery = {}
  ): Promise<TokenStatistic[]> {
    const qs = new URLSearchParams();
    if (query.startTime) qs.append("startTime", query.startTime);
    if (query.endTime) qs.append("endTime", query.endTime);
    if (query.interval !== undefined)
      qs.append("interval", String(query.interval));
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    const response = await this.get<GetAgentStatisticResponseDto>(
      `/api/v1/cloud-ai/agents/${agentId}/statistic${suffix}`
    );
    return response.agent_statistics;
  }

  /**
   * Добавляет дополнительный пакет токенов к агенту
   */
  async addAgentTokenPackage(
    agentId: number,
    data: AddTokenPackageRequestDto
  ): Promise<void> {
    await this.post<void>(
      `/api/v1/cloud-ai/agents/${agentId}/add-additional-token-package`,
      data
    );
  }

  /**
   * Получает список доступных AI моделей
   */
  async listModels(): Promise<AiModel[]> {
    const response = await this.get<ListAiModelsResponseDto>(
      "/api/v1/cloud-ai/models"
    );
    return response.models;
  }

  /**
   * Получает список пакетов токенов для агентов
   */
  async listAgentTokenPackages(): Promise<TokenPackage[]> {
    const response = await this.get<ListTokenPackagesResponseDto>(
      "/api/v1/cloud-ai/token-packages/agents"
    );
    return response.token_packages;
  }

  /**
   * Получает список пакетов токенов для баз знаний
   */
  async listKnowledgeBaseTokenPackages(): Promise<TokenPackage[]> {
    const response = await this.get<ListTokenPackagesResponseDto>(
      "/api/v1/cloud-ai/token-packages/knowledge-bases"
    );
    return response.token_packages;
  }
}

export const aiAgentsApiClient: AiAgentsApiClient = new AiAgentsApiClient();
