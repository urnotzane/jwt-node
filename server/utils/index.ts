import { allowOrigins } from '../constants';

export const isAllowedOrigin = (origin:string) => {
  const originFinder = allowOrigins.find((i) => origin.indexOf(i) > -1);
  return !!originFinder;
};