import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, register } from '../../redux/auth/authOperations';
import { selectUserToken } from '../../redux/auth/authSelectors';
import TestNav from './TestNav';

const TestAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  const handleRegister = () => {
    dispatch(register({ name, email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ padding: 20 }}>
      <TestNav />

      <h3>Auth Test</h3>
      <p>{token}</p>
      <div>
        <input
          type="text"
          placeholder="Name (для реєстрації)"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ marginRight: 10 }}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginRight: 10 }}
        />
      </div>

      <div style={{ marginTop: 15 }}>
        <button onClick={handleRegister} style={{ marginRight: 10 }}>
          Register
        </button>
        <button onClick={handleLogin} style={{ marginRight: 10 }}>
          Login
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
export default TestAuth;
