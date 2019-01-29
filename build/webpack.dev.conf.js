'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  // vue调试工具，含7种SourceMap模式，开启后会使热更新稍慢
  // 开发环境推荐：cheap-module-eval-source-map
  // 生产环境推荐：cheap-module-source-map
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  // 参数参考文档：https://segmentfault.com/a/1190000012383015
  devServer: {
    clientLogLevel: 'warning',
    // 如果为 true ，页面出错不会弹出 404 页面
    // 如果为 {...} , 看看一般里面有什么。
    // historyApiFallback: {
    //   // url 匹配正则，匹配成功就到某个页面
    //   // 并不建议将路由写在这，一般 historyApiFallback: true 就行了
    //   rewrites: [
    //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
    //   ],
    //   // verbose：如果 true ，则激活日志记录。
    //   // disableDotRule： 禁止 url 带小数点 . 。
    // },
    historyApiFallback: true,
    hot: true, // 热模块更新作用
    // 你要提供哪里的内容给虚拟服务器用。这里最好填 绝对路径。
    // 默认情况下，它将使用您当前的工作目录来提供内容。
    // contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,  // 如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用。
    host: HOST || config.dev.host, // 主机名
    port: PORT || config.dev.port, // 端口号
    open: config.dev.autoOpenBrowser, // true，则自动打开浏览器
    // 如果为 true ，在浏览器上全屏显示编译的errors或warnings。默认 false （关闭）
    // 如果你只想看 error ，不想看 warning。
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // 配置了 publicPath后， url = '主机名' + 'publicPath配置的' +
    // '原来的url.path'。这个其实与 output.publicPath 用法大同小异。
    // output.publicPath 是作用于 js, css, img 。而 devServer.publicPath 则作用于请求路径上的。
    publicPath: config.dev.assetsPublicPath,
    // 当您有一个单独的API后端开发服务器，并且想要在同一个域上发送API请求时，则代理这些 url 
    proxy: config.dev.proxyTable,
    // true，则终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的。
    quiet: true, // necessary for FriendlyErrorsPlugin
    // 一组自定义的监听模式，用来监听文件是否被改动过。
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env, // require('../config/dev.env')
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    // 在热加载时直接返回更新文件名，而不是文件的id，可关闭
    // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: resolve('favicon.ico'),
      title: 'vue-admin-template'
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`
            ]
          },
          // 此处调用了一个模块，可以在GitHub上找到，它是一个原生的操作系统上发送通知的nodeJS模块。用于返回脚手架错误的函数
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
