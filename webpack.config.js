const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./app/client/index.js",
  output: {
    path: path.join(__dirname, "public/"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{ test: /\.css$/, loader: "style-loader!css-loader" }],
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: "/public"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "css/bundle.css",
      disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};
