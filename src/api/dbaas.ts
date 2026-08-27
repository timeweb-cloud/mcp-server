import { BaseApiClient } from "./client";
import { CreateFloatingIpRequestDto } from "../types/dto/create-floating-ip-request.dto";
import { CreateFloatingIpResponseDto } from "../types/dto/create-floating-ip-response.dto";
import { CreateVpcRequestDto } from "../types/dto/create-vpc-request.dto";
import { CreateVpcResponseDto } from "../types/dto/create-vpc-response.dto";
import { CreateDatabaseRequestDto } from "../types/dto/create-database-request.dto";
import { CreateDatabaseResponseDto } from "../types/dto/create-database-response.dto";
import { Database } from "../types/database.type";
import {
  DatabasePreset,
  DatabasePresetsResponse,
} from "../types/database-preset.type";
import { AvailabilityZones } from "../types/availability-zones.enum";
import { CreateDbParams } from "../types/create-db-params.type";
import { Vpc } from "../types/vpc.type";
import { FloatingIp } from "../types/floating-ip.type";
import { GetVpcsResponseDto } from "../types/dto/get-vpcs-response.dto";
import {
  DatabaseCluster,
  DatabaseAdminEntity,
  DatabaseInstanceEntity,
  DatabaseType,
  DatabaseBackup,
  DatabaseAutoBackupSettings,
} from "../types/database-cluster.type";
import { ListDatabaseClustersResponseDto } from "../types/dto/list-database-clusters-response.dto";
import { GetDatabaseClusterResponseDto } from "../types/dto/get-database-cluster-response.dto";
import { UpdateDatabaseClusterRequestDto } from "../types/dto/update-database-cluster-request.dto";
import {
  DeleteDatabaseClusterResponseDto,
  DeleteDatabaseResponseDto,
} from "../types/dto/delete-database-response.dto";
import { ListDatabaseAdminsResponseDto } from "../types/dto/list-database-admins-response.dto";
import { DatabaseAdminResponseDto } from "../types/dto/database-admin-response.dto";
import { CreateDatabaseAdminRequestDto } from "../types/dto/create-database-admin-request.dto";
import { UpdateDatabaseAdminRequestDto } from "../types/dto/update-database-admin-request.dto";
import { ListDatabaseInstancesResponseDto } from "../types/dto/list-database-instances-response.dto";
import { DatabaseInstanceResponseDto } from "../types/dto/database-instance-response.dto";
import { CreateDatabaseInstanceRequestDto } from "../types/dto/create-database-instance-request.dto";
import { UpdateDatabaseInstanceRequestDto } from "../types/dto/update-database-instance-request.dto";
import { ListDatabaseTypesResponseDto } from "../types/dto/list-database-types-response.dto";
import { GetDatabaseParametersResponseDto } from "../types/dto/get-database-parameters-response.dto";
import { ListDatabasesResponseDto } from "../types/dto/list-databases-response.dto";
import { GetDatabaseResponseDto } from "../types/dto/get-database-response.dto";
import { UpdateDatabaseRequestDto } from "../types/dto/update-database-request.dto";
import { DatabaseAutoBackupsResponseDto } from "../types/dto/database-auto-backups-response.dto";
import { UpdateDatabaseAutoBackupsRequestDto } from "../types/dto/update-database-auto-backups-request.dto";
import { ListDatabaseBackupsResponseDto } from "../types/dto/list-database-backups-response.dto";
import { DatabaseBackupResponseDto } from "../types/dto/database-backup-response.dto";
import { ListFloatingIpsResponseDto } from "../types/dto/list-floating-ips-response.dto";
import { GetFloatingIpResponseDto } from "../types/dto/get-floating-ip-response.dto";
import { UpdateFloatingIpRequestDto } from "../types/dto/update-floating-ip-request.dto";
import { UpdateFloatingIpResponseDto } from "../types/dto/update-floating-ip-response.dto";
import { BindFloatingIpRequestDto } from "../types/dto/bind-floating-ip-request.dto";
import { GetVpcResponseDto } from "../types/dto/get-vpc-response.dto";
import { UpdateVpcRequestDto } from "../types/dto/update-vpc-request.dto";
import { UpdateVpcResponseDto } from "../types/dto/update-vpc-response.dto";
import { ListVpcServicesResponseDto } from "../types/dto/list-vpc-services-response.dto";
import { ListVpcPortsResponseDto } from "../types/dto/list-vpc-ports-response.dto";
import { VpcService } from "../types/vpc-service.type";
import { VpcPort } from "../types/vpc-port.type";

