import WebSocket from 'ws';
import IGame from '../../interfaces/IGame';

const resToHostClient = (
  server: WebSocket.Server,
  sockets: Map<number, WebSocket>,
  game: IGame,
  responseForHost: string,
  responseForClient: string,
) => {
  server.clients.forEach((client) => {
    const clientSocket = [...sockets.entries()].find(([, s]) => s === client);

    if (clientSocket) {
      const [socketKey, socket] = clientSocket;
      const isHost = game.hostId === socketKey;
      const isClient = game.clientId === socketKey;

      if (isHost) {
        socket.send(responseForHost);
      }

      if (isClient) {
        socket.send(responseForClient);
      }
    }
  });
};

export default resToHostClient;
