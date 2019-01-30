import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user
  },
  getters,
  actions: {
    ResetFromStorage({ commit }) {
      if (window.localStorage) {
        if (window.localStorage.hasOwnProperty('user')) {
          const user = window.localStorage.getItem('user')
          if (typeof user === 'string') {
            commit('SET_USER', JSON.parse(user))
          }
          commit('SET_TOKEN', window.localStorage.getItem('token'))
        }
        if (window.localStorage.hasOwnProperty('permissions')) {
          const permissions = window.localStorage.getItem('permissions')
          if (typeof permissions === 'string') {
            commit('UPDATE_ABILITIES', JSON.parse(permissions))
          }
        }
      }
    }
  }
})

export default store
