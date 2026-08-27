import { BaseApiClient } from "./client";
import { Bucket } from "../types/bucket.type";
import { BucketPreset } from "../types/bucket-preset.type";
import { BucketUser } from "../types/bucket-user.type";
import {
  BucketSubdomain,
  AddedBucketSubdomain,
} from "../types/bucket-subdomain.type";
import { BucketTransferStatus } from "../types/bucket-transfer-status.type";
import { BucketDeleteResponse } from "../types/bucket-delete-response.type";

import { ListBucketsResponseDto } from "../types/dto/list-buckets-response.dto";
import { CreateBucketRequestDto } from "../types/dto/create-bucket-request.dto";
import { CreateBucketResponseDto } from "../types/dto/create-bucket-response.dto";
import { GetBucketResponseDto } from "../types/dto/get-bucket-response.dto";
import { UpdateBucketRequestDto } from "../types/dto/update-bucket-request.dto";
import { UpdateBucketResponseDto } from "../types/dto/update-bucket-response.dto";
import { DeleteBucketResponseDto } from "../types/dto/delete-bucket-response.dto";
import { GetBucketPresetsResponseDto } from "../types/dto/get-bucket-presets-response.dto";
import { ListBucketUsersResponseDto } from "../types/dto/list-bucket-users-response.dto";
import { UpdateBucketUserRequestDto } from "../types/dto/update-bucket-user-request.dto";
import { UpdateBucketUserResponseDto } from "../types/dto/update-bucket-user-response.dto";
import { GetBucketTransferStatusResponseDto } from "../types/dto/get-bucket-transfer-status-response.dto";
import { TransferBucketRequestDto } from "../types/dto/transfer-bucket-request.dto";
import { ListBucketSubdomainsResponseDto } from "../types/dto/list-bucket-subdomains-response.dto";
import { AddBucketSubdomainsRequestDto } from "../types/dto/add-bucket-subdomains-request.dto";
import { AddBucketSubdomainsResponseDto } from "../types/dto/add-bucket-subdomains-response.dto";
import { DeleteBucketSubdomainsRequestDto } from "../types/dto/delete-bucket-subdomains-request.dto";
import { DeleteBucketSubdomainsResponseDto } from "../types/dto/delete-bucket-subdomains-response.dto";
import { AddBucketCertificateRequestDto } from "../types/dto/add-bucket-certificate-request.dto";

export class S3BucketsApiClient extends BaseApiClient {
  /**
   * Получает список всех S3-хранилищ аккаунта
   */
  async listBuckets(): Promise<Bucket[]> {
    const response = await this.get<ListBucketsResponseDto>(
      "/api/v1/storages/buckets"
    );
    return response.buckets;
  }

  /**
   * Создаёт новое S3-хранилище. Нужно передать либо preset_id, либо configurator.
   */
  async createBucket(data: CreateBucketRequestDto): Promise<Bucket> {
    const response = await this.post<CreateBucketResponseDto>(
      "/api/v1/storages/buckets",
      data
    );
    return response.bucket;
  }

  /**
   * Получает детальную информацию по одному S3-хранилищу
   */
  async getBucket(bucketId: number): Promise<Bucket> {
    const response = await this.get<GetBucketResponseDto>(
      `/api/v1/storages/buckets/${bucketId}`
    );
    return response.bucket;
  }

  /**
   * Изменяет параметры S3-хранилища (тариф, конфигуратор, тип, описание)
   */
  async updateBucket(
    bucketId: number,
    data: UpdateBucketRequestDto
  ): Promise<Bucket> {
    const response = await this.patch<UpdateBucketResponseDto>(
      `/api/v1/storages/buckets/${bucketId}`,
      data
    );
    return response.bucket;
  }

