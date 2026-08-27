import { VpcService } from "../vpc-service.type";

export interface ListVpcServicesResponseDto {
  meta: {
    total: number;
  };
  services: VpcService[];
}
