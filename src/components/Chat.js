// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import './ChatApp.css';

// const socket = io('http://localhost:5001');

// function ChatApp() {
//   const [messages, setMessages] = useState([]);
//   const [senderInput, setSenderInput] = useState('');
//   const [responderInput, setResponderInput] = useState('');
  
//   const senderMessagesRef = useRef(null);
//   const responderMessagesRef = useRef(null);

//   useEffect(() => {
//     socket.on('chat message', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.off('chat message');
//     };
//   }, []);

//   useEffect(() => {
//     if (senderMessagesRef.current) {
//       senderMessagesRef.current.scrollTop = senderMessagesRef.current.scrollHeight;
//     }
//     if (responderMessagesRef.current) {
//       responderMessagesRef.current.scrollTop = responderMessagesRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const sendMessage = (text, side) => {
//     if (text.trim()) {
//       socket.emit('chat message', { text, side });
//       if (side === 'sender') {
//         setSenderInput('');
//       } else {
//         setResponderInput('');
//       }
//     }
//   };

//   return (
//     <div className="App">
//       <div className="chat-container">
//         <div className="chat-side">
//           <h2>Sender</h2>
//           <div className="messages" ref={senderMessagesRef}>
//             {messages.map((msg, index) => (
//               <div key={index} className={`message ${msg.side}`}>
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="input-area">
//             <input
//               type="text"
//               value={senderInput}
//               onChange={(e) => setSenderInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && sendMessage(senderInput, 'sender')}
//             />
//             <button onClick={() => sendMessage(senderInput, 'sender')}>Send</button>
//           </div>
//         </div>
//         <div className="chat-side">
//           <h2>Responder</h2>
//           <div className="messages" ref={responderMessagesRef}>
//             {messages.map((msg, index) => (
//               <div key={index} className={`message ${msg.side}`}>
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="input-area">
//             <input
//               type="text"
//               value={responderInput}
//               onChange={(e) => setResponderInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && sendMessage(responderInput, 'responder')}
//             />
//             <button onClick={() => sendMessage(responderInput, 'responder')}>Send</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatApp;