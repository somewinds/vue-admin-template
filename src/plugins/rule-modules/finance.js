// 财务相关验证

import * as regs from '../regular'

/**
 * 票据开票
 * @type {Object}
 */
export function getInvoiceIssueRules(data) {
  return {
    'tax_point': [{
      required: true,
      message: '请选择开票税点'
    }],
    'goodsname': {
      required: true,
      message: '请输入商品名称'
    },
    'orderno': {
      required: true,
      message: '请输入票据ID'
    },
    'invoiceLine': {
      type: 'enum',
      enum: ['p', 'c', 's'],
      required: true,
      message: '请选择发票种类'
    },
    'kptype': [{
      type: 'enum',
      enum: [1, 2],
      required: true,
      message: '请选择开票类型'
    }, {
      validator: (rule, value, callback) => {
        if (+value === 2 &&
          (!data.fpdm || !regs.NON_FULL_EMPTY_STRING.test(data.fpdm) ||
            !data.fphm || !regs.NON_FULL_EMPTY_STRING.test(data.fphm))) {
          callback(new Error('选择红票时，蓝票发票代码、号码必填'))
          return false
        }
        callback()
      }
    }],
    'hsbz': {
      type: 'enum',
      enum: [0, 1],
      required: true,
      message: '请选择单价含税标志'
    },
    'fphxz': {
      type: 'enum',
      enum: [0, 1, 2],
      required: true,
      message: '请选择发票性质'
    },
    'tsfs': {
      type: 'enum',
      enum: [-1, 0, 1, 2],
      required: true,
      message: '请选择推送方式'
    },
    'buyername': {
      required: true,
      message: '请输入购方名称'
    },
    'taxnum': {
      required: true,
      message: '请输入购方税号'
    },
    'phone': [{
      required: true,
      message: '请输入购方手机'
    }, {
      pattern: regs.TEL_REG,
      message: '请输入手机号码或座机号码'
    }],
    'email': {
      type: 'email',
      required: true,
      message: '请输入购方邮箱'
    },
    'account': {
      required: true,
      message: '请输入购方银行账号'
    },
    'address': {
      required: true,
      message: '请输入购方注册地址'
    }
  }
}
