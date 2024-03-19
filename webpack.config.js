const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = false;
module.exports = {
  mode: "development",
  entry: {
    app: "./src/js/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new HtmlWebpackPlugin({
      title: "Home",
      filename: "index.html",
      template: "src/index.html",
      favicon: "src/assets/favicon.ico",
      scriptLoading: "module",
      chunks: ["app"],
    }),
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset",
        use: "svgo-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
    },
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    assetModuleFilename: "assets/[name][ext]",
    clean: true,
  },
};
