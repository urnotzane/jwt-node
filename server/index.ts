import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import { LoginParams } from "../types/request";
import { isAllowedOrigin } from "./utils";

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
  res.send({
    data: req.cookies,
  });
});
app.get("/page-num", (req, res) => {
  res.send({
    data: 10,
  });
});
app.post<{}, {}, LoginParams>("/login", (req, res) => {
  res.cookie("jwt-token", "urnotzane", {
    httpOnly: true,
    maxAge: 10000,
  });
  res.sendStatus(204);
});

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
