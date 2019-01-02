const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const analyzer = require('./webpack.analyzer.js')
const speedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new speedMeasurePlugin()
module.exports = smp.wrap(merge(common, analyzer, {
    mode: 'production'
}))