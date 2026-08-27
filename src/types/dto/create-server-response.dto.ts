import { Server } from "../server.type";

export type CreateServerResponseDto = {
  server: Server;
  response_id?: string;
};
