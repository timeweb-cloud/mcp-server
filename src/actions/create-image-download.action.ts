import { imagesApiClient } from "../api";
import { ImageDownload } from "../types/image-download.type";
import { CreateImageDownloadRequestDto } from "../types/dto/create-image-download-request.dto";

export const createImageDownloadAction = async (
  imageId: string,
  data: CreateImageDownloadRequestDto
): Promise<ImageDownload> => {
  return await imagesApiClient.createImageDownload(imageId, data);
};
