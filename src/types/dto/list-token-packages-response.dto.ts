import { TokenPackage } from "../token-package.type";

export type ListTokenPackagesResponseDto = {
  token_packages: TokenPackage[];
  meta: { total: number };
  response_id?: string;
};
