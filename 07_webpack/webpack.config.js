import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import  path from "path";

const config = {
    devtool: "source-map", // generate orig file in src in source folder in debugger
    output: {
        clean:true,
        // overlay: true
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({template: "./src/html/index.html"}), // generate index,html in dist
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {test: /\.css$/i,
                use: ["style-loader", "css-loader"]}, // this is better in development
                //use: [MiniCssExtractPlugin.loader, "css-loader"]}, // betetr inm production
            // load assets referred from html pages
            // {test:/\.html?$/i,
            //     use: ['html-loader']},
            // Image assets
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                type: "asset"
            },
            // Font assets
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: "asset"
            },
        ]
    },
    devServer: {
        static: { directory: path.resolve( "dist")}, //check dist dir for geenrated file
        open: true //open index.html
    }
}
export default config