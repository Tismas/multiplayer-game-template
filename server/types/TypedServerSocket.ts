import type { Socket } from "socket.io";

import { ServerPlayer } from "server/entities/Player";

import type { ClientEventHandlers } from "client/eventHandlers/clientEvents";

import type { ServerEventHandlers } from "../eventHandlers/serverEventHandlers";

export type ClientToServerEvents = ServerEventHandlers;
export type InterServerEvents = Record<string, never>;
export type ServerToClientEvents = ClientEventHandlers;
export type SocketData = {
  player?: ServerPlayer;
};

export type TypedServerSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
