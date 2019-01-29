'use strict'
// 本地环境 http://localhost:9091
const merge = require('webpack-merge')
const prodEnv = require('./prod.env') // 基于prod环境配置参数

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://localhost/LinhuibaServer-GitLab/public/api"', // 本地接口
  BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // API_ROOT: '"http://lanhanba.net/api"', // 日常bug需求开发+
  PC_URL: '"http://lanhanba.net"', // 测试环境PC地址
})
