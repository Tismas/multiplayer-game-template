import { faker } from "@faker-js/faker";

import { ServerPlayer } from "./Player";

export class RoomData {
  players: Record<string, ServerPlayer | undefined>;
  owner: ServerPlayer;
  canJoin: boolean;
  id: string;

  constructor(owner: ServerPlayer) {
    this.players = {};
    this.owner = owner;
    this.canJoin = true;
    this.id = this.#generateId();
  }

  #generateId(): string {
    return `${faker.word.adjective()} ${faker.word.noun()}`;
  }
}

export class ServerRoom extends RoomData {
  get isEmpty() {
    return Object.values(this.players).length === 0;
  }

  addPlayer(player: ServerPlayer) {
    if (!this.canJoin) return;

    this.players[player.id] = player;
    player.currentRoomId = this.id;
  }

  removePlayer(player: ServerPlayer) {
    delete this.players[player.id];
    player.currentRoomId = null;

    const players = Object.values(this.players);
    if (!players[0]) {
      delete rooms[this.id];
      return;
    }
    if (this.owner.id === player.id) {
      this.owner = players[0];
    }
  }
}

export type Rooms = Record<string, ServerRoom | undefined>;
export type RoomsData = Record<string, RoomData | undefined>;

export const rooms: Rooms = {};
