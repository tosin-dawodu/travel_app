const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
module.exports = {
  entry: ["regenerator-runtime/runtime.js", "./src/client/index.js"],
  mode: "production",
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/views/form.html",
      filename: "./form.html",
    }),
    new WorkboxPlugin.GenerateSW(),
  ],
};
