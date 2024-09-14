import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6
import '../components/ChatApp.css';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    setMessages([...messages, { message, sender: 'User' }]);
    setIsTyping(true);
  
    try {
      const response = await axios.post('http://localhost:5001/sms', {
        Body: message
      });
  
      setMessages([...messages, { message, sender: 'User' }, { message: response.data.message, sender: 'Chatbot' }]);
    } catch (error) {
      setMessages([...messages, { message, sender: 'User' }, { message: 'Sorry, I could not get a response.', sender: 'Chatbot' }]);
    }
  
    setIsTyping(false);
  };


  const navigate = useNavigate(); // Initialize useNavigate for redirecting to login page

  const handleLogout = () => {
    // Clear any authentication tokens or user data from local storage/session storage
    localStorage.removeItem('authToken');  // Assuming you store your token in localStorage
    sessionStorage.removeItem('userSession'); // For session-based storage (optional)

    // Redirect to login page
    navigate('/login'); // Redirect to the login page after logout
  };

  <h1>Weather chatbot</h1>

  return (
  <div className="chat-app-container">
    <header className="chat-header">
        <h1>Welcome to the Weather Chatbot</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    </header>
    
    <div className="chat-container">
      <MainContainer>
        <ChatContainer>
          <MessageList 
            scrollBehavior="smooth" 
            typingIndicator={isTyping ? <TypingIndicator content="Chatbot is typing" /> : null}
          >
            {messages.map((message, i) => (
              <Message 
                key={i} 
                model={{
                  message: message.message,
                  direction: message.sender === "Chatbot" ? "incoming" : "outgoing",
                  sentTime: message.sentTime
                }} 
              />
            ))}
          </MessageList>
          <MessageInput 
            placeholder="Type 'weather city name' " 
            onSend={handleSend} 
          />        
        </ChatContainer>
      </MainContainer>
    </div>

   {/* Copyright Section Below */}
   <footer className="chat-footer" >
        <p>&copy; 2024 Immaculate Nayiga. All rights reserved.</p>
    </footer>
    </div>
  );
}

export default ChatApp;
