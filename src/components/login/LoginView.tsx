import React, { FormEvent, useState } from "react";
import { LoginResponse } from "../../types";
import loginService from "../../services/login";
import userService from "../../services/users";
import { LoginForm } from "./LoginForm";
import { Panel } from "../Panel";

interface Props {
  onLogin: (user: LoginResponse) => void;
}

export const LoginView: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLogin) {
      try {
        await userService.newUser({
          username,
          password,
        });
      } catch (e) {
        alert("Failed to create new account");
      }
    }

    try {
      const user = await loginService.login<LoginResponse>({
        username,
        password,
      });
      setUsername("");
      setPassword("");
      props.onLogin(user);
    } catch (e) {
      alert("Wrong credentials");
    }
  };

  const handleToggleLogin = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="screen">
      <Panel width="auto">
        <LoginForm
          username={username}
          onChangeUsername={(e) => setUsername(e.target.value)}
          password={password}
          onChangePassword={(e) => setPassword(e.target.value)}
          handleSubmit={handleSubmit}
          isLogin={isLogin}
          onToggleLogin={handleToggleLogin}
        />
      </Panel>
    </div>
  );
};
