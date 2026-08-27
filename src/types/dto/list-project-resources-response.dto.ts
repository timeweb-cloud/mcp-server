// GET /api/v1/projects/{project_id}/resources — все ресурсы проекта.
// Схема Timeweb permissive: сервер/БД/хранилище/кластер/балансировщик/выделенный сервер.
export type ListProjectResourcesResponseDto = {
  servers?: any[];
  balancers?: any[];
  buckets?: any[];
  clusters?: any[];
  databases?: any[];
  dedicated_servers?: any[];
  meta?: { total?: number };
};
