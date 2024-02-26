import IPlayer from './IPlayer';

export default interface IRoom {
  roomId: number;
  roomUsers: IPlayer[];
}
