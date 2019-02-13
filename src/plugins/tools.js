// 公共方法

import Vue from 'vue'
import { Message } from 'element-ui'
import moment from 'moment'
import Viewer from 'viewerjs' // 图片预览

/**
 * 将date-picker时间范围选择器选择的时间进行格式处理，默认格式为YYYY-MM-DD
 * 其时间格式为 'Tue Aug 08 2017 00:00:00 GMT+0800 (中国标准时间)'
 */
export function fliters_time(time, formatString) {
  if (time) {
    // 时间格式处理，默认格式为YYYY-MM-DD
    formatString = formatString || 'YYYY-MM-DD'
    return moment(time).format(formatString)
  } else {
    return ''
  }
}

/**
 * 获得日期为周几
 * @return {[type]} [description]
 */
export function getDay(date) {
  if (!date) {
    return '未知'
  }
  const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const day = new Date(date).getDay()
  return weekday[day]
}
/**
 * 日期时间增加天数
 * @param {[type]} time 日期格式：2017-01-01
 * @param {Number} days 增加天数，默认1天
 */
export function addDays(time, days = 1) {
  if (!time) {
    return ''
  }
  const date = new Date(time)
  const new_date = fliters_time(new Date(date.getTime() + 1000 * 60 * 60 * 24 * days))
  return new_date
}

/**
 * [set_viewer 使用图片预览]
 * @param {[type]}  self       [vue实例]
 * @param {String}  data       [监听的参数，默认为 data_items]
 * @param {String}  selector   [对该元素节点下的图片进行预览，默认为 #body]
 * @param {Boolean} need_watch [是否需要使用watch监听对象变化，否则调用时直接进行预览]
 */
export function set_viewer(self, data = 'data_items', selector = '#body', need_watch = true) {
  function setView() {
    let viewer = document.querySelector(selector).viewer
    // 如果存在旧的预览容器，进行销毁重新创建
    if (viewer) {
      viewer.destroy()
    }
    const viewer_box = document.querySelector(selector)
    // 数据为空或不存在时，返回
    if (!viewer_box) {
      return false
    }
    // 预览器属性设置
    self.viewer_option = self.viewer_option
      ? self.viewer_option
      : { url: 'data-original',
        zoomRatio: 0.2,
        minZoomRatio: 0.2,
        maxZoomRatio: 6,
        rotatable: false,
        scalable: false }
    viewer = new Viewer(viewer_box, self.viewer_option)
  }
  if (need_watch) {
    self.$watch(data,
      (val, oldVal) => {
        // 监听data_item重新渲染后执行的操作
        self.$nextTick(() => {
          setView()
        })
      },
      {
        immediate: true
      }
    )
    return true
  } else {
    setView()
    return true
  }
}

/**
 * 根据关键词，从已有json数组数据中筛选结果
 * @param  {[type]} data_items 要过滤的数据
 * @param  {[type]} keyword    过滤关键词
 * @param  {String} param      关键词对应的参数名
 * @return {[type]}            [description]
 */
export function filter_by_keyword(data_items, keyword, param = 'display_name') {
  keyword = keyword.trim()
  if (data_items.length <= 0 || !keyword) {
    return data_items
  }
  const arr = []
  for (const item of data_items) {
    if (item[param] && item[param].indexOf(keyword) >= 0) {
      arr.push(item)
    }
  }

  return arr
}

/**
 * 延迟操作（如，输入停顿0.6s后，快速查询）
 * @param  {Function} callback 输入停顿后执行的方法
 * @return {[type]}            [description]
 */
export function dataBrief(callback, pause_time = 600) {
  // 当用户停顿输入（0.6s）后，开始搜索，防止频繁调取接口导致报错或查询结果不对
  const self = this
  if (!self.t_start_brief) {
    self.t_start_brief = null
  }

  clearTimeout(self.t_start_brief)
  self.t_start_brief = setTimeout(function() {
    // console.log('停止输入，开始搜索')
    // 停止输入，开始搜索
    callback()
  }, pause_time)
}

/**
 * 从对象中剔除指定值的参数
 * 如，剔除为null的参数，不进行传递
 * @param  {[type]} data  对象
 * @param  {[type]} value 指定值，默认剔除为null的元素
 * @return {[type]}       [description]
 */
