import { imagesApiClient } from "../api";
import { Image } from "../types/image.type";
import { UpdateImageRequestDto } from "../types/dto/update-image-request.dto";

export const updateImageAction = async (
  imageId: string,
  data: UpdateImageRequestDto
): Promise<Image> => {
  return await imagesApiClient.updateImage(imageId, data);
};
