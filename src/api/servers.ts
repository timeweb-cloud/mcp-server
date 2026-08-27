import { BaseApiClient } from "./client";
import { Server } from "../types/server.type";
import { ServerLog } from "../types/server-log.type";
import { ServerBackup } from "../types/server-backup.type";
import { ServerDisk } from "../types/server-disk.type";
import { ServerIp } from "../types/server-ip.type";
import { AutoBackupSettings } from "../types/auto-backup.type";
import { ListServersResponseDto } from "../types/dto/list-servers-response.dto";
import { GetServerResponseDto } from "../types/dto/get-server-response.dto";
import { GetServerLogsResponseDto } from "../types/dto/get-server-logs-response.dto";
import { ListServerDiskBackupsResponseDto } from "../types/dto/list-server-disk-backups-response.dto";
import { CreateServerDiskBackupResponseDto } from "../types/dto/create-server-disk-backup-response.dto";
import { ListServerDisksResponseDto } from "../types/dto/list-server-disks-response.dto";
import { CreateServerRequestDto } from "../types/dto/create-server-request.dto";
import { CreateServerResponseDto } from "../types/dto/create-server-response.dto";
import { DeleteServerResponseDto } from "../types/dto/delete-server-response.dto";
import { UpdateServerRequestDto } from "../types/dto/update-server-request.dto";
import { ListServerIpsResponseDto } from "../types/dto/list-server-ips-response.dto";
import { ServerIpResponseDto } from "../types/dto/server-ip-response.dto";
import { ServerDiskResponseDto } from "../types/dto/server-disk-response.dto";
import { AutoBackupResponseDto } from "../types/dto/auto-backup-response.dto";
import { ServerDiskBackupResponseDto } from "../types/dto/server-disk-backup-response.dto";

export type ServerLogsOrder = "asc" | "desc";

export type ResizeServerParams =
  | { preset_id: number }
  | {
      configurator: {
        configurator_id: number;
        cpu?: number;
        ram?: number;
        disk?: number;
        gpu?: number;
      };
    };

export type DeleteServerParams = {
  hash?: string;
  code?: string;
};

export type AddServerIpParams = {
  type: "ipv4" | "ipv6";
  ptr?: string;
};

export type UpdateServerIpParams = {
  ip: string;
  ptr: string;
};

export type DeleteServerIpParams = {
  ip: string;
};

export type ServerBootMode = "default" | "single" | "recovery_disk";
export type ServerNatMode = "dnat_and_snat" | "snat" | "no_nat";
export type ServerDiskBackupAction = "restore" | "mount" | "unmount";

export class ServersApiClient extends BaseApiClient {
  /**
   * Получает список всех серверов аккаунта
   */
  async listServers(): Promise<Server[]> {
    const response = await this.get<ListServersResponseDto>("/api/v1/servers");
    return response.servers;
  }

  /**
   * Получает детальную информацию по одному серверу
   */
  async getServer(serverId: number): Promise<Server> {
    const response = await this.get<GetServerResponseDto>(
      `/api/v1/servers/${serverId}`
    );
    return response.server;
  }

  /**
   * Запускает выключенный сервер
   */
  async startServer(serverId: number): Promise<void> {
    await this.post<void>(`/api/v1/servers/${serverId}/start`);
  }

  /**
   * Выполняет мягкое выключение сервера через ACPI shutdown
   */
  async shutdownServer(serverId: number): Promise<void> {
    await this.post<void>(`/api/v1/servers/${serverId}/shutdown`);
  }

  /**
   * Принудительно выключает сервер (аналог выдергивания кабеля)
   */
  async hardShutdownServer(serverId: number): Promise<void> {
    await this.post<void>(`/api/v1/servers/${serverId}/hard-shutdown`);
  }

  /**
   * Перезагружает сервер через ACPI (мягкая перезагрузка)
   */
  async rebootServer(serverId: number): Promise<void> {
    await this.post<void>(`/api/v1/servers/${serverId}/reboot`);
  }

  /**
   * Принудительная перезагрузка (reset power)
   */
  async hardRebootServer(serverId: number): Promise<void> {
    await this.post<void>(`/api/v1/servers/${serverId}/hard-reboot`);
  }

  /**
   * Клонирует сервер в отдельный VPS
   */
  async cloneServer(serverId: number): Promise<Server> {
    const response = await this.post<GetServerResponseDto>(
      `/api/v1/servers/${serverId}/clone`
    );
    return response.server;
  }

