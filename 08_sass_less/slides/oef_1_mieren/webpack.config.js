import HtmlWebpackPlugin from "html-webpack-plugin"
import  path from "path";

const config = {
    devtool: "source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: ["style-loader", "scss-loader","sass-loader"]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: "./src/html/index.html"})],
    devServer: {
        static: { directory: path.resolve( "dist")},
        open: true
    },
    output: {
        clean: true,
    }
}
export default config
