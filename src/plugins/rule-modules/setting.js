// 系统设置
import * as regs from '../regular'

/**
 * APP首页导航配置
 * @type {Object}
 */
export const app_homepage_config_rules = {
  'title': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入名称'
  }, {
    max: 4,
    message: '最大长度为4'
  }],
  'seq': [{
    required: true,
    message: '请输入顺序'
  }, {
    pattern: regs.INT_NUMBER_REG,
    message: '请输入整数'
  }],
  'pic_url': [{
    required: true,
    message: '请选择图片'
  }]
}
/**
 * 客服管理
 * @type {Object}
 */
export const customer_manage_rule = {
  'name': [{
    required: true,
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '请输入名称'
  }, {
    max: 10,
    message: '最大长度为10'
  }],
  'avatar': [{
    required: true,
    message: '请上传客服头像'
  }],
  'wechat': [{
    required: true,
    message: '请输入微信号'
  }],
  'tel': [{
    required: true,
    message: '请输入联系电话'
  }, {
    pattern: regs.TEL_REG,
    message: '请输入正确手机号'
  }],
  'qrcode': [{
    required: true,
    message: '请上传微信二维码'
  }],
  'cities': [{
    required: true,
    message: '请选择城市'
  }],
  'profile': [{
    required: true,
    message: '请输入客服简介'
  }, {
    pattern: regs.NON_FULL_EMPTY_STRING_MULTILINE,
    message: '输入内容不能为空字符'
  }]
}

/**
 * app首页悬浮图片配置
 * @type {Object}
 */
export const fixed_icon_rule = {
  'hover_image_url': [{
    required: true,
    message: '请上传图标'
  }],
  'hover_image_href': [{
    required: true,
    message: '请输入跳转链接'
  }, {
    pattern: regs.NON_FULL_EMPTY_STRING,
    message: '输入内容不能为空字符'
  }]
}

/**
 * 编辑图标
 * @type {Object}
 */
export const editIconRules = {
  'name': [{
    required: true,
    whitespace: true,
    message: '请输入名称'
  }],
  'icon_url': [{
    required: true,
    message: '请上传图标'
  }],
  'date': [{
    type: 'array',
    required: true,
    len: 2,
    message: '请选择有效时间'
  }, {
    validator: (rule, value, callback) => {
      if (value[0] && new Date(value[0]).getTime() <= new Date().getTime()) {
        callback(Error('开始时间需大于当前时间'))
        return false
      }
      callback()
    }
  }]
}


