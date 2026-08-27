export enum ServerBackupStatus {
  PRECREATE = "precreate",
  DELETE = "delete",
  SHUTDOWN = "shutdown",
  RECOVER = "recover",
  CREATE = "create",
  FAIL = "fail",
  DONE = "done",
}

export type ServerBackup = {
  id: number;
  name: string;
  comment: string | null;
  created_at: string;
  status: ServerBackupStatus | string;
  size: number;
  type: "manual" | "auto";
  progress: number;
};
