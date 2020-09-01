import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ms from "ms";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import md5 from 'blueimp-md5';

import { LoginParams } from "../types/request";
import { isAllowedOrigin } from "./utils";
import { createToken, verifyToken } from "./utils/token";
import { IResponse, TokenPayload } from "../types/server";
import { verifyTokenMiddleware } from "./middleware/verify-token";
import config from '../webpack/index';

const app = express();
const PORT = 3000;
const compiler = webpack(config);

// front server
app.use(webpackDevMiddleware(compiler as any, {
  publicPath: (config as any).output.publicPath
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(verifyTokenMiddleware);
app.use((err: any, req: any, res: any, next: any) => {
  console.log(err)
  next();
});

app.all("/api/*", function(req, res, next) {
  const { origin } = req.headers;
  if (origin) {
    if (isAllowedOrigin(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next()
  }
  res.end();
});
app.get<{}, IResponse<TokenPayload | undefined>>("/api/token", (req, res) => {
  const { cookies, headers } = req;
  const { token } = cookies;
  verifyToken(headers.authorization || token, (error, decode) => {
    if (!error) {
      const { userId, username, isAdmin } = decode as TokenPayload;
      res.send({
        data: {
          userId,
          username,
          isAdmin,
        },
        success: true,
        code: 204,
        message: "",
      });
    }
  });
});
app.get<{}, IResponse<number>>("/api/page-num", (req, res) => {
  res.send({
    data: 10,
    success: true,
    code: 200,
    message: "",
  });
});
app.post<{}, IResponse<string>, LoginParams>("/api/login", (req, res) => {
  const { body } = req;
  const pwd = '';
  if (pwd === md5(body.password)) {
    const token = createToken({
      userId: 110,
      username: body.username,
      isAdmin: true,
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: ms("2m"),
      // 解决空格乱码问题
      encode: decodeURIComponent,
      sameSite: true,
    });
    res.send({
      data: token,
      success: true,
      code: 200,
      message: "",
    });
  } else {
    res.status(422);
    res.send({
      data: '',
      success: false,
      code: 422,
      message: "Password or username is wrong",
    })
  }
});

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
