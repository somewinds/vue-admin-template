import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import router from '../router'
// 引入去抖
import debounce from 'throttle-debounce/debounce'

// 如果是本地开发且改参数有值，调用此接口（可随时修改不用重启），否则调用配置文件
// const DEV_API_ROOT = "http://lanhanba.net/api";
let DEV_API_ROOT = 'http://localhost/LinhuibaServer-GitLab/public/api'
if (process.env.NODE_ENV !== 'development' || !DEV_API_ROOT) {
  DEV_API_ROOT = process.env.API_ROOT
}

// 创建axios实例
const service = axios.create({
  baseURL: DEV_API_ROOT, // api 的 base_url
  // 覆写库的超时默认值
  // 现在，在超时前，所有请求都会等待 120 秒
  timeout: 120000, // 请求超时时间
  maxContentLength: 102400,
  headers: {
    'post': {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // client记录错误日志来自哪个端 pc/wap/(ios/android)/applet(小程序传)/bc(管理后台)
    // axios.defaults.headers.client = 'bc';
    'x-client': process.env.xClient,
    'x-client-version': process.env.xClientVersion
  }
})

// let cancel
Vue.prototype._reqManage = []

// request拦截器
service.interceptors.request.use(
  config => {
    // 用户已登录，添加token信息到header
    if (store.getters.token) {
      config.headers.Authorization = 'bearer' + store.getters.token
      // 其他调用处理
    }
    /* if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    } */
    if (config.configParams) {
      // 版本号，默认为空，版本号为v1
      if (config.configParams.version) {
        config.headers.Accept = 'application/vnd.linhuiba.' + config.configParams.version + '+json'
      }
      if (config.configParams.contentType) {
        config.headers.post['Content-Type'] = config.configParams.contentType
      }
      if (config.configParams.timeout) {
        config.timeout = config.configParams.timeout
      }
      // 可使用 GET/POST 请求，传递该参数值为 PUT，使得接口对该请求以 PUT 方式做处理
      if (config.configParams.httpMethod) {
        config.headers['X-HTTP-METHOD-OVERRIDE'] = config.configParams.httpMethod
      }
    }

    // get请求时，过滤并移除空值参数
    if (config.method.toUpperCase() === 'GET') {
      const data = config.params
      for (const item in config.params) {
        try {
          typeof data[item] === 'string' && (data[item] = data[item].trim())
        } catch (e) {
          console.log(e)
        }
        if (data[item] === '') {
          Reflect.deleteProperty(data, item)
        }
      }

      // 默认所有get接口都可以终止，除非设置 configParams.canCancelToken = false
      if (!config.configParams || config.configParams.canCancelToken !== false) {
        // 能否取消/终止请求
        // 取消/终止请求用参数 axios.CancelToken
        config.cancelToken = new axios.CancelToken(function executor(c) {
          // cancel = c
          try {
            Vue.prototype._reqManage
              ? Vue.prototype._reqManage.push({ url: config.url, cancel: c })
              : Vue.prototype._reqManage = new Array({ url: config.url, cancel: c })
          } catch (e) {
            console.log(e)
          }
        })
      }

    }

    // console.log(config)

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    // Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // 对response做判断，如果错误提示错误消息
    if (res.code === -99) {
      store.dispatch('LogOut').then(() => {
        location.href = '#/login' // 为了重新实例化vue-router对象 避免bug
        router.go(0)
      })
      // router.go(0)
    }
    return response
  },
  error => {
    if (axios.isCancel(error)) {
      // console.log('Request canceled', error.message);
      return {
        data: {
          code: -0,
          msg: '取消请求 Request canceled'
        }
      }
    } else {
      // 处理错误
    }
    if (error.response) {
      switch (error.response.status) {
        // 401 token失效
        case 401:
          store.commit('LogOut').then(() => {
            router.push({
              name: 'login',
              query: { redirect: router.currentRouter.fullPath }
            })
            Message({
              message: 'token已失效，请重新登录',
              type: 'error'
            })
          })
      }
    }
  }
)

// 新实例化vue
const new_vue = new Vue()
// 请求去抖延时周期，毫秒
new_vue.debounce = 600
// post 请求是否在请求中
new_vue.postRequesting = false
// 去抖延迟事件
new_vue.debouncedRequest = debounce(new_vue.debounce, callback => {
  callback()
})

// 如果返回验证消息，那么显示验证消息
export function showValidator(response) {
  const create_element = new_vue.$createElement

  const arr_result = []
  if (response.data.result) {
    for (const item in response.data.result) {
      if (response.data.result[item]) {
        arr_result.push(create_element('div', { style: 'color: #eb9e05' }, response.data.result[item]))
      }
    }
  } else if (response.data.msg) {
    if (typeof response.data.msg === 'string') {
      arr_result.push(create_element('div', { style: 'color: #eb9e05' }, response.data.msg))
    } else if (typeof response.data.msg === 'object') {
      for (const item in response.data.msg) {
        if (response.data.msg[item] && response.data.msg[item][0]) {
          arr_result.push(create_element('div', { style: 'color: #eb9e05' }, response.data.msg[item][0]))
        }
      }
    }
  }
  Message({
    message: create_element('p', null, arr_result),
    type: 'warning',
    duration: 8000
  })
}

export function get(url, param, successCallback, errorCallback, networkErrorCallback, configParams) {
  service.get(url, {
    params: param,
    configParams: configParams
  }).then(response => {
    // console.log(response)
    if (response.data.code === undefined) {
      if (successCallback) {
        successCallback(response.data)
      }
    } else if (response.data.code === 1) {
      if (successCallback) {
        successCallback(response.data.result)
      }
    } else if (response.data.code === -1002 || response.data.code === -1011) { // 接口返回参数验证错误
      showValidator(response)
      if (errorCallback) {
        errorCallback(response.data)
      }
    } else if (response.data.code === 0) {
      // 内部跳转页面取消/终止请求时返回的数据
    } else {
      Message({
        message: response.data.msg,
        type: 'error'
      })
      if (errorCallback) {
        errorCallback(response.data)
      }
    }
  }).catch(error => {
    console.log(error)
    Message({
      type: 'error',
      message: url + ':网络连接失败'
    })
    if (networkErrorCallback) {
      networkErrorCallback(error)
    }
  })
}

export function post(url, param, successCallback, errorCallback, networkErrorCallback, configParams) {
  // post请求时进行去抖延迟，即默认300ms之后才能再次请求
  new_vue.debouncedRequest(() => {
    // 延迟结束后postRequesting = false，可以再次请求
    new_vue.postRequesting = false
  })
  if (new_vue.postRequesting) {
    Message({
      type: 'warning',
      message: (new_vue.debounce / 1000) + 's内请勿重复请求'
    })
    if (errorCallback) {
      errorCallback((new_vue.debounce / 1000) + 's内请勿重复请求')
    }
    return false
  } else {
    new_vue.postRequesting = true
    service.post(url, param, {
      configParams: configParams
    }).then(response => {
      if (response.data.code === 1) {
        if (successCallback) {
          successCallback(response.data.result)
        }
      } else if (response.data.code === -1002 || response.data.code === -1011) { // 接口返回参数验证错误
        showValidator(response)
        if (errorCallback) {
          errorCallback(response.data)
        }
      } else {
        Message({
          message: response.data.msg,
          type: 'error'
        })
        if (errorCallback) {
          errorCallback(response.data)
        }
      }
    }).catch(error => {
      Message({
        type: 'error',
        message: url + ':网络连接失败'
      })
      if (networkErrorCallback) {
        networkErrorCallback(error)
      }
    })
  }
}

export function put(url, param, successCallback, errorCallback, networkErrorCallback, configParams) {
  service.put(url, {
    params: param
  }, {
    configParams: configParams
  }).then(response => {
    if (response.data.code === undefined) {
      if (successCallback) {
        successCallback(response.data)
      }
    } else if (response.data.code === 1) {
      if (successCallback) {
        successCallback(response.data.result)
      }
    } else if (response.data.code === -1002 || response.data.code === -1011) { // 接口返回参数验证错误
      showValidator(response)
      if (errorCallback) {
        errorCallback(response.data)
      }
    } else {
      Message({
        message: response.data.msg,
        type: 'error'
      })
      if (errorCallback) {
        errorCallback(response.data)
      }
    }
  }).catch(error => {
    Message({
      type: 'error',
      message: '网络连接失败'
    })
    if (networkErrorCallback) {
      networkErrorCallback(error)
    }
  })
}

export function remove(url, param, successCallback, errorCallback, networkErrorCallback, configParams) {
  service.delete(url, {
    params: param,
    configParams: configParams
  }).then(response => {
    if (response.data.code === undefined) {
      if (successCallback) {
        successCallback(response.data)
      }
    } else if (response.data.code === 1) {
      if (successCallback) {
        successCallback(response.data.result)
      }
    } else {
      Message({
        message: response.data.msg,
        type: 'error'
      })
      if (errorCallback) {
        errorCallback(response.data)
      }
    }
  }).catch(error => {
    Message({
      type: 'error',
      message: '网络连接失败'
    })
    if (networkErrorCallback) {
      networkErrorCallback(error)
    }
  })
}

// 接口为put时，接口接收参数格式为地址参数格式
export function jsonToUrlQuery(param) {
  let par = ''
  for (const value in param) {
    par += value + '=' + param[value] + '&'
  }
  par = par.substring(0, par.length - 1)
  return par
}

export default service
