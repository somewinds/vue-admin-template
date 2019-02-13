<!-- 上传图片 -->
<!-- 可传参数：
    uploadParams:{
        default: {
            // 七牛token
            qiniuToken: null,
            // 图片的key值，如果传入，则上传图片时传入该key到七牛接口，覆盖原图
            qiniuKey: null,
            // 图片保存至七牛的存储空间名，默认 linhui-fields
            qiniuBucket: 'linhui-fields',
            // 图片域名前缀，默认 https://img.linhuiba.com/
            qiniuDomain: 'https://img.linhuiba.com/',
            // 默认图片
            initialImage: "https://zhanziyang.github.io/vue-croppa/static/500.jpeg",
            // 图片大小，单位M，默认3M
            imageSize: 3,
            // 容器宽高
            width: 600,
            height: 480,
            // 生成的图片与容器宽高的比例，如容器宽高=600*600，quality=2，生成的图片大小为1200*1200
            quality: 1,
        }
    },
 -->
<template>
  <div>
    <div class="linhuiba-font-danger">拖动或缩放以裁剪图片</div>
    <div v-if="croppa_params.width || croppa_params.height">
      <template v-if="croppa_params.width">长：{{ croppa_params.width }}px</template>
      <template v-if="croppa_params.height">宽：{{ croppa_params.height }}px</template>
    </div>
    <div class="tools">
      <div class="linhuiba-inline-block">
        <el-switch v-model="croppa_params.prevent_white_space" size="mini" active-text="禁止无限缩放（防止图片出现空白区域）"/>
      </div>
    </div>
    <div
      :style="'width: ' + croppa_params.width + 'px;height: ' + croppa_params.height + 'px;'"
      class="linhuiba-align-center process-box">
      <div v-for="(item, index) in 4" :key="index" class="process-border"/>
      <!-- 裁剪已有图片，禁止拖拽图片至此、禁止点击上传图片、隐藏删除按钮 -->
      <croppa
        ref="croppa"
        v-model="croppa"
        :initial-image="initialImage"

        :width="croppa_params.width"
        :height="croppa_params.height"
        :quality="croppa_params.quality"
        :placeholder-font-size="16"
        :zoom-speed="16"
        :show-loading="true"
        :prevent-white-space="croppa_params.prevent_white_space"
        :disable-drag-and-drop="true"

        :disable-click-to-choose="true"
        :show-remove-button="false"

        :remove-button-size="1"
        placeholder-color="#8c939d"
        canvas-color="grey"
        placeholder="请传入需要裁剪的图片"
        style="cursor: move; z-index: 15;position: relative"/>
        <!-- <span style="word-break: break-word;">{{ dataBase64Url }}</span> -->
    </div>
    <div class="linhuiba-align-center" style="margin-top: 25px;">
      <el-button type="primary" @click="updateImage()">确认裁剪</el-button>
    </div>
  </div>
</template>

<style lang="scss" type="text/css" scoped>
    .process-box{
        position: relative;
        margin: 10px;

        .process-border{
            width: 30%;
            height: 30%;
            position: absolute;
            z-index: 10;

            border-radius: 3px;
            // border-width: 10px;
            border-style: solid;
            border-color: rgba(64, 158, 255, 0.8);

            &:nth-child(1){
                border-top-width: 8px;
                border-left-width: 8px;
                border-top-left-radius: 8px;
                top: -8px;
                left: -8px;
            }
            &:nth-child(2){
                border-top-width: 8px;
                border-right-width: 8px;
                border-top-right-radius: 8px;
                top: -8px;
                right: -8px;
            }
            &:nth-child(3){
                border-bottom-width: 8px;
                border-right-width: 8px;
                border-bottom-right-radius: 8px;
                bottom: -8px;
                right: -8px;
            }
            &:nth-child(4){
                border-bottom-width: 8px;
                border-left-width: 8px;
                border-bottom-left-radius: 8px;
                bottom: -8px;
                left: -8px;
            }
        }
    }
</style>

<script>
import * as api from '@/api'
const Base64 = require('js-base64').Base64 // 引入base64编码
// import Croppa from 'vue-croppa'
// import axios from 'axios'

