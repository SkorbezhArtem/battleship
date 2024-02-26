import IShip from './IShip';

interface IGameData {
  indexPlayer: number;
  ships: IShip[];
  grid: number[][];
}

type GameDataArray = IGameData[] | [];

export default interface IGame {
  idGame: number;
  hostId: number;
  clientId: number;
  data: GameDataArray;
  turn?: number;
  isOnline: boolean;
}
