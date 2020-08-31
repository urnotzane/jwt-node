import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from './index';

const compiler = webpack(config);
const app = express();
const PORT = 9000;

app.use(webpackDevMiddleware(compiler as any, {
  publicPath: (config as any).output.publicPath
}));

app.listen(PORT, function () {
  console.log(`App listening on http://loaclhost:${PORT}!\n`);
});