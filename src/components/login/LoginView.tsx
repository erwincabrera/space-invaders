import React, { FormEvent, useState } from 'react'
import { LoginResponse } from '../../types';
import loginService from '../../services/login';
import scoresService from '../../services/scores';
import { LoginForm } from './LoginForm';

export const LoginView: React.FC = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<LoginResponse>(null);
  

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await loginService.login<LoginResponse>({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
      scoresService.setToken(user.token);
      
    } catch(e) {
      alert('Wrong credentials');
    }
  }

  const loginForm = (): JSX.Element => {
    return (
      <LoginForm 
        username={username}
        onChangeUsername={(e) => setUsername(e.target.value)}
        password={password}
        onChangePassword={(e) => setPassword(e.target.value)}
        handleLogin={handleLogin}
      />
    )
  }

  return (
    <div>
      {!user && loginForm()}
    </div>
  )
}