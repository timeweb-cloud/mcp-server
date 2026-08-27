export type ListK8sVersionsResponseDto = {
  meta: { total: number };
  k8s_versions: string[];
  response_id?: string;
};
