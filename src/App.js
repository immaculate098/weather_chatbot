import React from 'react';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import './App.css';


import { Navigate } from'react-router-dom';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Navbar from './components/screen';
import Dashboard from './components/Dashboard';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ChatApp from './components/ChatApp'; // Import ChatApp component
// import ChatApp from './components/ChatApp'


function App() {
  return (
  <BrowserRouter>
    <div className="App">
    {/*<Navbar/>*/}
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Navigate replace to="/signup"/>} /> {/* Redirect to SignupPage */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/navbar" element={<Navbar/>} />
        <Route path="/chat" element={<ChatApp />} /> {/* Add route for ChatApp */}
        
        
      </Routes>
      {/* <ChatApp /> */}
    </div>
  </BrowserRouter>
);
}

export default App;
