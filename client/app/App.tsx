import { ConfigProvider, Spin, theme } from "antd";
import { RouterProvider } from "react-router";
import { styled } from "styled-components";

import { useSocket } from "client/helpers/hooks/useSocket";

import { Sider } from "./Sider/Sider";
import { router } from "./router";

export default function Home() {
  const { error, loading } = useSocket();

  if (loading) {
    return (
      <Wrapper>
        <Spin />
      </Wrapper>
    );
  }

  if (error) {
    return <Wrapper>{error}</Wrapper>;
  }

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Wrapper>
        <Sider />
        <RouterProvider router={router} />
      </Wrapper>
    </ConfigProvider>
  );
}

const Wrapper = styled.main`
  background: #131313;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e3e3e3;
`;
