import IReq from '../../interfaces/IReq';
import { WebSocket } from 'ws';
import playerAuth from '../playerAuth';
import resToClient from '../resHandlers/resToClient';

const regHandler = (ws: WebSocket, reqObj: IReq, socketID: number) => {
  if (reqObj.type !== 'reg') return;

  const response = playerAuth(reqObj, socketID);
  resToClient(ws, JSON.stringify(response));
};

export default regHandler;