  /**
   * Удаляет S3-хранилище. Поддерживает 2FA через hash+code query params.
   */
  async deleteBucket(
    bucketId: number,
    hash?: string,
    code?: string
  ): Promise<BucketDeleteResponse> {
    const params = new URLSearchParams();
    if (hash) params.append("hash", hash);
    if (code) params.append("code", code);
    const qs = params.toString();
    const endpoint =
      qs.length > 0
        ? `/api/v1/storages/buckets/${bucketId}?${qs}`
        : `/api/v1/storages/buckets/${bucketId}`;

    const response = await this.delete<DeleteBucketResponseDto>(endpoint);
    return response?.bucket_delete ?? {};
  }

  /**
   * Получает список тарифов для S3-хранилищ
   */
  async getBucketPresets(): Promise<BucketPreset[]> {
    const response = await this.get<GetBucketPresetsResponseDto>(
      "/api/v1/presets/storages"
    );
    return response.storages_presets;
  }

  /**
   * Получает список пользователей S3-хранилищ аккаунта
   */
  async listBucketUsers(): Promise<BucketUser[]> {
    const response = await this.get<ListBucketUsersResponseDto>(
      "/api/v1/storages/users"
    );
    return response.users;
  }

  /**
   * Изменяет пароль пользователя-администратора S3-хранилища
   */
  async updateBucketUser(
    userId: number,
    secretKey: string
  ): Promise<BucketUser> {
    const data: UpdateBucketUserRequestDto = { secret_key: secretKey };
    const response = await this.patch<UpdateBucketUserResponseDto>(
      `/api/v1/storages/users/${userId}`,
      data
    );
    return response.user;
  }

  /**
   * Получает статус переноса хранилища от стороннего S3 в Timeweb Cloud
   */
  async getBucketTransferStatus(
    bucketId: number
  ): Promise<BucketTransferStatus> {
    const response = await this.get<GetBucketTransferStatusResponseDto>(
      `/api/v1/storages/buckets/${bucketId}/transfer-status`
    );
    return response.transfer_status;
  }

  /**
   * Запускает перенос хранилища от стороннего провайдера S3 в Timeweb Cloud
   */
  async transferBucket(data: TransferBucketRequestDto): Promise<void> {
    await this.post<void>("/api/v1/storages/transfer", data);
  }

  /**
   * Получает список поддоменов хранилища
   */
  async listBucketSubdomains(bucketId: number): Promise<BucketSubdomain[]> {
    const response = await this.get<ListBucketSubdomainsResponseDto>(
      `/api/v1/storages/buckets/${bucketId}/subdomains`
    );
    return response.subdomains;
  }

  /**
   * Добавляет поддомены для хранилища
   */
  async addBucketSubdomains(
    bucketId: number,
    subdomains: string[]
  ): Promise<AddedBucketSubdomain[]> {
    const data: AddBucketSubdomainsRequestDto = { subdomains };
    const response = await this.post<AddBucketSubdomainsResponseDto>(
      `/api/v1/storages/buckets/${bucketId}/subdomains`,
      data
    );
    return response.subdomains;
  }

  /**
   * Удаляет поддомены хранилища. Axios поддерживает body в DELETE запросах.
   */
  async deleteBucketSubdomains(
    bucketId: number,
    subdomains: string[]
  ): Promise<AddedBucketSubdomain[]> {
    const data: DeleteBucketSubdomainsRequestDto = { subdomains };
    const response = await this.makeRequest<DeleteBucketSubdomainsResponseDto>(
      "DELETE",
      `/api/v1/storages/buckets/${bucketId}/subdomains`,
      data
    );
    return response.subdomains;
  }

  /**
   * Добавляет SSL-сертификат для поддомена хранилища
   */
  async addBucketSubdomainCertificate(subdomain: string): Promise<void> {
    const data: AddBucketCertificateRequestDto = { subdomain };
    await this.post<void>("/api/v1/storages/certificates/generate", data);
  }
}

export const s3BucketsApiClient: S3BucketsApiClient = new S3BucketsApiClient();
