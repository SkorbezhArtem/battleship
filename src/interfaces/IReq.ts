import IReqAddUserToRoom from './IReqAddUserToRoom';
import IReqRandomAttack from './IReqRandomAttack';
import IRegRequest from './IRegRequest';
import IReqSinglePlay from './IReqSinglePlay';
import IReqAttack from './IReqAttack';
import IReqCreateRoom from './IReqCreateRoom';
import IReqAddShips from './IReqAddShips';

type IReq =
  | IReqSinglePlay
  | IReqCreateRoom
  | IReqAddUserToRoom
  | IReqAddShips
  | IReqAttack
  | IReqRandomAttack
  | IRegRequest;

export default IReq;
