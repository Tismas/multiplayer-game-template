import { ClientPlayerEvents as ClientPlayerEventHandlers } from "./clientPlayerEventHandlers";
import { ClientRoomEvents as ClientRoomEventHandlers } from "./clientRoomEventHandlers";

export type ClientEventHandlers = ClientRoomEventHandlers &
  ClientPlayerEventHandlers;
