// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = [];

wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.push(ws);

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log('Received:', message);

    // Broadcast the message to all connected clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

console.log('WebSocket server running on ws://localhost:8080');
