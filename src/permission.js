import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权
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
  if (store.getters.token) {
    if (to.path === '/login') {
      next()
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      const authed_urls = store.getters.authed_urls // 用户可访问路由
      if (store.getters.roles.length === 0) {
        // const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
        const roles = ['dynamic-tabxle'] // note: roles must be a array! such as: ['editor','develop']
        store.commit('SET_ROLES', roles)
        store.dispatch('GenerateRoutes', { roles, authed_urls }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        })
      }

      const path = to.path
      // 如果访问的路由存在于 登录时返回的可访问路由数组 中，或满足 my-、resource-profile 等路由，可以访问；
      // 否则进一步判断
      if (path === '/' || path === '/dashboard' ||
        authed_urls.indexOf(path) >= 0 ||
        path.indexOf('my-') >= 0 ||
        path.indexOf('resource-profile') >= 0 ||
        path.indexOf('performances') >= 0 ||
        path.indexOf('processes') >= 0 ||
        path.indexOf('forms') >= 0) {
        next()
        NProgress.done()
      } else {
        let authed = false // 有无权限访问页面路由
        // 遍历登录时返回的可访问路由数组，如果 能匹配到 /{id} 则返回true
        authed = authed_urls.some(authed_url => {
          if (authed_url && authed_url !== '' && authed_url !== '/') {
            if (authed_url.indexOf('/{id}') >= 0) {
              // 使 如 /resources/{id} 能够匹配到 /resources/1
              var re = new RegExp(authed_url.replace('/{id}', '/(\\d)*'))
              if (re.test(path)) {
                return true
              }
            } else if (authed_url.indexOf('|') >= 0) {
              const arr_authed_url = authed_url.split('|')
              return arr_authed_url.some(url => url === path)
            } else {
              if (authed_url === path) {
                return true
              }
            }
          }
          return false
        })
        if (authed) {
          next()
          NProgress.done()
        } else {
          // 如果无权限访问，进行提示，并给出跳转至登录页的链接供用户选择是否重新登录
          const create_element = new Vue().$createElement
          Message({
            message: create_element('p', null, [
              create_element('span', {
                style: {
                  color: '#fa5555'
                }
              }, '您没有权限访问此页面 ' + path + '，'),
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
          NProgress.done()
          return false
        }
      }

    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      Message({
        message: '您还没有登录，请登录',
        type: 'error'
      })
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
