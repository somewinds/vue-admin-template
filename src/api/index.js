// import { showValidator, post, get, put, remove, jsonToUrlQuery } from '@/utils/request'
import { get, post } from '@/utils/request'

// api调用封装
// 用户登录
export function postLogin(param, successCallback, errorCallback) {
  post('/inner/login', param, successCallback, errorCallback, errorCallback)
}

// 退出登录
export function postLogout(param, successCallback, errorCallback) {
  post('/inner/logout', param, successCallback, errorCallback, errorCallback)
}

// 获取权限
export function getPermission(param, successCallback, errorCallback) {
  get('/inner/permissions/view', param, successCallback, errorCallback, errorCallback)
}

// 基本属性
// 获取所有/已开通城市
export function getSites(param, successCallback, errorCallback) {
  // 如果 status 不传则默认赋予2，查询后台开通城市（1 全部端显示，2 用户端不开通，后台开通，接口将查询 status <= status）
  !param.status && (param.status = 2)
  get('/inner/city/located', param, successCallback, errorCallback, errorCallback)
}

// 获取七牛token
export function getQiniuToken(param, successCallback, errorCallback) {
  get('/inner/qiniu-token', param, successCallback, errorCallback, errorCallback)
}

// 文章管理
export function getArticleTypes(param, successCallback, errorCallback) {
  get('/inner/article-types', param, successCallback, errorCallback, errorCallback)
}

export function storeArticleType(param, successCallback, errorCallback) {
  post('/inner/article-types', param, successCallback, errorCallback, errorCallback)
}

export function deleteArticleType(param, successCallback, errorCallback) {
  const id = param.id
  remove('/inner/article-types/' + id, param, successCallback, errorCallback, errorCallback)
}

export function getArticles(param, successCallback, errorCallback) {
  get('/inner/articles', param, successCallback, errorCallback, errorCallback)
}

export function getArticle(param, successCallback, errorCallback) {
  const id = param.id
  get('/inner/articles/view/' + id, param, successCallback, errorCallback, errorCallback)
}

export function storeArticle(param, successCallback, errorCallback) {
  post('/inner/articles', param, successCallback, errorCallback, errorCallback)
}

export function deleteArticle(param, successCallback, errorCallback) {
  const id = param.id
  remove('/inner/articles/' + id, param, successCallback, errorCallback, errorCallback)
}