export class DbaasApiClient extends BaseApiClient {
  /**
   * Создает новый floating IP адрес
   */
  async createFloatingIp(
    availabilityZone: AvailabilityZones,
    isDdosGuard: boolean = false
  ): Promise<FloatingIp> {
    const requestData: CreateFloatingIpRequestDto = {
      availability_zone: availabilityZone,
      is_ddos_guard: isDdosGuard,
    };

    const response = await this.post<CreateFloatingIpResponseDto>(
      "/api/v1/floating-ips",
      requestData
    );
    return response.ip;
  }

  /**
   * Получает список всех плавающих IP пользователя
   */
  async listFloatingIps(): Promise<ListFloatingIpsResponseDto> {
    return this.get<ListFloatingIpsResponseDto>("/api/v1/floating-ips");
  }

  /**
   * Получает информацию о плавающем IP по ID
   */
  async getFloatingIp(floatingIpId: string): Promise<FloatingIp> {
    const response = await this.get<GetFloatingIpResponseDto>(
      `/api/v1/floating-ips/${floatingIpId}`
    );
    return response.ip;
  }

  /**
   * Изменяет плавающий IP по ID (комментарий и/или PTR-запись)
   */
  async updateFloatingIp(
    floatingIpId: string,
    data: UpdateFloatingIpRequestDto
  ): Promise<FloatingIp> {
    const response = await this.patch<UpdateFloatingIpResponseDto>(
      `/api/v1/floating-ips/${floatingIpId}`,
      data
    );
    return response.ip;
  }

  /**
   * Удаляет плавающий IP по ID
   */
  async deleteFloatingIp(floatingIpId: string): Promise<void> {
    await this.delete<void>(`/api/v1/floating-ips/${floatingIpId}`);
  }

  /**
   * Привязывает плавающий IP к сервису (server/balancer/database/network)
   */
  async bindFloatingIp(
    floatingIpId: string,
    data: BindFloatingIpRequestDto
  ): Promise<void> {
    await this.post<void>(`/api/v1/floating-ips/${floatingIpId}/bind`, data);
  }

  /**
   * Отвязывает плавающий IP от сервиса
   */
  async unbindFloatingIp(floatingIpId: string): Promise<void> {
    await this.post<void>(`/api/v1/floating-ips/${floatingIpId}/unbind`);
  }

  /**
   * Получить список VPC пользователя
   */
  async getVpcs(): Promise<GetVpcsResponseDto> {
    return this.get<GetVpcsResponseDto>("/api/v2/vpcs");
  }

  /**
   * Создает новую виртуальную приватную сеть (VPC)
   */
  async createVpc(
    availabilityZone: AvailabilityZones,
    name: string,
    subnetV4: string
  ): Promise<Vpc> {
    const requestData: CreateVpcRequestDto = {
      availability_zone: availabilityZone,
      name: name,
      subnet_v4: subnetV4,
    };

    const response = await this.post<CreateVpcResponseDto>(
      "/api/v2/vpcs",
      requestData
    );
    return response.vpc;
  }

  /**
   * Получает VPC по ID
   */
  async getVpc(vpcId: string): Promise<Vpc> {
    const response = await this.get<GetVpcResponseDto>(`/api/v2/vpcs/${vpcId}`);
    return response.vpc;
  }

  /**
   * Изменяет VPC по ID (имя и/или описание)
   */
  async updateVpc(vpcId: string, data: UpdateVpcRequestDto): Promise<Vpc> {
    const response = await this.patch<UpdateVpcResponseDto>(
      `/api/v2/vpcs/${vpcId}`,
      data
    );
    return response.vpc;
  }

  /**
   * Удаляет VPC по ID
   */
  async deleteVpc(vpcId: string): Promise<void> {
    await this.delete<void>(`/api/v1/vpcs/${vpcId}`);
  }

  /**
   * Получает список сервисов в VPC
   */
  async listVpcServices(vpcId: string): Promise<VpcService[]> {
    const response = await this.get<ListVpcServicesResponseDto>(
      `/api/v2/vpcs/${vpcId}/services`
    );
    return response.services;
  }

  /**
   * Получает список портов VPC
   */
  async listVpcPorts(vpcId: string): Promise<VpcPort[]> {
    const response = await this.get<ListVpcPortsResponseDto>(
      `/api/v1/vpcs/${vpcId}/ports`
    );
    return response.vpc_ports;
  }

  /**
   * Создает новую базу данных
   */
  async createDatabase({
    name,
    type,
    presetId,
    availabilityZone,
    adminPassword,
    floatingIp,
    vpcId,
    hashType,
  }: CreateDbParams): Promise<Database> {
    const requestData: CreateDatabaseRequestDto = {
      admin: {
        password: adminPassword,
        for_all: false,
      },
      name: name,
      type: type,
      preset_id: presetId,
      availability_zone: availabilityZone,
      hash_type: hashType,
      auto_backups: {
        copy_count: 1,
        creation_start_at: new Date().toISOString(),
        interval: "day",
        day_of_week: 5,
      },
      network: {
        floating_ip: floatingIp,
        id: vpcId,
      },
    };

    const response = await this.post<CreateDatabaseResponseDto>(
      "/api/v1/databases",
      requestData
    );
    return response.db;
  }

