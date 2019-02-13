// 类目管理
import * as regs from '../regular'

/**
 * 类目移动
 * @type {Object}
 */
export function MoveCategoryRules(data = {}) {
  return {
    'parent_category_arr': [{
      validator: (rule, value, callback) => {
        // 如果选择了类目，做以下判断
        if (data.parent_id) {
          if (data.id === data.parent_id) {
            callback(Error('选择的上级类目不能为当前类目'))
            return false
          }
          if (data.parent_category && ((!data.parent_category.children || data.parent_category.children <= 0) &&
              data.parent_category.community_count > 0)) {
            callback(Error('选择的上级类目无叶子类目且有关联数据，需新增一个叶子类目'))
            return false
          }
        }
        callback()
      }
    }]
  }
}

/**
 * 新增/编辑属性
 * @type {Object}
 */
export function getStoreAttributeRules(data = {}) {
  return {
    'name': [{
      required: true,
      message: '请输入属性名称'
    }],
    'type': [{
      required: true,
      message: '请选择控件类型'
    }],
    'required': [{
      required: true,
      message: '请选择是否校验'
    }],
    // 动态显示字段，需要在el-form-item上加key区分，让vue为他们独立渲染，否则会出现验证提示遗留的bug
    'hint': [{
      required: true,
      message: '请输入默认提示文字'
    }],
    // 动态显示字段，需要在el-form-item上加key区分，让vue为他们独立渲染，否则会出现验证提示遗留的bug
    'options': [{
      type: 'array',
      required: true,
      min: 1,
      message: '请输选择选项内容'
    }, {
      validator: (rule, value, callback) => {
        // 只要有一项不为空值，验证通过
        if (!value.some(item => regs.NON_FULL_EMPTY_STRING.test(item.value))) {
          callback(Error('选项内容至少填写一项'))
        }
        // 如果所有选项都有输入框，且选项名称不为空，那么提示文字必填
        if (+data.all_inputs === 1 && value.some(item => regs.NON_FULL_EMPTY_STRING.test(item.value) && !regs.NON_FULL_EMPTY_STRING.test(item.placeholder))) {
          callback(Error('选项名称的默认提示文字必填'))
        }
        const arr_value = value.map(item => item.value)
        // 判断重复值
        for (const item of arr_value) {
          if (item && arr_value.indexOf(item) !== arr_value.lastIndexOf(item)) {
            callback(Error(`选项内容：“${item}” 重复，请重新填写`))
            return false
          }
        }
        callback()
      }
    }],
    'min_length': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }, {
      validator: (rule, value, callback) => {
        if (+value > +data.max_length) {
          callback(Error('最小值不能大于最大值'))
          return false
        }
        if (value > 1000) {
          callback(Error('限制字数不能超过1000'))
          return false
        }
        callback()
      }
    }],
    'max_length': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }, {
      validator: (rule, value, callback) => {
        if (+value < +data.min_length) {
          callback(Error('最小值不能大于最大值'))
          return false
        }
        if (value > 1000) {
          callback(Error('限制字数不能超过1000'))
          return false
        }
        callback()
      }
    }],
    'is_filter': [{
      required: true,
      message: '请选择前端是否筛选'
    }]
    /* 'date_data_type': [{
	        required: true,
	        message: '请选择数据类型'
	    }],
	    'date_value_format': [{
	        required: true,
	        message: '请选择日期格式'
	    }],
	    'time_value_format': [{
	        required: true,
	        message: '请选择精确时间'
	    }],
	    'number_right_word': [{
	        required: true,
	        message: '请输入输入框右侧文字'
	    }],
	    'is_allow_decimal': [{
	        required: true,
	        message: '请选择是否允许小数'
	    }],
	    'decimal_point': [{
			pattern: regs.INT_NUMBER_REG,
			message: '请输入整数',
	    }, {
			pattern: /^(([0-9])|(1[0-6]))$/,
			message: '位数最大16位',
	    }],*/

  }
}


/**
 * 编辑类目属性值验证
 * @type {Object}
 */
export function SetAttributeValueRules(item = {}) {
  // console.log(item)
  if (!item) {
    return []
  }
  let rules = []
  switch (item.type) {
    // 单选型
    case 1:
      rules = [{
        required: (+item.required === 1),
        message: `请选择${item.name}`
      }]
      break
    // 多选型
    case 2:
      rules = [{
        required: (+item.required === 1),
        type: 'array',
        min: (+item.required === 1 ? 1 : 0),
        message: `请选择${item.name}`
      }]
      break
    // 单行文本型
    case 3:
      rules = [{
        required: (+item.required === 1),
        message: `请输入${item.name}`
      }, {
        pattern: regs.NON_FULL_EMPTY_STRING,
        message: '请输入非全空字符串'
      }, {
        min: item.min_length,
        max: item.max_length,
        message: `请输入${item.min_length}-${item.max_length}个字符串`
      }]
      break
    // 多行文本型
    case 4:
      rules = [{
        required: (+item.required === 1),
        message: `请输入${item.name}`
      }, {
        pattern: regs.NON_FULL_EMPTY_STRING_MULTILINE,
        message: '请输入非全空字符串'
      }, {
        min: item.min_length,
        max: item.max_length,
        message: `请输入${item.min_length}-${item.max_length}个字符串`
      }]
      break
    default:
      rules = []
      break
  }
  return rules
}
