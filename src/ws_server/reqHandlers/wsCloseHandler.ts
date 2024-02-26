import { WebSocket } from 'ws';
import rooms from '../db/rooms';
import games from '../db/games';

const createGridArray = () =>
  Array(10)
    .fill(0)
    .map(() => Array(10).fill(0)) as number[][];

const createShipsArray = () =>
  Array(10).fill({
    position: { x: 0, y: 0 },
    direction: true,
    length: 1,
    type: 'small',
    isKilled: false,
  });

const wsCloseHandler = (ws: WebSocket, socketID: number) => {
  const room = rooms.find((room) => room.roomId === socketID);
  if (room) {
    rooms.splice(rooms.indexOf(room), 1);
  }

  const game = games.find(
    (game) => game.clientId === socketID || game.hostId === socketID,
  );

  if (game) {
    game.data = [
      {
        indexPlayer: game.clientId,
        grid: createGridArray(),
        ships: createShipsArray(),
      },
      {
        indexPlayer: game.hostId,
        grid: createGridArray(),
        ships: createShipsArray(),
      },
    ];

    const playerData = game.data.find((data) => data.indexPlayer === socketID);

    if (playerData) {
      playerData.ships.forEach((ship) => (ship.isKilled = true));
    }

    return game;
  }
};

export default wsCloseHandler;