  /**
   * Получает список пресетов баз данных
   */
  async getDatabasePresets(): Promise<DatabasePreset[]> {
    const response = await this.get<DatabasePresetsResponse>(
      "/api/v2/presets/dbs"
    );
    return response.databases_presets;
  }

  // ==========================================================================
  // Кластеры баз данных (/api/v1/databases)
  // ==========================================================================

  /**
   * Получает список кластеров баз данных
   */
  async listDatabaseClusters(
    limit?: number,
    offset?: number
  ): Promise<DatabaseCluster[]> {
    const qs = this.buildQuery({ limit, offset });
    const response = await this.get<ListDatabaseClustersResponseDto>(
      `/api/v1/databases${qs}`
    );
    return response.dbs;
  }

  /**
   * Получает информацию о кластере баз данных
   */
  async getDatabaseCluster(clusterId: number): Promise<DatabaseCluster> {
    const response = await this.get<GetDatabaseClusterResponseDto>(
      `/api/v1/databases/${clusterId}`
    );
    return response.db;
  }

  /**
   * Обновляет кластер баз данных
   */
  async updateDatabaseCluster(
    clusterId: number,
    data: UpdateDatabaseClusterRequestDto
  ): Promise<DatabaseCluster> {
    const response = await this.patch<GetDatabaseClusterResponseDto>(
      `/api/v1/databases/${clusterId}`,
      data
    );
    return response.db;
  }

  /**
   * Удаляет кластер баз данных (поддерживает 2FA через hash+code)
   */
  async deleteDatabaseCluster(
    clusterId: number,
    hash?: string,
    code?: string
  ): Promise<DeleteDatabaseClusterResponseDto> {
    const qs = this.buildQuery({ hash, code });
    return await this.delete<DeleteDatabaseClusterResponseDto>(
      `/api/v1/databases/${clusterId}${qs}`
    );
  }

  // ==========================================================================
  // Пользователи кластера (/admins)
  // ==========================================================================

  async listDatabaseAdmins(clusterId: number): Promise<DatabaseAdminEntity[]> {
    const response = await this.get<ListDatabaseAdminsResponseDto>(
      `/api/v1/databases/${clusterId}/admins`
    );
    return response.admins;
  }

  async getDatabaseAdmin(
    clusterId: number,
    adminId: number
  ): Promise<DatabaseAdminEntity> {
    const response = await this.get<DatabaseAdminResponseDto>(
      `/api/v1/databases/${clusterId}/admins/${adminId}`
    );
    return response.admin;
  }

  async createDatabaseAdmin(
    clusterId: number,
    data: CreateDatabaseAdminRequestDto
  ): Promise<DatabaseAdminEntity | null> {
    const response = await this.post<DatabaseAdminResponseDto>(
      `/api/v1/databases/${clusterId}/admins`,
      data
    );
    return response?.admin ?? null;
  }

  async updateDatabaseAdmin(
    clusterId: number,
    adminId: number,
    data: UpdateDatabaseAdminRequestDto
  ): Promise<DatabaseAdminEntity> {
    const response = await this.patch<DatabaseAdminResponseDto>(
      `/api/v1/databases/${clusterId}/admins/${adminId}`,
      data
    );
    return response.admin;
  }

  async deleteDatabaseAdmin(clusterId: number, adminId: number): Promise<void> {
    await this.delete<void>(
      `/api/v1/databases/${clusterId}/admins/${adminId}`
    );
  }

  // ==========================================================================
  // Инстансы кластера (/instances)
  // ==========================================================================

  async listDatabaseInstances(
    clusterId: number
  ): Promise<DatabaseInstanceEntity[]> {
    const response = await this.get<ListDatabaseInstancesResponseDto>(
      `/api/v1/databases/${clusterId}/instances`
    );
    return response.instances;
  }

  async getDatabaseInstance(
    clusterId: number,
    instanceId: number
  ): Promise<DatabaseInstanceEntity> {
    const response = await this.get<DatabaseInstanceResponseDto>(
      `/api/v1/databases/${clusterId}/instances/${instanceId}`
    );
    return response.instance;
  }

  async createDatabaseInstance(
    clusterId: number,
    data: CreateDatabaseInstanceRequestDto
  ): Promise<DatabaseInstanceEntity | null> {
    const response = await this.post<DatabaseInstanceResponseDto>(
      `/api/v1/databases/${clusterId}/instances`,
      data
    );
    return response?.instance ?? null;
  }

  async updateDatabaseInstance(
    clusterId: number,
    instanceId: number,
    data: UpdateDatabaseInstanceRequestDto
  ): Promise<DatabaseInstanceEntity> {
    const response = await this.patch<DatabaseInstanceResponseDto>(
      `/api/v1/databases/${clusterId}/instances/${instanceId}`,
      data
    );
    return response.instance;
  }

