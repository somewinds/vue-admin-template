// 用户
import * as regs from '../regular'

/**
 * 用户资料-邻汇备注-编辑
 * @type {Object}
 */
export function saveUserInfoLinhui(data) {
  return {
    'nickname': [{
      required: true,
      whitespace: true,
      message: '请填写姓名'
    }],
    'email': [{
      type: 'email',
      message: '请填写正确的邮箱'
    }],
    'company': [{
      required: true,
      whitespace: true,
      message: '请填写所在企业'
    }],
    'product': [{
      required: true,
      whitespace: true,
      message: '请填写推广产品'
    }],
    'address_linkage': [{
      type: 'array',
      required: true,
      min: 2,
      message: '请选择所在省市'
    }, {
      validator: (rule, value, callback) => {
        if (value.some(item => !item)) {
          callback(new Error('请选择省市'))
          return false
        }
        callback()
      }
    }],
    'industry_id': [{
      required: true,
      message: '请选择主行业'
    }],
    'cooperation_with_others': [{
      type: 'enum',
      required: true,
      enum: [0, 1, 2], // 是否与竞品合作：2 未知，0 未合作，1 已合作
      message: '请选择是否与竞品合作'
    }],
    'cooperation_company': [{
      required: +data.cooperation_with_others === 1,
      whitespace: +data.cooperation_with_others === 1,
      message: '请填写竞争对手名称'
    }]
  }
}

/**
 * 买家场地意向-邻汇备注-编辑
 * @type {Object}
 */
export function saveFieldIntention(data) {
  return {
    'arr_deputy_industry_id': [{
      type: 'array',
      len: 2,
      message: '选择的副行业需精确到二级行业'
    }],
    'demand_area': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (data.demand_area && data.demand_max_area &&
                    +data.demand_area > +data.demand_max_area) {
          callback(Error('最小面积不能大于最大面积'))
          return false
        }
        callback()
      }
    }],
    'demand_max_area': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (data.demand_area && data.demand_max_area &&
                    +data.demand_area > +data.demand_max_area) {
          callback(Error('最小面积不能大于最大面积'))
          return false
        }
        callback()
      }
    }],
    'acceptable_minimum_price': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (data.acceptable_minimum_price && data.acceptable_maximum_price &&
                    +data.acceptable_minimum_price > +data.acceptable_maximum_price) {
          callback(Error('最小价格不能大于最大价格'))
          return false
        }
        callback()
      }
    }],
    'acceptable_maximum_price': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (data.acceptable_minimum_price && data.acceptable_maximum_price &&
                    +data.acceptable_minimum_price > +data.acceptable_maximum_price) {
          callback(Error('最小价格不能大于最大价格'))
          return false
        }
        callback()
      }
    }],
    'gender_tendency': [{
      type: 'enum',
      enum: [0, 1, 2],
      message: '选择的值无效'
    }],
    'spread_way_ids': [{
      type: 'array',
      required: true,
      min: 1,
      message: '请至少选择一项推广方式'
    }]

  }
}

/**
 * 用户列表
 * @type {Object}
 */
export function getUsersRules(data) {
  return {
    'order_count_from': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }],
    'order_count_to': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }, {
      validator: (rule, value, callback) => {
        if (data.order_count_from && data.order_count_to && +data.order_count_from > +data.order_count_to) {
          callback(Error('最小值不能大于最大值'))
          return false
        }
        callback()
      }
    }],
    'sale_amount_from': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }],
    'sale_amount_to': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (data.sale_amount_from && data.sale_amount_to && +data.sale_amount_from > +data.sale_amount_to) {
          callback(Error('最小值不能大于最大值'))
          return false
        }
        callback()
      }
    }]
  }
}
