import { catalogsApiClient } from "../api";
import { Location } from "../types/location.type";

export const listLocationsAction = async (): Promise<Location[]> => {
  return await catalogsApiClient.listLocations();
};
