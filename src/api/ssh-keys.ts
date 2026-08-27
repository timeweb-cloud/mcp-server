import { BaseApiClient } from "./client";
import { SshKey } from "../types/ssh-key.type";
import { ListSshKeysResponseDto } from "../types/dto/list-ssh-keys-response.dto";
import { CreateSshKeyRequestDto } from "../types/dto/create-ssh-key-request.dto";
import { CreateSshKeyResponseDto } from "../types/dto/create-ssh-key-response.dto";
import { GetSshKeyResponseDto } from "../types/dto/get-ssh-key-response.dto";
import { UpdateSshKeyRequestDto } from "../types/dto/update-ssh-key-request.dto";
import { UpdateSshKeyResponseDto } from "../types/dto/update-ssh-key-response.dto";
import { AddSshKeysToServerRequestDto } from "../types/dto/add-ssh-keys-to-server-request.dto";

export class SshKeysApiClient extends BaseApiClient {
  /**
   * Получает список всех SSH-ключей аккаунта
   */
  async listSshKeys(): Promise<SshKey[]> {
    const response = await this.get<ListSshKeysResponseDto>(
      "/api/v1/ssh-keys"
    );
    return response.ssh_keys;
  }

  /**
   * Создаёт новый SSH-ключ в аккаунте
   */
  async createSshKey(data: CreateSshKeyRequestDto): Promise<SshKey> {
    const response = await this.post<CreateSshKeyResponseDto>(
      "/api/v1/ssh-keys",
      data
    );
    return response.ssh_key;
  }

  /**
   * Получает SSH-ключ по ID
   */
  async getSshKey(sshKeyId: number): Promise<SshKey> {
    const response = await this.get<GetSshKeyResponseDto>(
      `/api/v1/ssh-keys/${sshKeyId}`
    );
    return response.ssh_key;
  }

  /**
   * Изменяет SSH-ключ по ID
   */
  async updateSshKey(
    sshKeyId: number,
    data: UpdateSshKeyRequestDto
  ): Promise<SshKey> {
    const response = await this.patch<UpdateSshKeyResponseDto>(
      `/api/v1/ssh-keys/${sshKeyId}`,
      data
    );
    return response.ssh_key;
  }

  /**
   * Удаляет SSH-ключ по ID
   */
  async deleteSshKey(sshKeyId: number): Promise<void> {
    await this.delete<void>(`/api/v1/ssh-keys/${sshKeyId}`);
  }

  /**
   * Добавляет SSH-ключи на сервер
   */
  async addSshKeysToServer(
    serverId: number,
    sshKeyIds: number[]
  ): Promise<void> {
    const data: AddSshKeysToServerRequestDto = { ssh_key_ids: sshKeyIds };
    await this.post<void>(`/api/v1/servers/${serverId}/ssh-keys`, data);
  }

  /**
   * Удаляет SSH-ключ с сервера
   */
  async removeSshKeyFromServer(
    serverId: number,
    sshKeyId: number
  ): Promise<void> {
    await this.delete<void>(
      `/api/v1/servers/${serverId}/ssh-keys/${sshKeyId}`
    );
  }
}

export const sshKeysApiClient: SshKeysApiClient = new SshKeysApiClient();
