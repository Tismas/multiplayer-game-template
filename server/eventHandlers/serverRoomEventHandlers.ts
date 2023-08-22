import type { TypedServerSocket } from "server/types/TypedServerSocket";

import { ServerRoom, rooms } from "../entities/Room";
import { io } from "../server";

export interface ServerRoomEventHandlers {
  "create-room": () => void;
  "join-room": (roomId: string) => void;
  "leave-room": () => void;
  "get-room-list": () => void;
  "start-game": () => void;
}

export const handleServerRoomEvents = (socket: TypedServerSocket) => {
  socket.on("get-room-list", () => {
    socket.emit("room-list", rooms);
  });

  const joinRoom = (roomId: string) => {
    const { player } = socket.data;
    if (!player) {
      socket.emit("unauthorized");
      return;
    }

    const targetRoom = rooms[roomId];
    if (!targetRoom) {
      socket.emit("join-failed", "Room not found.");
      return;
    }
    if (!targetRoom.canJoin) {
      socket.emit("join-failed", "Room is full.");
      return;
    }

    targetRoom.addPlayer(player);
    socket.emit("join-success", targetRoom);
    socket.broadcast.emit("update-room", targetRoom);
    socket.join(roomId);
  };
  const leaveRoom = () => {
    const { player } = socket.data;
    if (!player || !player.currentRoom) {
      socket.emit("unauthorized");
      return;
    }

    const room = player.currentRoom;
    room.removePlayer(player);
    socket.leave(room.id);

    socket.emit("update-room", room);
    socket.broadcast.emit("update-room", room);

    if (room.isEmpty) {
      socket.emit("room-deleted", room.id);
      socket.broadcast.emit("room-deleted", room.id);
    }
  };

  socket.on("create-room", () => {
    const { player } = socket.data;
    if (!player) {
      socket.emit("unauthorized");
      return;
    }

    const room = new ServerRoom(player);
    rooms[room.id] = room;
    socket.emit("room-created", room);
    joinRoom(room.id);
  });
  socket.on("join-room", (roomId) => {
    joinRoom(roomId);
  });
  socket.on("leave-room", () => {
    leaveRoom();
  });

  socket.on("start-game", () => {
    const { player } = socket.data;
    if (!player || !player.currentRoom) {
      socket.emit("unauthorized");
      return;
    }

    io.to(player.currentRoom.id).emit("game-started", player.currentRoom);
  });

  socket.on("disconnect", () => {
    leaveRoom();
  });
};
