import { createMemoryRouter } from "react-router";

import { Game } from "./screens/Game";
import { Lobby } from "./screens/Lobby";
import { Room } from "./screens/Room";
import { TitleScreen } from "./screens/TitleScreen";

const routes = [
  { path: "/", element: <TitleScreen /> },
  { path: "/lobby", element: <Lobby /> },
  { path: "/room/:roomId", element: <Room /> },
  { path: "/room/:roomId/game", element: <Game /> },
];

export const router = createMemoryRouter(routes);
