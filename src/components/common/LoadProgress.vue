<!-- 进度条加载 -->
<!-- 可传参数：
    type // 进度条类型
    totalTime // 预计导出所需总时间
    status // 进度条状态
    visible // 进度条是否可见
 -->
<!-- 可调用方法：this.$refs.ref_child.start() -->
<template lang="html">
  <div class="load-progress">
    <el-progress
      v-if="visible"
      :percentage="percentage"
      :type="type"
      :stroke-width="strokeWidth"
      :text-inside="textInside"
      :width="width"
      :status="status"/>
    <slot name="tip"/>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'LoadProgress',
  props: {
    // 进度条类型
    type: {
      type: String,
      default: 'line'
    },
    // 进度条的宽度，单位 px
    strokeWidth: {
      type: Number,
      default: 14
    },
    // 进度条显示文字内置在进度条内（只在 type=line 时可用）
    textInside: {
      type: Boolean,
      default: true
    },
    // 环形进度条画布宽度（只在 type=circle 时可用）
    width: {
      type: Number,
      default: 150
    },
    // 是否显示进度条文字内容
    showText: {
      type: Boolean,
      default: true
    },
    // 预计导出所需总时间
    totalTime: {
      type: Number,
      default: 3
    },
    // 进度条状态
    status: {
      type: String,
      default: null
    },
    // 进度条是否可见
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 进度百分比（0-100）
      percentage: 0,
      // 导出时的计时器（用于计算进度条）
      tProgress: null
    }
  },
  watch: {
    status(newVal, oldVal) {
      if (newVal === 'success') {
        this.percentage = 100
      } else if (newVal === 'exception') {
        clearInterval(this.tProgress)
      }
    }
  },
  mounted() {

  },
  methods: {
    resetProgress() {
      clearInterval(this.tProgress)
      this.percentage = 0
      this.tProgress = null
    },
    // 开始加载进度条
    start() {
      this.resetProgress()
      this.tProgress = setInterval(() => {
        this.percentage += 1
        if (this.percentage >= 100) {
          this.percentage = 100
          clearInterval(this.tProgress)
        }
        if (this.percentage >= 98) {
          clearInterval(this.tProgress)
        }
      }, (this.totalTime / 100) * 1000)
    },
    stop() {
      clearInterval(this.tProgress)
    }
  }
}
</script>
