import { ServerRoom, rooms } from "./Room";

export class PlayerData {
  id: string;
  name: string;
  currentRoomId: string | null;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.currentRoomId = null;
  }
}

export class ServerPlayer extends PlayerData {
  get currentRoom(): ServerRoom | null {
    if (!this.currentRoomId) return null;
    return rooms[this.currentRoomId] || null;
  }
}