export default {
  name: 'ImageProcess',
  props: {
    croppaParams: {
      type: Object,
      default: function() {
        return {
          // // 七牛token
          // qiniuToken: null,
          // // 图片的key值，如果传入，则上传图片时传入该key到七牛接口，覆盖原图
          // qiniuKey: null,
          // // 图片保存至七牛的存储空间名，默认 linhui-fields
          // qiniuBucket: 'linhui-fields',
          // // 图片域名前缀，默认 https://img.linhuiba.com/
          // qiniuDomain: 'https://img.linhuiba.com/',
          // // 默认图片
          // initialImage: null,
          // // 图片大小，单位M，默认3M
          // imageSize: 3,
          // // 容器宽高
          // width: 1000,
          // height: 800,
          // // 生成的图片与容器宽高的比例，如容器宽高=600*600，quality=2，生成的图片大小为1200*1200
          // quality: 1,
          // prevent_white_space: false, // 是否用户移动或缩放图像时防止显示空白区域
        }
      }
    }
  },
  data() {
    return {
      croppa: {},

      croppa_params: {
        // 七牛token
        qiniuToken: null,
        // 图片的key值，如果传入，则上传图片时传入该key到七牛接口，覆盖原图
        qiniuKey: null,
        // 图片保存至七牛的存储空间名，默认 linhui-fields
        qiniuBucket: 'linhui-fields',
        // 图片域名前缀，默认 https://img.linhuiba.com/
        qiniuDomain: 'https://img.linhuiba.com/',
        // 默认图片
        initialImage: null,
        // 图片大小，单位M，默认3M
        imageSize: 3,
        // 容器宽高
        width: 1000,
        height: 800,
        // 生成的图片与容器宽高的比例，如容器宽高=600*600，quality=2，生成的图片大小为1200*1200
        quality: 1,
        prevent_white_space: false, // 是否用户移动或缩放图像时防止显示空白区域

        // 将返回的处理后的图片信息
        processedImage: null
      },
      dataBase64Url: null

    }
  },
  computed: {
    initialImage() {
      return this.croppa_params.initialImage
    }
  },
  watch: {
    croppaParams: {
      immediate: true,
      deep: true,
      handler: function(val, oldVal) {
        this.croppa_params = Object.assign(this.croppa_params, JSON.parse(JSON.stringify(val)))
        if (this.$refs.croppa) {
          this.$refs.croppa.refresh()
        }
        // 如果未传入token，自行获得token
        if (!this.croppa_params.qiniuToken) {
          this.getQiniuToken()
        }
        // this.$nextTick(function(){
        //     console.log(JSON.parse(JSON.stringify(this.croppa_params)))
        // })
      }
    }
  },
  mounted() {

  },
  methods: {
    // 获得七牛token
    getQiniuToken() {
      if (this.croppa_params.qiniuToken) {
        this.croppa_params.token = this.croppa_params.qiniuToken
        return true
      }

      const params = {
        bucket: this.croppa_params.qiniuBucket
      }
      api.getQiniuToken(params, response => {
        this.croppa_params.qiniuToken = response.uptoken
      })
    },
    // uploadCroppedImage() {
    //   	// this.myCroppa.generateBlob((blob) => {
    //    //  	// write code to upload the cropped image file (a file is a blob)
    //   	// }, 'image/jpeg', 0.8) // 80% compressed jpeg file
    // },
    // 把头部的data:image/png;base64,（注意有逗号）去掉
    dealBase64(str) {
      const arr = str.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const len = mime.length
      const subLen = parseInt(len + 13)
      const base64 = str.substring(subLen)
      return base64
    },
    // 通过base64编码字符流计算文件流大小函数
    fileSize(str) {
      if (str.indexOf('=') > 0) {
        var indexOf = str.indexOf('=')
        str = str.substring(0, indexOf) // 把末尾的’=‘号去掉
      }

      const fileSize = parseInt(str.length - (str.length / 8) * 2)
      return fileSize
    },
    updateImage() {
      const self = this

      //    self.croppa_params.processedImage = {
      //    	hash:"Fp82qWxl2-ZJkWURy9Ucga-RI4ws",
      //    	key:"Fp82qWxl2-ZJkWURy9Ucga-RI4ws"
      //    }
      // self.croppaComplete()
      // return

      this.dataBase64Url = this.croppa.generateDataUrl('image/jpeg')

      if (!this.dataBase64Url) {
        this.$message.warning('未选择图片')
        return false
      }

      const base64 = this.dealBase64(this.dataBase64Url)

      let url = 'http://upload.qiniu.com/putb64/' + this.fileSize(base64) // 非华东空间需要根据注意事项 1 修改上传域名
      if (this.croppa_params.qiniuKey) {
        // 传入原图的key值，传输的图片将覆盖原图
        // key必须先转成base64
        const qiniuKey = Base64.encode(this.croppa_params.qiniuKey)
        url += '/key/' + qiniuKey
      }

      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          // console.log(xhr)
          if (xhr.status === 200) {
            // console.log("上传base64到七牛，返回图片地址 --完成");

            const keyText = JSON.parse(xhr.responseText)

            self.croppa_params.processedImage = self.croppa_params.qiniuDomain + keyText.key

            self.croppaComplete()
          } else {
            self.$message.error('上传base64到七牛，返回错误信息：' + xhr.responseText)
          }
        }
      }
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/octet-stream')
      xhr.setRequestHeader('Authorization', 'UpToken ' + this.croppa_params.qiniuToken)
      xhr.send(base64)
    },
    croppaComplete() {
      this.$emit('croppaComplete', this.croppa_params.processedImage)
    }

  }
}
</script>
