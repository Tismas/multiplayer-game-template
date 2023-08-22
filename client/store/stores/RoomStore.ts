import { makeAutoObservable } from "mobx";

import type { RoomData, RoomsData } from "server/entities/Room";

export class RoomStore {
  rooms: RoomsData = {};
  currentRoomId: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get currentRoom() {
    if (!this.currentRoomId) return null;
    return this.rooms[this.currentRoomId];
  }

  setRooms(rooms: RoomsData) {
    this.rooms = rooms;
  }
  addRoom(room: RoomData) {
    this.rooms[room.id] = room;
  }
  updateRoom(room: RoomData) {
    this.rooms[room.id] = room;
  }
  removeRoom(roomId: string) {
    delete this.rooms[roomId];
  }

  joinRoom(room: RoomData) {
    this.rooms[room.id] = room;
    this.currentRoomId = room.id;
  }
  leaveRoom() {
    this.currentRoomId = null;
  }
}
