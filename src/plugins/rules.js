// 表单验证

// 更多验证规则查看 https://github.com/yiminghe/async-validator
// Type、Required、Pattern、Range、Length、Enumerable、Whitespace、Deep Rules

import * as regs from './regular'

import * as R_FINANCE from './rule-modules/finance' // 财务相关验证
import * as R_CATEGORY from './rule-modules/category' // 类目相关验证
import * as R_COMMUNITY from './rule-modules/community' // 场地相关验证
import * as R_SETTING from './rule-modules/setting' // 系统设置
import * as R_COUPONS from './rule-modules/coupons' // 优惠券管理
import * as R_SPECIAL_SUBJECTS from './rule-modules/special-subject' // 专题管理
import * as R_INNER_DEMANDS from './rule-modules/inner-demands' // 优惠券管理
import * as R_PHYSICALRESOURCES from './rule-modules/physical-resources' // 展位管理
import * as R_SELLINGRESOURCES from './rule-modules/selling-resources' // 供给管理
import * as R_USERS from './rule-modules/users' // 用户管理
import * as R_ORDERS from './rule-modules/orders' // 订单管理

export {
  R_FINANCE,
  R_CATEGORY,
  R_COMMUNITY,
  R_SETTING,
  R_COUPONS,
  R_SPECIAL_SUBJECTS,
  R_INNER_DEMANDS,
  R_PHYSICALRESOURCES,
  R_SELLINGRESOURCES,
  R_USERS,
  R_ORDERS
}

/**
 * 指派邀请时提交的表单验证
 * @type {Object}
 */
export const invites_rules = {
  'inviter_receivables_information': [{
    type: 'object',
    required: true,
    message: '请选择或填写邀请人收款账号信息'
  }],
  // 'inviter_receivables_information.account_owner': [{
  // 	required: true,
  // 	message: '请输入收款人',
  // }],
  // 'inviter_receivables_information.pay_type': [{
  // 	type: 'number',
  // 	required: true,
  // 	message: '请选择付款方式',
  // }],
  // 'inviter_receivables_information.account': [{
  // 	required: true,
  // 	message: '请输入收款账号',
  // }],

  'inviter_account_owner': [{
    required: true,
    message: '请输入收款人'
  }],
  'inviter_pay_mode': [{
    required: true,
    message: '请选择付款方式'
  }],
  'inviter_account': [{
    required: true,
    whitespace: true,
    message: '请输入邀请人收款账号'
  }],

  'invitee_receivables_information': [{
    type: 'object',
    required: true,
    message: '请选择或填写被邀请人收款账号信息'
  }],
  'invitee_account_owner': [{
    required: true,
    message: '请输入收款人'
  }],
  'invitee_pay_mode': [{
    required: true,
    message: '请选择付款方式'
  }],
  'invitee_account': [{
    required: true,
    whitespace: true,
    message: '请输入邀请人收款账号'
  }]
  // 'invitee_pay_mode': [{
  // 	required: true,
  // 	message: '请选择付款方式',
  // }],
  // 'invitee_account': [{
  // 	required: true,
  // 	whitespace:true,
  // 	message: '请输入被邀请人收款账号',
  // }],
}

/**
 * 客服-需求回复
 * @type {Object}
 */
export const appeal_rules = {
  'answer': [{
    required: true,
    message: '请输入处理意见'
  }]
}

/**
 * 新增拼团信息
 * @type {Object}
 */
