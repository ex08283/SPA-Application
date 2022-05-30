import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

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
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, "scss-loader", "sass-loader"]
            }
        ]
    },
    output: {
        clean: true
    },
    devServer: {
        hot: false,     // hot reloading enablen
        liveReload: true,
        static: {
            directory: path.resolve("dist")
        },
        open: true
    }
}

export default config;
