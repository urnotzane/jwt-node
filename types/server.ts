export type TokenPayload = {
  username: string;
  userId: number;
  isAdmin?: boolean;
};

export type IResponse<T> = {
  code: string | number;
  data: T | string;
  message: string;
  success: boolean;
};
