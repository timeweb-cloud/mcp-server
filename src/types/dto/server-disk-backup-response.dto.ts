import { ServerBackup } from "../server-backup.type";

export type ServerDiskBackupResponseDto = {
  backup: ServerBackup;
  response_id?: string;
};
