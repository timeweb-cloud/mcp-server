import { dbaasApiClient } from "../api";
import { GetDatabaseParametersResponseDto } from "../types/dto/get-database-parameters-response.dto";

export const getDatabaseParametersAction =
  async (): Promise<GetDatabaseParametersResponseDto> => {
    return await dbaasApiClient.getDatabaseParameters();
  };
