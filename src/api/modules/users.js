import { get } from '@/utils/request'

// 获得用户列表
export function getBuyers(param, successCallback, errorCallback) {
  get('/inner/buyers', param, successCallback, errorCallback, errorCallback)
}
