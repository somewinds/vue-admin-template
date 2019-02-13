// 展位
import * as regs from '../regular'

/**
 * 展位列表查询用验证
 * @type {Object}
 */
export function getPhysicalResourcesRules(data) {
  return {
    'update_days': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }]
  }
}

/**
 * 展位转移
 * @type {Object}
 */
export const transfer_physical_resource = {
  'new_community_id': [{
    required: true,
    message: '请选择接收的场地'
  }],
  'ids': [{
    validator: (rule, value, callback) => {
      console.log(value)
      if (!value || value.length <= 0) {
        callback(new Error('请选择被转移的展位'))
        return false
      }
      callback()
    }
  }]
}
