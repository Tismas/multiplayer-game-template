import { TypedClientSocket } from "client/types/TypedClientSocket";

export interface ClientPlayerEvents {
  unauthorized: () => void;
}

export const handleClientPlayerEvents = (socket: TypedClientSocket) => {
  socket.on("unauthorized", () => {
    window.location.reload();
  });
};