export function removeParam(data, value = null) {
  // 剔除为null的参数，不进行传递
  for (const item in data) {
    if (data[item] === value) {
      // 数组
      if (Array.isArray(data)) {
        data.splice(item, 1)
      } else {
        delete data[item]
      }
    }
  }
}

/**
 * 对对象中指定值进行替换
 * 可以将空值替换为null，防止数值型的参数传递空字符串将保存为0
 * @param  {[type]} data      [对象]
 * @param  {String} value     [指定值]
 * @param  {[type]} new_value [替换值]
 * @return {[type]}           [description]
 */
export function replaceParam(data, value, new_value) {
  if (value === undefined && new_value === undefined) {
    return false
  }
  for (const item in data) {
    if (data[item] === value) {
      data[item] = new_value
    }
  }
}

/**
 * 监听页面图片是否加载完毕
 * @param  {[type]}   self     [this 指向的vue]
 * @param  {Function} callback [所有图片加载完成回调函数]
 * @return {[type]}            [description]
 */
export function watchImageLoaded(self, callback) {
  self.img_count = self.img_count ? self.img_count : 0
  self.img_loaded_count = self.img_loaded_count ? self.img_loaded_count : 0

  const imgs = document.querySelectorAll('img')
  // console.log(imgs)
  self.img_count = imgs.length
  Array.from(imgs).forEach((item) => {
    // let img = new Image()
    // img.src = item.getAttribute('src')

    item.onload = () => {
      // console.log(item, ' 已加载')
      self.img_loaded_count++
      if (self.img_loaded_count >= self.img_count) {
        // console.log("加载完毕")
        callback()
      }
    }
    item.onerror = () => {
      // console.log(item, ' 加载失败')
      self.img_loaded_count++
      if (self.img_loaded_count >= self.img_count) {
        // console.log("加载完毕")
        callback()
      }
    }
  })
}

/**
 * [jumpToNode 页面滚动到节点所在位置]
 * @param  {[type]} self    [vue实例]
 * @param  {[type]} jump_to [节点]
 * @return {[type]}         [description]
 */
export function jumpToNode(self, jump_to) {
  self.$nextTick(function() {
    if (jump_to && document.querySelector(jump_to)) {
      const top = document.querySelector(jump_to).getBoundingClientRect().top - document.querySelector('#body').getBoundingClientRect().top
      document.querySelector('#body').scrollTop += top
    }
  })
}

/**
 * 求两个数组的并集
 * @param  {[type]} ori_arr [description]
 * @param  {[type]} tar_arr [description]
 * @return {[type]}         [description]
 */
export function arrUnion(ori_arr, tar_arr) {
  if (!ori_arr || !tar_arr) {
    return false
  }
  const a = new Set(ori_arr)
  const b = new Set(tar_arr)
  const unionSet = new Set([...a, ...b])

  return [...unionSet]
}

/**
 * 求两个数组的交集
 * @param  {[type]} ori_arr [description]
 * @param  {[type]} tar_arr [description]
 * @return {[type]}         [description]
 */
export function arrIntersection(ori_arr, tar_arr) {
  if (!ori_arr || !tar_arr) {
    return false
  }
  const a = new Set(ori_arr)
  const b = new Set(tar_arr)
  const intersectionSet = new Set([...a].filter(x => b.has(x)))

  return [...intersectionSet]
}

/**
 * 求两个数组的差集，ori_arr不存在于tar_arr的数据
 * 如 ori_arr=a=[1,2,3]，tar_arr=b=[2,5]，结果：[1,3]
 * @param  {[type]} ori_arr [description]
 * @param  {[type]} tar_arr [description]
 * @return {[type]}         [description]
 */
export function arrDifference(ori_arr, tar_arr) {
  if (!ori_arr || !tar_arr) {
    return false
  }
  const a = new Set(ori_arr)
  const b = new Set(tar_arr)
  const differenceABSet = new Set([...a].filter(x => !b.has(x)))

  return [...differenceABSet]
}

/**
 * 判断图片是否存在
 * @param  {[type]}   pathImg  [图片链接]
 * @param  {Function} success [能访问（图片加载完毕后）的回调事件]
 * @param  {Function} error [不能能访问（图片加载失败后）的回调事件]
 * @return {Boolean}           [description]
 */
