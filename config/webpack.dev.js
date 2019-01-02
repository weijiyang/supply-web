const webpack = require('webpack')
const path = require("path")
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common, {
    mode: 'development',
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '##',
            cacheGroups: {
                test: {
                    name: 'async',
                    chunks: "async",
                    minSize: 1
                },
                common: {
                    name:'common',
                    chunks: "initial",
                    minSize: 1,
                    filename: "[name].bundle.js"
                },
                vender: {
                    name: 'vender',
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    filename: 'vender.[chunkhash].bundle.js'
                }
            }
        },
        runtimeChunk: {
            name: "manifest"
        }
    },
    devServer: {
        historyApiFallback: true,
        compress: true,
        host: 'localhost',
        port: 8888,
        overlay: true,
        openPage: 'build/main.html',
        // hot: true,
        // inline: true
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, "./dll"),
            manifest: require(path.resolve(__dirname,'./dll',"vender-manifest.json"))
        }),
        // new webpack.HotModuleReplacementPlugin()
    ]
});