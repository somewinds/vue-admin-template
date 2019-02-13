// 内部需求管理
import * as regs from '../regular'

/* import store from '../../store/index'
const X_MARKET_MANAGEMENT = store.state.X_MARKET_MANAGEMENT;*/

/**
 * 内部需求管理列表查询用验证
 * @type {Object}
 */
export function getInnerDemandsRules(data) {
  return {
  }
}

/**
 * 内部需求-新增指派
 * @type {Object}
 */
export function assignDataRule(data) {
  return {
  }
}

/**
 * 内部需求-发布需求
 * @type {Object}
 */
export function storeDemandRules(data) {
  return {
    'extension_at': [{
      required: true,
      message: '请选择推广时间'
    }/*, {
            validator: (rule, value, callback)=>{
                if(data.start && data.end
                    && new Date(data.start).getTime() >= new Date(data.end).getTime()){
                    callback(Error('开始时间需小于结束时间'));
                    return false
                }
                callback()
            }
        }*/],
    'product': [{
      required: true,
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入推广产品'
    }],
    'min_number_of_people': [{
      pattern: regs.INT_NUMBER_REG,
      message: '最少人流量请输入整数'
    }],
    'max_number_of_people': [{
      pattern: regs.INT_NUMBER_REG,
      message: '最多人流量请输入整数'
    }, {
      validator: (rule, value, callback) => {
        if (data.min_number_of_people && data.max_number_of_people && +data.min_number_of_people > +data.max_number_of_people) {
          callback(Error('最小值不能大于最大值'))
          return false
        }
        callback()
      }
    }],
    'min_budget': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }],
    'max_budget': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (data.min_budget && data.max_budget && +data.min_budget > +data.max_budget) {
          callback(Error('最小值不能大于最大值'))
          return false
        }
        callback()
      }
    }],
    'budget_type': [{
      required: true,
      message: '请选择推广预算单位'
    }],
    'city_ids': [{
      type: 'array',
      min: 1,
      required: true,
      message: '请选择所需城市'
    }],
    'physical_resource_type_ids': [{
      type: 'array',
      min: 1,
      required: true,
      message: '请选择展位类型'
    }],
    'deadline': [{
      required: true,
      message: '请选择截止时间'
    }, {
      validator: (rule, value, callback) => {
        if (value && new Date(value).getTime() < new Date().getTime()) {
          callback(new Error('截止时间应大于当前时间'))
        }
        callback()
      }
    }]
  }
}


/**
 * 内部需求-发布需求-多选展位的展位面积验证
 * @type {Object}
 */
export function getAreaRules(data) {
  return [{
    validator: (rule, value, callback) => {
      if (!data.min_area || !regs.TWO_DECIMAL_NUMBER_WITHOUT_0_REG.test(data.min_area)) {
        callback(Error('最小面积请输入大于0的两位小数点小数'))
        return false
      }
      if (!data.max_area || !regs.TWO_DECIMAL_NUMBER_WITHOUT_0_REG.test(data.max_area)) {
        callback(Error('最大面积请输入大于0的两位小数点小数'))
        return false
      }
      if (+data.min_area > +data.max_area) {
        callback(Error('最小面积不能大于最大面积'))
        return false
      }
      callback()
    }
  }]
}

/**
 * 内部需求-发布需求-多选展位的展位个数验证
 * @type {Object}
 */
export function getAmountRules(data) {
  return [{
    validator: (rule, value, callback) => {
      if (!data.min_amount || !regs.INT_NUMBER_WITHOUT_0_REG.test(data.min_amount)) {
        callback(Error('最小个数请输入大于0的整数'))
        return false
      }
      if (!data.max_amount || !regs.INT_NUMBER_WITHOUT_0_REG.test(data.max_amount)) {
        callback(Error('最大个数请输入大于0的整数'))
        return false
      }
      if (+data.min_amount > +data.max_amount) {
        callback(Error('最小个数不能大于最大个数'))
        return false
      }
      callback()
    }
  }]
}

/**
 * 内部需求管理反馈列表查询用验证
 * @type {Object}
 */
export function getDemandFeedbackRules(data) {
  return {
  }
}

/**
 * 内部需求管理-反馈列表-推荐展位（供给）查询用验证
 * @type {Object}
 */
export function getRecommendResourceRules(data) {
  return {
  }
}

/**
 * 内部需求管理-反馈列表-拒绝推荐
 * @type {Object}
 */
export function refuseRules(data) {
  return {
    'reason': [{
      required: true,
      pattern: regs.NON_FULL_EMPTY_STRING_MULTILINE,
      message: '请输入理由'
    }, {
      max: 500,
      message: '最多500字'
    }]
  }
}


