import React, { FormEvent, useState } from 'react'
import { LoginResponse } from '../../types';
import loginService from '../../services/login';
import { LoginForm } from './LoginForm';
import { Panel } from '../Panel';

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
      props.onLogin(user);
    } catch(e) {
      alert('Wrong credentials');
    }
  }

  return (
    <div className='screen'>
      <Panel width='auto'>
        <LoginForm 
          username={username}
          onChangeUsername={(e) => setUsername(e.target.value)}
          password={password}
          onChangePassword={(e) => setPassword(e.target.value)}
          handleLogin={handleLogin}
        />
      </Panel>
    </div>
  )
}