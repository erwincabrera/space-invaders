import React, { ChangeEvent, FormEvent } from "react";

interface Props {
  username: string;
  onChangeUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLogin: boolean;
  onToggleLogin: () => void;
}

export const LoginForm: React.FC<Props> = ({
  username,
  onChangeUsername,
  password,
  onChangePassword,
  isLogin,
  onToggleLogin,
  handleSubmit,
}) => {
  return (
    <div>
      <section>
        <h1 style={{ marginTop: 0 }}>{isLogin ? "Login" : "New Account"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div className="form-input" style={{ marginBottom: "1em" }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <button type="submit" style={{ width: "100%" }}>
            {isLogin ? "Login" : "Create New Account"}
          </button>
        </form>
      </section>
      <hr />
      <button style={{ width: "100%" }} onClick={onToggleLogin}>
        {isLogin ? "Create New Account" : "Back"}
      </button>
    </div>
  );
};
