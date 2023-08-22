import { Button, Form, Input } from "antd";
import { ColorFactory } from "antd/es/color-picker/color";
import { observer } from "mobx-react";
import { FC } from "react";
import { styled } from "styled-components";

import { useLocalStorage } from "client/helpers/hooks/useLocalStorage";
import { useSocket } from "client/helpers/hooks/useSocket";

interface FormValues {
  username: string;
  color: ColorFactory;
}

interface Props {}

export const TitleScreen: FC<Props> = observer(() => {
  const { socket } = useSocket();
  const [initialValues, setInitialValues] = useLocalStorage("form-data", {
    username: "",
  });

  const handleSubmit = ({ username }: FormValues) => {
    setInitialValues({ username });
    socket.emit("set-name", username);
    socket.emit("get-room-list");
  };

  return (
    <Wrapper>
      <Form<FormValues>
        layout="vertical"
        style={{ width: "300px" }}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ marginRight: "8px" }}
            htmlType="submit"
            size="large"
            type="primary"
          >
            Play
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