  /**
   * Изменяет тариф или конфигурацию сервера
   */
  async resizeServer(
    serverId: number,
    params: ResizeServerParams
  ): Promise<Server> {
    const response = await this.patch<GetServerResponseDto>(
      `/api/v1/servers/${serverId}`,
      params
    );
    return response.server;
  }

  /**
   * Получает список событий жизненного цикла сервера
   */
  async getServerLogs(
    serverId: number,
    order: ServerLogsOrder = "desc"
  ): Promise<ServerLog[]> {
    const response = await this.get<GetServerLogsResponseDto>(
      `/api/v1/servers/${serverId}/logs?order=${order}`
    );
    return response.server_logs;
  }

  /**
   * Получает список дисков сервера
   */
  async listServerDisks(serverId: number): Promise<ServerDisk[]> {
    const response = await this.get<ListServerDisksResponseDto>(
      `/api/v1/servers/${serverId}/disks`
    );
    return response.server_disks;
  }

  /**
   * Получает список бэкапов диска сервера
   */
  async listServerDiskBackups(
    serverId: number,
    diskId: number
  ): Promise<ServerBackup[]> {
    const response = await this.get<ListServerDiskBackupsResponseDto>(
      `/api/v1/servers/${serverId}/disks/${diskId}/backups`
    );
    return response.backups;
  }

  /**
   * Создаёт ручной бэкап диска сервера
   */
  async createServerDiskBackup(
    serverId: number,
    diskId: number,
    comment?: string
  ): Promise<ServerBackup> {
    const response = await this.post<CreateServerDiskBackupResponseDto>(
      `/api/v1/servers/${serverId}/disks/${diskId}/backups`,
      comment ? { comment } : {}
    );
    return response.backup;
  }

  /**
   * Удаляет бэкап диска сервера
   */
  async deleteServerDiskBackup(
    serverId: number,
    diskId: number,
    backupId: number
  ): Promise<void> {
    await this.delete<void>(
      `/api/v1/servers/${serverId}/disks/${diskId}/backups/${backupId}`
    );
  }

  /**
   * Создаёт новый облачный сервер
   */
  async createServer(data: CreateServerRequestDto): Promise<Server> {
    const response = await this.post<CreateServerResponseDto>(
      "/api/v1/servers",
      data
    );
    return response.server;
  }

  /**
   * Удаляет сервер (для аккаунтов с 2FA — поддерживает hash и code как query-параметры)
   */
  async deleteServer(
    serverId: number,
    params: DeleteServerParams = {}
  ): Promise<DeleteServerResponseDto["server_delete"]> {
    const query: string[] = [];
    if (params.hash) query.push(`hash=${encodeURIComponent(params.hash)}`);
    if (params.code) query.push(`code=${encodeURIComponent(params.code)}`);
    const qs = query.length > 0 ? `?${query.join("&")}` : "";
    const response = await this.delete<DeleteServerResponseDto>(
      `/api/v1/servers/${serverId}${qs}`
    );
    return response?.server_delete ?? { is_moved_in_quarantine: true };
  }

  /**
   * Обновляет метаданные сервера (имя, комментарий, avatar_id, cloud_init)
   */
  async updateServer(
    serverId: number,
    data: UpdateServerRequestDto
  ): Promise<Server> {
    const response = await this.patch<GetServerResponseDto>(
      `/api/v1/servers/${serverId}`,
      data
    );
    return response.server;
  }

  /**
   * Сбрасывает пароль root сервера. Новый пароль будет отправлен на email.
   */
  async resetServerPassword(serverId: number): Promise<void> {
    await this.post<void>(`/api/v1/servers/${serverId}/reset-password`);
  }

  /**
   * Устанавливает тип загрузки ОС сервера
   */
  async setServerBootMode(
    serverId: number,
    bootMode: ServerBootMode
  ): Promise<void> {
    await this.post<void>(`/api/v1/servers/${serverId}/boot-mode`, {
      boot_mode: bootMode,
    });
  }

  /**
   * Отмонтирует ISO-образ и перезагружает сервер
   */
  async unmountServerImage(serverId: number): Promise<void> {
    await this.post<void>(`/api/v1/servers/${serverId}/image-unmount`);
  }

  /**
   * Изменяет правила маршрутизации (NAT) для сервера в локальной сети
   */
  async setServerNatMode(
    serverId: number,
    natMode: ServerNatMode
  ): Promise<void> {
    await this.patch<void>(
      `/api/v1/servers/${serverId}/local-networks/nat-mode`,
      { nat_mode: natMode }
    );
  }

