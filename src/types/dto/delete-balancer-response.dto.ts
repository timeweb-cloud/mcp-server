import { DeleteBalancerResult } from "../balancer.type";

export type DeleteBalancerResponseDto = {
  balancer_delete: DeleteBalancerResult;
  response_id?: string;
};
