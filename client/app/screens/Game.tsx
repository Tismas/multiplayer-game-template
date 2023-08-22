import { observer } from "mobx-react";
import { FC } from "react";
import { styled } from "styled-components";

interface Props {}

export const Game: FC<Props> = observer(() => {
  return <Wrapper>Your game here</Wrapper>;
});

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
