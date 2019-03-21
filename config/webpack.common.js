// 一个最基本的`webpack`配置文件
const path = require('path')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderConfig = require('./vue-loader.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const utils = require('./utils')
const package = require('../package')
function resolve (dir) {
  return path.posix.join(__dirname, '..', dir)
}
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [path.posix.join(__dirname, '../web')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: false
  }
})
process.env.PROJECT = package.project
module.exports = {
    entry: {
      app: path.resolve(__dirname, "../web", process.env.PROJECT, "pages/app.js")
    },
    output: {
      path: path.resolve(__dirname, "../build", process.env.PROJECT, "js"),
      filename: "[name].build.js",
      publicPath: process.env.NODE_ENV === 'production'
      ? 'http://temp.com/' : '/',
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, "../web", process.env.PROJECT)
      }
    },
    module: {
      rules: [
        ...(process.env.Node_ENV === 'development' ? [createLintingRule()] : []),
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig
        },
        // {
        //   test: /\.js$/,
        //   loader: 'babel-loader',
        //   include: [resolve('web')]
        // },
        {
          test: /\.js$/,
          loader: 'happypack/loader?id=happyBabel',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    },
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          // test: {
          //   name: 'async',
          //   chunks: "async"
          // },
          // initial: {
          //   chunks: "initial",
          //   filename: "initial.bundle.js"
          // },
          vender: {
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            filename: 'vender.bundle.js'
          }
        }
      },
      runtimeChunk: {
        name: "manifest"
      }
  },
    plugins: [
      new VueLoaderPlugin(),
      new HappyPack({
        id: 'happyBabel',
        loaders: [{
          loader: 'babel-loader',
          options: {
            plugins: ['syntax-dynamic-import']
          }
        }],
        threadPool: happyThreadPool,
        verbose: true
      }),
      // new CleanWebpackPlugin('build/*',{
      //   root: path.resolve(__dirname, '../'),
      //   exclude:['dll.lib.js']
      // }),
      new htmlWebpackPlugin({
        filename: process.env.NODE_ENV === 'production' ? '../../../index.html' : 'index.html',
        template: 'template.html',
        inject: true
      })
    ]
}