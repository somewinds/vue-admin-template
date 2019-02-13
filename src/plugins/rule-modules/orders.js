// 订单
import * as regs from '../regular'

/**
 * 订单审核：通过
 * @type {Object}
 */
export const orderItemsApproveRules = {
  'field_order_items': [{
    type: 'array',
    required: true,
    min: 1,
    message: '请选择订单'
  }, {
    validator: (rule, value, callback) => {
      for (const item of value) {
        if (!Array.isArray(item.promotion_purpose_ids) || item.promotion_purpose_ids.length === 0) {
          callback(new Error(`订单编号：${item.id}，请至少选择一项推广目的`))
          return false
        }
        if (!Array.isArray(item.spread_way_ids) || item.spread_way_ids.length === 0) {
          callback(new Error(`订单编号：${item.id}，请至少选择一项推广形式`))
          return false
        }
      }
      callback()
    }
  }]
}

/**
 * 订单审核：拒绝
 * @type {Object}
 */
export function getOrderItemsRejectRules(data) {
  return {
    'field_order_items': [{
      type: 'array',
      required: true,
      min: 1,
      message: '请选择订单'
    }, {
      validator: (rule, value, callback) => {
        for (const item of value) {
          if (!Array.isArray(item.promotion_purpose_ids) || item.promotion_purpose_ids.length === 0) {
            callback(new Error(`订单编号：${item.id}，请至少选择一项推广目的`))
            return false
          }
          if (!Array.isArray(item.spread_way_ids) || item.spread_way_ids.length === 0) {
            callback(new Error(`订单编号：${item.id}，请至少选择一项推广形式`))
            return false
          }
        }
        callback()
      }
    }],
    'reject_type': [{
      required: true,
      message: '请选择拒绝类别'
    }],
    'reject_reason': [{
      required: data.reject_type === '其他',
      message: '请填写拒绝原因'
    }]
  }
}

/**
 * 取消订单
 * @type {Object}
 */
export function getOrderItemsCancelRules(data) {
  return {
    'cancel_type': [{
      required: true,
      message: '请选择取消类别'
    }],
    'cancel_reason': [{
      required: data.cancel_type === '其他',
      message: '请填写取消原因'
    }],
    'supplier_refund_type': [{
      required: true,
      message: '请选择供应商退款给邻汇类型'
    }],
    'field_order_items': [{
      validator: (rule, value, callback) => {
        if (data.supplier_refund_type === 'part_amount') {
          for (const item of value) {
            if (!item.linhui_refund_price) {
              callback(new Error('请输入退款金额'))
              return false
            }

            if (!regs.TWO_DECIMAL_NUMBER_REG.test(item.linhui_refund_price)) {
              callback(new Error('退款金额请输入两位小数点小数'))
              return false
            }

            if (item.linhui_refund_price * 100 > item.expense) {
              callback(new Error('输入的部分退款金额不能高于全部金额'))
              return false
            }
          }
        }

        callback()
      }
    }]
  }
}

/**
 * 回访表单验证
 * @type {Object}
 */
export const visit_rules = {
  'score': [{
    type: 'enum',
    required: true,
    enum: [1, 2, 3, 4, 5],
    message: '请选择整体印象'
  }, {
    validator: (rule, value, callback) => {
      if (value < 1) {
        callback(new Error('请选择整体印象'))
      }
      callback()
    }
  }],
  'industry_arr': [{
    type: 'array',
    required: true,
    len: 2,
    message: '请选择行业'
  }, {
    validator: (rule, value, callback) => {
      if (value.some(item => !item)) {
        callback(new Error('请选择行业啊啊啊啊啊啊啊啊'))
        return false
      }
      callback()
    }
  }],
  'score_of_propertymatching': [{
    required: true,
    message: '请选择物业服务'
  }],
  'score_of_goalcompletion': [{
    required: true,
    message: '请选择推广效果'
  }],
  'sold_amount': [{
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '交易额请输入两位小数点小数'
  }],
  'fans_wechat': [{
    pattern: regs.INT_NUMBER_REG,
    message: '新增粉丝数请输入整数'
  }],
  'app_downloads': [{
    pattern: regs.INT_NUMBER_REG,
    message: '新增下载量请输入整数'
  }],
  'fans': [{
    pattern: regs.INT_NUMBER_REG,
    message: '实际获客数请输入整数'
  }],
  'gender': [{
    pattern: regs.INT_TWO_WITHIN_100_REG,
    message: '男女比例请输入100以内的两位整数'
  }],
  'number_of_people': [{
    required: true,
    pattern: regs.INT_NUMBER_REG,
    message: '请输入现场人流量，整数'
  }],
  'age': [{
    required: true,
    message: '请选择年龄层'
  }]
}

