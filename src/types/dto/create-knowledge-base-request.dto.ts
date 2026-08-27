export type CreateKnowledgeBaseRequestDto = {
  name: string;
  description?: string;
  dbaas_preset_id: number;
  network_id: string;
  token_package_id: number;
  project_id?: number;
};
