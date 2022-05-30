const path = require("path");
const dist = path.resolve(__dirname, "dist");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-scss-extract-plugin");

module.exports = {
	mode: 'development',
	plugins: [
		new htmlWebpackPlugin({template: "./src/html/headers.html"}),
		new MiniCssExtractPlugin({
			filename: "[name].scss"
		})
	],

	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"scss-loader",
					"sass-loader"
				]
			},

		]
	},
	devServer: {
		contentBase: dist,
		open: true,
		overlay: true
	}
};
