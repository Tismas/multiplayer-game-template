import { RoomStore } from "./stores/RoomStore";

class RootStore {
  roomStore = new RoomStore();
}

export const rootStore = new RootStore();