  async deleteDatabaseInstance(
    clusterId: number,
    instanceId: number
  ): Promise<void> {
    await this.delete<void>(
      `/api/v1/databases/${clusterId}/instances/${instanceId}`
    );
  }

  // ==========================================================================
  // Типы и параметры
  // ==========================================================================

  async listDatabaseTypes(): Promise<DatabaseType[]> {
    const response = await this.get<ListDatabaseTypesResponseDto>(
      "/api/v1/database-types"
    );
    return response.types;
  }

  async getDatabaseParameters(): Promise<GetDatabaseParametersResponseDto> {
    return await this.get<GetDatabaseParametersResponseDto>(
      "/api/v1/dbs/parameters"
    );
  }

  // ==========================================================================
  // Базы данных (/api/v1/dbs) — legacy API
  // ==========================================================================

  async listDatabases(limit?: number, offset?: number): Promise<Database[]> {
    const qs = this.buildQuery({ limit, offset });
    const response = await this.get<ListDatabasesResponseDto>(
      `/api/v1/dbs${qs}`
    );
    return response.dbs;
  }

  async getDatabase(dbId: number): Promise<Database> {
    const response = await this.get<GetDatabaseResponseDto>(
      `/api/v1/dbs/${dbId}`
    );
    return response.db;
  }

  async updateDatabase(
    dbId: number,
    data: UpdateDatabaseRequestDto
  ): Promise<Database> {
    const response = await this.patch<GetDatabaseResponseDto>(
      `/api/v1/dbs/${dbId}`,
      data
    );
    return response.db;
  }

  async deleteDatabase(
    dbId: number,
    hash?: string,
    code?: string
  ): Promise<DeleteDatabaseResponseDto> {
    const qs = this.buildQuery({ hash, code });
    return await this.delete<DeleteDatabaseResponseDto>(
      `/api/v1/dbs/${dbId}${qs}`
    );
  }

  // ==========================================================================
  // Автобэкапы (/auto-backups)
  // ==========================================================================

  async getDatabaseAutoBackups(
    dbId: number
  ): Promise<DatabaseAutoBackupSettings[]> {
    const response = await this.get<DatabaseAutoBackupsResponseDto>(
      `/api/v1/dbs/${dbId}/auto-backups`
    );
    return response.auto_backups_settings;
  }

  async updateDatabaseAutoBackups(
    dbId: number,
    data: UpdateDatabaseAutoBackupsRequestDto
  ): Promise<DatabaseAutoBackupSettings[]> {
    const response = await this.patch<DatabaseAutoBackupsResponseDto>(
      `/api/v1/dbs/${dbId}/auto-backups`,
      data
    );
    return response.auto_backups_settings;
  }

  // ==========================================================================
  // Бэкапы (/backups)
  // ==========================================================================

  async listDatabaseBackups(
    dbId: number,
    limit?: number,
    offset?: number
  ): Promise<DatabaseBackup[]> {
    const qs = this.buildQuery({ limit, offset });
    const response = await this.get<ListDatabaseBackupsResponseDto>(
      `/api/v1/dbs/${dbId}/backups${qs}`
    );
    return response.backups;
  }

  async createDatabaseBackup(
    dbId: number,
    comment?: string
  ): Promise<DatabaseBackup | null> {
    const qs = this.buildQuery({ comment });
    const response = await this.post<DatabaseBackupResponseDto>(
      `/api/v1/dbs/${dbId}/backups${qs}`
    );
    return response?.backup ?? null;
  }

  async getDatabaseBackup(
    dbId: number,
    backupId: number
  ): Promise<DatabaseBackup> {
    const response = await this.get<DatabaseBackupResponseDto>(
      `/api/v1/dbs/${dbId}/backups/${backupId}`
    );
    return response.backup;
  }

  async deleteDatabaseBackup(dbId: number, backupId: number): Promise<void> {
    await this.delete<void>(`/api/v1/dbs/${dbId}/backups/${backupId}`);
  }

  async restoreDatabaseBackup(dbId: number, backupId: number): Promise<void> {
    await this.put<void>(`/api/v1/dbs/${dbId}/backups/${backupId}`);
  }

  // ==========================================================================
  // Helpers
  // ==========================================================================

  private buildQuery(params: Record<string, any>): string {
    const entries = Object.entries(params).filter(
      ([, v]) => v !== undefined && v !== null && v !== ""
    );
    if (entries.length === 0) return "";
    const qs = entries
      .map(
        ([k, v]) =>
          `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
      )
      .join("&");
    return `?${qs}`;
  }
}

export const dbaasApiClient: DbaasApiClient = new DbaasApiClient();
