const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dist = path.resolve(__dirname, "dist");
const miniCssExtractPlugin = require("mini-scss-extract-plugin");

module.exports = {
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        // use: ["style-loader", "scss-loader","sass-loader"],
        use: [miniCssExtractPlugin.loader, "scss-loader", "sass-loader"],
      },
      // Image assets
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
      // Font assets
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/html/index.html"),
    }),
    new miniCssExtractPlugin(),
  ],
  devServer: {
    contentBase: dist,
    open: true,
    compress: true,
    overlay: true,
  },
  output: {
    clean: true,
  },
};
