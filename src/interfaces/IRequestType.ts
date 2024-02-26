import IReq from './IReq';

export default interface IRequestType {
  type: IReq['type'];
  handler: () => void;
}
