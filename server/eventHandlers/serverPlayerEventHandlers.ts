import { ServerPlayer } from "server/entities/Player";

import type { TypedServerSocket } from "../types/TypedServerSocket";

export interface ServerPlayerEventHandlers {
  "set-name": (name: string) => void;
}

export const handleServerPlayerEvents = (socket: TypedServerSocket) => {
  socket.on("set-name", (name) => {
    if (socket.data.player) {
      socket.data.player.name = name;
    } else {
      socket.data.player = new ServerPlayer(socket.id, name);
    }
  });
};
