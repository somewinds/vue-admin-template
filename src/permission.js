import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import Vue from 'vue'

// // permission judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      // NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息

          // const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          const roles = ['admin', 'dynamic-table'] // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            console.log(router)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
          // next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log('无权限进入')
      // 如果无权限访问，进行提示，并给出跳转至登录页的链接供用户选择是否重新登录
      const create_element = new Vue().$createElement
      Message({
        message: create_element('p', null, [
          create_element('span', {
            style: {
              color: '#fa5555'
            }
          }, '您没有权限访问此页面，'),
          create_element('span', {
            // 正常的 HTML 特性
            style: {
              color: '#20A0FF',
              cursor: 'pointer'
            },
            on: {
              click() {
                next({
                  path: '/login'
                })
              }
            }
          }, '请重新登录')
        ]),
        type: 'error'
      })
      // next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
