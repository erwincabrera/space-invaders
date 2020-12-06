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
    <div>
      <section>
        <h1 style={{marginTop: 0}}>Login</h1>
        <form onSubmit={props.handleLogin}>
          <div className="form-input">
            <label htmlFor="username">Username</label>
            <input 
              id="username" 
              type="text" 
              required 
              value={props.username} 
              onChange={props.onChangeUsername}
            />
          </div>
          <div className="form-input" style={{marginBottom: '1em'}}>
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              required 
              value={props.password} 
              onChange={props.onChangePassword}
            />
          </div>
          <button type="submit" style={{width: '100%'}}>Login</button>
        </form>
      </section>
      <hr />
      <button style={{width: '100%'}}>Create New Account</button>
    </div>
  )
}
