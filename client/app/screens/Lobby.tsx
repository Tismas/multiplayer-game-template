import { Button, Tag, Typography } from "antd";
import { observer } from "mobx-react";
import { FC } from "react";
import { styled } from "styled-components";

import { useSocket } from "client/helpers/hooks/useSocket";
import { rootStore } from "client/store/RootStore";

interface Props {}

export const Lobby: FC<Props> = observer(() => {
  const { socket } = useSocket();
  const { roomStore } = rootStore;

  const handleCreateRoom = () => {
    socket.emit("create-room");
  };

  const handleJoinRoom = (roomId: string) => {
    socket.emit("join-room", roomId);
  };

  return (
    <Wrapper>
      <Title>Room list</Title>
      <Rooms>
        {Object.values(roomStore.rooms).map(
          (room) =>
            room && (
              <Room key={room.id}>
                <RoomInfo>
                  <RoomName>
                    Name: <b>{room.id}</b>
                  </RoomName>
                  <RoomPlayers>
                    Players:
                    {Object.values(room.players).map(
                      (player) =>
                        player && (
                          <Tag key={player.id} color={"gold"}>
                            {player.name}
                          </Tag>
                        ),
                    )}
                  </RoomPlayers>
                </RoomInfo>
                <Button
                  onClick={() => handleJoinRoom(room.id)}
                  disabled={!room.canJoin}
                >
                  Join
                </Button>
              </Room>
            ),
        )}
      </Rooms>
      <Button onClick={handleCreateRoom}>Create Room</Button>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;
const Title = styled(Typography.Title)``;
const Rooms = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;
const Room = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #191919;
`;
const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const RoomName = styled.span`
  font-size: 24px;
`;
const RoomPlayers = styled.div`
  display: flex;
  gap: 8px;

  .ant-tag {
    margin-right: 0;
  }
`;
