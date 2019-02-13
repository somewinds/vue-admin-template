import { logout, getInfo } from '@/api/login'
import { removeToken } from '@/utils/auth'

const user = {
  state: {
    name: '',
    avatar: '',
    roles: [],

    operation_tasks: {
      user: {
        enterprise: 0,
        invitation: 0,
        property_application: 21
      }
    }, // 左侧导航显示的任务数
    user: null, // 当前用户
    token: null, // 用户调用API的token
    permissions: [], // 用户可以进行的操作，文字形式
    authed_urls: [] // 可以访问的页面
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    LOGIN: (state, user) => {

      /* // 重置自定义筛选、table列
        store.commit('X_TABLE_COLUMN/RESET_ALL_TABLE_COLUMNS');
        store.commit('X_SEARCH_PARAMS_SELECTION/RESET_ALL_SHOW_SEARCH_PARAMS'); */

    },
    /* LOGOUT: (state) => {
      console.log('logout')
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('token')
      state.user = null
      state.token = null
      window.localStorage.removeItem('permissions')
      state.permissions = []
      state.authed_urls = []
    }, */
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, user) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        window.localStorage.setItem('user', JSON.stringify(user))
        commit('SET_USER', user)
        window.localStorage.setItem('token', user.apikey)
        commit('SET_TOKEN', user.apikey)
        resolve()

        /* login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        }) */
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log('LogOut')
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('token')
        state.user = null
        state.token = null
        window.localStorage.removeItem('permissions')
        state.permissions = []
        state.authed_urls = []
        resolve()
        /* logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        }) */
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
