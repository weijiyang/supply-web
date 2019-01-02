const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        compress: true,
        host: 'localhost',
        port: 8888,
        overlay: true
    }
});