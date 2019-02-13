<!-- 上传图片 -->
<!-- 可传参数：
    uploadParams:{
        default: {
            // 是否多选，默认否
            multiple: false,
            // 是否显示已上传文件列表 true
            showFileList: true,
            // 文件列表的类型 text/picture/picture-card
            listType: 'picture-card',
            // 现有的图片列，格式：
            // fileList: [{
            //     name:: 'xxx.jpg',
            //     url: 'xxx.jpg'
            // }],
            fileList: [],
            // 图片保存至七牛的存储空间名，默认 linhui-fields
            qiniuBucket: 'linhui-fields',
            // 图片域名前缀，默认 https://img.linhuiba.com/
            qiniuDomain: 'https://img.linhuiba.com/',
            // 是否允许拖拽上传
            drag: false,
            // 传入组件，最大图片数量
            maxCount: 1,
            // 图片大小，单位M，默认3M
            imageSize: 3,
            // 是否可拖动排序
            isDragging: false,
            dialogImageSize: 'small',
            // 图片来自于那个功能模块
            // 如果是resource资源，图片需要加上后缀 "-linhuibaoriginal.jpg" "?v=1"
            fileFrom: null,
            // 是否需要强制裁剪（如资源图片需要强制裁剪）
            needForceProcess: 0,
        }
    },
 -->
