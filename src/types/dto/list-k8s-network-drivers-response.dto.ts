export type ListK8sNetworkDriversResponseDto = {
  meta: { total: number };
  network_drivers: string[];
  response_id?: string;
};
