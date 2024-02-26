import IReq from '../../interfaces/IReq';
import rooms from '../db/rooms';
import users from '../db/players';

const createRoomHandler = (reqObj: IReq, socketID: number) => {
  if (reqObj.type !== 'create_room') return;

  const room = rooms.find((room) => room.roomId === socketID);

  if (!room) {
    const user = users.find((user) => user.index === socketID);

    if (!user) return;

    const data = {
      roomId: socketID,
      roomUsers: [
        {
          name: user.name,
          index: user.index,
        },
      ],
    };

    rooms.push(data);
  }
};

export default createRoomHandler;
