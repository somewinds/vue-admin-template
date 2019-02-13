<template>
  <div id="canvas">
    <el-row :gutter="10">
      <el-col :span="4"/>
      <el-col :span="16"/>
      <el-col :span="4"/>
    </el-row>

    <div class="flex">
      <div class="canvas-box">
        <!-- <canvas id="drawing" class="drawing"
					ref="drawing"
            @mousedown="canvasDown($event)"
            @mousemove="canvasMove($event)"
            @mouseup="canvasUp($event)"
            :style="`width: ${canvasWidth}px;height: ${canvasHeight}px;`"
					:width="canvasWidth"
					:height="canvasHeight">
					A drawing of something.
				</canvas> -->
        <canvas
          id="drawing"
          ref="drawing"
          :style="`width: ${canvasContainerWidth}px;height: ${canvasContainerHeight}px;`"
          :width="canvasContainerWidth"
          :height="canvasContainerHeight"
          class="drawing"
          @mousedown="canvasDown($event)"
          @mousemove="canvasMove($event)"
          @mouseup="canvasUp($event)">
          A drawing of something.
        </canvas>
        <el-radio-group v-model="prepareDrawingParams.drawing_type" @change="changeDrawingType">
          <el-radio label="line">绘画线条</el-radio>
          <el-radio label="text">插入文字</el-radio>
          <el-radio label="image">插入小红旗</el-radio>
        </el-radio-group>
      </div>
      <div class="prepare-box">

        <div class="prepare-box__block">
          <span class="title linhuiba-font-title">tips：</span>
          <div class="content">
            <!-- 绘制线条提示： -->
            <template v-if="prepareDrawingParams.drawing_type == 'line'">
              <div>1. 左键画布任意位置确认起点，再次点击画布确认第二个点，并以此类推，直到结束本次绘制</div>
              <div><el-button type="text" @click="stopDrawing()">点此或对画布右键以结束本次绘制</el-button></div>
              <div>2. 结束本次绘制后，左键画布将创建新的起点，并重复上述步骤</div>
            </template>
            <!-- 绘制文本提示： -->
            <template v-if="prepareDrawingParams.drawing_type == 'text'">
              <div>1. 左键点击画布确定文字位置</div>
              <div>2. 可随时更改“字体内容”中的文字，更改后移动鼠标将实时映射在画布上</div>
            </template>
            <!-- 绘制图片提示： -->
            <template v-if="prepareDrawingParams.drawing_type == 'image'">
              <div>左键点击画布确定小红旗位置</div>
            </template>
          </div>
        </div>
        <div class="prepare-box__block">
          <span class="title"/>
          <div class="content">
            <el-button :disabled="!(step > 0)" type="success" size="small" @click="canvasUndo">撤销</el-button>
            <el-button :disabled="!(step < drawingParamsHistory.length - 1)" type="success" size="small" @click="canvasRedo">反撤销</el-button>
          </div>
        </div>

        <template v-if="prepareDrawingParams.drawing_type == 'line'">
          <div class="prepare-box__block">
            <span class="title">描边颜色</span>
            <div class="content">
              <el-color-picker v-model="prepareDrawingParams.lineParams.strokeStyle"/>
            </div>
          </div>
          <div class="prepare-box__block">
            <span class="title">描边粗细</span>
            <div class="content">
              <el-select v-model="prepareDrawingParams.lineParams.lineWidth" style="width: 100px;" placeholder="线条粗细">
                <el-option v-for="(item, index) in 20" :key="index" :value="item" :label="index + 1"/>
              </el-select>
            </div>
          </div>
        </template>
        <template v-else-if="prepareDrawingParams.drawing_type == 'text'">
          <div class="prepare-box__block">
            <span class="title">字体内容</span>
            <div class="content">
              <el-input v-model="prepareDrawingParams.textParams.text" maxlength="12" placeholder="点击画布确认位置，最多12字" style="width: 220px;"/>
            </div>
          </div>
          <div class="prepare-box__block">
            <span class="title">字体颜色</span>
            <div class="content">
              <el-color-picker v-model="prepareDrawingParams.textParams.fillStyle"/>
            </div>
          </div>
          <div class="prepare-box__block">
            <span class="title">字体大小</span>
            <div class="content">
              <el-select v-model="prepareDrawingParams.textParams.fontSize" style="width: 80px;">
                <el-option v-for="(item, index) in selection.font_sizes" :key="index" :value="item" :label="item"/>
              </el-select>
            </div>
          </div>
          <!-- <div class="prepare-box__block">
						<span class="title">字体旋转测试</span>
						<div class="content">
							<el-slider v-model="prepareDrawingParams.textParams.route" show-input :min="0" :max="360"></el-slider>
						</div>
					</div> -->
        </template>
        <template v-else-if="prepareDrawingParams.drawing_type == 'image'">
          <div class="prepare-box__block">
            <span class="title">小红旗大小</span>
            <div class="content">
              <el-input v-model="prepareDrawingParams.imageParams.width" placeholder="长" style="width: 80px;"/>
              x
              <el-input v-model="prepareDrawingParams.imageParams.height" placeholder="宽" style="width: 80px;"/>
            </div>
          </div>
          <div class="prepare-box__block">
            <span class="title">小红旗预览</span>
            <div class="content">
              <img
                id="img-flag"
                :style="`width: ${prepareDrawingParams.imageParams.width}px;height: ${prepareDrawingParams.imageParams.height}px;`"
                :src="prepareDrawingParams.imageParams.img_url"
                crossorigin="anonymous"
                alt="">
            </div>
          </div>
        </template>
      </div>
    </div>
    <hr>
    <div class="flex">
      <el-button @click="clearCanvas()">清空画布</el-button>
      <el-button type="primary" @click="complete()">绘制完毕</el-button>
    </div>
    <div>
      <span>绘制结果预览：</span><img id="preview-canvas" :src="curBase64" alt="" style="width: 200px;">
    </div>

  </div>
