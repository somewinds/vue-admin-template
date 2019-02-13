// 专题管理
import * as regs from '../regular'

/**
 * 专题管理-列表查询用验证
 * @type {Object}
 */
export function getSpecialSubjectsRules(data) {
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
 * 新增/编辑专题
 * @type {Object}
 */
export function storeSpecialSubjectRules(data = {}) {
  return {
    'template': [{
      type: 'enum',
      required: true,
      enum: [1, 2], // 专题模板：1 模板一，2 模板二
      message: '请选择有效的专题模板'
    }],
    'title': [{
      required: true,
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入专题名称'
    }],
    'city_ids': [{
      type: 'array',
      required: true,
      min: 1,
      message: '请选择展示城市'
    }],
    'display': [{
      required: true,
      message: '请选择前端是否展示'
    }],
    'cover_map_url': [{
      required: true,
      message: '请选择专题封面'
    }],

    'description': [{
      required: true,
      // pattern: regs.NON_FULL_EMPTY_STRING_MULTILINE,
      whitespace: true,
      message: '请输入说明'
    }],
    'color': [{
      required: true,
      message: '请选择专题背景色'
    }],

    // 模板二：
    'seq': [{
      required: +data.template === 2,
      message: '请输入展示顺序'
    }, {
      pattern: +data.template === 2 ? regs.POSITIVE_REG : null,
      message: '请输入正整数'
    }],
    'link': [{
      type: 'url',
      message: '请输入正确的链接格式'

    }, {
      required: +data.template === 2,
      message: '请输入专题链接'
    }],

    // 模板一：
    'pc_banner': [{
      required: +data.template === 1,
      message: '请选择PC专题banner'
    }],
    'app_banner': [{
      required: +data.template === 1,
      message: '请选择APP专题banner'
    }],
    'url': [{
      type: 'url',
      message: '请输入正确的链接格式'

    }, {
      required: +data.template === 1,
      message: '请输入banner链接'
    }],

    // 专题分类
    'classifies': [{
      type: 'array',
      required: +data.template === 1,
      min: 1,
      message: '请填写至少一个专题分类'
    }, {
      validator: (rule, value, callback) => {
        /* value.forEach((item, index) => {
          // statements
        });*/
        callback()
      }
    }]
  }
}
/**
 * 专题推荐展位排版设置
 * @type {Object}
 */
export function storeRecommendResourcesTypesettingRules(data = {}) {
  return {
    'images_count': [{
      type: 'enum',
      required: true,
      enum: [1, 2, 3, 4],
      message: '请选择一行展示几张图'
    }],
    'app_banner_width': [{
      type: 'integer',
      required: true,
      pattern: regs.INT_NUMBER_REG,
      min: 320,
      max: 2000,
      message: '请输入APP限定宽度，整数，最小320px，最大2000px'
    }],
    'pc_banner_width': [{
      type: 'integer',
      required: true,
      pattern: regs.INT_NUMBER_REG,
      min: 320,
      max: 2000,
      message: '请输入APP限定宽度，整数，最小320px，最大2000px'
    }]
  }
}

