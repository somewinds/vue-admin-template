// 预演环境 http://bi.lanhanba.com
var merge = require('webpack-merge')
var prodEnv = require('./prod.env') // 基于prod环境配置参数

module.exports = merge(prodEnv, {
  NODE_ENV: '"stage"',
  API_ROOT: '"http://lanhanba.com/api"', // 预演环境
  PC_URL: '"http://lanhanba.com"', // 预演环境PC地址
})
