import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import './SignupPage.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/auth/signup', {
        username,
        password,
        email,
      });
      console.log(response.data);
      if (response.status === 201) {
        navigate('/login');
      } else {
        alert('Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign-up failed', error);
      alert('Sign-up failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="input-group">
          <i className="fas fa-user icon-user"></i>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i
            className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} password-icon`} // FontAwesome eye icon
            onClick={togglePasswordVisibility} // Toggle password visibility on click
          ></i>
          <input
            type={showPassword ? 'text' : 'password'} // Toggle between text and password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-envelope icon-email"></i>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        <button type="button" className="back-button" onClick={() => window.location.href = '/login'}>
    Back to Login
</button>

      </form>
    </div>
  );
};

export default SignupPage;
