'use strict'
const path = require('path')        //NodeJS中的Path对象，用于处理目录的对象，提高开发效率
const utils = require('./utils')    //给整个CLI提供方法
const config = require('../config') //开发环境的配置
const vueLoaderConfig = require('./vue-loader.conf')  //分析是否为生产环境，然后根据不同的环境来加载配置功能

function resolve (dir) {          //合并path路径
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({   //eslint代码规范验证
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {                  //编译入口文件
    app: './src/main.js'        
  },
  output: {                 //编译输出路径
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],     //require时省略的扩展名,如：require('module'),不需要require('module.js')
    alias: {                                  //别名,可以直接使用别名来代表设定的路径及其他
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {       //加载器
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),      
      {         //解析.vue文件
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {         //转化ES6的语法
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {         //图片转化
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],       //不处理src/icons下的文件
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {         //svg当作icon的处理
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],      //只处理src/icons下的文件
        options: {
          symbolId: 'icon-[name]'
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
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
