import { BaseApiClient } from "./client";
import {
  KnowledgeBase,
  KnowledgeBaseDocument,
} from "../types/knowledge-base.type";
import { TokenStatistic } from "../types/token-statistic.type";
import { ListKnowledgeBasesResponseDto } from "../types/dto/list-knowledge-bases-response.dto";
import { GetKnowledgeBaseResponseDto } from "../types/dto/get-knowledge-base-response.dto";
import { CreateKnowledgeBaseRequestDto } from "../types/dto/create-knowledge-base-request.dto";
import { UpdateKnowledgeBaseRequestDto } from "../types/dto/update-knowledge-base-request.dto";
import { ListKnowledgeBaseDocumentsResponseDto } from "../types/dto/list-knowledge-base-documents-response.dto";
import { GetKnowledgeBaseStatisticResponseDto } from "../types/dto/get-knowledge-base-statistic-response.dto";
import { AddTokenPackageRequestDto } from "../types/dto/add-token-package-request.dto";

export type ListKnowledgeBaseDocumentsQuery = {
  limit?: number;
  offset?: number;
  sort_by?: "name" | "size" | "status" | "indexing_timestamp";
  sort_order?: "ASC" | "DESC";
};

export type KnowledgeBaseStatisticQuery = {
  startTime?: string;
  endTime?: string;
  interval?: number;
};

export class KnowledgeBasesApiClient extends BaseApiClient {
  /**
   * Получает список баз знаний (v2 - с полем documents_count)
   */
  async listKnowledgeBasesV2(): Promise<KnowledgeBase[]> {
    const response = await this.get<ListKnowledgeBasesResponseDto>(
      "/api/v2/cloud-ai/knowledge-bases"
    );
    return response.knowledgebases;
  }

  /**
   * Получает список баз знаний (v1 - с массивом documents)
   */
  async listKnowledgeBases(): Promise<KnowledgeBase[]> {
    const response = await this.get<ListKnowledgeBasesResponseDto>(
      "/api/v1/cloud-ai/knowledge-bases"
    );
    return response.knowledgebases;
  }

  /**
   * Получает базу знаний по ID
   */
  async getKnowledgeBase(id: number): Promise<KnowledgeBase> {
    const response = await this.get<GetKnowledgeBaseResponseDto>(
      `/api/v1/cloud-ai/knowledge-bases/${id}`
    );
    return response.knowledgebase;
  }

  /**
   * Создаёт базу знаний
   */
  async createKnowledgeBase(
    data: CreateKnowledgeBaseRequestDto
  ): Promise<KnowledgeBase> {
    const response = await this.post<GetKnowledgeBaseResponseDto>(
      "/api/v1/cloud-ai/knowledge-bases",
      data
    );
    return response.knowledgebase;
  }

  /**
   * Обновляет базу знаний
   */
  async updateKnowledgeBase(
    id: number,
    data: UpdateKnowledgeBaseRequestDto
  ): Promise<KnowledgeBase> {
    const response = await this.patch<GetKnowledgeBaseResponseDto>(
      `/api/v1/cloud-ai/knowledge-bases/${id}`,
      data
    );
    return response.knowledgebase;
  }

  /**
   * Удаляет базу знаний
   */
  async deleteKnowledgeBase(id: number): Promise<void> {
    await this.delete<void>(`/api/v1/cloud-ai/knowledge-bases/${id}`);
  }

  /**
   * Привязывает базу знаний к агенту
   */
  async linkKnowledgeBaseToAgent(id: number, agentId: number): Promise<void> {
    await this.post<void>(
      `/api/v1/cloud-ai/knowledge-bases/${id}/link/${agentId}`
    );
  }

  /**
   * Отвязывает базу знаний от агента
   */
  async unlinkKnowledgeBaseFromAgent(
    id: number,
    agentId: number
  ): Promise<void> {
    await this.delete<void>(
      `/api/v1/cloud-ai/knowledge-bases/${id}/link/${agentId}`
    );
  }

  /**
   * Добавляет дополнительный пакет токенов к базе знаний
   */
  async addKnowledgeBaseTokenPackage(
    id: number,
    data: AddTokenPackageRequestDto
  ): Promise<void> {
    await this.post<void>(
      `/api/v1/cloud-ai/knowledge-bases/${id}/add-additional-token-package`,
      data
    );
  }

  /**
   * Получает список документов базы знаний
   */
  async listKnowledgeBaseDocuments(
    id: number,
    query: ListKnowledgeBaseDocumentsQuery = {}
  ): Promise<{ documents: KnowledgeBaseDocument[]; total: number }> {
    const qs = new URLSearchParams();
    if (query.limit !== undefined) qs.append("limit", String(query.limit));
    if (query.offset !== undefined) qs.append("offset", String(query.offset));
    if (query.sort_by) qs.append("sort_by", query.sort_by);
    if (query.sort_order) qs.append("sort_order", query.sort_order);
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    const response = await this.get<ListKnowledgeBaseDocumentsResponseDto>(
      `/api/v2/cloud-ai/knowledge-bases/${id}/documents${suffix}`
    );
    return {
      documents: response.knowledgebase_documents,
      total: response.meta.total,
    };
  }

  /**
   * Удаляет документ из базы знаний
   */
  async deleteKnowledgeBaseDocument(
    id: number,
    documentId: number
  ): Promise<void> {
    await this.delete<void>(
      `/api/v1/cloud-ai/knowledge-bases/${id}/documents/${documentId}`
    );
  }

  /**
   * Получает прямую ссылку для скачивания документа из базы знаний
   */
  async downloadKnowledgeBaseDocument(
    id: number,
    documentId: number
  ): Promise<any> {
    return await this.get<any>(
      `/api/v1/cloud-ai/knowledge-bases/${id}/documents/${documentId}/download`
    );
  }

  /**
   * Запускает переиндексацию документа
   */
  async reindexKnowledgeBaseDocument(
    id: number,
    documentId: number
  ): Promise<void> {
    await this.post<void>(
      `/api/v1/cloud-ai/knowledge-bases/${id}/documents/${documentId}/reindex`
    );
  }

  /**
   * Получает статистику использования токенов базы знаний
   */
  async getKnowledgeBaseStatistic(
    id: number,
    query: KnowledgeBaseStatisticQuery = {}
  ): Promise<TokenStatistic[]> {
    const qs = new URLSearchParams();
    if (query.startTime) qs.append("startTime", query.startTime);
    if (query.endTime) qs.append("endTime", query.endTime);
    if (query.interval !== undefined)
      qs.append("interval", String(query.interval));
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    const response = await this.get<GetKnowledgeBaseStatisticResponseDto>(
      `/api/v1/cloud-ai/knowledge-bases/${id}/statistic${suffix}`
    );
    return response.knowledgebase_statistics;
  }
}

export const knowledgeBasesApiClient: KnowledgeBasesApiClient =
  new KnowledgeBasesApiClient();
