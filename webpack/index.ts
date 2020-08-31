import * as path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { Configuration } from "webpack";

const DIST = path.join(__dirname, "../../dist");
const config:Configuration = {
  entry: "./src/index.tsx",
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: DIST,
    filename: "main.js",
    publicPath: '/',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader", // 将 Sass 编译成 CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'JWT',
      template: path.resolve(__dirname, '../../src/index.html'),
    }),
  ]
};

export = config;
