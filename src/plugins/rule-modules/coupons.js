// 优惠券管理
import * as regs from '../regular'
import * as tools from '../tools'

import store from '../../store/index'
const X_MARKET_MANAGEMENT = store.state.X_MARKET_MANAGEMENT

/**
 * 优惠信息列表查询用验证
 * @type {Object}
 */
export function getCouponRulesRules(data) {
  return {
    'min_amount': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (value && data.max_amount && +value > +data.max_amount) {
          callback(Error('最小金额不能大于最大金额'))
          return false
        }
        callback()
      }
    }],
    'max_amount': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (value && data.min_amount && +value < +data.min_amount) {
          callback(Error('最小金额不能大于最大金额'))
          return false
        }
        callback()
      }
    }]
  }
}

/**
 * 新增/编辑优惠信息
 * @type {Object}
 */
export function getStoreCouponRuleRules(data = {}) {
  return {
    'title': [{
      required: true,
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入优惠信息名称'
    }],
    'scope': [{
      required: true,
      message: '请选择优惠范围'
    }],
    'community': [{
      required: true,
      message: '请输入场地名搜索并选择'
    }],
    'categories': [{
      type: 'array',
      min: 1,
      required: true,
      message: '请选择场地类目'
    }],
    'label': [{
      required: true,
      message: '请选择标签'
    }],
    'hint': [{
      required: true,
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入提示话术'
    }],
    'min_goods_amount': [{
      required: true,
      message: '请输入满减金额'
    }, {
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }],
    'amount': [{
      required: true,
      message: '请输入优惠金额'
    }, {
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }]

  }
}



/**
 * 营销发放列表查询用验证
 * @type {Object}
 */
export function getCouponReleasesRules(data) {
  return {
    'min_amount': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (value && data.max_amount && +value > +data.max_amount) {
          callback(Error('最小金额不能大于最大金额'))
          return false
        }
        callback()
      }
    }],
    'max_amount': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (value && data.min_amount && +value < +data.min_amount) {
          callback(Error('最小金额不能大于最大金额'))
          return false
        }
        callback()
      }
    }]
  }
}

/**
 * 新增/编辑营销发放
 * @type {Object}
 */
export function getStoreCouponReleaseRules(data = {}) {
  return {
    'title': [{
      required: true,
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入名称'
    }],
    'type': [{
      required: true,
      message: '请选择类型'
    }],
    'coupon_rule_id': [{
      required: true,
      message: '请选择优惠ID'
    }],
    'shelf_at': [{
      required: true,
      message: '请选择上下架时间'
    }, {
      validator: (rule, value, callback) => {
        if (data.shelf_time && new Date(data.shelf_time).getTime() <= new Date().getTime()) {
          callback(Error('上架时间需大于当前时间'))
          return false
        }
        if (data.shelf_time && data.down_time &&
                    new Date(data.shelf_time).getTime() >= new Date(data.down_time).getTime()) {
          callback(Error('上架时间需小于下架时间'))
          return false
        }
        callback()
      }
    }],
    'date_type': [{
      required: true,
      message: '请选择有效期类型'
    }],
    'effective_at': [{
      required: true,
      message: '请选择有效期绝对时间'
    }, {
      validator: (rule, value, callback) => {
        if (data.effective_start_time && data.shelf_time &&
                    new Date(data.effective_start_time).getTime() < (new Date(tools.fliters_time(data.shelf_time, 'YYYY-MM-DD')).getTime())) {
          callback(Error('有效期开始时间需大于等于上架时间'))
          return false
        }
        if (data.effective_start_time && data.effective_end_time &&
                    new Date(data.effective_start_time).getTime() >= new Date(data.effective_end_time).getTime()) {
          callback(Error('有效期开始时间需小于有效期结束时间'))
          return false
        }
        if (data.down_time && data.effective_end_time &&
                    new Date(data.effective_end_time).getTime() <= (new Date(tools.fliters_time(data.down_time, 'YYYY-MM-DD')).getTime())) {
          callback(Error('下架时间需小于有效期结束时间'))
          return false
        }
        callback()
      }
    }],
    'relative_time': [{
      required: true,
      type: 'number',
      max: 365,
      message: '请输入相对时间，最大365天'
    }, {
      pattern: regs.INT_NUMBER_WITHOUT_0_REG,
      message: '请输入大于0的整数'
    }],
    'issue_target': [{
      required: true,
      message: '请选择发放对象'
    }, {
      validator: (rule, value, callback) => {
        // 类型选择新人礼包、评价送券，发放对象不能选择具体用户，发放方式只能选择用户领取，其他方式不可选
        if ((+data.type === +X_MARKET_MANAGEMENT.type_new || +data.type === +X_MARKET_MANAGEMENT.type_rev) && +value === +X_MARKET_MANAGEMENT.issue_target_spe) {
          callback(Error('类型选择新人礼包、评价送券，发放对象不能选择具体用户，发放方式只能选择用户领取'))
          return false
        }
        callback()
      }
    }],
    'levels': [{
      type: 'array',
      min: 1,
      required: true,
      message: '请选择会员等级'
    }],
    'user_ids': [{
      type: 'array',
      min: 1,
      required: true,
      message: '请选择具体用户'
    }],
    'user_group_id': [{
      required: true,
      message: '请选择用户分组'
    }],
    'method': [{
      required: true,
      message: '请选择发放方式'
    }, {
      validator: (rule, value, callback) => {
        // 发放对象选择具体用户时，发放方式只能选择直接发放，其他方式不可选
        if (+data.issue_target === +X_MARKET_MANAGEMENT.issue_target_spe && +value !== +X_MARKET_MANAGEMENT.method_dir) {
          callback(Error('发放对象选择具体用户时，发放方式只能选择直接发放，其他方式不可选'))
          return false
        }
        // 类型选择新人礼包、评价送券，发放对象不能选择具体用户，发放方式只能选择用户领取，其他方式不可选
        if ((+data.type === X_MARKET_MANAGEMENT.type_new || +data.type === +X_MARKET_MANAGEMENT.type_rev) && +value !== +X_MARKET_MANAGEMENT.method_rec) {
          callback(Error('类型选择新人礼包、评价送券，发放对象不能选择具体用户，发放方式只能选择用户领取'))
          return false
        }
        if (+value === 3 && (!regs.INT_NUMBER_WITHOUT_0_REG.test(data.point))) {
          callback(Error('请输入积分，大于0的整数'))
          return false
        }
        callback()
      }
    }],
    'quantity': [{
      pattern: regs.INT_NUMBER_WITHOUT_0_REG,
      message: '请输入大于0的整数'
    }],
    'account_limit': [{
      pattern: regs.INT_NUMBER_WITHOUT_0_REG,
      message: '请输入大于0的整数'
    }]

  }
}

