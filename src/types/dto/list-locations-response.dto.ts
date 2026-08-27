import { Location } from "../location.type";

export type ListLocationsResponseDto = {
  locations: Location[];
  meta: { total: number };
};
