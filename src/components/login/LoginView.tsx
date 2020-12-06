import React, { FormEvent, useState } from 'react'
import { LoginResponse } from '../../types';
import loginService from '../../services/login';
import scoresService from '../../services/scores';
import { LoginForm } from './LoginForm';

interface Props {
  onLogin: (user: LoginResponse) => void;
}

export const LoginView: React.FC<Props> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await loginService.login<LoginResponse>({ username, password });
      setUsername('');
      setPassword('');
      scoresService.setToken(user.token);
      props.onLogin(user);
    } catch(e) {
      alert('Wrong credentials');
    }
  }

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