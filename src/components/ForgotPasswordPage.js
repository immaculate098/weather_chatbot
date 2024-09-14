import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Import the CSS file

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/auth/forgot-password', { email });
      localStorage.setItem('clientemail', email);
      console.log('Response:', response.data); // Debugging statement
      setMessage(response.data.message);
      if (response.data.success) {
        console.log('Redirecting to reset-password'); // Debugging statement
        navigate('/reset-password');
      }
    } catch (error) {
      console.error('Error:', error); // Debugging statement
      setMessage('Error sending email');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Verification Code</button>
          {message && <p>{message}</p>}
          <button type="button" className="back-button" onClick={() => window.location.href = '/login'}>
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
