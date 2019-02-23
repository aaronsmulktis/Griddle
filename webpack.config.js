const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const webpack = require("webpack");
const failPlugin = require("webpack-fail-plugin");
const path = require("path");

module.exports = {
  devtool: "source-map",
  entry: "./src/module.js",
  output: {
    path: path.join(__dirname, "/dist/umd/"),
    filename: "griddle.js",
    publicPath: "/build/",
    library: "Griddle",
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: ["/node_modules/", "/stories/", "/storybook-static/"],
        cacheDirectory: true,
        query: {
          plugins: ["lodash"],
          presets: ["es2015", "stage-0", "react"]
        }
      }
    ]
  },
  plugins: [
    failPlugin,
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  externals: [
    {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ]
};
