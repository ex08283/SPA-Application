import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-scss-extract-plugin";

import path from 'path';

const dist = path.resolve("dist")

const config = {
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/html/starter.html'
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      { test: /\.s?css$/,
        use : [MiniCssExtractPlugin.loader,"scss-loader","sass-loader"] }
    ]
  },
  output: {
    clean:true
  },
  devServer: {
    contentBase: dist,
    open: true,
    overlay: true,
    compress:true
  }
};

export default config;