</template>

<style lang="scss" type="text/css">
#canvas {
  margin: 20px 0;

  #img-flag {
    width: 100px;
    height: 100px;
    display: block;
  }

  #drawing {}

  .flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;

    >* {
      flex-shrink: 0;
    }
  }

  .canvas-box {
    text-align: center;
    margin-right: 20px;
  }

  .drawing {
    display: block;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    background-color: grey;
  }

  .prepare-box {
    width: 240px;

    .prepare-box__block {
      margin-bottom: 10px;
    }
  }

  .canvas-form {
    width: 600px;
  }

  .el-select .el-input__icon.el-input__validateIcon.el-icon-circle-check {
    display: none;
  }
}

</style>

<script>
import axios from 'axios'

function LinePoint(x, y, strokeStyle, lineWidth, lineCap, lineJoin) {
  this.point = {
    left: x,
    top: y
  }
  this.strokeStyle = strokeStyle
  this.lineWidth = lineWidth
  this.lineCap = lineCap
  this.lineJoin = lineJoin
}

// 点击后，保存绘制的文字
function TextPoint(x, y, text, fontSize, textAlign, textBaseline, fillStyle) {
  this.point = {
    left: x,
    top: y
  }
  this.text = text
  this.fontSize = fontSize
  this.textAlign = textAlign
  this.textBaseline = textBaseline
  this.fillStyle = fillStyle
}

// 点击后，保存绘制的文字（生成image后保存，防止之后使用时闪屏）
function ImagePoint(x, y, width, height, unit, img_url, image) {
  this.point = {
    left: x,
    top: y
  }
  this.width = width
  this.height = height
  this.unit = unit
  this.img_url = img_url
  this.image = image
}

