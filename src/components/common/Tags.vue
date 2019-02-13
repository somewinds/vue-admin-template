<template>
  <div v-if="showTags" id="tags">
    <div class="tags-box">
      <el-tag
        v-for="(item, index) in tagsList"
        :class="{'active': isActive(item.path)}"
        :key="index"
        :disable-transitions="true"
        size="medium"
        closable
        @close="closeTags(index)">
        <router-link :to="item.path" class="tags-li-title">
          {{ item.title }}
        </router-link>
      </el-tag>
    </div>
    <!-- <ul>
			<li class="tag-li">
				<router-link :to="item.path" class="tags-li-title">
					{{ item.title }}
				</router-link>
			</li>
		</ul> -->
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" size="small">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>

</template>

<style lang="scss">#tags {
  position: absolute;
  left: 170px;
  right: 0;
  top: 65px;
  bottom: 0;
  margin: 15px;
  height: 30px;
  z-index: 100;

  overflow: hidden;
  background: #fff;
  padding: 5px 120px 5px 5px;
  border-bottom: 1px solid #ccc;

  .tags-box {
    white-space: nowrap;
    overflow-x: auto;
    padding-bottom: 5px;

    &::-webkit-scrollbar {
      width: 100%;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      height: 8px;
      background: #c1c1c1;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: #f1f1f1;
    }

    .el-tag {
      margin-right: 10px;
      font-size: 12px;
      border: 1px solid #e9eaec;
      background: #fff;
      color: #666;

      &.active {
        border: 1px solid #409EFF;
        background-color: #409EFF;
        color: #fff;

        .el-tag__close {
          color: #fff;
        }
      }

      &:not(.active):hover {
        background: #f8f8f8;

        .el-tag__close {
          color: #409EFF;
        }
      }

      a {
        color: inherit;
      }

      .el-tag__close {
        background: none;
        color: #666;
      }

    }
  }

  .tags-close-box {
    position: absolute;
    right: 0;
    top: 5px;
    box-sizing: border-box;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    z-index: 10;
  }
}
</style>

<script>
import bus from './Bus'
export default {
  data() {
    return {
      tagsList: [],
      maxCount: 8 // 保存的tag最大个数
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue)
    }
  },
  created() {
    this.setTags(this.$route)
  },
  methods: {
    // 当前路由是否为标签路由
    isActive(path) {
      return path === this.$route.path
    },
    // 路由切换后，设置标签（添加新的路由到标签列表中）
    setTags(route) {
      // 新路由且路由的 meta.comKeepAlive 为true，进行缓存
      const isExist = this.tagsList.some(item => item.path === route.path)
      !isExist && route.meta.comKeepAlive === true && this.tagsList.push({
        title: route.meta.title || route.name,
        path: route.path,
        name: route.matched[1].components.default.name // 获得页面组件的name
      })
      // 超过最大个数，将前n条删除
      this.tagsList.splice(0, (this.tagsList.length > this.maxCount ? this.tagsList.length - this.maxCount : 0))
      bus.$emit('setTags', this.tagsList)
    },
    handleTags(command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0]
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
      if (item) {
        // 如果关闭的标签为当前页，跳转至上一个标签
        delItem.path === this.$route.path && this.$router.push(item.path)
      }
      // else{
      // 	this.$router.push('/');
      // }
      bus.$emit('setTags', this.tagsList)
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = []
      // this.$router.push('/');
      bus.$emit('setTags', this.tagsList)
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => item.path === this.$route.path)
      this.tagsList = curItem
      bus.$emit('setTags', this.tagsList);
    }
  }
}

</script>
