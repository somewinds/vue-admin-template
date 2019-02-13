<!-- 自定义筛选条件：资源、订单列表 -->
<template>
  <div id="v-custom-filter-condition">
    <el-popover
      placement="bottom-start"
      popper-class="show-search-params"
      @show="popperShow"
      @hide="popperHide">
      <el-button slot="reference" type="success" size="mini">
        <i class="el-icon-setting" style="margin-right: 5px;"/>自定义筛选条件
      </el-button>

      <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" class="check-all" @change="handleCheckAllChange">
          全选
          <el-tooltip
            placement="top"
            content="选择的筛选条件记录只保存在当前浏览器">
            <i class="el-icon-question linhuiba-font-warning i-tip"/>
          </el-tooltip>
        </el-checkbox>
        <el-checkbox-group v-if="Array.isArray(selection)" v-model="checkedSearchParams" @change="checkSearchParam">
          <el-checkbox v-for="(item, index) in selection" :key="index" :label="item.label">
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-popover>
  </div>
</template>

<style lang="scss">
#v-custom-filter-condition {}

// 自定义显示筛选条件
.show-search-params {
  max-width: 800px;

  .i-tip {
    width: 15px;
    height: 15px;
  }

  .el-checkbox-group .el-checkbox,
  .check-all.el-checkbox {
    margin: 0 15px 10px 0;
  }
}

</style>

<script>
import { arrDifference } from '@/plugins/tools'
import { mapMutations } from 'vuex'

export default {
  name: 'VCustomFilterCondition',
  props: {
    // 父级组件名，只用于获取可选筛选条件
    parentName: {
      type: String,
      default: 'Communities'
    }
  },
  data() {
    return {
    /**
     * [selection （订单列表或其他列表）显示的筛选条件数组]
     * @type {Array}
     * [
            {
                label: 'res_type_id',
                name: '资源类型',
            }, {
                label: 'type_identifier',
                name: '展位类型',
            }, {
                label: 'address_linkage',
                name: '省市区',
            }
        ]
      */
      selection: [],

      checkAll: false, // 是否全选
      isIndeterminate: true, // 是否全选不确定状态

      // 已选中（订单列表或其他列表）的自定义显示的筛选条件字段
      checkedSearchParams: [],
      checkedSearchParamsOri: [],

      is_init: true // 首次加载时不触发emit

    }
  },
  computed: {
    /* ...mapState('X_SEARCH_PARAMS_SELECTION', {
            a: state => state.a,
            b: state => state.b
        }),*/
    X_SEARCH_PARAMS_SELECTION() {
      return this.$store.state.X_SEARCH_PARAMS_SELECTION
    }
  },
  mounted() {

    // 刷新页面时，间隔时间超过10分钟，获取可筛选项 和 已选筛选项，并保存到sessionStorage和store中
    // 勾选项之后，保存已选筛选，成功后，更新sessionStorage和store
    this.init()
  },
  methods: {
    /* ...mapMutations({
            AAA: 'X_SEARCH_PARAMS_SELECTION/AAA' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
        }),*/
    ...mapMutations('X_SEARCH_PARAMS_SELECTION', {
      // AAA: 'AAA', // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      GET_SHOW_SEARCH_PARAMS: 'GET_SHOW_SEARCH_PARAMS',
      SET_SHOW_SEARCH_PARAMS: 'SET_SHOW_SEARCH_PARAMS'
    }),
    init() {
      // 如果是初始化，那么 通过 GET_SHOW_SEARCH_PARAMS 从localStorage中获取已选中的筛选项，然后赋值到store中
      if (this.is_init) {
        this.GET_SHOW_SEARCH_PARAMS(this.parentName)
        this.is_init = false
      }
    },
    // 显示可选筛选项时，获取可选项
    popperShow() {
      this.selection = this.X_SEARCH_PARAMS_SELECTION[this.parentName] || []

      const checkedSearchParams = this.X_SEARCH_PARAMS_SELECTION[this.parentName + 'ShowSearchParams'] || []
      this.checkedSearchParamsOri = this.checkedSearchParams = JSON.parse(JSON.stringify(checkedSearchParams))

      const checkedCount = this.checkedSearchParams.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.selection.length
      this.checkAll = checkedCount >= this.selection.length
    },
    // 关闭可选筛选项时，保存可选项，如果隐藏掉了拥有内容的筛选项，触发父级刷新列表
    popperHide() {
      const ori_selected = JSON.parse(JSON.stringify(this.checkedSearchParamsOri))
      const new_selected = JSON.parse(JSON.stringify(this.checkedSearchParams))
      // console.log(ori_selected, new_selected)

      // diff为 旧选中项不存在与新选中项 的字段，如果有说明进行隐藏了字段，则需要将修改的字段传递给父级进行重置
      const diff_reset = arrDifference(ori_selected, new_selected)
      // 如果新旧长度不一致，或 有旧选中项不存在与新选中项，即有改动，需要保存，
      if (ori_selected.length !== new_selected.length || diff_reset.length > 0) {
        // console.log("有改动需要保存：", new_selected);
        // 保存已选筛选，成功后，更新sessionStorage和store
        this.SET_SHOW_SEARCH_PARAMS([this.parentName, new_selected])
      }
      if (diff_reset.length > 0) {
        // console.log("需要重置的参数：", diff_reset);
        this.$emit('reset', diff_reset)
      }
    },
    // 选择需要显示的筛选条件
    checkSearchParam(value) {
      const checkedCount = this.checkedSearchParams.length
      this.isIndeterminate = value.length > 0 && value.length < this.selection.length
      this.checkAll = checkedCount >= this.selection.length
    },
    handleCheckAllChange(val) {
      this.checkedSearchParams = val ? this.selection.map(item => item.label) : []
      this.isIndeterminate = false
    }

  }
}
</script>