/**
 * 指派财务，付款给物业
 * @type {Object}
 */
export function assignToFinanceRules(data) {
  return {
    'selected_receivable_info': [{
      type: 'object',
      required: true,
      message: '请选择或填写收款账号信息'
    }, {
      validator: (rule, value, callback) => {
        if (!data.is_new_receivable_info) {
          if (!value.account_owner) {
            callback(new Error('选择的收款账号信息无收款人，请选择其他收款账号或使用新的收款信息'))
          }
          if (!value.pay_type) {
            callback(new Error('选择的收款账号信息无付款方式，请选择其他收款账号或使用新的收款信息'))
          }
          if (!value.account) {
            callback(new Error('选择的收款账号信息无收款账号，请选择其他收款账号或使用新的收款信息'))
          }
        }

        callback()
      }
    }],
    'owner': [{
      required: true,
      whitespace: true,
      message: '请输入收款人'
    }],
    'pay_mode': [{
      required: true,
      message: '请选择付款方式'
    }],
    'account': [{
      required: true,
      whitespace: true,
      message: '请输入收款账号'
    }],
    'sum_amount': [{
      required: true,
      message: '请完善付款给物业金额'
    }, {
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '总付款金额必须为两位小数点小数'
    }],
    'mobile': [{
      pattern: regs.TEL_REG,
      message: '请输入手机号码或座机号码'
    }],
    'arr_order_items': [{
      // required: false,
      // message: '请选择省市区',
      validator: (rule, value, callback) => {
        for (const item of value) {
          if (item.expense_deposit && !regs.TWO_DECIMAL_NUMBER_REG.test(item.expense_deposit)) {
            callback(new Error('支付供应商押金必须为两位小数点小数'))
            return false
          }
          if (!regs.TWO_DECIMAL_NUMBER_REG.test(item.expense)) {
            callback(new Error('成本价必须为两位小数点小数'))
            return false
          }
          if (!regs.TWO_DECIMAL_NUMBER_REG.test(item.amount)) {
            callback(new Error('付给供应商金额必须为两位小数点小数'))
            return false
          }
        }
        callback()
      }
    }],
    'deduction_order_items': [{
      // required: false,
      // message: '请选择省市区',
      validator: (rule, value, callback) => {
        for (const item of value) {
          if (item.deduction_price) {
            if (!regs.TWO_DECIMAL_NUMBER_REG.test(item.deduction_price)) {
              callback(new Error('抵扣金额必须为两位小数点小数'))
              return false
            }
            if (item.deduction_price * 100 > item.total_fee) {
              callback(new Error('输入的抵扣金额不能高于剩余抵扣金额'))
              return false
            }
          }
        }
        callback()
      }
    }]
  }
}


/**
 * 订单评价列表
 * @type {Object}
 */
export function getOrderCommentsRules(data) {
  return {
    'min_number_of_people': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }],
    'max_number_of_people': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }, {
      validator: (rule, value, callback) => {
        if (data.min_number_of_people && data.max_number_of_people && +data.min_number_of_people > +data.max_number_of_people) {
          callback(Error('最小值不能大于最大值'))
          return false
        }
        callback()
      }
    }]
  }
}
