import { Socket } from "socket.io-client";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "server/types/TypedServerSocket";

export type TypedClientSocket = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;
