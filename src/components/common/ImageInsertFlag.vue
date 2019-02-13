<template>
  <div id="canvas-box" class="linhuiba-align-center">
    <img id="source" :src="pic_url" style="display:none;">
    <div class="tool-bar">
      <i :class="'fa fa-mouse-pointer' + (edit_mode == 'select' ? ' active' : '')" title="选择并移动小红旗" @click="edit_mode = 'select'"/>
      <i :class="'fa fa-flag' + (edit_mode == 'flag' ? ' active' : '')" title="插入小红旗" @click="edit_mode = 'flag'"/>

      <i class="fa fa-eraser" title="清空" @click="clear"/>
      <i class="fa fa-save" title="保存" @click="save"/>
    </div>
    <canvas
      id="canvas"
      @mousedown="canvasDown($event)"
      @mousemove="canvasMove($event)"
      @mouseup="canvasUp($event)"
    />
    <div>
      <label for="">小红旗大小：</label>
      <el-input v-model="img_width" size="mini" placeholder="长度/px" style="width: 120px;"/>
      x
      <el-input v-model="img_height" size="mini" placeholder="宽度/px" style="width: 120px;"/>
    </div>
  </div>
</template>

<style scoped>
  .tool-bar {
    width: 100%;
    height:50px;
    display: block;
    position: absolute;
    bottom: 20px;
    left: 0;
    text-align: center;
    line-height: 50px;
    color: #606266;
    align-items: center;
  }

  .tool-bar i {
    font-size: 25px;
    margin-right: 20px;
    cursor: pointer;
  }

  .tool-bar i.active {
    color: #409EFF;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'ImageInsertFlag',
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
      pic_url: '',
      edit_mode: 'flag', // select/flag
      ctx: null,
      token: '',
      initialized: false,
      objs: [],
      cur_obj: null,
      originX: -1,
      originY: -1,
      oldX: -1,
      oldY: -1,
      is_moving: false,
      img_width: null,
      img_height: null,
      canvas: null
    }
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
  },
  methods: {
    // 获得元素距离浏览器左侧、上侧的距离
    getPoint(obj) {
      // 获取某元素以浏览器左上角为原点的坐标
      var top = obj.offsetTop // 获取该元素对应父容器的上边距
      var left = obj.offsetLeft // 对应父容器的上边距
      // 判断是否有父容器，如果存在则累加其边距
      while (obj === obj.offsetParent) {
        // obj == obj.offsetParent 等效 while (obj != undefined)
        top += obj.offsetTop // 叠加父容器的上边距
        left += obj.offsetLeft // 叠加父容器的左边距
      }
      return {
        top: top,
        left: left
      }
    },
    init(pic_url) {
      this.pic_url = pic_url
      this.edit_mode = this.$options.data().edit_mode
      this.clear()
      this.initialized = true
    },
    clear() {
      const image = document.getElementById('source')
      image.setAttribute('crossOrigin', 'anonymous')
      const self = this
      if (!this.initialized) {
        const image = document.getElementById('source')
        image.setAttribute('crossOrigin', 'anonymous')
        image.onload = function() {
          this.canvas.width = image.naturalWidth
          this.canvas.height = image.naturalHeight
          self.ctx.drawImage(image, 0, 0)
        }
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        self.ctx.drawImage(image, 0, 0)
      }

    },
    canvasDown(e) {
      const self = this
      const point = this.getPoint(e.target)
      const canvasX = e.clientX - (point ? point.left : 0)
      const canvasY = e.clientY - (point ? point.top : 0)
      if (this.edit_mode === 'select') {
        self.cur_obj = null
        self.objs.forEach(function(item) {
          if (item.left < canvasX && item.right > canvasX && item.top < canvasY && item.bottom > canvasY) {
            self.cur_obj = item
          }
        })
        if (self.cur_obj) {
          self.originX = canvasX
          self.originY = canvasY
          self.is_moving = true
        }
      } else if (this.edit_mode === 'flag') {
        self.objs = []
        self.clear()
        const image = new Image()
        image.src = '/static/img/flag.png'
        const img_width = parseFloat(self.img_width) > 0 ? parseFloat(self.img_width) : image.naturalWidth
        const img_height = parseFloat(self.img_height) > 0 ? parseFloat(self.img_height) : image.naturalHeight
        image.onload = function() {
          const x = canvasX - img_width / 2
          const y = canvasY - img_height / 2
          self.ctx.drawImage(image, x, y, img_width, img_height)
          const obj = {
            type: 'image',
            obj: image,
            left: x,
            top: y,
            right: x + img_width,
            bottom: y + img_height
          }
          self.objs.push(obj)
        }
      }
    },
    canvasMove(e) {
      const self = this
      const point = this.getPoint(e.target)
      const canvasX = e.clientX - (point ? point.left : 0)
      const canvasY = e.clientY - (point ? point.top : 0)
      if (this.edit_mode === 'select' && this.cur_obj && this.is_moving) {
        if (self.cur_obj.type === 'image') {
          const x = self.cur_obj.left + canvasX - self.originX
          const y = self.cur_obj.top + canvasY - self.originY
          self.clear()
          self.ctx.drawImage(self.cur_obj.obj, x, y)
          self.oldX = x
          self.oldY = y
        }
      }
    },
    canvasUp(e) {
      if (this.is_moving) {
        this.is_moving = false

        // 移动结束后，重置图标坐标，左上图标为移动时绘制图片的oldX、oldY坐标
        const image = new Image()
        image.src = '/static/img/flag.png'
        if (this.objs && this.objs[0]) {
          this.objs[0].left = this.oldX
          this.objs[0].top = this.oldY
          this.objs[0].right = this.objs[0].left + image.naturalWidth
          this.objs[0].bottom = this.objs[0].bottom + image.naturalHeight
        }
      }
    },
    save() {
      const index = this.pic_url.lastIndexOf('/')
      if (index < 0) {
        return
      }
      // let file_name = this.pic_url.substr(index + 1, this.pic_url.length - index - 1)
      // index = file_name.indexOf('-linhuibaoriginal.jpg?v=')
      // let key = ''
      // if (index < 0) {
      //   key = file_name
      // } else {
      //   key = file_name.substr(0, index)
      // }
      const canvas = document.getElementById('canvas')
      if (!this.uploadParams.token || !this.uploadParams.qiniuDomain) {
        this.$message.warning('未传入上传token，请关闭弹窗重试')
        return false
      }
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
              this.$emit('onImageInserted', url)
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  }
}
</script>

