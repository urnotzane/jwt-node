import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import ms from 'ms';

import { LoginParams } from "../types/request";
import { isAllowedOrigin } from "./utils";
import { createToken, verifyToken } from "./utils/token";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

app.all("*", function(req, res, next) {
  const { origin } = req.headers;
  if (origin) {
    if (isAllowedOrigin(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next()
  }
  res.end();
});
app.get("/token", (req, res) => {
  const { cookies } = req;
  const { token } = cookies;
  verifyToken(token, (error, decode) => {
    if (error) {
      res.status(401).send(error);
    } else {
      res.send({
        data: decode,
      });
    }
  })
});
app.get("/page-num", (req, res) => {
  res.send({
    data: 10,
  });
});
app.post<{}, {}, LoginParams>("/login", (req, res) => {
  const { body } = req;
  res.cookie("token", createToken({
    userId: 110,
    username: body.username,
    isAdmin: true,
  }), {
    httpOnly: true,
    maxAge: ms('2m'),
    // 解决空格乱码问题
    encode: decodeURIComponent,
    sameSite: true,
  });
  res.sendStatus(204);
});

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