export default{
  name: 'CanvasBetter',
  props: {
    // canvas背景图
    cavasBgm: {
      type: String,
      default: null
    },
    // 保存新图片用参数
    uploadParams: {
      type: Object,
      default() {
        return {
          token: null, // 上传token
          qiniuDomain: null // 回调后key使用的域名
        }
      }
    }
  },
  data() {
    return {
      is_drawing: false, // 是否正在绘画中
      is_lining: false, // 是否正在绘制线条中
      is_texting: false, // 是否正在绘制文字中
      is_imaging: false, // 是否正在绘制图片中

      canvas: null, // canvas元素
      canvasWidth: 1000, // canvas宽（生成的实际图片宽，默认取传入背景图，如果没有则默认1000）
      canvasHeight: 800, // canvas高（生成的实际图片高，默认取传入背景图，如果没有则默认800）
      canvasContainerWidth: 600, // canvas容器宽
      canvasContainerHeight: 500, // canvas容器高
      context: null, // 绘画的canvas画布

      // 准备绘制参数
      prepareDrawingParams: {
        // 绘画类型：line 线，text 文字，image 插入图片
        drawing_type: 'line',
        // 线条配置参数
        lineParams: {
          strokeStyle: '#fff', // 描边颜色
          lineWidth: 3, // 描边粗细
          lineCap: 'round',
          lineJoin: 'round'
        },
        // 文字配置参数
        textParams: {
          text: '', // 添加到画布的文字
          fontSize: 16,
          textAlign: 'center',
          textBaseline: 'middle',
          fillStyle: '#fff' // 文字填充颜色
          // route: 0, // 字体旋转测试
        },
        // 图片配置参数
        imageParams: {
          width: '100', // 长
          height: '100', // 宽
          unit: 'px', // 单位
          img_url: '/static/img/flag.png', // 图片url
          image: null // 图片实体
        }

      },

      // 绘制参数历史快照数组
      drawingParamsHistory: [],
      // 当前绘制处于历史快照的哪一步
      step: -1,
      // 最近一次的绘制结果（base64图片）
      // 每次操作都重绘（所有元素）浪费性能，所以只有特殊情况才需要重绘，比如，撤销/反撤销、确认绘制（鼠标按下）
      curBase64: null,

      /* // 绘制参数
				drawingParams: {
					// canvas 背景图
					cavasBgm: "https://img.linhuiba.com/FrNcnJIjxuqmK9nJKZdC82ZGmbJA-linhuibaoriginal.jpg",
					// 线条数组，结束前为一组
					lineGroup: [
						{
							// 线条选点数组
							arr_points: [{
								point: {
									left: 100,
									top: 100
								},
								strokeStyle: 'blue', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}, {
								point: {
									left: 200,
									top: 100
								},
								strokeStyle: 'blue', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}, {
								point: {
									left: 300,
									top: 300
								},
								strokeStyle: 'rgba(255, 217, 0, 1)', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}, {
								point: {
									left: 100,
									top: 400
								},
								strokeStyle: 'rgba(255, 217, 0, 1)', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}, {
								point: {
									left: 200,
									top: 200
								},
								strokeStyle: 'rgba(255, 217, 0, 1)', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}, {
								point: {
									left: 100,
									top: 100
								},
								strokeStyle: 'rgba(255, 217, 0, 1)', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}],
						}, {
							// 线条选点数组
							arr_points: [{
								point: {
									left: 200,
									top: 100
								},
								strokeStyle: 'rgba(255, 217, 0, 1)', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}, {
								point: {
									left: 500,
									top: 300
								},
								strokeStyle: 'rgba(255, 217, 0, 1)', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}, {
								point: {
									left: 300,
									top: 400
								},
								strokeStyle: 'rgba(255, 217, 0, 1)', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}, {
								point: {
									left: 50,
									top: 200
								},
								strokeStyle: 'rgba(255, 217, 0, 1)', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}, {
								point: {
									left: 200,
									top: 100
								},
								strokeStyle: 'rgba(255, 217, 0, 1)', // 描边颜色
								lineWidth: 4, // 描边粗细
								lineCap: 'round',
								lineJoin: 'round',
							}],
						}
					],
					// 文字数组，一次一组
					textGroup: [{
						point: { left: 100, top: 100 }, // 文字选点 { left: null, top: null }
						text: '测试文本', // 添加到画布的文字
						fontSize: 16,
						textAlign: "center",
						textBaseline: "middle",
						fillStyle: 'rgba(255, 0, 77, 1)', // 文字填充颜色
					}, {
						point: { left: 300, top: 300 }, // 文字选点 { left: null, top: null }
						text: '测试文本2', // 添加到画布的文字
						fontSize: 16,
						textAlign: "center",
						textBaseline: "middle",
						fillStyle: 'rgba(255, 0, 77, 1)', // 文字填充颜色
					}],
					// 图片数组，一次一组
					imageGroup: [{
						point: { left: 100, top: 100 }, // 文字选点 { left: null, top: null }
						width: "100", // 长
						height: "100", // 宽
						unit: "px", // 单位
						img_url: "/static/img/flag.png", // 图片url
						image: "/static/img/flag.png", // 图片实体，避免下次重绘使用时重新加载造成闪屏
					}],
				},*/

      // 绘制参数
      drawingParams: {
        // canvas 背景图
        cavasBgm: null,
        // 线条数组，结束前为一组
        lineGroup: [],
        // 文字数组，一次一组
        textGroup: [],
        // 图片数组，一次一组
        imageGroup: []
      },

      selection: {
        font_sizes: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
      }

    }
  },
  computed: {
    // canvas（1000）与canvas（如 600）显示容器比例
    xProportion() {
      let proportion = 1
      if (this.canvasWidth !== 0 && this.canvasContainerWidth !== 0) {
        proportion = this.canvasWidth / this.canvasContainerWidth
      }
      return proportion
    },
    yProportion() {
      let proportion = 1
      if (this.canvasHeight !== 0 && this.canvasContainerHeight !== 0) {
        proportion = this.canvasHeight / this.canvasContainerHeight
      }
      return proportion
    }
  },
  mounted() {
    // 基本用法
    this.canvas = this.$refs['drawing'] // 使用ref，防止同一页面上存在多个组建时始终获取第一个画布的问题
    this.canvas.oncontextmenu = function(ev) {
      ev.preventDefault()
    }
    // 能力检测，非常重要
    if (this.canvas.getContext) {
      this.context = this.canvas.getContext('2d')
    }

    /* let obj = [1,2,[1,2,3]];
			let obj2 = this.clone(obj);
			obj2[1] = 222
			obj2[2][2] = 222222
			console.log(obj, obj2)*/
  },
  methods: {
    async init() {
      const ori_data = this.$options.data()
      this.is_drawing = ori_data.is_drawing
      this.is_lining = ori_data.is_lining
      this.is_texting = ori_data.is_texting
      this.is_imaging = ori_data.is_imaging

      this.prepareDrawingParams = ori_data.prepareDrawingParams
      await new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous' // 解决跨域图片问题，要写在图片加载前
        img.src = this.prepareDrawingParams.imageParams.img_url
        img.onload = (e) => {
          this.prepareDrawingParams.imageParams.image = img
          resolve()
        }
        img.onerror = (e) => {
          reject()
        }
      })

      this.drawingParamsHistory = ori_data.drawingParamsHistory
      this.step = ori_data.step
      this.curBase64 = ori_data.curBase64
      this.drawingParams = ori_data.drawingParams

      // 设置canvas背景图
      if (this.cavasBgm) {
        await new Promise((resolve, reject) => {
          // 设置canvas背景图
          const cavasBgm = new Image()
          cavasBgm.crossOrigin = 'Anonymous' // 解决跨域图片问题，要写在图片加载前
          cavasBgm.src = this.cavasBgm
          cavasBgm.onload = (e) => {
            console.log(cavasBgm.width, cavasBgm.height)
            console.log(this.setCanvasSize(cavasBgm.width, cavasBgm.height))
            this.drawingParams.cavasBgm = cavasBgm
            resolve()
          }
          cavasBgm.onerror = (e) => {
            reject()
          }
        }).catch(e => {})
        // console.log(this.cavasBgm)
      }

      this.$nextTick(async function() {
        this.clearCanvas()
      })
    },
    /**
     * @description: 设置canvas宽高以及容器宽高
     * @param {type} width Number
     * @param {type} height Number
     * @return: 
     */
    setCanvasSize(width, height, maxWidth = 600, maxHeight = 500) {
      let img_width = width
      let img_height = height
      if (width > 600) {
        img_width = 600
        img_height = parseFloat((maxWidth * height) / width).toFixed(2)
      }
      this.canvasWidth = +width
      this.canvasHeight = +height
      this.canvasContainerWidth = img_width
      this.canvasContainerHeight = img_height
      return { img_width, img_height }
    },

    // “清空画布”按钮点击
    clearCanvas() {
      // 去除所有圆圈
      this.drawingParams = Object.assign(this.$options.data().drawingParams, {
        cavasBgm: this.drawingParams.cavasBgm
      })
      this.is_drawing = false
      this.is_lining = false
      this.is_texting = false
      this.is_imaging = false

      this.step = 0
      this.drawingParamsHistory = [this.clone(this.drawingParams)]

      // 重新绘制画布.
      this.Redraw()
    },
    // 切换绘画模式
    changeDrawingType() {
      this.is_drawing = false
      this.is_lining = false
      this.is_texting = false
      this.is_imaging = false
      // if (this.prepareDrawingParams.drawing_type === 'line') {
      // }
      if (this.prepareDrawingParams.drawing_type === 'text') {
        // 如果是文字，直接开启绘制，在canvas上预览文字效果
        this.is_drawing = true
        this.is_texting = true
      } else if (this.prepareDrawingParams.drawing_type === 'image') {
        // 如果是图片，直接开启绘制，在canvas上预览图片效果
        this.is_drawing = true
        this.is_imaging = true
      }
      this.Redraw()
    },
    // 重新绘制画布
    // 每次操作都重绘（所有元素）浪费性能，所以只有特殊情况才需要重绘，比如，撤销/反撤销、确认绘制（鼠标按下）
    // 而鼠标移动时，只需要获取上一次重绘的结果（base64图片），进一步进行绘制即可
    async Redraw() {
      // 每次鼠标移动重新绘制
      console.log('重新绘制画布')
      // 清除画布，准备绘制
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // 按顺序，防止背景图片加载延迟覆盖掉其他样式
      if (this.drawingParams.cavasBgm) {
        console.log('绘制背景')
        this.context.drawImage(this.drawingParams.cavasBgm, 0, 0, this.canvas.width, this.canvas.height)
      }

      // 绘制线条
      this.drawingParams.lineGroup.forEach((item, index) => {
        Array.isArray(item.arr_points) && item.arr_points.map((point, point_index) => {
          let pre_point = { left: 0, top: 0 }
          const cur_point = point.point
          if (+point_index === 0) {
            pre_point = cur_point
          } else if (point_index > 0) {
            pre_point = item.arr_points[point_index - 1].point
          }
          // 描边样式
          this.context.strokeStyle = point.strokeStyle || '#000000'
          this.context.lineWidth = point.lineWidth || 2
          // 可以让一个点显示
          this.context.lineCap = point.lineCap || 'round' // 控制线条末端的形状是平头 butt 、圆头 round 还是方头 square
          this.context.lineJoin = point.lineJoin || 'round' // 控制线条相交的方式是圆交 round 、斜交 bevel 还是斜接 miter
          this.context.beginPath()
          this.context.moveTo(pre_point.left, pre_point.top)
          this.context.lineTo(cur_point.left, cur_point.top)
          this.context.closePath()
          // 描边路径
          this.context.stroke()
        })
      })
      // 绘制文本
      this.drawingParams.textGroup.forEach((item, index) => {
        const cur_point = item.point

        const font = `bold ${parseInt(item.fontSize) || 16}px Arial`
        this.context.font = font
        this.context.textAlign = item.textAlign || 'center'
        this.context.textBaseline = item.textBaseline || 'middle'
        this.context.fillStyle = item.fillStyle || '#000000'
        this.context.fillText(item.text, cur_point.left, cur_point.top)
      })

      // 绘制图片
      this.drawingParams.imageGroup.forEach((item, index) => {
        const cur_point = item.point
        this.context.drawImage(item.image, cur_point.left, cur_point.top,
          item.width, item.height)
      })

      console.log('重新绘制画布结束')
      this.curBase64 = this.canvas.toDataURL()
    },

    // 画布鼠标按下
    async canvasDown(e) {
      // 如果右键被点击，停止当前绘画
      if (e.which === 3) {
        e.preventDefault()
        this.stopDrawing()
        return false
      }
      // offsetX鼠标相对于事件源x轴的位置，即 获得点击在画布内的点位置
      const mouse_point = {
        left: e.offsetX,
        top: e.offsetY
      }
      // 点击后开始绘画
      this.is_drawing = true
      if (this.prepareDrawingParams.drawing_type === 'line') {
        const line_point = new LinePoint(mouse_point.left,
          mouse_point.top,
          this.prepareDrawingParams.lineParams.strokeStyle || '#000000', // 描边颜色
          this.prepareDrawingParams.lineParams.lineWidth || 2, // 描边粗细
          this.prepareDrawingParams.lineParams.lineCap || 'round',
          this.prepareDrawingParams.lineParams.lineJoin || 'round',
        )
        let lineGroup = null
        // 如果在绘制中，取上次，并往arr_points增加一个点数据
        if (this.is_lining && this.drawingParams.lineGroup.length > 0) {
          lineGroup = this.drawingParams.lineGroup[this.drawingParams.lineGroup.length - 1]
          lineGroup.arr_points.push(line_point)
        } else {
          // 如果是重新首次绘制，添加新的lineGroup
          lineGroup = {
            // 线条选点数组
            arr_points: [line_point]
          }
          this.drawingParams.lineGroup.push(lineGroup)
        }
        this.is_lining = true
      } else if (this.prepareDrawingParams.drawing_type === 'text') {
        const text = this.prepareDrawingParams.textParams.text
        if (text) {
          const text_point = new TextPoint(mouse_point.left,
            mouse_point.top,
            this.prepareDrawingParams.textParams.text, // 添加到画布的文字
            parseInt(this.prepareDrawingParams.textParams.fontSize) || 16, // 字体大小
            this.prepareDrawingParams.textParams.textAlign || 'center',
            this.prepareDrawingParams.textParams.textBaseline || 'middle',
            this.prepareDrawingParams.textParams.fillStyle || '#000000', // 文字填充颜色
          )
          this.drawingParams.textGroup.push(text_point)
        } else {
          this.$message.warning('请在右侧字体内容输入框输入文字')
          return false
        }
      } else if (this.prepareDrawingParams.drawing_type === 'image') {
        // 更新显示，重绘图片
        const img_url = this.prepareDrawingParams.imageParams.img_url
        if (img_url) {
          const width = this.prepareDrawingParams.imageParams.width || '100'
          const height = this.prepareDrawingParams.imageParams.height || '100'
          let image = null
          await new Promise((resolve, reject) => {
            // 生成image
            const img = new Image()
            img.crossOrigin = 'Anonymous' // 解决跨域图片问题，要写在图片加载前
            img.src = img_url
            img.onload = (e) => {
              image = img
              resolve()
            }
          })
          const image_point = new ImagePoint(mouse_point.left - width / 2,
            mouse_point.top - height / 2,
            width,
            height,
            this.prepareDrawingParams.imageParams.unit || 'px',
            img_url,
            image,
          )
          this.drawingParams.imageGroup.push(image_point)

        }
      }
      // $nextTick防止鼠标按下的时候图片未显示在画布上（图片未下载完成）
      this.$nextTick(async function() {
        await this.Redraw()
        this.saveHistory()
      })
    },

    // 重置到上一次绘画
    async resetLastDrawing() {
      await new Promise((resolve, reject) => {
        const image = new Image()
        image.src = this.curBase64
        image.addEventListener('load', () => {
          // 先清空画布，再重绘上一次
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.context.drawImage(image, 0, 0)
          resolve()
        })
      }).catch(e => {})
    },
    // 画布鼠标移动
    async canvasMove(e) {
      if (!this.is_drawing) {
        return false
      }
      // offsetX鼠标相对于事件源x轴的位置，即 获得点击在画布内的点位置
      const mouse_point = {
        left: e.offsetX,
        top: e.offsetY
      }
      if (this.prepareDrawingParams.drawing_type === 'line') {
        let lineGroup = null
        // 如果正在绘制线条，并且已绘制一个及以上点，获取最后一个点为起始点，以当前鼠标为终点，实时绘制线条
        if (this.is_lining && this.drawingParams.lineGroup.length > 0) {
          lineGroup = this.drawingParams.lineGroup[this.drawingParams.lineGroup.length - 1]
          if (Array.isArray(lineGroup.arr_points) && lineGroup.arr_points.length > 0) {
            const last_line_point = lineGroup.arr_points[lineGroup.arr_points.length - 1].point

            const pre_point = { left: last_line_point.left, top: last_line_point.top }
            const cur_point = mouse_point

            // 绘画前重新绘制
            // 更新显示，重绘圆圈
            await this.resetLastDrawing()

            this.context.beginPath()
            // 描边样式
            this.context.strokeStyle = this.prepareDrawingParams.lineParams.strokeStyle || '#000000'
            this.context.lineWidth = this.prepareDrawingParams.lineParams.lineWidth || 2
            // 可以让一个点显示
            this.context.lineCap = this.prepareDrawingParams.lineParams.lineCap || 'round' // 控制线条末端的形状是平头 butt 、圆头 round 还是方头 square
            this.context.lineJoin = this.prepareDrawingParams.lineParams.lineJoin || 'round' // 控制线条相交的方式是圆交 round 、斜交 bevel 还是斜接 miter
            this.context.moveTo(pre_point.left, pre_point.top)
            this.context.lineTo(cur_point.left, cur_point.top)
            this.context.closePath()
            // 描边路径
            this.context.stroke()
          }
        }
      } else if (this.prepareDrawingParams.drawing_type === 'text') {
        // 更新显示，重绘圆圈
        const text = this.prepareDrawingParams.textParams.text
        // 填充文字
        if (text) {
          // const cur_point = mouse_point
          await this.resetLastDrawing()
          // 准备完毕，开始绘制
          const font = `bold ${parseInt(this.prepareDrawingParams.textParams.fontSize) || 16}px Arial`
          this.context.font = font
          this.context.textAlign = this.prepareDrawingParams.textParams.textAlign || 'center'
          this.context.textBaseline = this.prepareDrawingParams.textParams.textBaseline || 'middle'
          this.context.fillStyle = this.prepareDrawingParams.textParams.fillStyle || '#000000'
          this.context.fillText(text, mouse_point.left, mouse_point.top)

          /* // 旋转前先保存画布样式状态
						this.context.save();

						// 每次移动清空画布
						// 绘出鼠标左键的文字，使它看上去没变
						let font_width = this.context.measureText(text).width;
						let font_height = this.prepareDrawingParams.textParams.fontSize;
						this.context.translate(mouse_point.left + font_width / 2, mouse_point.top + font_height / 2); // 移动圆点距离需要参考文字排列方式（左/中/右）

						this.context.rotate(this.prepareDrawingParams.textParams.route * Math.PI / 180);
						this.context.fillText(text, -font_width / 2, -font_height / 2);
						// 回滚画布样式状态
						this.context.restore();*/
        } else {
          return false
        }
      } else if (this.prepareDrawingParams.drawing_type === 'image') {
        // 更新显示，重绘图片
        const image = this.prepareDrawingParams.imageParams.image
        if (image) {
          const cur_point = mouse_point
          /* context.drawImage(要绘制的图像、源图像的 x 坐标、源图像的 y 坐标、
							源图像的宽度、源图像的高度、
							目标图像的 x 坐标、目标图像的 y 坐标、
							目标图像的宽度、目标图像的高度); */
          await this.resetLastDrawing()
          this.context.drawImage(image, cur_point.left - this.prepareDrawingParams.imageParams.width / 2, cur_point.top - this.prepareDrawingParams.imageParams.height / 2,
            this.prepareDrawingParams.imageParams.width, this.prepareDrawingParams.imageParams.height)
        }
      }
    },
    // 画布鼠标弹起
    canvasUp(e) {
      // this.saveHistory();
    },
    // 本次绘制结束
    stopDrawing() {

      if (this.prepareDrawingParams.drawing_type === 'line') {
        this.is_drawing = false
        this.is_lining = false
      } else if (this.prepareDrawingParams.drawing_type === 'text') {
        // this.is_texting = false;
      } else if (this.prepareDrawingParams.drawing_type === 'image') {
        // this.is_imaging = false;
      }
      this.Redraw()
    },

    // 保存绘图信息历史快照
    saveHistory() {
      // 绘画结束
      this.step++
      // 添加新的绘制到历史记录
      if (this.step < this.drawingParamsHistory.length) {
        this.drawingParamsHistory.length = this.step // 截断数组
      }
      this.drawingParamsHistory.push(this.clone(this.drawingParams))
    },
    // 撤销
    // 实现原理：
    // 1. 保存快照：每完成一次绘制操作则保存一份 canvas 快照到 canvasHistory 数组（生成快照使用 canvas 的 toDataURL() 方法，生成的是 base64 的图片）；
    // 2. 撤销和反撤销：把 canvasHistory 数组中对应索引的快照使用 canvas 的 drawImage() 方法重绘一遍；
    // 3. 绘制新图像：执行新的绘制操作时，删除当前位置之后的数组记录，然后添加新的快照。
    // 撤销方法
    canvasUndo() {
      if (this.step > 0) {
        this.step--
        const drawingParamsHistory = this.clone(this.drawingParamsHistory[this.step])
        if (drawingParamsHistory) {
          this.drawingParams = drawingParamsHistory
          // $nextTick防止鼠标按下的时候图片未显示在画布上（图片未下载完成）
          this.$nextTick(function() {
            this.Redraw()
          })
        }
      } else {
        console.log('不能再继续撤销了')
      }
    },
    // 反撤销方法
    canvasRedo() {
      if (this.step < this.drawingParamsHistory.length - 1) {
        this.step++
        const drawingParamsHistory = this.clone(this.drawingParamsHistory[this.step])
        if (drawingParamsHistory) {
          this.drawingParams = drawingParamsHistory
          // $nextTick防止鼠标按下的时候图片未显示在画布上（图片未下载完成）
          this.$nextTick(function() {
            this.Redraw()
          })
        }
      } else {
        console.log('已经是最新的记录了')
      }
    },

    // 绘制完毕
    async complete() {
      await this.Redraw()
      // this.$emit('complete', this.curBase64);

      if (!this.uploadParams.token || !this.uploadParams.qiniuDomain) {
        this.$message.warning('未传入上传token，请关闭弹窗重试')
        return false
      }

      // 对即将导出的canvas图片做处理：拉伸宽高
      const canvas = await this.settingExportPictures()

      canvas.toBlob(blob => {
        const formData = new FormData()
        // formData.append('key', key)
        formData.append('token', this.uploadParams.token)
        // formData.append('file', blob, key)
        formData.append('file', blob)
        // console.log(formData)
        axios({
          method: 'post',
          url: 'http://upload.qiniu.com/',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            console.log(res)
            if (res.data && res.data.key) {
              const key = res.data.key
              const url = this.uploadParams.qiniuDomain + key
              this.$emit('complete', url)
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    // 对即将导出的canvas图片做处理：拉伸宽高值原图（传入的背景图）大小
    async settingExportPictures() {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      // 设置导出图片的宽高，即canvas的宽高
      canvas.width = this.canvasWidth
      canvas.height = this.canvasHeight
      // const img = document.getElementById('preview-canvas')
      const curBase64 = this.canvas.toDataURL()
      await new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous' // 解决跨域图片问题，要写在图片加载前
        img.src = curBase64
        img.onload = (e) => {
          // 核心JS就这个，将图片绘制到临时画布上
          context.drawImage(img, 0, 0, canvas.width, canvas.height)
          resolve()
        }
        img.onerror = (e) => {
          reject()
        }
      })
      // let base64Img = canvas.toDataURL();
      // console.log(base64Img);
      return canvas
    },

    // 定义检测数据类型的功能函数
    checkedType(target) {
      return Object.prototype.toString.call(target).slice(8, -1)
    },
    // 实现深度克隆---对象/数组
    clone(target) {
      // 判断拷贝的数据类型
      // 初始化变量result 成为最终克隆的数据
      let result
      const targetType = this.checkedType(target)
      if (targetType === 'Object') {
        result = {}
      } else if (targetType === 'Array') {
        result = []
      } else {
        return target
      }
      // 遍历目标数据
      for (const i in target) {
        // 获取遍历数据结构的每一项值。
        const value = target[i]
        // 判断目标结构里的每一值是否存在对象/数组
        if (this.checkedType(value) === 'Object' ||
						this.checkedType(value) === 'Array') { // 对象/数组里嵌套了对象/数组
          // 继续遍历获取到value值
          result[i] = this.clone(value)
        } else { // 获取到value值是基本的数据类型或者是函数。
          result[i] = value
        }
      }
      return result
    }
  }
}
</script>
