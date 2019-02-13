<template>
  <div>
    <div class="linhuiba-font-title">
      文章管理
      <div style="float:right;">
        <el-button type="primary" @click="add">
          新增文章
        </el-button>
      </div>
    </div>
    <div class="linhuiba-divider"/>
    <div class="linhuiba-search-form">
      <el-select v-model="searchParams.city_id" placeholder="城市" clearable @change="getArticles">
        <el-option v-for="(item, index) in sites" :key="index" :label="item.name" :value="item.id"/>
      </el-select>
      <el-input v-model="searchParams.keyword" placeholder="文章标题"/>
      <el-button type="primary" @click="getArticles">搜索</el-button>
      <el-button @click="clear">清空</el-button>
    </div>
    <div class="linhuiba-bordered-container">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="linhuiba-light-sidebar">
            <div>
              <el-tree v-loading="loadingArticleTypes" :data="article_types" :props="defaultProps" :highlight-current="true" :render-content="renderArticleType" :default-expand-all="true" @node-click="handleNodeClick"/>
              <div style="margin-top:15px;">
                <el-button type="primary" style="width:100%;" @click="addArticleType">
                  添加文章类型
                </el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="18" style="display:block;position:relative;">
          <div v-loading="loadingArticles" id="article-list" style="display:block;">
            <el-col v-for="(item, index) in data_items" :span="6" :key="index" class="grid-item">
              <div style="padding: 10px 5px">
                <el-card :body-style="{ padding : '0px' }">
                  <div style="padding: 10px;" class="linhuiba-font-help">
                    <span v-if="item.city">{{ item.city.name }} /</span>
                    <span v-if="item.article_type">{{ item.article_type.label }}</span>
                    <span v-if="item.seq > 0" style="float:right;" class="linhuiba-font-warning">
                      {{ item.seq }}
                    </span>
                  </div>
                  <div>
                    <img :src="item.pic_url" width="100%">
                  </div>
                  <div style="padding: 10px;">
                    <div>{{ item.name }}</div>
                    <div v-if="item.source && item.source.length > 0" class="linhuiba-font-small">
                      来源：{{ item.source }}
                    </div>
                    <div class="linhuiba-font-small linhuiba-font-help">
                      {{ item.digest }}
                    </div>
                  </div>
                  <div style="background-color: #999999;">
                    <el-row>
                      <el-col :span="8">
                        <div class="linhuiba-align-center" style=" padding: 10px 0;border-right:1px solid #AEAEAE;cursor:pointer;" @click="previewArticle(item.id)">
                          <i class="fa fa-eye"/>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="linhuiba-align-center" style=" padding: 10px 0;border-right:1px solid #AEAEAE;cursor:pointer;" @click="editArticle(item.id)">
                          <i class="fa fa-edit"/>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="linhuiba-align-center" style=" padding: 10px 0;cursor:pointer;" @click="deleteArticle(item.id)">
                          <i class="fa fa-trash"/>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <div class="linhuiba-align-center" style="margin-top:15px;margin-bottom:30px;">
        <el-pagination :total="total" :current-page.sync="page" layout="total, prev, pager, next" @current-change="getArticles"/>
      </div>
    </div>

    <!--编辑文章类型-->
    <el-dialog :visible.sync="editTypeDialogVisible" :modal-append-to-body="false" title="编辑文章类型" size="tiny" custom-class="linhuiba-dialog-550">
      <el-form :model="curArticleType" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="curArticleType.display_name"/>
        </el-form-item>
        <el-form-item label="上级类型">
          <el-select v-model="curArticleType.parent_id">
            <el-option v-for="(item, index) in article_types[0].children" :key="index" :label="item.display_name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="   ">
          <el-checkbox :label="1" v-model="curArticleType.is_visible">
            显示
          </el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editTypeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveType">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
  #article-list {
    position: relative;
    height: auto;
    min-height: 100px;
  }
</style>


<script>
import Masonry from 'masonry-layout'
import * as api from '@/api/index'
import * as tools from '@/plugins/tools'

