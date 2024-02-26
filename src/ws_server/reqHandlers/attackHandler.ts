import games from '../db/games';
import IReq from '../../interfaces/IReq';

const getCellAround = (grid: number[][], y: number, x: number) => {
  const cells: { x: number; y: number }[] = [];

  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {
      const isValidCell =
        j >= 0 &&
        j < 10 &&
        i >= 0 &&
        i < 10 &&
        (i !== y || j !== x) &&
        grid[i][j] === 0;
      if (isValidCell) cells.push({ x: j, y: i });
    }
  }

  return cells;
};

const generateResponse = (
  x: number,
  y: number,
  indexPlayer: number,
  status: 'miss' | 'killed' | 'shot',
) => {
  return JSON.stringify({
    type: 'attack',
    data: JSON.stringify({
      position: { x, y },
      currentPlayer: indexPlayer,
      status,
    }),
    id: 0,
  });
};

const attackHandler = (reqObj: IReq) => {
  if (reqObj.type !== 'attack')
    return { game: undefined, responses: undefined };

  const game = games.find(
    (game) =>
      game.idGame === reqObj.data.gameId &&
      game.turn === reqObj.data.indexPlayer,
  );

  if (!game) return { game: undefined, responses: undefined };

  const responses: string[] = [];
  const grid = game.data.find(
    (user) => user.indexPlayer !== reqObj.data.indexPlayer,
  )?.grid;

  if (!grid) return { game, responses: undefined };

  const targetCell = grid[reqObj.data.y][reqObj.data.x];

  if (targetCell === 0) {
    grid[reqObj.data.y][reqObj.data.x] = 2;
    responses.push(
      generateResponse(
        reqObj.data.x,
        reqObj.data.y,
        reqObj.data.indexPlayer,
        'miss',
      ),
    );
  } else if (targetCell === 1) {
    const ships = game.data.find(
      (user) => user.indexPlayer !== reqObj.data.indexPlayer,
    )?.ships;

    if (!ships) return { game, responses: undefined };

    const ship = ships.find((ship) =>
      ship.shipCells?.some(
        (cell) => cell?.y === reqObj.data.y && cell?.x === reqObj.data.x,
      ),
    );

    if (ship) {
      const cell = ship.shipCells?.find(
        (cell) => cell?.x === reqObj.data.x && cell?.y === reqObj.data.y,
      );

      if (cell && cell.status === 1) {
        if (
          ship.shipCells &&
          ship.shipCells.filter((cell) => cell?.status === 3).length ===
            ship.shipCells.length - 1
        ) {
          ship.shipCells.forEach((cell) => {
            if (cell) {
              cell.status = 4;
              grid[cell.y][cell.x] = 4;
              responses.push(
                generateResponse(
                  cell.x,
                  cell.y,
                  reqObj.data.indexPlayer,
                  'killed',
                ),
              );

              getCellAround(grid, cell.y, cell.x).forEach((cell) => {
                grid[cell.y][cell.x] = 2;
                responses.push(
                  generateResponse(
                    cell.x,
                    cell.y,
                    reqObj.data.indexPlayer,
                    'miss',
                  ),
                );
              });
            }
          });

          ship.isKilled = true;
        } else {
          cell.status = 3;
          grid[reqObj.data.y][reqObj.data.x] = 3;
          responses.push(
            generateResponse(
              reqObj.data.x,
              reqObj.data.y,
              reqObj.data.indexPlayer,
              'shot',
            ),
          );
        }
      }
    }
  }

  return { game, responses: responses.length > 0 ? responses : undefined };
};

export default attackHandler;
