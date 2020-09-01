import { RequestHandler } from "express"
import { verifyToken } from "../utils/token";

export const verifyTokenMiddleware:RequestHandler = (req, res, next) => {
  const { cookies, headers, url } = req;
  // 只会在api下校验
  if (url.indexOf('/api') !== 0 || url.indexOf('/login') > -1) {
    next();
    return;
  }
  const { token } = cookies;
  verifyToken(headers.authorization || token, (error) => {
    if (error) {
      res.status(401).send({
        data: undefined,
        success: false,
        code: 401,
        message: error.message,
      });
    } else {
      next();
    }
  })
}