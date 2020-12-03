import React, { ChangeEvent, FormEvent } from 'react';

interface Props {
  username: string;
  onChangeUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<Props> = (props) => {
  
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input 
          id="username" 
          type="text" 
          required 
          value={props.username} 
          onChange={props.onChangeUsername}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password" 
          required 
          value={props.password} 
          onChange={props.onChangePassword}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
