import jwt, { VerifyCallback } from 'jsonwebtoken';

import { TokenPayload } from './../../types/server';
import { tokenPrefix, issuer } from '../constants';

export const createToken = (payload:TokenPayload) => {
  const clearToken = jwt.sign({
    ...payload,
  }, 'urnotzane', {
    issuer,
    expiresIn: '1m',
  });

  return `${tokenPrefix} ${clearToken}`;
};

export const verifyToken = (token:string, callback:VerifyCallback) => {
  token = decodeURIComponent(token);
  if (token.indexOf(tokenPrefix) === 0) {
    token = token.split(' ')[1];
  }
  jwt.verify(token, issuer, callback);
}
