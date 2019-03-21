const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const common = require('./webpack.common.js')
module.exports = merge(common, {
    mode: 'production',
    plugins: [
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, "../dll"),
        manifest: require(path.resolve(__dirname,'../dll',"vender-manifest.json"))
      }),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [path.posix.join(__dirname, '../build', process.env.PROJECT, 'js/dll.lib.js')],
        hash: true,
        append: false
      })
    ]
});