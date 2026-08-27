export type DeleteK8sClusterResponseDto = {
  cluster_delete: {
    hash?: string;
    is_moved_in_quarantine?: boolean;
  };
  response_id?: string;
};
