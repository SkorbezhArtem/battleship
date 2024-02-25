import { WebSocketServer } from 'ws';
import parseNestedJSON from '../utils/parseNestedJSON';

const WS_PORT = 3000;

const createWebSocketServer = () => {
  const server = new WebSocketServer({ port: WS_PORT });

  server.on('connection', (client) => {
    console.log('Client connected');

    client.on('message', (data) => {
      const parsedData = parseNestedJSON(data.toString());
      console.log('Received:', parsedData);
    });
  });
};

export default createWebSocketServer;
