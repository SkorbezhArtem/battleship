import WebSocket from 'ws';

const resToClients = (server: WebSocket.Server, response: string) => {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(response);
    }
  });
};

export default resToClients;
