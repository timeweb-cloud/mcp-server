export type IncreaseK8sNodesRequestDto = {
  count: number;
  labels?: Array<{ key: string; value: string }>;
};
