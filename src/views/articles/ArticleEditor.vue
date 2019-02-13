<template>
  <div style="position:relative;">
    <div class="linhuiba-font-title">
      编辑文章
    </div>
    <div class="linhuiba-divider"/>
    <el-form
      v-loading="loadingData"
      ref="article"
      :model="article"
      :rules="article_rules"
      label-width="80px"
      class="linhuiba-form"
      style="margin-top:15px;">
      <el-form-item label="标题" prop="name">
        <el-input v-model="article.name" placeholder="请输入文章标题"/>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="类型" prop="article_type_id">
            <el-cascader :options="article_types" :props="articleTypeProps" v-model="article.article_type_id_cas" :change-on-select="true" @change="changeArticleType"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市">
            <el-select v-model="article.city_id">
              <el-option :value="null" label="全部"/>
              <el-option v-for="(item, index) in sites" :key="index" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="顺序">
            <el-input-number v-model="article.seq" :min="0" style="width:100%;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发布时间">
            <el-date-picker v-model="article.published_at" type="date" placeholder="选择日期" style="width:100%;"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源">
            <el-input v-model="article.source"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="封面">
        <qiniu-upload
          :upload-params="uploadParams"
          @uploadComplete="uploadComplete"/>
      </el-form-item>
      <el-form-item label="原文链接">
        <el-input v-model="article.origin"/>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="article.digest" type="textarea"/>
      </el-form-item>
      <el-form-item label="内容">
        <froala :tag="'textarea'" :config="editor_config" v-model="article.content"/>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary" @click="submit('article')">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import * as api from '@/api/index'
import * as rules from '@/plugins/rules'
import * as tools from '@/plugins/tools'
import QiniuUpload from '@/components/common/QiniuUpload'
import VueFroala from 'vue-froala-wysiwyg'

export default {
  components: {
    QiniuUpload,
    VueFroala
  },
  data() {
    return {
      loadingData: false,
      sites: [],
      article_types: [],

      article: {
        id: null,
        name: null,
        city_id: null,
        article_type_id: null,
        seq: 0,
        pic_url: null,
        source: null,
        origin: null,
        published_at: null,
        digest: null,
        content: '',

        // 非传递参数
        article_type_id_cas: []
      },

      domain: 'https://banner.linhuiba.com/', // 图片域名前缀
      uploadParams: {
        // 现有的图片列
        fileList: [],
        // 图片保存至七牛的存储空间名，默认 linhui-fields
        qiniuBucket: 'linhuiba-banners',
        qiniuDomain: 'https://banner.linhuiba.com/'
      },

      // 富文本编辑器
      editorParams: {
        content: '',
        action: [{
          name: 'resource',
          icon: 'fa fa-clone',
          display_name: '资源'
        }]
      },

      article_rules: rules.article_rules,

      article_type_id: [],
      articleTypeProps: {
        value: 'id',
        label: 'display_name'
      },

      // 插入资源
      resource_id: '',
      selling_resources: [],
      selling_resource_data: {
        id: null,
        custom_name: '',
        pic_url: '',
        avg_price: ''
      },
      editor_config: {
        events: {
          'froalaEditor.image.beforeUpload': function(e, editor, images) {
            // console.log(editor)
          },
          'froalaEditor.image.uploaded': function(e, editor, response) {
            console.log(response)
          }
        },
        imageUploadDomain: 'https://banner.linhuiba.com/',
        imageUploadURL: process.env.API_ROOT + '/qiniu-upload',
        imageUploadParams: {
          'bucket': 'linhuiba-banners',
          'domain': 'https://banner.linhuiba.com/'
        },
        requestHeaders: {
          Authorization: 'bearer' + this.$store.state.user.token,
          'x-client': process.env.xClient,
          'x-client-version': process.env.xClientVersion
        },
        heightMin: 100,
        language: 'zh_cn'
        /* iframe: true,
                iframeDefaultStyle: 'body * {margin: 0;padding: 0;line-height: initial;}'*/
      }
    }
  },
  computed: {

  },
  mounted() {
    this.getSites()
    this.getArticleTypes()

    const id = this.$route.params.id
    if (id) {
      this.getArticle(id)
    }
  },
  methods: {
    updateData(content) {
      this.article.content = content
    },
    submit(formName) {
      console.log(this.article)
      // this.article.content = this.$refs.editor.editor_params.content
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.warning('信息未填写完整，请检查')
          return false
        } else {
          const params = this.article
          api.storeArticle(params, response => {
            this.$message({
              message: '文章保存成功',
              type: 'success'
            })
          })
        }
      })
    },
    getSites() {
      api.getSites({}, response => {
        this.sites = response
      })
    },
    getArticleTypes() {
      api.getArticleTypes({}, response => {
        this.article_types = response
      })
    },
    getArticle(id) {
      this.loadingData = true
      const param = { id: id }
      api.getArticle(param, response => {
        this.loadingData = false
        this.article = response
        this.editorParams.content = this.article.content
        if (this.article.pic_url) {
          this.uploadParams.fileList = [{ url: this.article.pic_url }]
        }

        if (response.article_type) {
          let article_type_parent_id = null
          let article_type_children_id = null
          if (!response.article_type.parent_id) {
            article_type_parent_id = response.article_type.id
            article_type_children_id = null
          } else {
            article_type_parent_id = response.article_type.parent_id
            article_type_children_id = response.article_type.id
          }
          this.article.article_type_id_cas = [article_type_parent_id, article_type_children_id]
        }
      })
    },
    changeArticleType(value) {
      this.article.article_type_id = this.article.article_type_id_cas[1] ? this.article.article_type_id_cas[1] : (
        this.article.article_type_id_cas[0] ? this.article.article_type_id_cas[0] : null)
    },
    // 快速查询供给列表
    getSellingResourcesBrief(query, cb) {
      if (!query) {
        cb([])
        return
      }

      const callback = callbackdata => {
        const params = {
          custom_name: query,
          select_for: 'article'
        }
        api.getSellingResourcesBrief(params, response => {
          if (response.length > 0) {
            cb(response)
          } else {
            cb([])
          }
        }, error => {
          console.log(error)
        })
      }
      // 输入停顿后，快速查询
      tools.dataBrief(callback)
    },
    // 选择供给
    selectSellingResource(selected_data) {
      console.log(selected_data)
      this.selling_resource_data.id = selected_data.id
      this.selling_resource_data.custom_name = selected_data.custom_name
      this.selling_resource_data.pic_url = selected_data.physical_resource && selected_data.physical_resource.physical_resource_first_image ? selected_data.physical_resource.physical_resource_first_image.pic_url : null
      this.selling_resource_data.avg_price = selected_data.avg_price
    },
    uploadComplete(fileList) {
      this.article.pic_url = fileList.length >= 1
        ? (fileList[0].response ? this.domain + fileList[0].response.key : fileList[0].url)
        : ''
    }
  }
}
</script>
