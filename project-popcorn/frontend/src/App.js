import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';
import logo from './sendphoto.jpg'; // Import your image file

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await Axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      setMessage(response.data);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred');
    }
  };

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }

      const response = await Axios.post('http://localhost:8000/register', {
        email,
        password,
      });
      setMessage(response.data);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h1>Login Page</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <br />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input-field"
      />
      <br />
      <button onClick={handleLogin} className="btn">
        Login
      </button>
      <button onClick={handleRegister} className="btn">
        Register
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
