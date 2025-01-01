import React, { useEffect, useState } from 'react';

const RealTimeApp = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  // Establish WebSocket connection on component mount
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    
    newSocket.onopen = () => {
      console.log('WebSocket connected');
    };

    newSocket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(newSocket);

    // Clean up WebSocket connection on component unmount
    return () => newSocket.close();
  }, []);

  // Send message to WebSocket server
  const sendMessage = () => {
    if (socket && message) {
      socket.send(message);
      setMessage(''); // Clear message input
    }
  };

  return (
    <div className="realtime-app">
      <h2>Real-Time Todo App</h2>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your task here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h3>Messages</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RealTimeApp;
