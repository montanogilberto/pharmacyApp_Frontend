// src/pages/Login.tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../master.css';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://smartloansbackend.azurewebsites.net/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logins: [
            {
              username,
              password,
            },
          ],
        }),
      });

      if (!response.ok) {
        // Handle error scenarios based on your backend response
        console.error('Login failed');
        return;
      }

      // Assuming a successful login, navigate to the main menu
      // You can replace this with your actual logic based on the backend response
      history.push('/folder/Inbox');
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label>
          Username:
          <input
            className="login-input"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            className="login-input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className="login-button" type="submit">Login</button>
      </form>
      <div className="login-footer">
        <p>
          <a href="#">Forgot Password?</a>
        </p>
        <p>
          <a href="#">Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
