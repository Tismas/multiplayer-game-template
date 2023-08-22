import { observer } from "mobx-react";
import { styled } from "styled-components";

interface Props {}

export const Sider: React.FC<Props> = observer(() => {
  return <Wrapper>Sider</Wrapper>;
});

const Wrapper = styled.div`
  flex-basis: 300px;
  border-right: 1px solid #ccc;
  background: #191919;
  height: 100%;
  padding: 12px;
`;
