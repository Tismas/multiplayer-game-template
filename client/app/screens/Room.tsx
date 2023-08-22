import { Button, Typography, message } from "antd";
import { observer } from "mobx-react";
import { styled } from "styled-components";

import { useSocket } from "client/helpers/hooks/useSocket";
import { rootStore } from "client/store/RootStore";

import { router } from "../router";

interface Props {}

export const Room: React.FC<Props> = observer(() => {
  const { currentRoom } = rootStore.roomStore;
  const { socket } = useSocket();

  if (!currentRoom) {
    message.error("Something went wrong. Room not found.");
    router.navigate("/lobby");
    return null;
  }
  const players = Object.values(currentRoom.players);

  const handleLeaveRoom = () => {
    socket.emit("leave-room");
    router.navigate("/lobby");
  };
  const handleStartGame = () => {
    socket.emit("start-game");
  };

  return (
    <Wrapper>
      <Typography.Title>Player list</Typography.Title>
      <Players>
        {players.map(
          (player) => player && <Player key={player.id}>{player.name}</Player>,
        )}
      </Players>
      <Button
        onClick={handleStartGame}
        disabled={socket.id !== currentRoom.owner.id}
      >
        Start game
      </Button>
      <Button onClick={handleLeaveRoom}>Leave room</Button>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;
const Players = styled.div`
  font-size: 20px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Player = styled.div`
  color: #131313;
  background: #fff;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
`;
