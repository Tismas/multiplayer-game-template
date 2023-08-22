import { message } from "antd";

import type { RoomData, Rooms } from "server/entities/Room";

import { router } from "client/app/router";
import { rootStore } from "client/store/RootStore";
import type { TypedClientSocket } from "client/types/TypedClientSocket";

export interface ClientRoomEvents {
  "room-list": (rooms: Rooms) => void;
  "join-success": (room: RoomData) => void;
  "join-failed": (message: string) => void;
  "update-room": (room: RoomData) => void;
  "room-created": (room: RoomData) => void;
  "room-deleted": (roomId: string) => void;
  "game-started": (room: RoomData) => void;
  "game-over": () => void;
}

export const handleClientRoomEvents = (socket: TypedClientSocket) => {
  socket.on("room-list", (rooms) => {
    rootStore.roomStore.setRooms(rooms);
    router.navigate("/lobby");
  });

  socket.on("room-created", (room) => {
    rootStore.roomStore.addRoom(room);
  });

  socket.on("room-deleted", (roomId) => {
    rootStore.roomStore.removeRoom(roomId);
  });

  socket.on("join-success", (room) => {
    rootStore.roomStore.joinRoom(room);
    router.navigate(`/room/${room.id}`);
  });

  socket.on("join-failed", (msg) => {
    message.error(msg);
  });

  socket.on("update-room", (room: RoomData) => {
    rootStore.roomStore.updateRoom(room);
  });

  socket.on("game-started", (room) => {
    router.navigate(`/room/${room.id}/game`);
  });
};
