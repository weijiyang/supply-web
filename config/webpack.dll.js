const webpack = require('webpack')
const path = require("path")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const package = require('../package')
const vendors = [
    'element-ui',
    'vue',
    'v-charts',
    'echarts'
];

process.env.PROJECT = package.project
module.exports = {
    mode: 'development',
    entry: {
        lib: vendors
    },
    output: {
        path: path.resolve(__dirname, '../build', process.env.PROJECT, 'js'),
        filename: 'dll.[name].js',
        library: '[name]'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin('dll/*.*', {
            root: path.resolve(__dirname, '../')
        }),
        new webpack.DllPlugin({
            context: path.resolve(__dirname, "../dll"),
            path: path.resolve(__dirname, "../dll", "vender-manifest.json"),
            name: '[name]'
        })
    ]
};