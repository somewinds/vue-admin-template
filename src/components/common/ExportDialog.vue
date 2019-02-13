<!-- 导出Excel弹框 -->
<!-- 可传参数：
    // 表单验证规则
    exportRules: {
        default: () => {
            return rules.export_default_rules
        }
    },
    // 导出接口所需参数（如需额外参数，可以通过slot="form_item"插入，并将参数验证写入exportRules中）
    exportParams: {
        default: () => {
            return {
                // 导出条数
                page_size: 10,
            }
        }
    },
    // 可导出的数据条数
    dataCount: {
        default: 0
    },
    // 进度条参数
    progressParams: {
        default: () => {
             return {
                // 进度条类型
                type: 'line',
                // 进度条的宽度，单位 px
                strokeWidth: 14,
                // 进度条显示文字内置在进度条内（只在 type=line 时可用）
                textInside: true,
                // 环形进度条画布宽度（只在 type=circle 时可用）
                width: 150,
                // 是否显示进度条文字内容
                showText: true,
                // 预计导出所需总时间
                totalTime: 6,
                // 进度条状态
                status: null,
                // 进度条是否可见
                visible: true,
             }
        }
    },
 -->
<!-- 可调用方法：
    this.$refs.ref_child.start()
    this.$refs.ref_child.fail()
 -->
<!-- 将调用父级方法：
    this.$emit('exportData', this.exportParams)
 -->
<template lang="html">
  <div class="">
    <el-dialog
      :modal-append-to-body="false"
      :visible.sync="exportVisible"
      :before-close="hideExport"
      :close-on-click-modal="false"
      title="导出"
      size="small"
      custom-class="export_dialog">
      <el-form ref="exportParams" :model="exportParams" :rules="exportRules" label-width="120px" >
        <el-row>
          <slot name="tip"/>
        </el-row>
        <slot name="form_items"/>
        <el-row>
          <el-form-item label="导出条数" prop="page_size">
            <el-input v-model="exportParams.page_size"/>
          </el-form-item>
          <el-form-item label=" ">
            <span>当前可导出条数：<font class="linhuiba-font-bold">{{ dataCount }}</font> 条</span>
            <span>预计导出时间：{{ progressParams.totalTime }} 秒</span>
          </el-form-item>
          <el-form-item>
            <load-progress
              ref="child_progress"
              :status="progressParams.status"
              :visible="progressParams.visible"
              :total-time="progressParams.totalTime"/>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="hideExport">取消</el-button>
        <el-button :disabled="sure_disabled" type="primary" @click="exportData('exportParams')">确定</el-button>
      </div>
    </el-dialog>

    <slot name="tip"/>
  </div>
</template>

<style scoped>

.export_dialog {
    width: 600px;
}

.export_dialog .el-input {
    width: 100%;
}

</style>

<script>
import * as rules from '@/plugins/rules'
import LoadProgress from '../common/LoadProgress'

export default {
  name: 'ExportDialog',
  components: {
    LoadProgress
  },
  props: {
    // 表单验证规则
    exportRules: {
      type: Object,
      default: () => {
        return rules.export_default_rules
      }
    },
    // 导出接口所需参数（如需额外参数，可以通过slot="form_items"插入，并将参数验证写入exportRules中）
    exportParams: {
      type: Object,
      default: () => {
        return {
          // 导出条数
          page_size: 10
        }
      }
    },
    // 可导出的数据条数
    dataCount: {
      type: Number,
      default: 0
    },
    // 进度条参数
    progressParams: {
      type: Object,
      default: () => {
        return {
          // 进度条类型
          type: 'line',
          // 进度条的宽度，单位 px
          strokeWidth: 14,
          // 进度条显示文字内置在进度条内（只在 type=line 时可用）
          textInside: true,
          // 环形进度条画布宽度（只在 type=circle 时可用）
          width: 150,
          // 是否显示进度条文字内容
          showText: true,
          // 预计导出所需总时间
          totalTime: 0,
          // 进度条状态
          status: null,
          // 进度条是否可见
          visible: false
        }
      }
    }
  },
  data() {
    return {
      // 进度百分比（0-100）
      percentage: 0,
      // 导出时的计时器（用于计算进度条）
      tProgress: null,
      // 导出按钮是否禁用
      sure_disabled: false,
      // 是否显示弹框
      exportVisible: false
    }
  },
  watch: {
    'dataCount': function(value, oldValue) {
      const total_time = parseFloat(value / 60).toFixed(2)
      // 导出消耗时间，多少条每秒钟
      this.progressParams.totalTime = total_time <= 3 ? 3 : total_time
    }
  },
  mounted() {

  },
  methods: {
    // 重置导出参数
    resetExport() {
      this.progressParams.visible = false
      this.sure_disabled = false // 导出按钮是否禁用
    },
    // 隐藏导出框
    hideExport() {
      this.resetExport()
      this.exportVisible = false
      this.progressParams.visible = false
    },
    // 显示导出框
    showExport() {
      this.exportVisible = true
    },
    // 确认导出数据
    exportData(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.warning('信息未填写完整')
          return false
        } else {
          this.resetExport()
          this.sure_disabled = true

          // 加载进度条并执行导出接口
          this.progressParams.visible = true // 显示进度条
          this.progressParams.status = null // 重置进度条状态为“正常”
          this.$refs.child_progress.start() // 加载进度条

          this.$emit('exportData', this.exportParams)
        }
      })
    },
    success() {
      this.progressParams.status = 'success'
      this.sure_disabled = false
      this.exportVisible = false
      this.progressParams.visible = false
    },
    fail() {
      this.progressParams.status = 'exception'
      this.sure_disabled = false
      this.progressParams.visible = false
    }
  }
}
</script>