export default {
  name: 'Articles',
  data() {
    return {
      page: 1,
      total: 0,
      loadingArticleTypes: false,
      loadingArticles: false,
      // 查询参数
      searchParams: {
        city_id: null,
        keyword: '',
        page: 1
      },

      sites: [],

      article_types: [{
        id: '',
        display_name: '全部',
        children: []
      }],

      editPageDialogVisible: false,
      editTypeDialogVisible: false,
      previewDialogVisible: false,
      data_items: [],
      curArticleType: {
        id: '',
        display_name: '',
        is_visible: true,
        parent_id: ''
      },
      defaultProps: {
        children: 'children',
        label: 'display_name'
      },
      cascaderProps: {
        value: 'id',
        label: 'label'
      }
    }
  },
  computed: {
    prefix_url() {
      return process.env.PC_URL || 'http://linhuiba.com'
    }
  },
  watch: {
    data_items: {
      handler: function(val, oldValue) {
        this.$nextTick(function() {
          this.msnry = new Masonry('#article-list', {
            itemSelector: '.grid-item'
          })
          tools.watchImageLoaded(this, () => {
            this.msnry.layout() // 在所有图片加载完成后重置Masonry布局
          })
        })
      }
    }
  },
  mounted() {
    this.getArticleTypes()
    this.getArticles()
    api.getSites({}, response => {
      this.sites = response
    })
  },
  methods: {
    clear() {
      this.searchParams = {
        city_id: null,
        keyword: '',
        page: 1
      }
    },
    handleNodeClick(node) {
      this.curArticleType = node
      this.getArticles()
    },
    editType(id) {
      this.editTypeDialogVisible = true
      return false
    },
    addArticleType() {
      this.curArticleType = {
        id: '',
        display_name: '',
        is_visible: true,
        parent_id: ''
      }
      this.editTypeDialogVisible = true
    },
    saveType() {
      // 保存文章类型
      api.storeArticleType(this.curArticleType, response => {
        this.$message.success('保存文章类型成功')
        this.editTypeDialogVisible = false
        this.getArticleTypes()
      })
    },
    deleteType() {
      this.$confirm('删除文章类型将删除所有子类型并且所有相关文章会变成未分类，确定删除？')
        .then(() => {
          const param = { id: this.curArticleType.id }
          api.deleteArticleType(param, response => {
            this.$message({
              message: '删除文章类型成功',
              type: 'success'
            })
            this.getArticleTypes()
          })
        })
        .catch(() => {

        })
    },
    getArticleTypes() {
      api.getArticleTypes({}, response => {
        this.article_types[0].children = response
      })
    },
    getArticles() {
      this.loadingArticles = true
      const param = {
        city_id: this.searchParams.city_id,
        article_type_id: this.curArticleType.id,
        keyword: this.searchParams.keyword,
        page: this.page
      }
      api.getArticles(param, response => {
        this.data_items = response.data
        this.total = response.total
        this.loadingArticles = false
      }, err => {
        console.log(err)
        this.loadingArticles = false
      })
    },
    add() {
      this.$router.push('/articles/edit')
    },
    previewArticle(id) {
      const url = process.env.PC_URL + '/company/view/' + id
      window.open(url)
    },
    editArticle(id) {
      this.$router.push({ path: '/articles/edit/' + id })
    },
    deleteArticle(id) {
      this.$confirm('确认删除文章？')
        .then(() => {
          console.log(2)
          const params = {
            id: id
          }
          api.deleteArticle(params, response => {
            this.$message.success('删除文章成功')
            this.getArticles()
          })
        })
        .catch(() => {

        })
    },
    renderArticleType(h, { node }) {
      if (node.label !== '全部') {
        return (
          <span>
            {node.label}
            <span style='float:right;margin-right:10px;'>
              <el-button size='mini' type='text' on-click={() => this.editType()}><i class='fa fa-edit'></i></el-button>
              <el-button size='mini' type='text' on-click={() => this.deleteType()}><i class='fa fa-trash'></i></el-button>
            </span>
          </span>
        )
      } else {
        return (
          <span>
            {node.label}
          </span>
        )
      }

    }
  }
}
</script>
