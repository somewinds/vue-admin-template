// 测试环境 http://bi.lanhanba.net
var merge = require('webpack-merge')
var prodEnv = require('./prod.env') // 基于prod环境配置参数

module.exports = merge(prodEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://lanhanba.net/api"', // 测试环境
  PC_URL: '"http://lanhanba.net"', // 测试环境PC地址
})
