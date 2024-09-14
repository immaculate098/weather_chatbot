import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
`;

const LoginCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  width: 300px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Icon = styled.i`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: white;
`;

const CheckboxLabel = styled.label`
  margin-left: 5px;
`;

const ForgotPassword = styled.a`
  color: white;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 20px;
  display: block;
  text-align: right;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const SignUpLink = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;

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
    <LoginContainer>
      <LoginCard>
        <Title>Sign In</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Icon className="fas fa-user" />
          </InputGroup>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Icon
              className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            />
          </InputGroup>
          <RememberMeContainer>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              id="rememberMe"
            />
            <CheckboxLabel htmlFor="rememberMe">Remember?</CheckboxLabel>
          </RememberMeContainer>
          <ForgotPassword href="/forgot-password">Forgot password?</ForgotPassword>
          <Button type="submit">LOGIN</Button>
          <SignUpLink onClick={() => navigate('/signup')}>
            Don't have an account? Sign Up
          </SignUpLink>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;