import IReqReq from '../interfaces/IRegRequest';
import computeHash from '../utils/computeHash';
import players from './db/players';

const playerAuth = (requestsObj: IReqReq, socketID: number) => {
  const user = players.filter((user) => user.name === requestsObj.data.name)[0];
  let userIndex: number;
  let isError: boolean;
  let errorText: string;

  if (!user) {
    userIndex = socketID;
    if (!/^[a-zA-Z]+$/.test(requestsObj.data.name)) {
      isError = true;
      errorText = 'Name must contain only letters';
    } else {
      players.push({
        index: socketID,
        name: requestsObj.data.name,
        password: computeHash(requestsObj.data.password),
        wins: 0,
      });
      userIndex = socketID;
      isError = false;
      errorText = '';
    }
  } else {
    userIndex = socketID;
    if (user.password === computeHash(requestsObj.data.password)) {
      isError = false;
      errorText = '';
      user.index = socketID;
    } else {
      isError = true;
      errorText = 'Incorrect password!';
    }
  }
  return {
    type: 'reg',
    data: JSON.stringify({
      name: requestsObj.data.name,
      index: userIndex,
      error: isError,
      errorText: errorText,
    }),
    id: 0,
  };
};

export default playerAuth;