export function isHasImage(pathImg, success, error) {
  var ImgObj = new Image()
  ImgObj.src = pathImg
  ImgObj.onload = () => {
    if (typeof success === 'function') {
      success()
    }
    return true
  }
  ImgObj.onerror = () => {
    if (typeof error === 'function') {
      error()
    }
    return false
  }
}

// /**
//  * [deleteTempSearchParams 赋值完毕后，清除searchParams中的多余的临时筛选条件]
//  * @param  {[type]} searchParams     [需要清除处理的json对象]
//  * @param  {[type]} oriSearchParams  [处理对象的初始json对象]
//  * @param  {[type]} tempSearchParams [临时传入的包含多余筛选条件的对象]
//  * @return {[type]}                  [description]
//  */
// export function deleteTempSearchParams(searchParams, oriSearchParams, tempSearchParams){

//     // 获取临时筛选对象的键数组
//     let tempSearchParamsKeys = Object.keys(tempSearchParams)
//     if(!tempSearchParamsKeys || tempSearchParamsKeys.length <= 0){
//         return false
//     }

//     // 获取源对象的键数组
//     let searchParamsKeys = Object.keys(oriSearchParams)
//     if(!searchParamsKeys || searchParamsKeys.length <= 0){
//         return false
//     }

//     // 获得临时对象不存在与源对象中的键数组
//     let diffKeys = arrDifference(tempSearchParamsKeys, searchParamsKeys)
//     if(!diffKeys || diffKeys.length <= 0){
//         return false
//     }

//     // 清除searchParams中的多余的临时筛选条件
//     for(let item of diffKeys){
//         Reflect.deleteProperty(searchParams, item)
//     }
// }

/**
 * [nodeWatermark 在某元素上添加水印]
 * @param  {[type]} settings           [水印配置]
 * @param  {String} opeartor_node_name [被添加水印的元素，默认 #body]
 * @return {[type]}                    [description]
 */
export function nodeWatermark(settings = {}, opeartor_node_name = '#body') {
  const opeartor_node = document.querySelector(opeartor_node_name)
  if (!opeartor_node) {
    return false
  }

  // 默认设置
  var defaultSettings = {
    watermark_txt: 'text',
    watermark_x: 20, // 水印起始位置x轴坐标
    watermark_y: 20, // 水印起始位置Y轴坐标
    watermark_rows: 20, // 水印行数
    watermark_cols: 20, // 水印列数
    watermark_x_space: 100, // 水印x轴间隔
    watermark_y_space: 50, // 水印y轴间隔
    watermark_color: 'red', // 水印字体颜色
    watermark_alpha: 0.4, // 水印透明度
    watermark_fontsize: '15px', // 水印字体大小
    watermark_font: '微软雅黑', // 水印字体
    watermark_width: 210, // 水印宽度
    watermark_height: 80, // 水印长度
    watermark_angle: 15 // 水印倾斜度数
  }
  if (typeof settings === 'object') {
    Object.assign(defaultSettings, settings)
  }

  // console.log(arguments)
  // //采用配置项替换默认值，作用类似jquery.extend
  // if(arguments.length===1 && typeof arguments[0] ==="object" )
  // {
  //     var src=arguments[0]||{};
  //     for(let key in src)
  //     {
  //         if(src[key]&&defaultSettings[key]&&src[key]===defaultSettings[key])
  //             continue;
  //         else if(src[key])
  //             defaultSettings[key]=src[key];
  //     }
  // }

  var oTemp = document.createDocumentFragment()

  // 获取页面最大宽度
  var page_width = Math.max(opeartor_node.scrollWidth, opeartor_node.clientWidth)
  // var cutWidth = page_width*0.0150;
  // var page_width=page_width-cutWidth;
  // 获取页面最大高度
  var page_height = Math.max(opeartor_node.scrollHeight, opeartor_node.clientHeight)
  // var page_height = document.body.scrollHeight+document.body.scrollTop;
  // 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
  if (+defaultSettings.watermark_cols === 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
    defaultSettings.watermark_cols = parseInt((page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space))
    defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1))
  }
  // 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
  if (+defaultSettings.watermark_rows === 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
    defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space))
    defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1))
  }
  var x
  var y
  for (var i = 0; i < defaultSettings.watermark_rows; i++) {
    y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i
    for (var j = 0; j < defaultSettings.watermark_cols; j++) {
      x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j

      var mask_div = document.createElement('div')
      mask_div.id = 'mask_div' + i + j
      mask_div.className = 'mask_div'
      mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt))
      // 设置水印div倾斜显示
      mask_div.style.webkitTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      mask_div.style.MozTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      mask_div.style.msTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      mask_div.style.OTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      mask_div.style.transform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)'
      mask_div.style.visibility = ''
      mask_div.style.position = 'absolute'
      mask_div.style.left = x + 'px'
      mask_div.style.top = y + 'px'
      mask_div.style.overflow = 'hidden'
      mask_div.style.zIndex = '9999'
      mask_div.style.pointerEvents = 'none' // pointer-events:none  让水印不遮挡页面的点击事件
      // mask_div.style.border="solid #eee 1px";
      mask_div.style.opacity = defaultSettings.watermark_alpha
      mask_div.style.fontSize = defaultSettings.watermark_fontsize
      mask_div.style.fontFamily = defaultSettings.watermark_font
      mask_div.style.color = defaultSettings.watermark_color
      mask_div.style.textAlign = 'center'
      mask_div.style.width = defaultSettings.watermark_width + 'px'
      mask_div.style.height = defaultSettings.watermark_height + 'px'
      mask_div.style.display = 'block'
      oTemp.appendChild(mask_div)
    }
  }
  // 删除旧的水印
  const old_oTemp = document.querySelectorAll('.mask_div')
  if (old_oTemp && old_oTemp.length > 0) {
    old_oTemp.forEach(node => node.parentNode ? node.parentNode.removeChild(node) : null)
  }
  opeartor_node.appendChild(oTemp)
}

