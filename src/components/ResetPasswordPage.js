import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ResetPasswordPage.css'; // Import the CSS file

const ResetPasswordPage = () => {
  const clientemail = localStorage.getItem('clientemail');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      console.log(clientemail, token, newPassword);
      const response = await axios.put('http://localhost:5001/auth/reset_password', { email: clientemail, token, newPassword });
      setMessage(response.data.message);
      if (response.data.message === 'Password reset successful') {
        navigate('/login');
      }
    } catch (error) {
      console.error('Detailed error:', error.response ? error.response.data : error);
      setMessage(error.response ? error.response.data.message : 'Error resetting password');
    }
  }

  return (
    <div className="reset-password-container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <input
            type="text"
            placeholder="Enter your verification code"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
