<!-- 延迟加载及渲染 -->
<!-- 可传参数：
    // 是否加载组件
    isLoader: Boolean,
    // 是否延迟n秒渲染
    isLazy: Boolean,
    // 遮罩层样式
    maskClass: String,
    // 延迟渲染时显示的html
    tip: {
        type: String,
        default() {
            return '正在加载，请稍候...'
        }
    },
    // 延迟渲染的时间
    time: {
        type: Number,
        default() {
            return 10
        }
    },
 -->
<!-- 可调用方法： -->
<!-- 父级方法（可选）：loaded() -->
<template>
  <div class="lazy-load">
    <slot v-if="show"/>
    <div v-if="isLoader && !show" :class="[maskClass ? maskClass : 'lazy-load-mask']" v-html="tip"/>
  </div>
</template>

<style scoped>
    .lazy-load {
        position: relative;
        width: 100%;
    }
    .lazy-load-mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        color: #48576a;
        font-size: 14px;
        line-height: 24px;
    }
</style>

<script type="text/babel">
export default {
  name: 'LazyRender',
  props: {
    // 是否加载组件
    isLoader: {
      type: Boolean,
      default: false
    },
    // 是否延迟n秒渲染
    isLazy: {
      type: Boolean,
      default: false
    },
    // 遮罩层样式
    maskClass: {
      type: String,
      default: ''
    },
    // 延迟渲染时显示的html
    tip: {
      type: String,
      default() {
        return '正在加载，请稍候...'
      }
    },
    // 延迟渲染的时间
    time: {
      type: Number,
      default() {
        return 10
      }
    }
  },
  data() {
    return {
      // 是否渲染组件
      show: false
    }
  },
  watch: {
    // 路由变化,重新渲染
    $route() {
      this.lazyLoader()
    },
    // 重新延迟加载
    isLoader() {
      this.lazyLoader()
    }
  },
  created() {
    this.lazyLoader()
  },
  methods: {
    /**
             * 延迟渲染
             */
    lazyLoader() {
      if (this.isLoader) {
        if (this.isLazy) {
          this.show = false
          setTimeout(() => {
            this.show = true
            this.$emit('loaded')
          }, this.time)
        } else {
          this.show = true
          this.$emit('loaded')
        }
      } else {
        this.show = false
        this.$emit('loaded')
      }
    }
  }
}

</script>
