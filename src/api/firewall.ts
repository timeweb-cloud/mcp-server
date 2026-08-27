import { BaseApiClient } from "./client";
import {
  FirewallGroup,
  FirewallPolicy,
} from "../types/firewall-group.type";
import { FirewallRule } from "../types/firewall-rule.type";
import {
  FirewallGroupResource,
  FirewallResourceType,
} from "../types/firewall-resource.type";
import { ListFirewallGroupsResponseDto } from "../types/dto/list-firewall-groups-response.dto";
import { GetFirewallGroupResponseDto } from "../types/dto/get-firewall-group-response.dto";
import { CreateFirewallGroupRequestDto } from "../types/dto/create-firewall-group-request.dto";
import { UpdateFirewallGroupRequestDto } from "../types/dto/update-firewall-group-request.dto";
import { ListFirewallGroupResourcesResponseDto } from "../types/dto/list-firewall-group-resources-response.dto";
import { LinkFirewallResourceResponseDto } from "../types/dto/link-firewall-resource-response.dto";
import { ListFirewallRulesResponseDto } from "../types/dto/list-firewall-rules-response.dto";
import { GetFirewallRuleResponseDto } from "../types/dto/get-firewall-rule-response.dto";
import { CreateFirewallRuleRequestDto } from "../types/dto/create-firewall-rule-request.dto";
import { UpdateFirewallRuleRequestDto } from "../types/dto/update-firewall-rule-request.dto";

export class FirewallApiClient extends BaseApiClient {
  /**
   * Получает список всех групп правил firewall
   */
  async listFirewallGroups(): Promise<FirewallGroup[]> {
    const response = await this.get<ListFirewallGroupsResponseDto>(
      "/api/v1/firewall/groups"
    );
    return response.groups;
  }

  /**
   * Создаёт новую группу правил firewall
   */
  async createFirewallGroup(
    data: CreateFirewallGroupRequestDto,
    policy?: FirewallPolicy
  ): Promise<FirewallGroup> {
    const endpoint = policy
      ? `/api/v1/firewall/groups?policy=${encodeURIComponent(policy)}`
      : "/api/v1/firewall/groups";
    const response = await this.post<GetFirewallGroupResponseDto>(
      endpoint,
      data
    );
    return response.group;
  }

  /**
   * Получает информацию о конкретной группе правил
   */
  async getFirewallGroup(groupId: string): Promise<FirewallGroup> {
    const response = await this.get<GetFirewallGroupResponseDto>(
      `/api/v1/firewall/groups/${groupId}`
    );
    return response.group;
  }

  /**
   * Обновляет имя и/или описание группы правил
   */
  async updateFirewallGroup(
    groupId: string,
    data: UpdateFirewallGroupRequestDto
  ): Promise<FirewallGroup> {
    const response = await this.patch<GetFirewallGroupResponseDto>(
      `/api/v1/firewall/groups/${groupId}`,
      data
    );
    return response.group;
  }

  /**
   * Удаляет группу правил firewall
   */
  async deleteFirewallGroup(groupId: string): Promise<void> {
    await this.delete<void>(`/api/v1/firewall/groups/${groupId}`);
  }

  /**
   * Получает список слинкованных с группой правил ресурсов
   */
  async listFirewallGroupResources(
    groupId: string
  ): Promise<FirewallGroupResource[]> {
    const response = await this.get<ListFirewallGroupResourcesResponseDto>(
      `/api/v1/firewall/groups/${groupId}/resources`
    );
    return response.resources;
  }

  /**
   * Линкует ресурс (сервер) к группе правил firewall
   */
  async linkFirewallResource(
    groupId: string,
    resourceId: string,
    resourceType: FirewallResourceType = "server"
  ): Promise<FirewallGroupResource> {
    const response = await this.post<LinkFirewallResourceResponseDto>(
      `/api/v1/firewall/groups/${groupId}/resources/${resourceId}?resource_type=${encodeURIComponent(resourceType)}`
    );
    return response.resource;
  }

  /**
   * Отлинковывает ресурс от группы правил firewall
   */
  async unlinkFirewallResource(
    groupId: string,
    resourceId: string,
    resourceType: FirewallResourceType = "server"
  ): Promise<void> {
    await this.delete<void>(
      `/api/v1/firewall/groups/${groupId}/resources/${resourceId}?resource_type=${encodeURIComponent(resourceType)}`
    );
  }

  /**
   * Получает список правил в группе
   */
  async listFirewallRules(groupId: string): Promise<FirewallRule[]> {
    const response = await this.get<ListFirewallRulesResponseDto>(
      `/api/v1/firewall/groups/${groupId}/rules`
    );
    return response.rules;
  }

  /**
   * Создаёт новое правило в группе
   */
  async createFirewallRule(
    groupId: string,
    data: CreateFirewallRuleRequestDto
  ): Promise<FirewallRule> {
    const response = await this.post<GetFirewallRuleResponseDto>(
      `/api/v1/firewall/groups/${groupId}/rules`,
      data
    );
    return response.rule;
  }

  /**
   * Получает детальную информацию о правиле
   */
  async getFirewallRule(
    groupId: string,
    ruleId: string
  ): Promise<FirewallRule> {
    const response = await this.get<GetFirewallRuleResponseDto>(
      `/api/v1/firewall/groups/${groupId}/rules/${ruleId}`
    );
    return response.rule;
  }

  /**
   * Обновляет правило в группе
   */
  async updateFirewallRule(
    groupId: string,
    ruleId: string,
    data: UpdateFirewallRuleRequestDto
  ): Promise<FirewallRule> {
    const response = await this.patch<GetFirewallRuleResponseDto>(
      `/api/v1/firewall/groups/${groupId}/rules/${ruleId}`,
      data
    );
    return response.rule;
  }

  /**
   * Удаляет правило из группы
   */
  async deleteFirewallRule(groupId: string, ruleId: string): Promise<void> {
    await this.delete<void>(
      `/api/v1/firewall/groups/${groupId}/rules/${ruleId}`
    );
  }

  /**
   * Получает список групп правил, привязанных к конкретному ресурсу
   */
  async listFirewallGroupsByResource(
    resourceType: FirewallResourceType,
    resourceId: string
  ): Promise<FirewallGroup[]> {
    const response = await this.get<ListFirewallGroupsResponseDto>(
      `/api/v1/firewall/service/${encodeURIComponent(resourceType)}/${resourceId}`
    );
    return response.groups;
  }
}

export const firewallApiClient: FirewallApiClient = new FirewallApiClient();
