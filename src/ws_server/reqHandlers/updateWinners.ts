import WebSocket from 'ws';
import players from '../db/players';
import resToClients from '../resHandlers/resToClients';

const updateWinners = (server: WebSocket.Server) => {
  resToClients(
    server,
    JSON.stringify({
      type: 'update_winners',
      data: JSON.stringify(players),
      id: 0,
    }),
  );
};

export default updateWinners;
