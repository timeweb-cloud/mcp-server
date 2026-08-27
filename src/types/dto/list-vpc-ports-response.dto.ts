import { VpcPort } from "../vpc-port.type";

export interface ListVpcPortsResponseDto {
  meta: {
    total: number;
  };
  vpc_ports: VpcPort[];
}
