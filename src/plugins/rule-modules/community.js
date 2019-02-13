// 场地
import * as regs from '../regular'

/**
 * 编辑社区
 * 需要根据某些条件改变部分参数验证规则
 * @type {Object}
 */
export function getCommunityRules(data) {
  return {
    'category': [{
      required: true,
      message: '请选择场地类目'
    }, {
      validator: (rule, value, callback) => {
        if (data.category_info && Array.isArray(data.category_info.children) && data.category_info.children.length > 0) {
          callback(new Error('必须选择到叶子类目'))
          return false
        }
        callback()
      }
    }],
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
      message: '请选项省份'
    }],
    'city_id': [{
      required: true,
      message: '请选择城市'
    }],
    'district_id': [{
      required: true,
      message: '请选择区域'
    }],
    'name': [{
      validator: (rule, value, callback) => {
        if (!data.address_linkage || data.address_linkage.length < 3) {
          callback(new Error('为了确保查询精确度，请先选择省市区'))
        } else {
          callback()
        }
      }
    }, {
      required: true,
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入社区名称'
    }, {
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入非全空字符串'
    }],
    'detailed_address': [{
      validator: (rule, value, callback) => {
        if (!data.address_linkage || data.address_linkage.length < 3) {
          callback(new Error('为了确保查询精确度，请先选择省市区'))
        } else {
          callback()
        }
      }
    }, {
      required: true,
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入详细地址'
    }, {
      validator: (rule, value, callback) => {
        if (!value || value.length < 5) {
          callback(new Error('详细地址长度范围5-255个字符'))
        } else {
          callback()
        }
      }
    }, {
      pattern: regs.NON_FULL_EMPTY_STRING,
      message: '请输入非全空字符串'
    }],
    'lng': [{
      required: true,
      message: '请输入正确地址或点击地图选择经度'
    }],
    'lat': [{
      required: true,
      message: '请输入正确地址或点击地图选择纬度'
    }],
    'community_imgs': [{
      required: true,
      message: '请上传场地图片'
    }],
    'description': [{
      required: true,
      max: 600,
      pattern: regs.NON_FULL_EMPTY_STRING_MULTILINE,
      message: '请输入场地描述'
    }],
    'trading_area_id': [],
    'build_year': [{
      required: true,
      message: '请选择建成年份'
    }],
    'building_area': [{
      pattern: regs.TWO_DECIMAL_NUMBER_REG,
      message: '请输入两位小数点小数'
    }],

    'total_number_of_people': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }],

    /* 'occupancy_rate': [{
            required: ['住宅', '写字楼', '园区', '大企业', '众创空间'].indexOf(data.community_type) >= 0,
            message: '请输入入住率',
        }, {
            pattern: regs.TWO_DECIMAL_NUMBER_WITHIN_100_REG,
            message: '请输入100以内的两位小数点小数',
        }],*/
    /* 'number_of_households': [{
            required: ['商场', '住宅'].indexOf(data.community_type) >= 0,
            message: '请输入' + (data.community_type == '商场' ? '商户数' : '户数'),
        }, {
            pattern: regs.INT_NUMBER_REG,
            message: '请输入整数',
        }],
        'number_of_enterprises': [{
            pattern: regs.INT_NUMBER_REG,
            message: '请输入整数',
        }],*/
    /* 'rent': [{
            required: false,
            message: '请输入租金',
        }, {
            pattern: regs.TWO_DECIMAL_NUMBER_REG,
            message: '请输入两位小数点小数',
        }],*/
    /* 'house_price': [{
            required: data.community_type == '住宅',
            message: '请输入房价',
        }, {
            pattern: regs.INT_NUMBER_REG,
            message: '请输入整数',
        }],*/
    /* 'property_costs': [{
            required: ['写字楼', '园区', '大企业', '众创空间'].indexOf(data.community_type) >= 0,
            message: '请输入物业费',
        }, {
            pattern: regs.TWO_DECIMAL_NUMBER_REG,
            message: '请输入两位小数点小数',
        }],*/
    /* 'construction_class_id': [{
            required: false,
            message: '请选择建筑等级',
        }],*/
    /* 'enterprise_type_id': [{
            required: false,
            message: '请选择企业类型',
        }],*/
    /* 'supermarket_type_id': [{
            required: data.community_type == '超市',
            message: '请选择超市定位',
        }],
        'shopping_mall_type_id': [{
            required: data.community_type == '商场',
            message: '请选择商场定位',
        }],*/
    /* 'house_attribute_id': [{
            required: data.community_type == '住宅',
            message: '请选择住宅属性',
        }],*/
    /* 'average_fare': [{
            required: false,
            message: '请输入平均票价',
        }, {
            pattern: regs.TWO_DECIMAL_NUMBER_REG,
            message: '请输入两位小数点小数',
        }],
        'theater_scale_id': [{
            required: data.community_type == '影院',
            message: '请选择影院规模',
        }],
        'college_type_id': [{
            required: data.community_type == '学校',
            message: '请选择院校分类',
        }],*/
    /* 'number_of_seat': [{
            required: true,
            message: '请输入座位数',
        }, {
            pattern: regs.INT_NUMBER_REG,
            message: '请输入整数',
        }],*/
    /* 'total_floor': [{
            required: data.community_type == '写字楼',
            message: '请输入总楼层',
        }, {
            pattern: regs.INT_NUMBER_REG,
            message: '请输入整数',
        }],*/

    /* 'owned_property': [{
            max: 32,
            message: '最大长度32',
        }],*/

    'male_proportion': [{
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }],
    // 婚育状况
    'married_proportion_sum': [{
      type: 'number',
      min: 0,
      max: 100,
      message: '婚育状况总比例应在 0-100% 内'
    }],
    'unmarried_proportion': [{
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
      // }, {
      //  required: true,
      //  type: 'number',
      //  min: 0,
      //  max: 100,
      //  message: '请输入 0-100 内的比例',
    }],
    'married_unpregnant_proportion': [{
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }],
    'married_pregnant_proportion': [{
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }],

    // 学历水平
    'graduate_proportion_sum': [{
      type: 'number',
      min: 0,
      max: 100,
      message: '学历水平总比例应在 0-100% 内'
    }],
    'undergraduate_proportion': [{
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }],
    'graduate_proportion': [{
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }],
    'specialty_proportion': [{
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }],

    // 职业背景
    'career_backgrounds': [{
      validator: (rule, value, callback) => {
        // 是否有有效值
        let has_valid_value = false
        // 是否有空值
        let has_null_value = false
        let sum = 0
        for (const item of value) {
          if (isNaN(parseInt(item.proportion))) {
            has_null_value = true
          } else if (item.proportion >= 0 && item.proportion <= 100) {
            has_valid_value = true
          }

          // 如果其中一个有值，那么其他的选项也必须填写
          if (has_valid_value && has_null_value) {
            // console.log(item.proportion)
            callback(new Error('请完善剩余的比例'))
            return false
          }

          sum += parseFloat(item.proportion) || 0
          if (item.proportion && !regs.INT_TWO_WITHIN_100_REG.test(item.proportion)) {
            callback(new Error('请输入100以内的两位整数'))
            return false
          }
        }
        if (has_valid_value && +sum !== 100) {
          callback(new Error('年龄分布总比例应为 100%'))
          return false
        }
        callback()
      }
    }],

    // 年龄分布
    'age_groups': [{
      validator: (rule, value, callback) => {
        // 是否有有效值
        let has_valid_value = false
        // 是否有空值
        let has_null_value = false
        let sum = 0
        for (const item of value) {
          if (isNaN(parseInt(item.proportion))) {
            has_null_value = true
          } else if (item.proportion >= 0 && item.proportion <= 100) {
            has_valid_value = true
          }

          // 如果其中一个有值，那么其他的选项也必须填写
          if (has_valid_value && has_null_value) {
            callback(new Error('请完善剩余的比例'))
            return false
          }

          sum += parseFloat(item.proportion) || 0
          if (item.proportion && !regs.INT_TWO_WITHIN_100_REG.test(item.proportion)) {
            callback(new Error('请输入100以内的两位整数'))
            return false
          }
        }
        if (has_valid_value && +sum !== 100) {
          callback(new Error('年龄分布总比例应为 100%'))
          return false
        }
        callback()
      }
    }],

    'private_car_proportion': [{
      pattern: regs.INT_TWO_WITHIN_100_REG,
      message: '请输入100以内的两位整数'
    }]

  }

}

/**
 * 场地移动类目
 * @type {Object}
 */
export function changeCommunityCategoryRules(data) {
  return {
    'category': [{
      required: true,
      message: '请选择场地类目'
    }, {
      validator: (rule, value, callback) => {
        if (data.category_info && Array.isArray(data.category_info.children) && data.category_info.children.length > 0) {
          callback(new Error('必须选择到叶子类目'))
          return false
        }
        callback()
      }
    }]
  }
}

/**
 * 场地列表查询用验证
 * @type {Object}
 */
export function getCommunitiesRules(data) {
  return {
    'build_year_start': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }, {
      validator: (rule, value, callback) => {
        if (value && data.build_year_end && +value > +data.build_year_end) {
          callback(Error('最小值不能大于最大值'))
          return false
        }
        callback()
      }
    }],
    'build_year_end': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }, {
      validator: (rule, value, callback) => {
        if (value && data.build_year_start && +value < +data.build_year_start) {
          callback(Error('最小值不能大于最大值'))
          return false
        }
        callback()
      }
    }],
    'update_days': [{
      pattern: regs.INT_NUMBER_REG,
      message: '请输入整数'
    }]

  }
}