<!-- 可调用方法：this.$refs.ref_child.start() -->
<template lang="html">
  <div class="qiniu-upload">

    <el-upload
      :action="actionUrl"
      :multiple="upload_params.multiple"
      :show-file-list="upload_params.showFileList"
      :list-type="upload_params.listType"
      :drag="upload_params.drag"
      :data="uploadData"
      :file-list="upload_params.fileList"
      :disabled="disabled"
      :limit="upload_params.maxCount"
      :on-success="handleAvatarSuccess"
      :on-error="handleError"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      class="upload-demo">

      <template v-if="upload_params.listType == 'text'">
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
      <template v-else-if="upload_params.listType == 'picture'">
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
      <template v-else-if="upload_params.listType == 'picture-card'">
        <i class="el-icon-upload"/>
      </template>

      <template v-if="upload_params.drag">
        <span class="dragTip">
          <em>将文件拖到此处，<br>或点击上传</em>
        </span>
      </template>

      <div v-if="otherTips" slot="tip" class="el-upload__tip">
        <div>
          <span v-if="upload_params.anyFileExt">
            可上传任意类型文件
          </span>
          <span v-else>
            只能上传 <span class="linhuiba-font-danger">{{ upload_params.fileExt.join('/') }}</span> 文件
          </span>
          <span>
            不超过 <span class="linhuiba-font-danger">{{ upload_params.imageSize }} MB</span>
          </span>
          <span>
            最多上传 <span class="linhuiba-font-danger">{{ upload_params.maxCount }}</span> 个文件
          </span>
        </div>
        <div>
          <span v-if="upload_params.multiple" class="linhuiba-margin-right-10">
            支持多选
          </span>
          <span v-if="upload_params.isDragging" class="linhuiba-margin-right-10">
            支持拖动改变顺序（拖动图片覆盖另一张图片，可以调换两张图片的顺序）
          </span>
        </div>
        <div>
          <slot name="append_tip"/>
        </div>
      </div>
      <div v-else slot="tip" class="el-upload__tip">
        <slot name="other_tip"/>
      </div>
    </el-upload>

    <!-- 自定义显示图片及操作（裁剪、插小红旗），showCustomOperation=true 时显示，以下样式引用 el-upload-list -->
    <div
      v-if="upload_params.fileList && upload_params.showCustomOperation"
      class="file-list el-upload-list el-upload-list--picture-card">
      <div
        v-dragging="{ item: item, list: upload_params.fileList, group: 'fileList' }"
        v-for="(item, index) in upload_params.fileList"
        v-if="item.url"
        :key="item.url + index"
        :style="getCustomBoxStyle()"
        class="linhuiba-inline-block el-upload-list__item is-success">
        <!-- 如果图片需要后缀才能访问 -->
        <img
          v-if="upload_params.viewWithSuffix"
          :src="(item.url.indexOf('blob:http') >= 0) ?
            item.url :
          (item.url + upload_params.viewWithSuffix + '?v=1&imageView2/2/w/150/h/150/q/100/format/jpg')"
          alt=""
          class="el-upload-list__item-thumbnail">
        <img
          v-else
          :src="(item.url.indexOf('blob:http') >= 0) ? item.url : (item.url + '?v=1&imageView2/2/w/100/h/100/q/100/format/jpg')"
          alt=""
          class="el-upload-list__item-thumbnail">
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-check"/>
        </label>
        <span class="el-upload-list__item-actions">
          <div>
            <span class="el-upload-list__item-preview" @click="handlePreview(item, index)">
              <i class="el-icon-zoom-in"/>
            </span>
            <span class="el-upload-list__item-delete" @click="handleRemoveFile(item)">
              <i class="el-icon-delete"/>
            </span>
          </div>
          <div>
            <span v-if="upload_params.showItemPreview" class="el-upload-list__item-preview" @click="handleEdit(item, index)">
              <i class="fa fa-cut"/>
            </span>
            <!-- <span class="el-upload-list__item-preview" v-if="upload_params.showItemInsertFlag" @click="handleInsertFlag(item, index)">
                            <i class="fa fa-flag"></i>
                        </span> -->
            <span v-if="upload_params.showItemCanvasBetter" class="el-upload-list__item-preview" @click="handleCanvasBetter(item, index)">
              <i class="fa fa-edit"/>
            </span>
          </div>
        </span>
      </div>
    </div>

    <!-- 预览图片弹窗 -->
    <el-dialog :visible.sync="dialogImageVisible" :modal="false" :append-to-body="true" custom-class="qiniu_upload_dialog">
      <img
        v-if="upload_params.viewWithSuffix"
        :src="(dialogImageUrl.indexOf('blob:http') >= 0) ?
          dialogImageUrl :
        (dialogImageUrl + upload_params.viewWithSuffix)"
        width="inherit"
        alt="">
      <img v-else :src="dialogImageUrl" width="inherit" alt="">
    </el-dialog>

    <!-- 插入小红旗 -->
    <el-dialog :visible.sync="show_image_insert_flag" :fullscreen="true" :append-to-body="true" title="插入小红旗">
      <image-insert-flag
        ref="image_insert_flag"
        :upload-params="{ token: uploadData.token, qiniuDomain: upload_params.qiniuDomain }"
        @onImageInserted="onImageInserted"/>
    </el-dialog>

    <!-- 裁剪图片 -->
    <el-dialog :visible.sync="show_image_process" :append-to-body="true" :before-close="handleCloseProcess" title="裁剪图片" custom-class="qiniu_upload_dialog" top="0%">
      <image-process
        :croppa-params="croppa_params"
        @croppaComplete="croppaComplete"/>
    </el-dialog>

    <!-- 绘制canvas -->
    <el-dialog :visible.sync="show_canvas_better" :fullscreen="true" :append-to-body="true" title="绘制canvas">
      <v-canvas-better
        ref="vCanvasBetter"
        :cavas-bgm="cavas_better_data.cavas_bgm"
        :upload-params="{ token: uploadData.token, qiniuDomain: upload_params.qiniuDomain }"
        @complete="canvasBetterComplete"/>
    </el-dialog>

    <slot/>
  </div>
</template>