/**
 * 用户分组列表查询用验证
 * @type {Object}
 */
export function getUserGroupsRules(data) {
  return {
  }
}

/**
 * 新增/编辑用户分组
 * @type {Object}
 */
export function getStoreUserGroupRules(data = {}) {
  return {
    'title': [{
      required: true,
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入名称'
    }],
    'target': [{
      required: true,
      message: '请选择分组对象'
    }, {
      type: 'enum',
      enum: [1, 2, 3],
      message: '选择的值无效'
    }],
    'industries': [{
      type: 'array',
      message: '买家行业类型有误'
    }],
    /* 'field_types': [{
            type: 'array',
            message: '展位类型有误'
        }],*/
    'is_enterprise': [{
      type: 'enum',
      enum: [1, 2],
      message: '选择的值无效'
    }],

    // 会员等级
    'membership_level_type': [],
    'min_level': [{
      // required_if:membership_level_type,1
      required: +data.membership_level_type === 1,
      message: '请选择最低会员等级'
    }],
    'max_level': [{
      // required_if:membership_level_type,1
      required: +data.membership_level_type === 1,
      message: '请选择最高会员等级'
    }, {
      validator: (rule, value, callback) => {
        if (parseInt(data.min_level) > parseInt(data.max_level)) {
          callback(new Error('选择的 最高会员等级 需大于等于 最低会员等级'))
        }
        callback()
      }
    }],
    'min_growth_level': [{
      // required_if:membership_level_type,2
      required: +data.membership_level_type === 2,
      message: '请输入最低成长值'
    }, {
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }],
    'max_growth_level': [{
      // required_if:membership_level_type,2
      required: +data.membership_level_type === 2,
      message: '请输入最高成长值'
    }, {
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }, {
      validator: (rule, value, callback) => {
        if (parseInt(data.min_growth_level) > parseInt(data.max_growth_level)) {
          callback(new Error('输入的 最高成长值 需大于等于 最低成长值'))
        }
        callback()
      }
    }],

    // 最近下单
    'lately_order': [{
      type: 'enum',
      enum: [1, 2, 3, 4, 5],
      message: '选择的值无效'
    }],
    'order_day': [{
      pattern: regs.INT_NUMBER_WITHOUT_0_REG,
      message: '请输入大于0的整数'
    }],

    // 最近未下单
    'lately_no_order': [{
      type: 'enum',
      enum: [1, 2, 3, 4, 5],
      message: '选择的值无效'
    }],
    'no_order_day': [{
      pattern: regs.INT_NUMBER_WITHOUT_0_REG,
      message: '请输入大于0的整数'
    }],

    // 最近登录
    'lately_login': [{
      type: 'enum',
      enum: [1, 2, 3, 4, 5],
      message: '选择的值无效'
    }],
    'login_day': [{
      pattern: regs.INT_NUMBER_WITHOUT_0_REG,
      message: '请输入大于0的整数'
    }],

    // 最近未登录
    'lately_no_login': [{
      type: 'enum',
      enum: [1, 2, 3, 4, 5],
      message: '选择的值无效'
    }],
    'no_login_day': [{
      pattern: regs.INT_NUMBER_WITHOUT_0_REG,
      message: '请输入大于0的整数'
    }],

    // 最近售出
    'lately_sold': [{
      type: 'enum',
      enum: [1, 2, 3, 4, 5],
      message: '选择的值无效'
    }],
    'sold_day': [{
      pattern: regs.INT_NUMBER_WITHOUT_0_REG,
      message: '请输入大于0的整数'
    }],

    // 最近发布
    'lately_push': [{
      type: 'enum',
      enum: [1, 2, 3, 4, 5],
      message: '选择的值无效'
    }],
    'push_day': [{
      pattern: regs.INT_NUMBER_WITHOUT_0_REG,
      message: '请输入大于0的整数'
    }]
  }
}
