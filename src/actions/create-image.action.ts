import { imagesApiClient } from "../api";
import { Image } from "../types/image.type";
import { CreateImageRequestDto } from "../types/dto/create-image-request.dto";

export const createImageAction = async (
  data: CreateImageRequestDto
): Promise<Image> => {
  return await imagesApiClient.createImage(data);
};