  /**
   * Получает список IP-адресов сервера
   */
  async listServerIps(serverId: number): Promise<ServerIp[]> {
    const response = await this.get<ListServerIpsResponseDto>(
      `/api/v1/servers/${serverId}/ips`
    );
    return response.server_ips;
  }

  /**
   * Добавляет IP-адрес сервера
   */
  async addServerIp(
    serverId: number,
    params: AddServerIpParams
  ): Promise<ServerIp> {
    const response = await this.post<ServerIpResponseDto>(
      `/api/v1/servers/${serverId}/ips`,
      params
    );
    return response.server_ip;
  }

  /**
   * Удаляет IP-адрес сервера. API принимает тело запроса с полем `ip`.
   */
  async deleteServerIp(
    serverId: number,
    params: DeleteServerIpParams
  ): Promise<void> {
    await this.makeRequest<void>(
      "DELETE",
      `/api/v1/servers/${serverId}/ips`,
      params
    );
  }

  /**
   * Изменяет PTR-запись для IP-адреса сервера
   */
  async updateServerIp(
    serverId: number,
    params: UpdateServerIpParams
  ): Promise<ServerIp> {
    const response = await this.patch<ServerIpResponseDto>(
      `/api/v1/servers/${serverId}/ips`,
      params
    );
    return response.server_ip;
  }

  /**
   * Создаёт дополнительный диск для сервера
   */
  async createServerDisk(
    serverId: number,
    size: number
  ): Promise<ServerDisk> {
    const response = await this.post<ServerDiskResponseDto>(
      `/api/v1/servers/${serverId}/disks`,
      { size }
    );
    return response.server_disk;
  }

  /**
   * Получает информацию по конкретному диску сервера
   */
  async getServerDisk(
    serverId: number,
    diskId: number
  ): Promise<ServerDisk> {
    const response = await this.get<ServerDiskResponseDto>(
      `/api/v1/servers/${serverId}/disks/${diskId}`
    );
    return response.server_disk;
  }

  /**
   * Изменяет размер диска сервера
   */
  async updateServerDisk(
    serverId: number,
    diskId: number,
    size: number
  ): Promise<ServerDisk> {
    const response = await this.patch<ServerDiskResponseDto>(
      `/api/v1/servers/${serverId}/disks/${diskId}`,
      { size }
    );
    return response.server_disk;
  }

  /**
   * Удаляет диск сервера
   */
  async deleteServerDisk(
    serverId: number,
    diskId: number
  ): Promise<void> {
    await this.delete<void>(
      `/api/v1/servers/${serverId}/disks/${diskId}`
    );
  }

  /**
   * Получает настройки автобэкапов диска
   */
  async getServerDiskAutoBackups(
    serverId: number,
    diskId: number
  ): Promise<AutoBackupSettings> {
    const response = await this.get<AutoBackupResponseDto>(
      `/api/v1/servers/${serverId}/disks/${diskId}/auto-backups`
    );
    return response.auto_backups_settings;
  }

  /**
   * Изменяет настройки автобэкапов диска
   */
  async updateServerDiskAutoBackups(
    serverId: number,
    diskId: number,
    settings: AutoBackupSettings
  ): Promise<AutoBackupSettings> {
    const response = await this.patch<AutoBackupResponseDto>(
      `/api/v1/servers/${serverId}/disks/${diskId}/auto-backups`,
      settings
    );
    return response.auto_backups_settings;
  }

  /**
   * Получает информацию по конкретному бэкапу диска
   */
  async getServerDiskBackup(
    serverId: number,
    diskId: number,
    backupId: number
  ): Promise<ServerBackup> {
    const response = await this.get<ServerDiskBackupResponseDto>(
      `/api/v1/servers/${serverId}/disks/${diskId}/backups/${backupId}`
    );
    return response.backup;
  }

  /**
   * Изменяет комментарий к бэкапу диска
   */
  async updateServerDiskBackup(
    serverId: number,
    diskId: number,
    backupId: number,
    comment: string
  ): Promise<ServerBackup> {
    const response = await this.patch<ServerDiskBackupResponseDto>(
      `/api/v1/servers/${serverId}/disks/${diskId}/backups/${backupId}`,
      { comment }
    );
    return response.backup;
  }

  /**
   * Выполняет действие над бэкапом: restore / mount / unmount
   */
  async serverDiskBackupAction(
    serverId: number,
    diskId: number,
    backupId: number,
    action: ServerDiskBackupAction
  ): Promise<void> {
    await this.post<void>(
      `/api/v1/servers/${serverId}/disks/${diskId}/backups/${backupId}/action`,
      { action }
    );
  }

}

export const serversApiClient: ServersApiClient = new ServersApiClient();
