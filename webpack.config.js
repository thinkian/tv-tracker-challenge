const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    main: ["babel-polyfill", "./src/index.js"]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    disableHostCheck: true,
    host: "localhost",
    hot: true,
    open: true,
    openPage: "",
    port: 8000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  node: {
    dns: "empty",
    global: true,
    fs: "empty",
    net: "empty",
    process: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({
      verbose: false
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new HtmlWebpackPlugin({
      title: "TV Tracker Challenge",
      template: "./src/index.html"
    }),
    new TerserPlugin({
      sourceMap: true
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    modules: [path.resolve("./src"), path.resolve("./node_modules")]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
