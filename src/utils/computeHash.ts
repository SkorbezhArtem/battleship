import { createHash, BinaryToTextEncoding } from 'crypto';

type HashEncoding = 'hex' | 'base64' | 'latin1';

const computeHash = (str: string, encoding: HashEncoding = 'hex') =>
  createHash('sha256')
    .update(str)
    .digest(encoding as BinaryToTextEncoding);

export default computeHash;
