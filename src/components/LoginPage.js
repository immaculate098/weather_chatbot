import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/auth/login', {
        username,
        password,
        rememberMe,
      });
      console.log(response.data);
      if (response.status === 200) {
        navigate('/chat');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i
            className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} password-icon`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <div className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            id="rememberMe"
          />
          <label htmlFor="rememberMe">Remember?</label>
        </div>
        <a href="/forgot-password" className="forgot-password">
          Forgot password?
        </a>
        <button type="submit" className="login-button">
          LOGIN
        </button>
        <button
          type="button"
          className="register-button"
          onClick={() => navigate('/signup')}
        >
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