export const group_rules = {
  'physical_resource_id': [{
    required: true,
    message: '请选择物理资源'
  }],
  // 'physical_resource_name': [{
  // 	required: true,
  // 	message: '请选择物理资源名称',
  // }],
  'price': [{
    required: true,
    message: '请填写拼团价'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'min': [{
    required: true,
    message: '请填写成团人数'
  }, {
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }],
  'max': [{
    required: true,
    message: '请填写成团人数'
  }, {
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }],
  'field_length': [{
    required: true,
    message: '请填写摆摊面积'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'field_width': [{
    required: true,
    message: '请填写摆摊面积'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'origin_price': [{
    required: true,
    message: '请填写原价'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'group_range': [{
    required: true,
    message: '请选择开团时间范围'
  }],
  'group_start': [{
    required: true,
    message: '请填写开团开始时间'
  }],
  'group_end': [{
    required: true,
    message: '请填写开团结束时间'
  }],
  'activity_range': [{
    required: true,
    message: '请选择活动时间范围'
  }],
  'activity_start': [{
    required: true,
    message: '请填写活动开始时间'
  }],
  'activity_end': [{
    required: true,
    message: '请填写活动开始时间'
  }],
  'contact': [{
    required: true,
    message: '请填写负责人名称'
  }],
  'mobile': [{
    required: true,
    message: '请填写手机号码'
  }, {
    pattern: regs.TEL_REG,
    message: '请输入手机号码或座机号码'
  }],
  // 分销信息
  'share_type': [{
    required: true,
    message: '请选择分成类型'
  }],
  'fixed_share': [{
    required: true,
    message: '请填写固定分成'
  }, {
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }],
  'rate_share': [{
    required: true,
    message: '请填写分成比例'
  }, {
    pattern: regs.INT_TWO_WITHIN_100_REG,
    message: '请输入100以内的两位整数'
  }],
  'integral_rebate_proportion': [{
    required: true,
    message: '请填写积分返点比例'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_WITHIN_100_REG,
    message: '请输入100以内的两位小数点小数'
  }],
  'invoice': [{
    required: true,
    message: '请选择是否开发票'
  }],
  'tax_point': [{
    pattern: regs.TWO_DECIMAL_NUMBER_WITHIN_100_REG,
    message: '100以内的两位小数点小数'
  }],
  'special_tax_point': [{
    pattern: regs.TWO_DECIMAL_NUMBER_WITHIN_100_REG,
    message: '100以内的两位小数点小数'
  }]
}

/**
 * 导出票据报表验证
 * @type {Object}
 */
export const ticket_rules = {
  'page_size': [{
    required: true,
    message: '请填写导出条数'
  }, {
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }]
}

/**
 * 编辑物理资源/展位
 * @type {Object}
 */
export function getStorePhysicalResourceRules(data = {}) {
  return {
    'res_type_id': [{
      required: true,
      message: '请选择资源类型'
    }],
    'name': [{
      required: true,
      message: '请填写或选择资源名称'
    }, {
      validator: (rule, value, callback) => {
        if (value.length > 255) {
          callback(new Error('名称长度范围1-255个字符'))
        } else {
          callback()
        }
      }
    }],
    'community_id': [{
      required: true,
      message: '请选择场地所在社区'
    }],
    'indoor': [{
      required: true,
      message: '请选择摆摊位置'
    }],
    'do_location': [{
      required: true,
      message: '请填写具体摆摊位置'
    }],
    'location_type_id': [{
      required: true,
      message: '请选择展位位置类型'
    }],
    'field_type_id': [{
      required: true,
      message: '请选择场地类型'
    }],
    'ad_type_id': [{
      required: true,
      message: '请选择广告类型'
    }],
    'resource_img': [{
      required: true,
      message: '请上传资源图片'
    }],
    'description': [{
      required: true,
      message: '请输入展位描述'
    }],
    'size': [{
      required: true,
      message: '请填写摆摊位置规格'
    }, {
      validator: (rule, value, callback) => {
        if (!value || value.length <= 0 || (!value[0].width || !value[0].height)) {
          callback(new Error('至少一项完整的位置规格'))
        }
        for (const item of value) {
          if (!/^\d*\.?\d{0,2}$/.test(item.width)) {
            callback(new Error('摆摊位置规格宽度必须为两位小数点小数'))
            return false
          }
          if (!/^\d*\.?\d{0,2}$/.test(item.height)) {
            callback(new Error('摆摊位置规格长度必须为两位小数点小数'))
            return false
          }
        }
        callback()
      }
    }],
    'total_area': [{
      required: +data.res_type_id === 1,
      message: '请填写总面积'
    }, {
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }],
    'erection_height': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }],
    'do_at': [{
      required: +data.res_type_id === 1,
      message: '选择摆摊时间段'
    }],
    'do_begin': [{
      required: +data.res_type_id === 1,
      message: '选择开始时间'
    }],
    'do_finish': [{
      required: +data.res_type_id === 1,
      message: '选择结束时间'
    }],
    'contraband': [

    ],
    'other_contraband': [

    ],
    'requirement': [

    ],
    'property_requirement': [

    ],
    'peak_time_id': [{
      required: +data.res_type_id === 1,
      message: '请选择人流量高峰期'
    }],
    'number_of_people': [{
      required: +data.res_type_id === 1,
      message: '请填写场地人流量'
    }, {
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }],
    'facade': [{
      required: +data.res_type_id === 1,
      message: '请选择展示方向'
    }],
    'participation_level_id': [{
      required: +data.res_type_id === 1,
      message: '请选择用户参与度'
    }],
    'male_proportion': [{
      required: +data.res_type_id === 1,
      message: '请填写男性比例'
    }, {
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }],
    'age_level_id': [{
      required: +data.res_type_id === 1,
      message: '请选择年龄层'
    }],
    'consumption_level_id': [{
      required: +data.res_type_id === 1,
      message: '请选择消费水平'
    }]
  }
}

/**
 * 编辑售卖资源
 * @type {Object}
 */
export function getSellingResourceRules(data) {
  return {
    'physical_resource_id': [{
      required: true,
      message: '请选择物理资源'
    }],
    'res_type_id': [{
      required: true,
      message: '请选择资源类型'
    }],
    'activity_type_id': [{
      required: true,
      message: '请选择活动类型'
    }],
    'custom_name': [

    ],
    // 'dimensions': [{
    // 	required: true,
    // 	message: '请填写规格价格',
    // }, {
    // 	validator: (rule, value, callback)=>{
    // 		for(let item of value){
    // 			if(!/^\d*\.?\d{0,2}$/.test(item.lease_term_type_id)){
    // 				callback(new Error('请选择计价单位'));
    // 			}
    // 			if(!item.size){
    // 				callback(new Error('请选择面积'));
    // 			}
    // 			if(!regs.TWO_DECIMAL_NUMBER_REG.test(item.original_price)){
    // 				callback(new Error('请输入价格，两位小数点小数'));
    // 			}
    // 			if(!regs.INT_NUMBER_REG.test(item.count_of_frame)){
    // 				callback(new Error('请输入广告框架数，必须为整数'));
    // 			}
    // 		}
    // 		callback()
    // 	}
    // }],
    'dimensions_group': [{
      required: true,
      message: '请填写规格价格'
    }, {
      validator: (rule, value, callback) => {
        // 是否填写了其中一个分成值（选择有分成时，规格价格中至少填写一项分成值（比例/金额））
        let has_share_value = false

        /* // 是否至少填写了一个押金
        let has_deposit_value = false */

        // for(let item of value){
        value.forEach(function(item, index) {
          // 序号
          const pre_label = `索引${index + 1} `
          // if(!item.common_specifications ||
          //     !item.common_specifications.period ||
          //     !item.common_specifications.size){
          //     // 如果有 计价单位组、面积 其中一项未填，不允许增加
          //     this.$message.warning('计价单位组、面积填写完整才可添加，请检查')
          //     return false
          // }

          if (item.common_specifications && item.common_specifications.custom_dimension && item.common_specifications.custom_dimension.length > 8) {
            callback(new Error(pre_label + '特殊规格的最大长度8'))
            return false
          }
          if (item.quick_calculate_value && !regs.TWO_DECIMAL_NUMBER_REG.test(item.quick_calculate_value)) {
            callback(new Error(pre_label + '售价快速计算值必须为两位小数点小数'))
            return false
          }

          if (!item.common_specifications) {
            callback(new Error(pre_label + '请完善价格规格'))
            return false
          }

          if (!item.common_specifications.period) {
            callback(new Error(pre_label + '请选择完善价格计价单位'))
            return false
          }

          if (!item.common_specifications.size) {
            callback(new Error(pre_label + '请选择面积'))
            return false
          }

          if (+data.res_type_id === 2) {
            if (!item.common_specifications.count_of_frame) {
              callback(new Error(pre_label + '请填写框架数'))
              return false
            }

            if (!regs.INT_NUMBER_WITHOUT_0_REG.test(item.common_specifications.count_of_frame)) {
              callback(new Error(pre_label + '请输入广告框架数，必须为整数'))
            }
          }

          const data_prices_group = item.selling_resource_prices_group
          if (!data_prices_group) {
            return
          }
          for (const [child_index, child_item] of data_prices_group.entries()) {
            // 序号
            const child_pre_label = `索引${index + 1}-${child_index + 1} `
            // if(!child_item.lease_term_type_ids || child_item.lease_term_type_ids.length <= 0 || !child_item.original_price){
            //     // 如果有 日期、价格 其中一项未填，不允许增加
            //     this.$message.warning('日期、价格填写完整才可添加，请检查')
            //     return false
            // }

            if (!child_item.lease_term_type_ids || child_item.lease_term_type_ids.length <= 0) {
              callback(new Error(child_pre_label + '选择日期单位'))
              return false
            }

            if (!regs.TWO_DECIMAL_NUMBER_REG.test(child_item.original_price) || child_item.original_price <= 0) {
              callback(new Error(child_pre_label + '请输入市场价，大于0的两位小数点小数'))
              return false
            }

            // 有分成
            if (+data.has_share === 1) {
              // 分成比例
              if (+child_item.share_type === 1) {
                if (child_item.rate_share) {
                  if (!regs.INT_TWO_WITHIN_100_REG.test(child_item.rate_share)) {
                    callback(new Error(child_pre_label + '请输入分成比例，100以内的两位整数'))
                    return false
                  } else {
                    has_share_value = true
                  }
                }
              } else if (+child_item.share_type === 2) { // 分成金额
                if (child_item.fixed_share) {
                  if (!regs.INT_NUMBER_REG.test(child_item.fixed_share)) {
                    callback(new Error(child_pre_label + '请输入固定分成，整数'))
                    return false
                  } else if (+child_item.fixed_share > +child_item.original_price) {
                    callback(new Error(child_pre_label + `分成金额不能高于最低市场价：${child_item.original_price} 元`))
                    return false
                  } else {
                    has_share_value = true
                  }
                }
              } else {
                callback(new Error(child_pre_label + '请选择分成类型'))
                return false
              }
            }

            /* // 有押金
            if (+data.has_deposit === 1) {
              if (child_item.deposit) {
                if (!regs.TWO_DECIMAL_NUMBER_REG.test(child_item.deposit)) {
                  callback(new Error(child_pre_label + '押金请输入两位小数点小数'))
                  return false
                } else {
                  has_deposit_value = true
                }
              }
            } */


            // if(child_item.cost_price){
            // 	if(!regs.TWO_DECIMAL_NUMBER_REG.test(child_item.cost_price)){
            // 		callback(new Error('请输入成本价，两位小数点小数'));
            // 		return false
            // 	}
            // 	else if(child_item.cost_price <= 0){
            // 		callback(new Error('成本价必须大于0'));
            // 		return false
            // 	}

            // 	if(parseFloat(child_item.cost_price) > parseFloat(child_item.original_price)){
            // 		callback(new Error('成本价不能大于市场价'));
            // 		return false
            // 	}
            // }
          }
        })

        // 选择有分成时，规格价格中至少填写一项分成值（比例/金额）
        if (+data.has_share === 1 && !has_share_value) {
          callback(new Error('选择有分成时，规格价格中至少填写一项分成值（比例/金额）'))
          return false
        }

        // for(let item of value){
        // 	if(!/^\d*\.?\d{0,2}$/.test(item.lease_term_type_id)){
        // 		callback(new Error('请选择计价单位'));
        // 	}
        // 	if(!item.size){
        // 		callback(new Error('请选择面积'));
        // 	}
        // 	if(!regs.TWO_DECIMAL_NUMBER_REG.test(item.original_price)){
        // 		callback(new Error('请输入价格，两位小数点小数'));
        // 	}
        // 	if(!regs.INT_NUMBER_REG.test(item.count_of_frame)){
        // 		callback(new Error('请输入广告框架数，必须为整数'));
        // 	}
        // }
        callback()
      }
    }],
    'days_in_advance': [{
      required: true,
      message: '请填写提前预定天数'
    }, {
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }],
    'activity_range': [{
      type: 'array',
      required: true,
      message: '请填写活动时间范围'
    }, {
      validator: (rule, value, callback) => {
        if (value.length < 2 || !value[0] || !value[1]) {
          callback(new Error('请填写活动时间范围'))
        }
        callback()
      }
    }],
    'activity_start_date': [{
      required: true,
      message: '请填写活动开始日期'
    }],
    'deadline': [{
      required: true,
      message: '请填写活动截止日期'
    }],
    'minimum_booking_days': [{
      required: true,
      message: '请填写起订天数'
    }],
    'resource_img': [{
      type: 'array',
      min: 1,
      required: true,
      message: '请上传活动图片'
    }],
    'share_type': [{
      required: true,
      message: '请选择分成类型'
    }],
    'has_share': [{
      required: true,
      message: '请选择是否有分成'
    }],
    /* 'fixed_share': [{
			required: true,
			message: '请填写固定分成',
		}, {
			pattern: regs.INT_NUMBER_REG,
			message: '请输入整数',
		}, {
			validator: (rule, value, callback)=>{
                for(let item of data.dimensions_group){
	                for(let child_item of item.selling_resource_prices_group){
						if(+value > +child_item.original_price){
							callback(new Error(`分成金额不能高于最低市场价：${child_item.original_price} 元`));
							return false
						}
	                }
	            }
				callback()
			}
		}],
		'rate_share': [{
			required: true,
			message: '请填写分成比例',
		}, {
			pattern: regs.INT_TWO_WITHIN_100_REG,
			message: '请输入100以内的两位整数',
		}],*/
    'subsidy_rate': [{
      required: true,
      message: '请填写邻汇补贴'
    }, {
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }],
    'integral_rebate_proportion': [{
      required: true,
      message: '请填写积分返点比例'
    }, {
      pattern: regs.TWO_DECIMAL_NUMBER_WITHIN_100_REG,
      message: '请输入100以内的两位小数点小数'
    }],
    'invoice': [{
      required: true,
      message: '请选择是否开发票'
    }],
    'tax_point': [{
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }],
    'special_tax_point': [{
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }],
    'cooperation_type_id': [{
      required: true,
      message: '请选择收益方'
    }],
    'rev_side': [{
      required: true,
      message: '请选择供收益方账号'
    }],
    'connecter': [{
      required: true,
      message: '请输入场地对接人姓名'
    }, {
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入非全空字符串'
    }],
    'connecter_mobile': [{
      required: true,
      message: '请输入场地对接人联系电话'
    }, {
      pattern: regs.TEL_REG,
      message: '请输入手机号码或座机号码'
    }],
    'manager_mobile': [{
      pattern: regs.TEL_REG,
      message: '请输入手机号码或座机号码'
    }],
    'accountant_mobile': [{
      pattern: regs.TEL_REG,
      message: '请输入手机号码或座机号码'
    }],
    /* 'refer_min_price': [{
			required: true,
			message: '请输入最低参考价',
		}, {
			pattern: regs.TWO_DECIMAL_NUMBER_REG,
			message: '请输入两位小数点小数',
		}],
		'refer_max_price': [{
			required: true,
			message: '请输入最高参考价',
		}, {
			pattern: regs.TWO_DECIMAL_NUMBER_REG,
			message: '请输入两位小数点小数',
		}],*/
    'refer_price': [{
      validator: (rule, value, callback) => {
        if (!regs.TWO_DECIMAL_NUMBER_REG.test(data.refer_min_price)) {
          callback(Error('请输入最低参考价，两位小数点小数'))
          return false
        }
        if (!regs.TWO_DECIMAL_NUMBER_REG.test(data.refer_max_price)) {
          callback(Error('请输入最高参考价，两位小数点小数'))
          return false
        }
        if (+data.refer_min_price > +data.refer_max_price) {
          callback(Error('最低参考价不能大于最高参考价'))
          return false
        }
        callback()
      }
    }]
  }
}

/**
 * 修改场地类型
 * @type {Object}
 */
export const save_community_type = {
  'community_type_id': [{
    required: true,
    message: '请选择场地类型'
  }]
}

/**
 * 修改场地标签
 * @type {Object}
 */
export const save_labels = {
  'label_ids': [{
    required: true,
    message: '请选择标签'
  }],
  'ids': [{
    validator: (rule, value, callback) => {
      if (value || value.length <= 0) {
        if (!value.account) {
          callback(new Error('请选择编号'))
        }
      }

      callback()
    }
  }]
}

/**
 * 管理员订单备注
 * @type {Object}
 */
export const order_item_remark_rules = {
  'order_remark': [{
    required: true,
    message: '请填写备注'
  }]
}

/**
 * 订单改期
 * @type {Object}
 */
export const change_date_rules = {
  'date': [{
    required: true,
    message: '请填写开始时间'
  }],
  'modify_reason': [{
    required: true,
    message: '请填写修改原因'
  }]
}

/**
 * 修改场地费
 * @type {Object}
 */
export const change_price_rules = {
  'actual_fee': [{
    required: true,
    message: '请填写场地售价'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'subsidy_fee': [{
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'deducted': [{
    type: 'number',
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }, {
    type: 'number',
    max: 100.25,
    message: '积分抵扣金额不能超过 100.25 元'
  }],
  'deposit': [{
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'tax_point': [{
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }],
  'service_fee': [{
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'payment': [{
    required: true,
    message: '请填写实付款'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'expense': [{
    required: true,
    message: '请填写成本价'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'expense_deposit': [{
    required: true,
    message: '请填写支付供应商押金'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'modify_reason': [{
    required: true,
    message: '请填写修改原因'
  }]
  // 'price': [{
  // 	pattern: regs.TWO_DECIMAL_NUMBER_REG,
  // 	message: '请输入两位小数点小数',
  // }],
  // 'service_fee': [{
  // 	pattern: regs.TWO_DECIMAL_NUMBER_REG,
  // 	message: '请输入两位小数点小数',
  // }],
  // 'deposit': [{
  // 	pattern: regs.TWO_DECIMAL_NUMBER_REG,
  // 	message: '请输入两位小数点小数',
  // }],
  // 'subsidy_fee': [{
  // 	pattern: regs.TWO_DECIMAL_NUMBER_REG,
  // 	message: '请输入两位小数点小数',
  // }],
  // 'payment': [{
  // 	required: true,
  // 	message: '请填写实付款',
  // }, {
  // 	pattern: regs.TWO_DECIMAL_NUMBER_REG,
  // 	message: '请输入正确的金额',
  // }],
  // 'modify_reason': [{
  // 	required: true,
  // 	message: '请填写修改原因',
  // }],
}

/**
 * 导出Excel默认验证
 * @type {Object}
 */
export const export_default_rules = {
  'page_size': [{
    required: true,
    message: '请填写导出条数'
  }, {
    pattern: regs.INT_NUMBER_WITHOUT_0_REG,
    message: '请输入大于0的整数'
  }],
  'skip_size': [{
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }]
}

/**
 * 拒绝售卖资源
 * @type {Object}
 */
export const reject_resource_rules = {
  'reject_reason': [{
    required: true,
    message: '请填写拒绝原因'
  }]
}

/**
 * 下架售卖资源
 * @type {Object}
 */
export const retrieve_resource_rules = {
  'off_shelves_reason': [{
    required: true,
    message: '请填写下架原因'
  }]
}

/**
 * 指派跟进售卖资源
 * @type {Object}
 */
export const assign_rules = {
  'selling_resource_ids': [{
    validator: (rule, value, callback) => {
      if (!value || value.length <= 0) {
        callback(new Error('请选择售卖资源'))
      } else {
        callback()
      }
    }
  }],
  'user_id': [{
    required: true,
    message: '请选择跟进对象'
  }]
}

/**
 * 财务付款订单备注
 * @type {Object}
 */
export const debit_remark_rules = {}

/**
 * 修改应付款价格同时修改订单场地成本expense
 * @type {Object}
 */
export function getChangeAmountRules(data) {
  return {
    'amount': [{
      required: true,
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请完善正确的付款给物业金额，两位小数点小数'
    }],
    'expense': [{
      required: true,
      message: '请输入场地成本'
    }, {
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }],
    'expense_deposit': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }],
    'selected_receivables_information': [{
      validator: (rule, value, callback) => {
        if (+data.change_receivables_information === 1) {
          if (!value) {
            callback(new Error('未选择或未填写完整收款账号信息'))
            return false
          }
          if (!value.account_owner) {
            callback(new Error('选择的收款账号信息无收款人，请选择其他收款账号或使用新的收款信息'))
            return false
          }
          if (!value.pay_type) {
            callback(new Error('选择的收款账号信息无付款方式，请选择其他收款账号或使用新的收款信息'))
            return false
          }
          if (!value.account) {
            callback(new Error('选择的收款账号信息无收款账号，请选择其他收款账号或使用新的收款信息'))
            return false
          }
        }

        callback()
      }
    }]
  }
}

/**
 * 应收账款-订单确认
 * @type {Object}
 */
export const transactions_confirm_rules = {
  'code': [{
    required: true,
    message: '请填写短信验证码'
  }]
}

/**
 * 财务订单退押金
 * @type {Object}
 */
export const order_refund_rules = {
  'amount': [{
    required: true,
    message: '请填写退还金额'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }]
}

/**
 * 应付账款-垫付修改到期时间
 * @type {Object}
 */
export const advance_change_date_rules = {
  'expired_at': [{
    required: true,
    message: '请填写开始时间'
  }],
  'remark': [{
    required: true,
    message: '请填写修改原因'
  }]
}

/**
 * 未支付订单，已收款操作
 * @type {Object}
 */
export const free_rules = {
  'is_advance': [{
    required: true,
    message: '请选择商家已支付或邻汇吧垫付'
  }],
  'expired_at': [{
    required: true,
    message: '请选择收款时间'
  }]
}

/**
 * 财务结算付款给物业
 * @type {Object}
 */
export const offline_transactions_settle_rules = {
  'pay_mode': [{
    required: true,
    message: '请选择付款方式'
  }],
  'amount': [{
    required: true,
    message: '请填写金额'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'discount_rate': [{
    pattern: regs.TWO_DECIMAL_NUMBER_WITHIN_100_REG,
    message: '请输入100以内的两位小数点小数'
  }],
  'mobile': [{
    pattern: regs.TEL_REG,
    message: '请输入手机号码或座机号码'
  }]
}

/**
 * 嗅探设备
 * @type {Object}
 */
export const equipment_rules = {
  'device_number': [{
    required: true,
    message: '请输入嗅探设备代码'
  }],
  'address_linkage': [{
    required: true,
    message: '请选择省市'
  }, {
    validator: (rule, value, callback) => {
      if (!value || value.length < 2) {
        callback(new Error('请选择省市'))
      }
      value.forEach((item, index) => {
        if (!item) {
          callback(new Error('选择省市不存在，请重新选择'))
        }
      })

      callback()
    }
  }],
  'city_id': [{
    required: true,
    message: '请选择城市'
  }]
}

/**
 * 预付款
 * @type {Object}
 */
export const prepaid_rules = {
  'advance_pay': [{
    required: true,
    message: '请输入预付金额'
  }],
  'times': [{
    required: true,
    message: '请输入预付次数'
  }],
  'company_id': [{
    required: true,
    message: '请选择收款方'
  }],
  'method': [{
    required: true,
    message: '请选择结算方式'
  }],
  'valid_period_at': [{
    required: true,
    message: '请选择有效期范围'
  }],
  'selling_resource_ids': [{
    required: true,
    message: '请选择关联场地'
  }]
}

/**
 * 服务商
 * @type {Object}
 */
export const service_provider_rules = {
  'company': [{
    required: true,
    message: '请输入公司名称'
  }],
  'office_location': [{
    required: true,
    message: '请输入办公地点'
  }],
  'mobile': [{
    required: true,
    message: '请输入联系方式'
  }, {
    pattern: regs.TEL_REG,
    message: '请输入手机号码或座机号码'
  }],
  'company_profile': [{
    required: true,
    message: '请输入企业简介'
  }],
  'pic_url': [{
    required: true,
    message: '请选择公司形象图片'
  }],
  'contact': [{
    required: true,
    message: '请输入联系人'
  }],
  'address_linkage': [{
    required: true,
    message: '请选择省市区'
  }, {
    validator: (rule, value, callback) => {
      if (!Array.isArray(value) || value.length < 3 || value.some(item => !item)) {
        callback(new Error('请选择省市区'))
      } else {
        callback()
      }
    }
  }]
}

/**
 * 服务商成功案例
 * @type {Object}
 */
export const case_rules = {
  'title': [{
    required: true,
    message: '请输入案例标题'
  }],
  'cover_pic_url': [{
    required: true,
    message: '请选择文章封面'
  }],
  'detail': [{
    required: true,
    message: '请输入文章详情'
  }]
}

/**
 * 新增、编辑合同
 * @type {Object}
 */
export const contract_rules = {
  'city_id': [{
    required: true,
    message: '请选择城市'
  }],
  'company': [{
    required: true,
    message: '请输入签约方'
  }],
  'admin': [{
    required: true,
    message: '请输入签约人'
  }],
  'mobile': [{
    required: true,
    message: '请输入手机号'
  }, {
    pattern: regs.TEL_REG,
    message: '请输入手机号码或座机号码'
  }],
  'signed_at': [{
    required: true,
    message: '请选择签约时间'
  }],
  'valid_at': [{
    required: true,
    message: '请选择有效时间'
  }],
  'start': [{
    required: true,
    message: '请输入开始时间'
  }],
  'end': [{
    required: true,
    message: '请输入到期时间'
  }],
  'share_type': [{
    required: true,
    message: '请选择分成类型'
  }],
  'share': [{
    required: true,
    message: '请输入分成数额'
  }, {
    pattern: regs.INT_TWO_WITHIN_100_REG,
    message: '请输入100以内的两位整数'
  }],
  'pay_type': [{
    required: true,
    message: '请选择支付方式'
  }],
  'contract_type_id': [{
    required: true,
    message: '请选择合同类型'
  }],
  'contract_items': [{
    validator: (rule, value, callback) => {
      for (const item of value) {
        if (!item.position) {
          callback(new Error('请输入摆摊位置'))
        }
        if (!item.field_type_id) {
          callback(new Error('请选择场地类型'))
        }
        if (!item.size) {
          callback(new Error('请输入场地面积'))
        }
        if (!item.level) {
          callback(new Error('请选择场地级别'))
        }
      }
      callback()
    }
  }]
}

/**
 * 新增、编辑供应商合同
 * @type {Object}
 */
export function Various_contract_sullplier(data) {
  return {
    'has_sub_contract': [{
      required: true,
      message: '请选择是否为子合同'
    }],
    'parent_id': [{
      required: true,
      message: '请选择主合同'
    }],
    'contract_type_id': [{
      required: true,
      message: '请选择合作方式'
    }],
    'city_id': [{
      required: true,
      message: '请选择合同归属城市'
    }],
    'mobile': [{
      required: true,
      pattern: regs.MOBILE_REG,
      message: '请输入对方签约人手机号'
    }],
    'admin': [{
      required: true,
      message: '请输入对方签约人'
    }],
    'company': [{
      required: true,
      message: '请输入签约主体'
    }],
    'attachments': [{
      required: true,
      message: '请上传文件'
    }],
    'signer_id': [{
      required: true,
      message: '请选择我方签约人'
    }],
    'signed_at': [{
      required: true,
      message: '请选择签约日期'
    }],
    'end': [{
      required: true,
      message: '请选择合同期限'
    }],
    'signed_days': [{
      required: true,
      message: '请选择有效合同期限'
    }],
    'sup_type': [{
      required: true,
      message: '请选择供应商类型'
    }],
    'pay_type': [{
      required: true,
      message: '请选择收款方式'
    }],
    'has_involve_costs': [{
      required: true,
      message: '请选择是否涉及收款费用'
    }],
    'account': [{
      required: +data.pay_type !== 1,
      message: '请输入收款帐号'
    }],
    // 'total_fee': [{
    // 	required: true,
    // 	message: '请输入合同总金额',
    // }],
    // 'account_owner': [{
    // 	required: true,
    // 	message: '请输入收款人姓名',
    // }],
    'opening_bank': [{
      required: !!(+data.pay_type === 2 || +data.pay_type === 5 || +data.pay_type === 6),
      message: '请输入开户行'
    }],
    'has_stage': [{
      required: true,
      message: '请选择分期收款设置'
    }],
    'notify_days': [{
      required: true,
      message: '请输入提醒设置'
    }]
  }
}


/**
 * 新增、编辑买家合同
 * @type {Object}
 */
export const contract_buyer = {
  'has_sub_contract': [{
    required: true,
    message: '请选择是否为子合同'
  }],
  'parent_id': [{
    required: true,
    message: '请选择主合同'
  }],
  'field_type': [{
    required: true,
    message: '请选择所需场地类型'
  }],
  'city_id': [{
    required: true,
    message: '请选择合同归属城市'
  }],
  'mobile': [{
    required: true,
    pattern: regs.MOBILE_REG,
    message: '请输入对方签约人手机号'
  }],
  'admin': [{
    required: true,
    message: '请输入对方签约人'
  }],
  'company': [{
    required: true,
    message: '请输入签约主体'
  }],
  'attachments': [{
    required: true,
    message: '请上传文件'
  }],
  'signer_id': [{
    required: true,
    message: '请选择我方签约人'
  }],
  'signed_at': [{
    required: true,
    message: '请选择签约日期'
  }],
  'end': [{
    required: true,
    message: '请选择合同期限'
  }],
  'signed_days': [{
    required: true,
    message: '请选择有效合同期限'
  }],
  'has_involve_costs': [{
    required: true,
    message: '请选择是否涉及收款费用'
  }],
  // 'total_fee': [{
  // 	required: true,
  // 	message: '请输入合同总金额',
  // }],
  // 'deposit': [{
  // 	required: true,
  // 	message: '请输入押金',
  // }],
  // 'service_charge': [{
  // 	required: true,
  // 	message: '请输入服务费',
  // }],
  // 'taxation': [{
  // 	required: true,
  // 	message: '请输入税费',
  // }],
  'has_stage': [{
    required: true,
    message: '请选择分期收款设置'
  }],
  'has_cushion': [{
    required: true,
    message: '请选择垫款设置'
  }],
  'notify_days': [{
    required: true,
    message: '请输入提醒设置'
  }]
}


/**
 * 新增、编辑其他合同
 * @type {Object}
 */
export const contract_other = {
  'has_sub_contract': [{
    required: true,
    message: '请选择是否为子合同'
  }],
  'parent_id': [{
    required: true,
    message: '请选择主合同'
  }],
  'signed_type': [{
    required: true,
    message: '请选择签约对象'
  }],
  'mobile': [{
    required: true,
    pattern: regs.MOBILE_REG,
    message: '请输入对方签约人手机号'
  }],
  'attachments': [{
    required: true,
    message: '请上传文件'
  }],
  'city_id': [{
    required: true,
    message: '请选择合同归属城市'
  }],
  'company': [{
    required: true,
    message: '请输入签约主体'
  }],
  'admin': [{
    required: true,
    message: '请输入对方签约人'
  }],
  'signed_at': [{
    required: true,
    message: '请选择签约日期'
  }],
  'signer_id': [{
    required: true,
    message: '请选择我方签约人'
  }],
  'end': [{
    required: true,
    message: '请选择合同期限'
  }],
  'signed_days': [{
    required: true,
    message: '请选择有效合同期限'
  }],
  'notify_days': [{
    required: true,
    message: '请输入提醒设置'
  }]
}


/**
 * 合同审核
 * @type {Object}
 */
export const contract_examine_rules = {
  'is_standard': [{
    required: true,
    message: '请选择是否规范'
  }],
  'nonstandard_reason': [{
    required: true,
    message: '请输入不规范原因'
  }]
}

/**
 * 内容管理-文章管理
 * @type {Object}
 */
export const article_rules = {
  'article_type_id': [{
    required: true,
    message: '请选择文章类型'
  }],
  'name': [{
    required: true,
    message: '请输入文章标题'
  }]
}

/**
 * 内容管理-图片
 * @type {Object}
 */
export const image_rules = {
  'title': [{
    required: true,
    message: '请输入名称'
  }],
  'banner_type_id': [{
    required: true,
    message: '请选择图片类型'
  }],
  'role_id': [{
    required: false,
    message: '请选择合作伙伴'
  }],
  'seq': [{
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }],
  'pic_url': [{
    required: true,
    message: '请选择图片'
  }]
}


/**
 * 内容管理-专题
 * @type {Object}
 */
export const theme_rules = {
  'name': [{
    required: true,
    message: '请输入专题名称'
  }]
}

/**
 * 系统设置-闪屏
 * @type {Object}
 */
export const splash_screen_rules = {
  'city_ids': [{
    type: 'array',
    required: true,
    min: 1,
    message: '请选择至少选择一个城市'
  }],
  'title': [{
    required: true,
    message: '请输入闪屏标题'
  }],
  'valid_at': [{
    required: true,
    message: '请选择有效时间'
  }],
  'pic_url': [{
    required: true,
    message: '请选择闪屏图片'
  }]
}

/**
 * 系统设置-操作管理
 * @type {Object}
 */
export function getAbilityRules(data) {
  return {
    'label': [{
      required: true,
      message: '请输入权限名称'
    }],
    'menu_uri': [{
      required: !data.api_uri,
      message: '请输入菜单跳转地址'
    }],
    'icon': [{
      required: true,
      message: '请输入后台接口请求方法'
    }, {
      validator: (rule, value, callback) => {
        // if(value.length == (value.lastIndexOf('|') + 1)){
        // 	value = value.substring(0, value.lastIndexOf('|'))
        // }
        // let arr = value.split('|')
        // if(arr.length < 3){
        // 	callback(new Error('请求方法个数与接口路径个数不相符，当前' + arr.length + '个，个数应为3个'));
        // }
        callback()
      }
    }],
    'api_uri': [{
      required: !data.menu_uri,
      message: '请输入后台接口路径'
    }]
  }
}

/**
 * 系统设置-商圈管理
 * @type {Object}
 */
export const trading_area_rules = {
  'name': [{
    required: true,
    message: '请输入商圈名称'
  }],
  'center': [{
    required: true,
    message: '请输入商圈中心名称'
  }],
  'radius': [{
    required: true,
    message: '请输入商圈半径'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_WITHOUT_0_REG,
    message: '请输入大于0的两位小数点小数'
  }],
  'lng': [{
    required: true,
    message: '请绘作商圈获得商圈中心经度'
  }],
  'lat': [{
    required: true,
    message: '请绘作商圈获得商圈中心纬度'
  }],
  // 'minLat': [{
  // 	required: true,
  // 	message: '请绘作商圈获得商圈最小经度',
  // }],
  // 'maxLat': [{
  // 	required: true,
  // 	message: '请绘作商圈获得商圈最小纬度',
  // }],
  // 'minLng': [{
  // 	required: true,
  // 	message: '请绘作商圈获得商圈最大经度',
  // }],
  // 'maxLng': [{
  // 	required: true,
  // 	message: '请绘作商圈获得商圈最大纬度',
  // }],
  'address_linkage': [{
    // required: false,
    // message: '请选择省市区',
    validator: (rule, value, callback) => {
      if (!Array.isArray(value) || value.length < 3 || value.some(item => !item)) {
        callback(new Error('请选择省市区'))
      } else {
        callback()
      }
    }
  }],
  'province_id': [{
    required: true,
    message: '请选择省'
  }],
  'city_id': [{
    required: true,
    message: '请选择市'
  }],
  'district_id': [{
    required: true,
    message: '请选择区'
  }]
}

/**
 * 系统设置-地铁线
 * @type {Object}
 */
export const subway_line_rules = {
  'name': [{
    required: true,
    message: '请输入公司名称'
  }, {
    whitespace: true,
    message: '不能全为空格字符串'
  }],
  'city_id': [{
    required: true,
    message: '请选择城市'
  }]
}

/**
 * 系统设置-地铁站
 * @type {Object}
 */
export const subway_station_rules = {
  'subway_line_id': [{
    required: true,
    message: '请选择地铁线'
  }],
  'station_name': [{
    required: true,
    message: '请输入地铁站点名称'
  }, {
    whitespace: true,
    message: '不能全为空格字符串'
  }],
  'detail_address': [{
    required: true,
    message: '请输入详细地址'
  }, {
    whitespace: true,
    message: '不能全为空格字符串'
  }, {
    validator: (rule, value, callback) => {
      if (!value || value.length < 5) {
        callback(new Error('详细地址长度范围5-255个字符'))
      } else {
        callback()
      }
    }
  }],
  'lng': [{
    required: true,
    message: '请输入正确地址或点击地图选择经度'
  }],
  'lat': [{
    required: true,
    message: '请输入正确地址或点击地图选择经度'
  }],
  'seq': [{
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }, {
    validator: (rule, value, callback) => {
      if (value < 1) {
        callback(new Error('顺序至少为1'))
      }
      callback()
    }
  }]
}

/**
 * 系统设置-税点管理
 * @type {Object}
 */
export const save_tax_point = {
  'name': [{
    required: true,
    message: '请输入发票内容'
  }, {
    whitespace: true,
    message: '不能全为空格字符串'
  }, {
    max: 40,
    message: '最大长度40'
  }],
  'tax_point': [{
    required: true,
    message: '请输入税点'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }]
}

/**
 * 系统设置-热门搜索词管理
 * @type {Object}
 */
export const save_hot_search_word = {
  'display_name': [{
    required: true,
    message: '请输入发票内容'
  }, {
    whitespace: true,
    message: '不能全为空格字符串'
  }],
  'city_id': [{
    required: true,
    message: '请选择所需城市'
  }],
  'words': [{
    type: 'array',
    required: true,
    min: 1,
    message: '请选择热词'
  }],
  // 'custom_word': [{
  // 	required: true,
  // 	message: '请输入发票内容',
  // }],
  'user_search_words': [{
    required: true,
    message: '请输入发票内容'
  }]
}

/**
 * 客服工单
 * @type {Object}
 */
export const task_rules = {
  'task_type_id': [{
    required: true,
    message: '请选择任务类型'
  }],
  'priority': [{
    required: true,
    message: '请选择任务优先级'
  }],
  'followed_by': [{
    required: true,
    message: '请指定跟进人'
  }],
  'description': [{
    required: true,
    message: '请对任务进行简要描述'
  }]
}

/**
 * crm-客户关系-商家/物业-公司编辑
 * @type {Object}
 */
export const company_rules = {
  'name': [{
    required: true,
    message: '请输入公司名称'
  }],
  'organization_level_id': [{
    required: true,
    message: '请选择组织层级'
  }]
}

/**
 * [getBusinessRules crm-客户关系-商家-商家编辑]
 * @param  {[type]} data [传入的验证表单]
 * @return {[type]}      [description]
 */
export function getBusinessRules(data) {
  return {
    'mobile': [{
      pattern: regs.MOBILE_REG,
      message: '请输入合法的手机号'
    }],
    'email': [{
      type: 'email',
      message: '请输入正确的邮箱'
    }],
    'cooperation_company': [{
      required: +data.cooperation_with_others === 1,
      message: '请输入竞争对手名称'
    }],

    'arr_industry_id': [{
      type: 'array',
      required: true,
      len: 2,
      message: '请选择主行业，需精确到二级行业'
    }],
    'industry_id': [{
      required: true,
      message: '请选择主行业'
    }],
    'arr_deputy_industry_id': [{
      type: 'array',
      len: 2,
      message: '选择的副行业需精确到二级行业'
    }],

    'demand_area': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }],
    'demand_max_area': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (+data.demand_area > +data.demand_max_area) {
          callback(new Error('输入的最小需求面积不能大于最大需求面积！'))
        }
        callback()
      }
    }],
    'acceptable_minimum_price': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }],
    'acceptable_maximum_price': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }, {
      validator: (rule, value, callback) => {
        if (+data.acceptable_minimum_price > +data.acceptable_maximum_price) {
          callback(new Error('输入的单场最低价格不能大于最高价格！'))
        }
        callback()
      }
    }],
    'gender_tendency': [{
      type: 'enum',
      enum: [0, 1, 2],
      message: '选择的值无效'
    }]
  }
}

/**
 * [getPropertyRules crm-客户关系-物业-物业编辑]
 * @param  {[type]} data [传入的验证表单]
 * @return {[type]}      [description]
 */
export function getPropertyRules(data) {
  return {
    'field_name': [{
      required: true,
      message: '请输入场地名称'
    }],
    'mobile': [{
      validator: (rule, value, callback) => {
        var mobile_arr = value.split('/')
        var mobile_len = mobile_arr.length
        for (var i = 0; i < mobile_len; i++) {
          if (mobile_arr[i] && !regs.MOBILE_REG.test(mobile_arr[i])) {
            callback(new Error('请检查第' + (i + 1) + "个'/'前面的手机号输入是否正确"))
            return false
          }
        }
        callback()
      }
    }],
    'email': [{
      type: 'email',
      message: '请输入正确的邮箱'
    }],
    'cooperation_company': [{
      required: +data.cooperation_with_others === 1,
      message: '请输入竞争对手名称'
    }]

  }
}

/**
 * 人事管理-员工-员工编辑
 * @type {Object}
 */
export const employee_rules = {
  'name': [{
    required: true,
    message: '请输入姓名'
  }],
  'mobile': [{
    required: true,
    message: '请输入手机号'
  }],
  'level_id': [{
    required: true,
    message: '请选择可见范围'
  }],
  'department_id': [{
    required: true,
    message: '请选择部门'
  }],
  'position_id': [{
    required: true,
    message: '请选择岗位'
  }],
  'city_id': [{
    required: true,
    message: '请选择城市'
  }],
  'status': [{
    required: true,
    message: '请选择员工状态'
  }]
}

/**
 * 询价管理-报价
 * @type {Object}
 */
export function enquiryOfferRules(data) {
  return {
    'activity_at': [{
      type: 'array',
      required: true,
      len: 2,
      message: '请选择活动日期'
    }],
    'length': [{
      required: true,
      pattern: regs.TWO_DECIMAL_NUMBER_WITHOUT_0_REG,
      message: '不为0的两位小数点小数'
    }],
    'width': [{
      required: true,
      pattern: regs.TWO_DECIMAL_NUMBER_WITHOUT_0_REG,
      message: '不为0的两位小数点小数'
    }],
    'price': [{
      required: true,
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入场地售价，两位小数点小数'
    }],
    // 邻汇补贴值
    'subsidy_value': [{
      pattern: data.subsidy_mode === 'subsidy_rate' ? regs.TWO_DECIMAL_NUMBER_WITHIN_100_REG : regs.TWO_DECIMAL_NUMBER_REG,
      message: data.subsidy_mode === 'subsidy_rate' ? '邻汇补贴率，100以内两位小数点小数' : '邻汇补贴金额，两位小数点小数'
    }],
    'deposit': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入押金，两位小数点小数'
    }],
    'cost_price': [{
      required: true,
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入成本价，两位小数点小数'
    }],
    'property_deposit': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '支出押金，两位小数点小数'
    }]
  }
}

/**
 * 询价管理-拒绝报价
 * @type {Object}
 */
export const enquiry_information_refuse = {
  'reason': [{
    required: true,
    message: '请输入拒绝原因'
  }]
}

/**
 * 富文本编辑器插入图片
 * @type {Object}
 */
export const pell_image_data = {
  'width': [{
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'height': [{
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'images': [{
    validator: (rule, value, callback) => {
      if (!value || value.length <= 0) {
        callback(new Error('请选择图片'))
      } else {
        callback()
      }
    }
  }]
}

/**
 * 编辑联系方式
 * @type {Object}
 */
export const store_contacts = {
  'page': [{
    required: true,
    message: '请选择所处页面'
  }],
  'type': [{
    required: true,
    message: '请输入类别/号码1名称'
  }, {
    max: 32,
    message: '最大长度32'
  }],
  'num': [{
    required: true,
    message: '请输入联系号码/号码1'
  }, {
    max: 32,
    message: '最大长度32'
  }]
}

/**
 * 编辑需求
 * @type {Object}
 */
export const edit_appeal = {
  'city_ids': [{
    type: 'array',
    required: true,
    min: 1,
    message: '请选择所需城市'
  }],
  'community_type_ids': [{
    type: 'array',
    required: true,
    min: 1,
    message: '请选择场地类型'
  }],
  'name': [{
    required: true,
    whitespace: true,
    message: '请输入联系人'
  }, {
    max: 32,
    message: '最大长度32'
  }],
  'mobile': [{
    required: true,
    whitespace: true,
    message: '请输入手机号码'
  }, {
    pattern: regs.TEL_REG,
    message: '请输入手机号码或座机号码'
  }],
  'company': [{
    required: true,
    whitespace: true,
    message: '请输入公司名称'
  }, {
    max: 255,
    message: '最大长度255'
  }],
  'product': [{
    required: true,
    whitespace: true,
    message: '请输入产品名称'
  }, {
    max: 255,
    message: '最大长度255'
  }],
  'single_field_budget': [{
    required: true,
    message: '请输入单场预算'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  /* 'start': [{
		required: true,
        message: '选择开始时间',
    }],*/
  'activity_date': [{
    type: 'array',
    required: true,
    message: '请选择活动时间范围'
  }, {
    validator: (rule, value, callback) => {
      for (const item of value) {
        if (!item) {
          callback(new Error('请选择活动时间'))
          return false
        }
      }
      callback()
    }
  }],
  'minimum_area': [{
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'maximum_area': [{
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }],
  'ex_description': [{
    max: 1000,
    message: '最大长度1000'
  }]
}

/**
 * 售卖资源加价
 * @type {Object}
 */
export const save_resource_markup = {
  'markup_percent': [{
    required: true,
    message: '请填写加价百分比'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }]
}

/**
 * 编辑用户的企业信息
 * @type {Object}
 */
export const save_enterprise = {
  'name': [{
    required: true,
    message: '请填写企业名称'
  }, {
    whitespace: true,
    message: '不能全为空格字符串'
  }, {
    max: 128,
    message: '最大长度128'
  }],
  'registration_no': [{
    required: true,
    message: '请填写统一社会信用代码'
  }, {
    max: 64,
    message: '最大长度64'
  }],
  'address_linkage': [{
    required: true,
    type: 'array',
    min: 2,
    message: '请至少选择省市'
  }, {
    validator: (rule, value, callback) => {
      if (!Array.isArray(value) || !value[0] || !value[1]) {
        callback(new Error('请至少选择省市'))
      } else {
        callback()
      }
    }
  }],
  'address': [{
    required: true,
    message: '请填写详细地址'
  }, {
    max: 128,
    message: '最大长度128'
  }],
  'cert_url': [{
    required: true,
    message: '请上传营业执照'
  }]
}
/**
 * 新增用户收款账号
 * @type {Object}
 */
export const receivables_information_rules = {
  'account_owner': [{
    required: true,
    message: '请输入收款人'
  }],
  'pay_type': [{
    required: true,
    message: '请选择付款方式'
  }],
  'account': [{
    required: true,
    whitespace: true,
    message: '请输入收款账号'
  }],
  'selected_receivables_information': [{
    validator: (rule, value, callback) => {
      if (JSON.stringify(value) !== '{}' && value.id) {
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

  }]
}

/**
 * 系统设置-添加用户白名单
 * @type {Object}
 */
export const user_white_list_rules = {
  'user_id': [{
    required: true,
    message: '请选择用户'
  }],
  'has_property_publish': [{
    required: true,
    message: '请选择是否有场地发布权限'
  }, {
    type: 'enum',
    enum: [0, 1],
    message: '选择的值无效'
  }]
}

/**
 * 系统设置-买家自动释放规则配置
 * @type {Object}
 */
export const auto_release_rule = {
  'release_time': [{
    required: true,
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }],
  'follow_timeout': [{
    required: true,
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }],
  'perfect_timeout': [{
    required: true,
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }]
}

/**
 * 帮助用户申请发布权限
 * @type {Object}
 */
export const apply_property_publish_rules = {
  'contact': [{
    required: true,
    message: '请输入联系人'
  }],
  'mobile': [{
    required: true,
    message: '请输入手机号码'
  }, {
    pattern: regs.TEL_REG,
    message: '请输入手机号码或座机号码'
  }],
  'pay_type': [{
    required: true,
    message: '请选择收款类型'
  }, {
    type: 'enum',
    enum: [2, 3, 4],
    message: '请选择正确的收款类型'
  }],
  'account_owner': [{
    required: true,
    message: '请输入开户人',
  }],
  'account': [{
    required: true,
    message: '请输入收款账号'
  }],
  'opening_bank': [{
    required: false,
    message: '请输入开户行'
  }]
}

/**
 * 编辑用户省市
 * @type {Object}
 */
export const user_province_city_rules = {
  'address_linkage': [{
    required: true,
    message: '请选择省市'
  }, {
    // required: false,
    // message: '请选择省市区',
    validator: (rule, value, callback) => {
      if (!Array.isArray(value) || value.length < 2 || value.some(item => !item)) {
        callback(new Error('请选择省市区'))
      } else {
        callback()
      }
    }
  }]
}



/**
 * 导航栏配置
 * @type {Object}
 */
export const navigation_bar_rules = {
  'data': [{
    type: 'array',
    required: true,
    message: '请选择配置项'
  }, {
    validator: (rule, value, callback) => {
      // 如果其中一个有值，那么其他的选项也必须填写
      if (!value || value.length <= 0) {
        callback(new Error('请至少选择一项'))
        return false
      }
      callback()
    }
  }]
}

/**
 * 推广图区块配置
 * @type {Object}
 */
export const spread_image_rules = {
  'is_show': [{
    required: true,
    message: '请选择是否显示'
  }],
  'imgs': [{
    required: true,
    message: '请填写选择图片'
  }, {
    validator: (rule, value, callback) => {
      if (!value || value.length !== 3) {
        callback(new Error('请选择三张图片'))
      } else {
        value.every(item => {

          if (!item.pic_url) {
            callback(new Error('请选择图片'))
            return false
          }
          if (item.link.indexOf('http://') !== 0 && item.link.indexOf('https://') !== 0) {
            callback(new Error('链接请以 http:// 或 https:// 开头'))
            return false
          }
          return true
        })
      }

      callback()
    }
  }]
}

/**
 * 内容配置区块
 * @type {Object}
 */
export const content_data_rules = {
  /* 'data': [{
    validator: (rule, value, callback) => {

      if (!value || value.length != 2) {
        callback(new Error('模块个数必须两个为一组'))
        return false
      }

      for (let data_item of value) {
        if (!regs.NON_FULL_EMPTY_STRING.test(data_item.name)) {
          callback(new Error('模块名称不能为空，请输入非全空字符串'));
          return true
        }

        if (!data_item.contents || data_item.contents.length !== 2) {
          callback(new Error('模块内容个数必须两个为一组'))
          return false
        }

        // if(!regs.NON_FULL_EMPTY_STRING.test(data_item.button)){
        //     callback(new Error('按钮名称不能为空，请输入非全空字符串'));
        //     return false
        // }

        // if(!regs.NON_FULL_EMPTY_STRING.test(data_item.link)){
        //     callback(new Error('按钮跳转链接不能为空，请输入非全空字符串'));
        //     return false
        // }
        // if(data_item.link.indexOf('http://') !== 0 && data_item.link.indexOf('https://') !== 0){
        //     callback(new Error('链接请以 http:// 或 https:// 开头'));
        //     return false
        // }

        for (let content_item of data_item.contents) {
          if (!content_item.pic_url) {
            callback(new Error('请上传内容图片'));
            return false
          }

          if (!regs.NON_FULL_EMPTY_STRING.test(content_item.title)) {
            callback(new Error('主标题不能为空，请输入非全空字符串'));
            return false
          }
          if (!regs.NON_FULL_EMPTY_STRING.test(content_item.keywords)) {
            callback(new Error('副标题不能为空，请输入非全空字符串'));
            return false
          }
          if (!regs.NON_FULL_EMPTY_STRING.test(content_item.description)) {
            callback(new Error('描述不能为空，请输入非全空字符串'));
            return false
          }
          if (!regs.NON_FULL_EMPTY_STRING.test(content_item.button)) {
            callback(new Error('按钮名称不能为空，请输入非全空字符串'));
            return false
          }
          if (!regs.NON_FULL_EMPTY_STRING.test(content_item.link)) {
            callback(new Error('按钮跳转链接不能为空，请输入非全空字符串'));
            return false
          }
          if (content_item.link.indexOf('http://') != 0 && content_item.link.indexOf('https://') != 0) {
            callback(new Error('链接请以 http:// 或 https:// 开头'));
            return false
          }

        }
        // console.log(222)

      }

      // console.log('callback')

      callback()
    }
  }], */
  'data': [{
    type: 'array',
    required: true,
    len: 2,
    fields: {
      0: content_data_data_rule(0),
      1: content_data_data_rule(1)
      // city: [{
      // 	type: "string",
      // 	required: true
      // }],
      // zip: [{
      // 	type: "string",
      // 	required: true,
      // 	len: 8,
      // 	message: "invalid zip"
      // }],
    },
    message: '每个大版块内必须包含两个子版块'
  }]
}

function content_data_data_rule(index) {
  return [{
    type: 'object',
    required: true,
    fields: {
      'name': [{
        required: true,
        pattern: regs.NON_FULL_EMPTY_STRING,
        message: '模块名称不能为空，请输入非全空字符串'
      }],
      'button': [{
        required: true,
        pattern: regs.NON_FULL_EMPTY_STRING,
        message: '按钮名称不能为空，请输入非全空字符串'
      }],
      'link': [{
        required: true,
        pattern: regs.NON_FULL_EMPTY_STRING,
        message: '按钮跳转链接不能为空，请输入非全空字符串'
      }, {
        validator: (rule, value, callback) => {
          if (value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0) {
            callback(new Error('链接请以 http:// 或 https:// 开头'))
            return false
          }
          callback()
        }
      }],
      'contents': [{
        validator: (rule, value, callback) => {
          for (const content_item of value) {
            if (!content_item.pic_url) {
              callback(new Error('请上传内容图片'))
              return false
            }

            if (!regs.NON_FULL_EMPTY_STRING.test(content_item.title)) {
              callback(new Error('主标题不能为空，请输入非全空字符串'))
              return false
            }
            if (!regs.NON_FULL_EMPTY_STRING.test(content_item.keywords)) {
              callback(new Error('副标题不能为空，请输入非全空字符串'))
              return false
            }
            if (!regs.NON_FULL_EMPTY_STRING.test(content_item.description)) {
              callback(new Error('描述不能为空，请输入非全空字符串'))
              return false
            }
          }
          callback()
        }

      }]
    }
  }]
}

/**
 * 添加新案例
 * @type {Object}
 */
export const create_cases = {
  'title': [{
    required: true,
    message: '请输入标题'
  }],
  'date': [{
    required: true,
    message: '请选择开始结束时间'
  }],
  'physical_resources_name': [{
    required: true,
    validator: (rule, value, callback) => {
      if (!value && !value.length) {
        callback(new Error('请输入并选择展位'))
      } else {
        callback()
      }
    }
  }],
  'address_linkage': [{
    required: true,
    validator: (rule, value, callback) => {
      if (!Array.isArray(value) || value.length < 3 || value.some(item => !item)) {
        callback(new Error('请选择省市区'))
      } else {
        callback()
      }
    }
  }],
  'show_city': [{
    required: true,
    validator: (rule, value, callback) => {
      if (!value || value.length <= 0) {
        callback(new Error('请选择展示城市'))
      } else {
        callback()
      }
    }
  }],
  'theme_id': [{
    required: true,
    validator: (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择主题'))
      } else {
        callback()
      }
    }
  }],
  'cover_pic_url': [{
    required: true,
    validator: (rule, value, callback) => {
      if (!value || value.length <= 0) {
        callback(new Error('请选择封面图片'))
      } else {
        callback()
      }
    }
  }],
  'activity_case_url': [{
    required: true,
    validator: (rule, value, callback) => {
      if (!value || value.length <= 0) {
        callback(new Error('请选择案例图片'))
      } else {
        callback()
      }
    }
  }]
}
/**
 * 增加主题
 * @type {Object}
 */
export const cases_theme_list_rules = {
  'name': [{
    required: true,
    message: '请输入主题名称'
  }]
}
/**
 * 上传案例图片
 * @type {Object}
 */
export const create_cases_images = {
  'physical_resources_id': [{
    required: true,
    message: '请输入并选择展位'
  }],
  'img_urls': [{
    type: 'array',
    required: true,
    min: 1,
    message: '请上传案例图片'
  }],
  'name': [{
    required: true,
    message: '请输入图片名称'
  }],
  'theme_id': [{
    required: true,
    message: '请选择主题'
  }]
}

/**
 * 编辑消息推送
 * @type {Object}
 */
export function saveMessagePushData(data = {}) {
  return {
    'type': [{
      required: true,
      message: '请选择推送类型'
    }, {
      type: 'enum',
      enum: [1, 2],
      message: '选择的值无效'
    }],

    'push_range': [{
      required: true,
      message: '请选择推送对象'
    }, {
      type: 'enum',
      enum: [1, 2, 3],
      message: '选择的值无效'
    }],

    'user_group_id': [{
      required: +data.push_range === 1,
      message: '请选择用户分组'
    }],

    'message_style': [{
      // required_if:type,2
      required: +data.type === 2,
      message: '请选择消息形式'
    }],
    'message_type': [{
      required: true,
      message: '请选择消息类型'
    }],
    'title': [{
      required: true,
      message: '请输入消息标题'
    }],
    'content': [{
      required: true,
      message: '请输入消息内容'
    }],
    'image': [{
      // required_if:message_style,1
      required: +data.message_style === 1,
      message: '请上传消息封面'
    }],
    'link': [{
      type: 'url',
      message: '消息链接格式不正确'
    }],
    'pushing_time_at': [{
      required: true,
      message: '请选择推送时间'
    }, {
      validator: (rule, value, callback) => {
        if (value && new Date(value).getTime() < new Date().getTime()) {
          callback(new Error('推送时间应大于当前时间'))
        }
        callback()
      }
    }],
    'mobile': [{
      pattern: regs.TEL_REG,
      message: '请输入手机号码或座机号码'
    }],
    'import_file_url': [{
      // required_if:push_range,2
      required: +data.push_range === 2,
      message: '请上传导入用户文件'
    }],
    'tpl_id': [{
      // required_if:push_range,2
      required: +data.type === 1,
      message: '请选择短信模板'
    }]
  }
}

/**
 * 订单买家关联合同
 * @type {Object}
 */
export const connect_contract_rules = {
  'contractPur': [{
    required: true,
    message: '请选择合同'
  }]
}
/**
 * 订单大额垫款申请
 * @type {Object}
 */
export const advance_apply_data_rules = {
  'amount': [{
    required: true,
    message: '请输入垫款金额'
  }, {
    pattern: regs.TWO_DECIMAL_NUMBER_REG,
    message: '请输入两位小数点小数'
  }, {
    validator: (rule, value, callback) => {
      if (parseFloat(value) > 100000000) {
        callback(new Error('垫款金额必须小于 100000000'))
        return false
      }
      callback()
    }
  }]
}

/**
 * 保存标签
 * @type {Object}
 */
export const tag_list_rules = {
  'cities': [{
    required: true,
    validator: (rule, value, callback) => {
      if (!value || value.length <= 0) {
        callback(new Error('请选择展示城市'))
      } else {
        callback()
      }
    }
  }],
  'name': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入标签名称'
  }],
  'display_name': [{
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入非全空字符串'
  }],
  'seq': [{
    required: true,
    message: '请输入排序数'
  }, {
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入非全空字符串'
  }, {
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }]
}
/**
 * kp设置提醒
 * @type {Object}
 */
export const kp_rules = {
  'remind_time': [{
    required: true,
    message: '请选择日期时间'
  }],
  'remind_content': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING_MULTILINE,
    message: '请输入提醒内容'
  }]
}
/**
 * kp编辑
 * @type {Object}
 */
export const kp_management_rule = {
  'name': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入姓名'
  }],
  'mobile': [{
    required: true,
    message: '请输入手机号'
  }, {
    pattern: regs.MOBILE_REG,
    message: '输入的格式不正确'
  }],
  'email': [{
    type: 'email',
    message: '请输入正确的邮箱'
  }],
  'company_name': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入企业名称'
  }],
  'cooperation_with_others': [{
    required: true,
    message: '请选择竞争对手合作状态'
  }],
  'cooperation_company': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入竞争对手名称'
  }]
}
/**
 * 品牌编辑
 * @type {Object}
 */
export const brand_editor_rules = {
  'display_name': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入品牌名称'
  }]
}
/**
 * 意向客户设置提醒表单
 * @type {Object}
 */
export const businesses_rules = {
  'remind_time': [{
    required: true,
    message: '请选择日期时间'
  }],
  'remind_content': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING_MULTILINE,
    message: '请输入提醒内容'
  }]
}
/**
 * 行业管理新增编辑
 * @type {Object}
 */
export const industry_editor_rules = {
  'name': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入非空字符串'
  }],
  'display_name': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入非空字符串'
  }]
}
/**
 * 行业管理新增编辑
 * @type {Object}
 */
export const merge_industry_rules = {
  'parent_id': [{
    required: true,
    message: '请选择合并的行业'
  }]
}
/**
 * 展位位置类型表单
 * @type {Object}
 */
export const location_type_rules = {
  'display_name': [{
    required: true,
    message: '请输入展位位置类型'
  }, {
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入非空字符'
  }]
}
