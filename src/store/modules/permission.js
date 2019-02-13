import { asyncRouterMap, constantRouterMap } from '@/router'

// /**
//  * 通过meta.role判断是否与当前用户权限匹配
//  * @param roles
//  * @param route
//  */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

// /**
//  * 递归过滤异步路由表，返回符合用户角色权限的路由表
//  * @param routes asyncRouterMap
//  * @param roles
//  */
// function filterAsyncRouter(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = { ...route }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRouter(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }

/**
 * 通过path判断是否与当前用户可访问路由数组匹配
 * @param authed_urls
 * @param route
 */
function hasPermissionByAuthedUrls(authed_urls, route) {
  if (route.path === '' || route.path === '/') {
    return true
  } else {
    return authed_urls.some(authed_url => {
      if(authed_url && authed_url.length > 0){
        return authed_url.split('|').some(url => {
          if (url.indexOf('/{id}') >= 0) {
            // 使 如 /resources/{id} 能够匹配到 /resources/1
            var re = new RegExp(url.replace('/{id}', '/(\\d)*'))
            if (re.test(route.path)) {
              return true
            }
          } else if (url === route.path) {
            return true
          }
          return false
        })
      } else {
        return false
      }
    })
  }
}

/**
 * 递归过滤异步路由表，返回符合用户可访问路由数组的路由表
 * @param routes asyncRouterMap
 * @param authed_urls
 */
function filterAsyncRouterByAuthedUrls(routes, authed_urls) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermissionByAuthedUrls(authed_urls, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouterByAuthedUrls(tmp.children, authed_urls)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],

    permissions: [], // 用户可以进行的操作，文字形式
    authed_urls: [] // 可以访问的页面
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    // 更新用户权限
    UPDATE_ABILITIES(state, permissions) {
      window.localStorage.setItem('permissions', JSON.stringify(permissions))
      if (permissions.label) {
        state.permissions = permissions.label
      } else {
        state.permissions = []
      }
      if (permissions.menu_uri) {
        state.authed_urls = permissions.menu_uri
      } else {
        state.authed_urls = []
      }
    },
    RESET_GENERATE_ROUTES(state) {
      console.log('RESET_GENERATE_ROUTES')
      state.routers = []
      state.addRouters = []
      state.permissions = []
      state.authed_urls = []
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles, authed_urls } = data
        // asyncRouterMap 动态路由，根据权限判断是否插入到路由数组中
        // roles          用户角色，如果动态路由中包含 meta.roles: ['admin', 'editor']，及当角色为admin、editor才能看到次路由
        // authed_urls    可访问路由，当前登录用户能够（看到并）访问的路由
        let accessedRouters
        if (Array.isArray(roles) && roles.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else {
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          // console.log(asyncRouterMap, roles, authed_urls)
          accessedRouters = filterAsyncRouterByAuthedUrls(asyncRouterMap, authed_urls)
          // accessedRouters = filterAsyncRouterByAuthedUrls(asyncRouterMap, ['/users', '/users/view/{id}', '/businesses/edit|/businesses/edit/{id}'])
          // accessedRouters = asyncRouterMap
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