/**
 * [dealAmount 金额数字格式化实现代码(三位加逗号处理保留两位置小数)]
 * @param  {[type]} amount [金额，单位分]
 * @return {[type]}        [description]
 */
export function dealAmount(amount) {
  const str_num = parseFloat(amount / 100 || 0).toFixed(2) // 分转元

  const str_num_arr = str_num.split('.')
  const integer_num = str_num_arr[0] ? str_num_arr[0] : '0' // 整数部分
  const point_num = str_num_arr[1] ? str_num_arr[1] : '00' // 小数部分

  let str_amount = ''
  if (integer_num.length <= 3) {
    str_amount = integer_num === '' ? '0' : integer_num
  } else {
    const mod = integer_num.length % 3
    str_amount = (mod === 0 ? '' : (integer_num.substring(0, mod))) // 从0位置取出除3后多余的位数字符
    for (let i = 0; i < Math.floor(integer_num.length / 3); i++) {
      if ((mod === 0) && (i === 0)) {
        str_amount += integer_num.substring(mod + 3 * i, mod + 3 * i + 3)
      } else {
        str_amount += ',' + integer_num.substring(mod + 3 * i, mod + 3 * i + 3)
      }
    }
  }

  str_amount = str_amount + '.' + point_num

  return str_amount
}

/**
 * [ellipsisStr 对字符串进行规定长度的省略，超出的部分显示为省略号]
 * @param  {[type]} str [字符串]
 * @param  {[type]} len [规定长度]
 * @return {[type]}     [description]
 */
export function ellipsisStr(str, len = 100) {
  if (typeof str !== 'string') {
    return str
  }
  len = parseInt(len)
  if (!isNaN(len) && len > 0) {
    str = str.length > len ? (str.substr(0, len) + '...') : str
  }
  return str
}

/**
 * [showInvalidFieldMsg 解析el-form校验未通过的字段信息]
 * @param  {[type]} object [未通过校验的字段]
 * @return {[type]}        [description]
 */
export function showInvalidFieldMsg(object) {
  // 遍历未通过校验的字段
  const new_vue = new Vue() // 新实例化vue
  const p = new_vue.$createElement
  const arr_result = []
  console.log(object)
  for (const key in object) {
    const value = object[key]
    if (Array.isArray(value)) {
      value.forEach(item => {
        arr_result.push(p('div', { style: 'color: #eb9e05' }, item.message))
      })
    }
  }
  Message({
    type: 'warning',
    message: p('p', null, arr_result)
  })
}
