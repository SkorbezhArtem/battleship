import WebSocket from 'ws';
import rooms from '../db/rooms';
import resToClients from '../resHandlers/resToClients';

const updateRoomHandler = (server: WebSocket.Server) => {
  const response = {
    type: 'update_room',
    data: JSON.stringify(rooms),
    id: 0,
  };

  resToClients(server, JSON.stringify(response));
};

export default updateRoomHandler;
