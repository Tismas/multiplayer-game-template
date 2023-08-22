import type { ServerPlayerEventHandlers } from "./serverPlayerEventHandlers";
import type { ServerRoomEventHandlers } from "./serverRoomEventHandlers";

export type ServerEventHandlers = ServerPlayerEventHandlers &
  ServerRoomEventHandlers;
