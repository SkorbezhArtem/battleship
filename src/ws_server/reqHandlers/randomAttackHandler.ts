import IReqAttack from '../../interfaces/IReqAttack';
import IReq from '../../interfaces/IReq';
import games from '../db/games';

const getRandomCell = (grid: number[][]): { x: number; y: number } => {
  const cell = {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
  };
  return grid[cell.y][cell.x] !== 0 && grid[cell.y][cell.x] !== 1
    ? getRandomCell(grid)
    : cell;
};

const randomAttackHandler = (reqObj: IReq): IReqAttack | undefined => {
  if (reqObj.type !== 'randomAttack') return;

  const game = games.find((game) => game.idGame === reqObj.data.gameId);

  if (!game) return;

  const grid = game.data.find(
    (user) => user.indexPlayer !== reqObj.data.indexPlayer,
  )?.grid;

  if (!grid) return;

  const { x, y } = getRandomCell(grid);

  const newReqObj: IReqAttack = {
    type: 'attack',
    data: { ...reqObj.data, x, y },
    id: reqObj.id,
  };

  return newReqObj;
};

export default randomAttackHandler;
