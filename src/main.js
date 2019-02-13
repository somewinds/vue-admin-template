import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'font-awesome/css/font-awesome.min.css' // 引入font-awesome

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/scss/linhuiba.scss' // global css
import '@/styles/css/linhuiba.css' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import moment from 'moment'

Vue.use(ElementUI, { size: 'medium' })

Vue.config.productionTip = false

moment.locale('zh-CN')
window.moment = moment
// window.echarts = echarts

Vue.prototype.$moment = moment

// Require Froala Editor js file.
// 引入富文本编辑器
require('froala-editor/js/froala_editor.pkgd.min')
require('froala-editor/js/languages/zh_cn.js')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
// require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)

store.dispatch('ResetFromStorage')

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

