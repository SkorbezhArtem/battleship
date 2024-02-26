import WebSocket from 'ws';

const resToClient = (ws: WebSocket, response: string) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(response);
  }
};

export default resToClient;
