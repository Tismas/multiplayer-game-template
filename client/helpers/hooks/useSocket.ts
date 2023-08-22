import { useState } from "react";
import { Socket, io } from "socket.io-client";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "server/types/TypedServerSocket";

import { handleClientPlayerEvents } from "client/eventHandlers/clientPlayerEventHandlers";

import { handleClientRoomEvents } from "../../eventHandlers/clientRoomEventHandlers";

const serverAddress = `${import.meta.env.VITE_HOST || "/"}:${
  import.meta.env.VITE_IO_PORT
}`;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(serverAddress);

handleClientRoomEvents(socket);
handleClientPlayerEvents(socket);

export const useSocket = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  socket.on("connect", () => {
    setError(null);
    setLoading(false);
  });

  socket.on("connect_error", (err) => {
    console.error(err.message);
    setError("Couldn't connect to the server :(");
    setLoading(false);
  });

  return { socket, error, loading };
};
