import { BaseApiClient } from "./client";
import { Image } from "../types/image.type";
import { ImageDownload } from "../types/image-download.type";
import { ListImagesResponseDto } from "../types/dto/list-images-response.dto";
import { GetImageResponseDto } from "../types/dto/get-image-response.dto";
import { CreateImageRequestDto } from "../types/dto/create-image-request.dto";
import { UpdateImageRequestDto } from "../types/dto/update-image-request.dto";
import { ListImageDownloadsResponseDto } from "../types/dto/list-image-downloads-response.dto";
import { GetImageDownloadResponseDto } from "../types/dto/get-image-download-response.dto";
import { CreateImageDownloadRequestDto } from "../types/dto/create-image-download-request.dto";

export class ImagesApiClient extends BaseApiClient {
  /**
   * Получает список образов аккаунта
   */
  async listImages(limit?: number, offset?: number): Promise<Image[]> {
    const query: string[] = [];
    if (typeof limit === "number") query.push(`limit=${limit}`);
    if (typeof offset === "number") query.push(`offset=${offset}`);
    const qs = query.length > 0 ? `?${query.join("&")}` : "";
    const response = await this.get<ListImagesResponseDto>(
      `/api/v1/images${qs}`
    );
    return response.images;
  }

  /**
   * Создаёт образ (из диска либо пустой для последующей загрузки)
   */
  async createImage(data: CreateImageRequestDto): Promise<Image> {
    const response = await this.post<GetImageResponseDto>(
      "/api/v1/images",
      data
    );
    return response.image;
  }

  /**
   * Получает детальную информацию по образу
   */
  async getImage(imageId: string): Promise<Image> {
    const response = await this.get<GetImageResponseDto>(
      `/api/v1/images/${imageId}`
    );
    return response.image;
  }

  /**
   * Обновляет имя/описание образа
   */
  async updateImage(
    imageId: string,
    data: UpdateImageRequestDto
  ): Promise<Image> {
    const response = await this.patch<GetImageResponseDto>(
      `/api/v1/images/${imageId}`,
      data
    );
    return response.image;
  }

  /**
   * Удаляет образ
   */
  async deleteImage(imageId: string): Promise<void> {
    await this.delete<void>(`/api/v1/images/${imageId}`);
  }

  /**
   * Получает список ссылок на скачивание образа
   */
  async listImageDownloads(
    imageId: string,
    limit?: number,
    offset?: number
  ): Promise<ImageDownload[]> {
    const query: string[] = [];
    if (typeof limit === "number") query.push(`limit=${limit}`);
    if (typeof offset === "number") query.push(`offset=${offset}`);
    const qs = query.length > 0 ? `?${query.join("&")}` : "";
    const response = await this.get<ListImageDownloadsResponseDto>(
      `/api/v1/images/${imageId}/download-url${qs}`
    );
    return response.downloads;
  }

  /**
   * Создаёт ссылку на скачивание образа (в том числе в облачные хранилища)
   */
  async createImageDownload(
    imageId: string,
    data: CreateImageDownloadRequestDto
  ): Promise<ImageDownload> {
    const response = await this.post<GetImageDownloadResponseDto>(
      `/api/v1/images/${imageId}/download-url`,
      data
    );
    return response.download;
  }

  /**
   * Получает информацию о конкретной ссылке на скачивание
   */
  async getImageDownload(
    imageId: string,
    imageUrlId: string
  ): Promise<ImageDownload> {
    const response = await this.get<GetImageDownloadResponseDto>(
      `/api/v1/images/${imageId}/download-url/${imageUrlId}`
    );
    return response.download;
  }

  /**
   * Удаляет ссылку на скачивание образа
   */
  async deleteImageDownload(
    imageId: string,
    imageUrlId: string
  ): Promise<void> {
    await this.delete<void>(
      `/api/v1/images/${imageId}/download-url/${imageUrlId}`
    );
  }
}

export const imagesApiClient: ImagesApiClient = new ImagesApiClient();
