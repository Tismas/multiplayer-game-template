import express from "express";
import http from "http";
import { Server } from "socket.io";

import { handleServerPlayerEvents } from "./eventHandlers/serverPlayerEventHandlers";
import { handleServerRoomEvents } from "./eventHandlers/serverRoomEventHandlers";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/TypedServerSocket";

const app = express();
app.use(express.static("./dist"));
const server = http.createServer(app);

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  // @ts-ignore types are incorrect here
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  handleServerRoomEvents(socket);
  handleServerPlayerEvents(socket);
});

const port = process.env.PORT || 80;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
