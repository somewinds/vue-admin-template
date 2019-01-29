// 集成开发环境 http://bi.linhui.com
var merge = require('webpack-merge')
var prodEnv = require('./prod.env') // 基于prod环境配置参数

module.exports = merge(prodEnv, {
  NODE_ENV: '"integration"',
  API_ROOT: '"http://linhui.com/api"', // 集成开发环境
  PC_URL: '"http://linhui.com"', // 集成环境PC地址
})
