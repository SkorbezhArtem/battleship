import IRegRequest from '../interfaces/IRegRequest';
import computeHash from '../utils/computeHash';
import players from './players';

const playerAuth = (reqObj: IRegRequest) => {
  const { name, password } = reqObj.data;

  const player = players.find((p) => p.name === name);
  let userIndex: number;
  let isError: boolean;
  let errorText: string;

  if (!player) {
    userIndex = players.length;
    players.push({
      index: userIndex,
      name,
      password: computeHash(password),
    });
    isError = false;
    errorText = '';
  } else {
    userIndex = player.index;
    isError = player.password !== computeHash(password);
    errorText = isError ? 'Incorrect password' : '';
  }

  const responseData = {
    name,
    index: userIndex,
    error: isError,
    errorText,
  };

  return {
    type: 'reg',
    data: JSON.stringify(responseData),
    id: 0,
  };
};

export default playerAuth;