<style>
    .upload-demo .el-upload-dragger{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    .upload-demo .el-upload-dragger .el-icon-upload{
        font-size: 28px;
        line-height: 30px;
        display: block;
    }

    .upload-demo .dragTip, .upload-demo .tip{
        line-height: 18px;
        display: block;
    }
    .upload-demo .el-upload-list.el-upload-list--text{
        width: 500px;
    }

    .qiniu_upload_dialog.el-dialog{
        width: fit-content;
    }

    .qiniu_upload_dialog.el-dialog .el-dialog__body{
        width: inherit;
    }

    .file-list .el-upload-list__item {
        width: 100px;
        height: 100px;
    }

</style>

<script>
import * as api from '@/api/index'
import * as tools from '@/plugins/tools'
import ImageInsertFlag from './ImageInsertFlag'
import ImageProcess from './ImageProcess'
// import md5 from 'js-md5' // 引入md5编码
// import axios from 'axios'
import VCanvasBetter from './VCanvasBetter'

export default {
  name: 'QiniuUpload',
  components: {
    ImageInsertFlag,
    ImageProcess,
    VCanvasBetter
  },
  props: {
    // 上传图片参数
    uploadParams: {
      type: Object,
      default: function() {
        return {
          // // 是否多选，默认否
          // multiple: false,
          // // 是否显示已上传文件列表 true
          // showFileList: true,
          // // 文件列表的类型 text/picture/picture-card
          // listType: 'picture-card',
          // // 现有的图片列，格式：
          // // fileList: [{
          // //     name:: 'xxx.jpg',
          // //     url: 'xxx.jpg'
          // // }],
          // fileList: [],
          // // 图片保存至七牛的存储空间名，默认 linhui-fields
          // // linhui-fields https://img.linhuiba.com/ 场地相关图片
          // // linhuiba-activities
          // // linhuiba-advs
          // // linhuiba-appeals https://appeal.linhuiba.com/ 需求图片
          // // linhuiba-banners https://banner.linhuiba.com/ 内容图片
          // // linhuiba-certs https://cert.linhuiba.com/ 证件图片
          // // linhuiba-crm https://crm.linhuiba.com/ crm相关图片
          // // linhuiba-file http://file.linhuiba.com/ excel、pdf等文件专用
          // // linhuiba-temp http://temp.linhuiba.com/ 临时文件
          // qiniuBucket: 'linhui-fields',
          // // 图片域名前缀，默认 https://img.linhuiba.com/
          // qiniuDomain: 'https://img.linhuiba.com/',
          // // 是否允许拖拽上传
          // drag: false,
          // // 传入组件，最大图片数量
          // maxCount: 1,
          // // 图片大小，单位M，默认3M
          // imageSize: 3,
          // // 是否可拖动排序
          // isDragging: false,
          // dialogImageSize: 'small',
          // // 图片来自于那个功能模块
          // fileFrom: null,
          // // 是否需要强制裁剪（如资源图片需要强制裁剪）
          // needForceProcess: 0,

          // // 自定义操作上传图片
          // // 是否显示自定义box
          // showCustomOperation: false,
          // // 是否显示裁剪按钮
          // showItemPreview: false,
          // // 是否显示插小红旗按钮
          // showItemInsertFlag: false,
          // // 自定义box的宽高
          // customBoxWidth: 100,
          // customBoxHeight: 100,

          // // 文件类型，默认图片
          // anyFileExt: false, // 是否可传任意文件类型
          // fileExt: [".png",".jpg",".jpeg",".bmp",".gif"], // 默认文件后缀名

          // // 文件是否需要后缀才能访问，如资源图片将传入：-linhuibaoriginal.jpg
          // viewWithSuffix: null,

          // // 图片上传token（用于使用多个该组件的页面，以减少获取toekn接口的请求），传入则不主动获取token
          // qiniuToken: null,

          // // 上传到七牛云存储的时候，key 是可选的。如果你不指定 key，则自动以 hash 值作为 key，此时自动带了消重能力：用户上传的两个相同文件，最终的 key 是一样的，不会重复保存
          // // 如果使用了key值，即使用自定义文件名，会导致除第一次上传的文件外，相同文件名的不同文件无法上传，报错：{"error":"file exists"}（七牛本身不支持传同名的文件）
          // // customKey: false, // 是否使用选择的文件名自定义key值 xxx/yyyyMMss
        }
      }
    },
    // 图片编辑器参数
    croppaParams: {
      type: Object,
      default: function() {
        return {
          // // 默认图片
          // initialImage: null,
          // // 七牛token
          // qiniuToken: null,
          // // 图片的key值，如果传入，则上传图片时传入该key到七牛接口，覆盖原图
          // qiniuKey: null,
          // // 图片保存至七牛的存储空间名，默认使用 uploadParams的 linhui-fields
          // qiniuBucket: null,
          // // 图片域名前缀，默认使用 uploadParams的 https://img.linhuiba.com/
          // qiniuDomain: null,
          // // 默认图片
          // initialImage: null,
          // // 图片大小，单位M，默认3M
          // imageSize: 3,
          // // 容器宽高
          // width: 1000,
          // height: 800,
          // // 生成的图片与容器宽高的比例，如容器宽高=600*600，quality=2，生成的图片大小为1200*1200
          // quality: 1,

          // // 将返回的处理后的图片信息
          // processedImage: null,
        }
      }
    },
    // 是否显示默认的上传图片文本提示
    otherTips: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 上传附带的额外参数：七牛云上传需要的秘钥
      uploadData: {
        token: ''
      },
      dialogImageVisible: false,
      dialogImageUrl: '',
      upload_params: {
        // 是否多选，默认否
        multiple: false,
        // 是否显示已上传文件列表 true
        showFileList: true,
        // 文件列表的类型 text/picture/picture-card
        listType: 'picture-card',
        // 现有的图片列，格式：
        // fileList: [{
        //     name:: 'xxx.jpg',
        //     url: 'xxx.jpg'
        // }],
        fileList: [],
        // 图片保存至七牛的存储空间名，默认 linhui-fields
        qiniuBucket: 'linhui-fields',
        // 图片域名前缀，默认 https://img.linhuiba.com/
        qiniuDomain: 'https://img.linhuiba.com/',
        // 是否允许拖拽上传
        drag: false,
        // 传入组件，最大图片数量
        maxCount: 1,
        // 图片大小，单位M，默认3M
        imageSize: 3,
        // 是否可拖动排序
        isDragging: false,
        dialogImageSize: 'small',
        // 图片来自于那个功能模块
        fileFrom: null,
        // 是否需要强制裁剪（如资源图片需要强制裁剪）
        needForceProcess: 0,

        // 自定义操作上传图片
        // 是否显示自定义box
        showCustomOperation: false,
        // 是否显示裁剪按钮
        showItemPreview: false,
        // 是否显示插小红旗按钮
        showItemInsertFlag: false,
        // 是否使用canvas组件处理
        showItemCanvasBetter: false,
        // 自定义box的宽高
        customBoxWidth: 100,
        customBoxHeight: 100,

        // 文件类型，默认图片
        anyFileExt: false, // 是否可传任意文件类型
        fileExt: ['.png', '.jpg', '.jpeg', '.bmp', '.gif'], // 默认文件后缀名

        // 文件是否需要后缀才能访问，如资源图片将传入：-linhuibaoriginal.jpg
        viewWithSuffix: null,

        // 图片上传token（用于使用多个该组件的页面，以减少获取toekn接口的请求），传入则不主动获取token
        qiniuToken: null

        // 上传到七牛云存储的时候，key 是可选的。如果你不指定 key，则自动以 hash 值作为 key，此时自动带了消重能力：用户上传的两个相同文件，最终的 key 是一样的，不会重复保存
        // 如果使用了key值，即使用自定义文件名，会导致除第一次上传的文件外，相同文件名的不同文件无法上传，报错：{"error":"file exists"}（七牛本身不支持传同名的文件）
        // customKey: true, // 是否使用选择的文件名自定义key值 xxx_上传时间/文件修改时间/随机数
      },
      show_image_insert_flag: false,
      // random: Math.floor(Math.random() * 100000),

      // // 同图片个数的随机数数组，用户编辑图片后显示新的图片（因为图片呗覆盖后存在缓存，所以通过加入 v=随机数 显示新图片）
      // random_arr: [],

      // 当前选择编辑的图片index，编辑完毕后更新随机数数组对应index的随机数
      selecting_image_index: null,

      // 图片编辑器参数
      show_image_process: false,
      croppa_params: {
        // 七牛token
        qiniuToken: null,
        // 图片的key值，如果传入，则上传图片时传入该key到七牛接口，覆盖原图
        qiniuKey: null,
        // 图片保存至七牛的存储空间名，默认使用 uploadParams的 linhui-fields
        qiniuBucket: null,
        // 图片域名前缀，默认使用 uploadParams的 https://img.linhuiba.com/
        qiniuDomain: null,
        // 默认图片
        initialImage: null,
        // 图片大小，单位M，默认3M
        imageSize: 3,
        // 容器宽高
        width: 1000,
        height: 800,
        // 生成的图片与容器宽高的比例，如容器宽高=600*600，quality=2，生成的图片大小为1200*1200
        quality: 1,

        // 将返回的处理后的图片信息
        processedImage: null
      },

      // 刚上传但未裁剪的图片
      unProcessImages: [],
      // // 选择的刚上传但未裁剪的图片的index
      // selecting_un_process_image_index: null,
      // 能否关闭裁剪窗口
      canCloseProcess: true,

      // canvas组件
      show_canvas_better: false,
      cavas_better_data: {
        cavas_bgm: null
      }

      // // JavaScript根据文件名判断文件类型
      // imgExt: [".png",".jpg",".jpeg",".bmp",".gif"], // 图片文件的后缀名
      // docExt: [".doc",".docx"], // word文件的后缀名
      // xlsExt: [".xls",".xlsx"], // excel文件的后缀名
      // cssExt: [".css"], // css文件的后缀名
      // jsExt: [".js"], // js文件的后缀名

    }
  },
  computed: {
    // 是否禁用
    disabled: function() {
      // 获得上传token后可点击
      return !this.uploadData.token
    },
    // 上传七牛的地址
    actionUrl() {
      let url = 'http://upload.qiniu.com/'
      // 这两个文件夹的服务器url = "http://up-z2.qiniup.com/";在华南，所以上传域名不一样
      if (this.upload_params.qiniuBucket === 'linhuiba-file' ||
                this.upload_params.qiniuBucket === 'linhuiba-temp') {
        url = 'http://up-z2.qiniup.com/'
      }
      return url
    }
  },
  watch: {
    uploadParams: {
      immediate: true,
      deep: true,
      handler: function(val, oldVal) {
        this.upload_params = Object.assign(JSON.parse(JSON.stringify(this.upload_params)),
          JSON.parse(JSON.stringify(val)))
        if (this.upload_params.fileList && this.upload_params.maxCount && this.upload_params.fileList.length > this.upload_params.maxCount) {
          // 剔除最大图片上传个数多余的图片
          this.upload_params.fileList.splice(this.upload_params.maxCount)
          this.$emit('uploadComplete', this.upload_params.fileList)
          return false
        }
        this.upload_params.fileList = this.upload_params.fileList.map(item => {
          item.name = item.name || item.url
          return item
        })
        this.croppa_params.qiniuDomain = this.upload_params.qiniuDomain

        this.selecting_image_index = this.$options.data().selecting_image_index

        if (val.qiniuToken) {
          this.uploadData.token = val.qiniuToken
          return true
        }

        // this.$nextTick(function(){
        //     this.random = Math.floor(Math.random() * 100000)
        // })
      }
    },
    croppaParams: {
      immediate: true,
      deep: true,
      handler: function(val, oldVal) {
        this.croppa_params = Object.assign(JSON.parse(JSON.stringify(this.croppa_params)),
          JSON.parse(JSON.stringify(val)))

        this.croppa_params.qiniuBucket = this.croppa_params.qiniuBucket ? this.croppa_params.qiniuBucket : this.upload_params.qiniuBucket
        this.croppa_params.qiniuDomain = this.croppa_params.qiniuDomain ? this.croppa_params.qiniuDomain : this.upload_params.qiniuDomain

        this.croppa_params.qiniuToken = this.croppa_params.qiniuToken ? this.croppa_params.qiniuToken : this.uploadData.token
      }
    },
    unProcessImages: {
      immediate: true,
      handler: function(val, oldVal) {
        if (val && val.length > 0) {
          // console.log(val)
          const file = val[0]['file']
          const image_index = val[0]['image_index']

          // 对刚上传的图片进行裁剪，传入参数执行裁剪事件，并删除未裁剪图片数组
          // 此时的裁剪框在裁剪完毕前强制性无法关闭
          this.selecting_image_index = image_index
          this.handleEdit(file, image_index)
          this.canCloseProcess = false
        }
      }
    }
    /* 'upload_params.fileExt': {
            immediate: true,
            deep: true,
            handler: function(val, oldVal){
                if(!Array.isArray(this.upload_params.fileExt) || this.upload_params.fileExt.length <= 0){
                    this.upload_params.fileExt = this.imgExt
                }
            }
        },*/
    // 'upload_params.fileList': {
    //     immediate: true,
    //     deep: true,
    //     handler: function(val, oldVal){
    //         this.random_arr = val.map(function(item, index) {
    //             return Math.floor(Math.random() * 100000 * (index + 1));
    //         })
    //     }
    // }
  },
  mounted() {
    this.getQiniuToken()

    this.$nextTick(function() {
      this.bindDragging()
    })

    // if(this.upload_params.isDragging && this.$dragging){
    //     // 图片顺序拖动（只要发生图片顺序切换就触发，即切换了顺序）
    //     this.$dragging.$on('dragged', ({ value }) => {
    //         this.uploadComplete('dragged')
    //     })
    //     // 图片顺序拖动结束(驱动到外部区域松开，即取消拖动)
    //     this.$dragging.$on('dragend', () => {

    //     })
    // }
  },
  methods: {
    // 绑定拖拽排序
    bindDragging() {
      if (this.upload_params.isDragging && this.$dragging) {
        // 图片顺序拖动（只要发生图片顺序切换就触发，即切换了顺序）
        this.$dragging.$on('dragged', ({ value }) => {
          this.uploadComplete('dragged')
        })
        // 图片顺序拖动结束(驱动到外部区域松开，即取消拖动)
        this.$dragging.$on('dragend', () => {

        })
      }
    },
    // 获取文件名后缀名
    stringExtension(str) {
      let ext = null
      const name = str.toLowerCase()
      const i = name.lastIndexOf('.')
      if (i > -1) {
        ext = name.substring(i)
      }
      // console.log(ext)
      return ext
    },
    // 判断类型Array中是否包含某个值（文件后缀）
    arrayContain(arr, str) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === str) {
          return true
        }
      }
      return false
    },
    // 判断文件名的后缀是否存在于传入的文件类型数组中
    stringExtMatch(str, extType) {
      if (this.arrayContain(extType, this.stringExtension(str))) {
        return true
      } else {
        return false
      }
    },

    // 获得七牛token
    getQiniuToken() {
      if (this.upload_params.qiniuToken) {
        this.uploadData.token = this.upload_params.qiniuToken
        return true
      }

      const params = {
        bucket: this.upload_params.qiniuBucket
      }
      api.getQiniuToken(params, response => {
        this.uploadData.token = response.uptoken
      })
    },

    // 获得自定义box的样式
    getCustomBoxStyle() {
      let style = ''
      if (this.upload_params.customBoxWidth) {
        style += `width: ${this.upload_params.customBoxWidth}px;`
      }
      if (this.upload_params.customBoxHeight) {
        style += `height: ${this.upload_params.customBoxHeight}px;`
      }
      return style
    },

    beforeAvatarUpload(file) {
      // 选择图片的时候会放入一个本地地址的图片对象，所以长度会默认+1
      // 最后一个图片不为空，且状态为success，则这张图片为已上传图片，否则为准备上传图片
      if (this.upload_params.fileList.length >= this.upload_params.maxCount && this.upload_params.fileList[this.upload_params.maxCount - 1].status === 'success') {
        this.$message.error('上传图片数量不能超过 ' + this.upload_params.maxCount + ' 个')
        return false
      }

      // 在图片提交前进行验证
      if (!this.upload_params.anyFileExt && !this.stringExtMatch(file.name, this.upload_params.fileExt)) {
        const fileExtStr = this.upload_params.fileExt.join('/')
        this.$message.error(`上传文件只能是 ${fileExtStr} 格式!`)
        return false
      }

      // const isJPG = file.type === 'image/jpeg'
      // const isPNG = file.type === 'image/png'
      // if (!isJPG && !isPNG) {
      //     this.$message.error('上传图片只能是 JPG/PNG 格式!')
      //     return false
      // }
      const isLt3M = (file.size / 1024 / 1024) < (this.upload_params.imageSize ? this.upload_params.imageSize : 3)
      if (!isLt3M) {
        this.$message.error('上传文件大小不能超过 ' + (this.upload_params.imageSize ? this.upload_params.imageSize : 3) + 'MB!')
        return false
      }

      /* // 使用选择的文件名自定义key值 文件最后修改时间_xxx
            // 使用文件最后修改时间可以防止同一文件重复上传导致的key不同（去重）
            if(this.upload_params.customKey){
                // 上传图片自定义key值
                // let curr = moment().format('YYYYMMDDHHmmss').toString();
                let prefix = moment(file.lastModified).format('YYYYMMDDHHmmss').toString();
                // let random = Math.floor(Math.random() * 100000);
                let suffix = file.name;
                let key = `${prefix}_${suffix}`;
                key = Base64.encode(key);
                console.log(key)
                this.uploadData.key = key;
            }*/
      return true
    },
    handlePreview(file, image_index) {
      const url = (file.url.indexOf('blob:http') >= 0) || !this.upload_params.viewWithSuffix ? file.url : (file.url + this.upload_params.viewWithSuffix)
      tools.isHasImage(url, success => {
        // console.log('加载完毕')
        this.dialogImageVisible = true
        this.dialogImageUrl = file.url
      }, error => {
        console.log(error)
        window.open(url)
      })

      // let url = file.url
      // if(this.upload_params.fileFrom == 'resource'){
      //     url = (url.indexOf('blob:http') >= 0) ? url : (url + '-linhuibaoriginal.jpg?v=' + (this.random_arr && this.random_arr[image_index] ? this.random_arr[image_index] : ''))
      //     this.dialogImageUrl = url
      // }
      // else{
      //     this.dialogImageUrl = url
      // }
      // 点击已上传的文件链接时的钩子
    },
    handleAvatarSuccess(response, file, fileList) {
      // 只获取最大图片数量的图片数组，删除多选时多余的图片
      fileList = fileList.splice(0, this.upload_params.maxCount)

      const image_index = fileList.indexOf(file)
      if (image_index >= 0 && fileList[image_index]) {
        // 新上传图片给予前缀，合并成完整图片链接
        let new_file = fileList[image_index]
        if (new_file.response && new_file.response.key) {
          const key = new_file.response.key
          const name = new_file.name || new_file.url
          /* if(this.upload_params.customKey){
            name = Base64.decode(key);
          }*/
          const url = this.upload_params.qiniuDomain + key
          new_file = {
            uid: new_file.uid,
            name: name,
            status: new_file.status,
            url: url
          }
          fileList[image_index] = new_file
        }

        // 如，资源上传图片，需要强制裁剪
        if (+this.upload_params.needForceProcess === 1) {
          this.unProcessImages.push({
            file: JSON.parse(JSON.stringify(new_file)),
            image_index: image_index
          })
        }
        // console.log(this.unProcessImages)
      }
      // 上传成功后在图片框显示图片
      // 从已有图片集返回选定的项（-1，返回最后上传的一张；-3，返回最后上传的3张）
      this.upload_params.fileList = fileList

      // this.$emit('uploadComplete', fileList)
      this.uploadComplete('success')
    },
    handleError(err, file, fileList) {
      // let errText = JSON.parse(err);
      console.log(err)
      // 文件上传失败时，显示错误
      this.$message.error('上传失败：' + err.message)
      this.upload_params.fileList = fileList
      this.uploadComplete('remove')
    },
    handleRemove(fiel, fileList) {
      // 文件列表移除文件时的钩子
      this.upload_params.fileList = fileList
      // this.$emit('uploadComplete', fileList)
      this.uploadComplete('remove')
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传 ${this.upload_params.maxCount} 个文件`)
    },
    handleRemoveFile(file) {
      const fileList = this.upload_params.fileList
      fileList.splice(fileList.indexOf(file), 1)
      this.handleRemove(file, fileList)
    },
    uploadComplete(status) {
      const self = this
      // 图片上传完毕后，对于刚上传的图片加入域名前缀
      this.upload_params.fileList = this.upload_params.fileList.map(function(item, index) {
        if (item.response && item.response.key) {
          return {
            uid: item.uid,
            name: item.name || (self.upload_params.qiniuDomain + item.response.key),
            status: item.status,
            url: self.upload_params.qiniuDomain + item.response.key
          }
        }
        return item
      })
      this.$emit('uploadComplete', this.upload_params.fileList, status)
    },
    // 插入小红旗
    handleInsertFlag(file, image_index) {
      this.selecting_image_index = image_index

      this.show_image_insert_flag = true
      let url = file.url
      setTimeout(() => {
        url = (url.indexOf('blob:http') >= 0) || !this.upload_params.viewWithSuffix ? url : (url + this.upload_params.viewWithSuffix + '?v=1')
        // url = (url.indexOf('blob:http') >= 0) ? url : (url + '-linhuibaoriginal.jpg?v=' + (this.random_arr && this.random_arr[image_index] ? this.random_arr[image_index] : ''))

        this.$refs.image_insert_flag.init(url, this.upload_params)
      }, 0)
    },
    // 图片插入小红旗保存完毕
    onImageInserted(image_url) {
      this.$message.success('图片插入小红旗成功')
      this.show_image_insert_flag = false
      if (this.selecting_image_index >= 0 && this.upload_params.fileList[this.selecting_image_index]) {
        this.upload_params.fileList[this.selecting_image_index].url = image_url
      }

      this.$emit('uploadComplete', this.upload_params.fileList, 'success')

      // if(this.selecting_image_index >= 0 && this.random_arr){
      //     this.random_arr[this.selecting_image_index] = Math.floor(Math.random() * 100000 * (this.selecting_image_index + 1));
      // }
    },
    // 裁剪图片
    handleEdit(file, image_index) {
      this.selecting_image_index = image_index

      // console.log(file)
      this.show_image_process = true

      // this.croppa_params.qiniuToken = this.uploadData.token

      let url = file.url
      url = (url.indexOf('blob:http') >= 0) || !this.upload_params.viewWithSuffix ? url : (url + this.upload_params.viewWithSuffix + '?v=1')
      // url = (url.indexOf('blob:http') >= 0) ? url : (url + '-linhuibaoriginal.jpg?v=' + (this.random_arr && this.random_arr[image_index] ? this.random_arr[image_index] : ''))
      this.croppa_params.initialImage = url

      // let index = url.lastIndexOf('/')
      // if (index >= 0) {
      //     let file_name = url.substr(index + 1, url.length - index - 1)
      //     index = file_name.indexOf('-linhuibaoriginal.jpg?v=')
      //     let key = ''
      //     if (index < 0) {
      //         key = file_name
      //     }
      //     else {
      //         key = file_name.substr(0, index)
      //     }
      //     this.croppa_params.qiniuKey = key
      // }
    },
    // 裁剪窗口关闭前判断是否允许关闭
    handleCloseProcess(done) {
      if (this.canCloseProcess) {
        done()
      }
    },
    // 图片处理完成回调事件
    croppaComplete(processedImage) {
      this.$message.success('图片裁剪成功')
      this.show_image_process = false

      if (this.selecting_image_index >= 0 && this.upload_params.fileList[this.selecting_image_index]) {
        this.upload_params.fileList[this.selecting_image_index].url = processedImage
      }

      // 如果this.canCloseProcess不为true，则说明裁剪的这张图片为刚上传的第一张图片
      // 裁剪完毕后，刚上传未裁剪图片数组的第一个值删除，且this.canCloseProcess赋值为true
      if (!this.canCloseProcess) {
        this.unProcessImages.splice(0, 1)
        this.canCloseProcess = true
      }

      this.$emit('uploadComplete', this.upload_params.fileList, 'success')

      // this.$nextTick(function(){
      //     this.random = Math.floor(Math.random() * 100000)
      // })
      // if(this.selecting_image_index >= 0 && this.random_arr){
      //     this.random_arr[this.selecting_image_index] = Math.floor(Math.random() * 100000 * (this.selecting_image_index + 1));
      // }
    },

    // canvas处理
    handleCanvasBetter(file, image_index) {
      this.selecting_image_index = image_index

      this.show_canvas_better = true
      let url = file.url
      setTimeout(() => {
        url = (url.indexOf('blob:http') >= 0) || !this.upload_params.viewWithSuffix ? url : (url + this.upload_params.viewWithSuffix + '?v=1')
        // url = (url.indexOf('blob:http') >= 0) ? url : (url + '-linhuibaoriginal.jpg?v=' + (this.random_arr && this.random_arr[image_index] ? this.random_arr[image_index] : ''))
        this.cavas_better_data.cavas_bgm = url
        this.$refs['vCanvasBetter'].init()
      }, 0)
    },
    canvasBetterComplete(image_url) {
      this.$message.success('图片绘制成功')
      this.show_canvas_better = false
      if (this.selecting_image_index >= 0 && this.upload_params.fileList[this.selecting_image_index]) {
        this.upload_params.fileList[this.selecting_image_index].url = image_url
      }

      this.$emit('uploadComplete', this.upload_params.fileList, 'success')
    }
  }
}
</script>
