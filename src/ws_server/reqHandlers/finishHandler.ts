import players from '../db/players';
import IReq from '../../interfaces/IReq';
import games from '../db/games';

const finishHandler = (reqObj: IReq) => {
  if (reqObj.type !== 'attack') return;

  const game = games.find((game) => game.idGame === reqObj.data.gameId);

  if (!game) return;

  const ships = game.data.find(
    (user) => user.indexPlayer !== reqObj.data.indexPlayer,
  )?.ships;

  if (!ships) return;

  const totalKilledShips = ships.reduce(
    (acc, ship) => (ship.isKilled ? acc + 1 : acc),
    0,
  );

  if (ships.length === totalKilledShips) {
    const user = players.find((user) => user.index === reqObj.data.indexPlayer);

    if (user && user.wins !== undefined) {
      user.wins += 1;
    }

    games.splice(games.indexOf(game), 1);

    return {
      game,
      response: JSON.stringify({
        type: 'finish',
        data: JSON.stringify({
          winPlayer: reqObj.data.indexPlayer,
        }),
        id: 0,
      }),
    };
  }

  return undefined;
};

export default finishHandler;
