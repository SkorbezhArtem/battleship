import IReq from '../../interfaces/IReq';
import rooms from '../db/rooms';

const addUserToRoomHandler = (reqObj: IReq, socketID: number) => {
  if (
    reqObj.type !== 'add_user_to_room' ||
    reqObj.data.indexRoom === socketID
  ) {
    return;
  }

  const clientRoomIndex = rooms.findIndex((room) => room.roomId === socketID);
  if (clientRoomIndex !== -1) {
    rooms.splice(clientRoomIndex, 1);
  }

  const hostRoomIndex = rooms.findIndex(
    (room) => room.roomId === reqObj.data.indexRoom,
  );
  if (hostRoomIndex !== -1) {
    rooms.splice(hostRoomIndex, 1);
  }

  return { host: reqObj.data.indexRoom, client: socketID, isOnline: true };
};

export default addUserToRoomHandler;
