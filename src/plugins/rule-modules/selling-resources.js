// 供给
import { INT_NUMBER_REG } from '../regular'

/**
 * 供给列表查询用验证
 * @type {Object}
 */
export function getSellingResourcesRules(data) {
  return {
    'update_days': [{
      pattern: INT_NUMBER_REG,
      message: '请输入整数'
    }]
  }
}
