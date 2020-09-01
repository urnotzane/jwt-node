import jwt, { VerifyCallback, JsonWebTokenError } from 'jsonwebtoken';

import { TokenPayload } from './../../types/server';
import { tokenPrefix, issuer } from '../constants';

export const createToken = (payload:TokenPayload) => {
  const clearToken = jwt.sign({
    ...payload,
  }, issuer, {
    issuer,
    expiresIn: '1m',
  });

  return `${tokenPrefix} ${clearToken}`;
};

export const verifyToken = (token:string, callback:VerifyCallback) => {
  if (!token) {
    callback(new JsonWebTokenError('Token is null'), undefined)
    return;
  }
  token = decodeURIComponent(token);
  if (token.indexOf(tokenPrefix) === 0) {
    token = token.split(' ')[1];
  }
  jwt.verify(token, issuer, callback);
}
