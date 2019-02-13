<!-- 自定义筛选条件：资源、订单列表 -->
<template>
  <div id="custom-filter-condition">
    <el-popover placement="bottom-start" popper-class="show-search-params">
      <el-button slot="reference" type="success" size="mini">
        <i class="el-icon-setting" style="margin-right: 5px;"/>自定义筛选条件
      </el-button>

      <div>

        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" class="check-all" @change="handleCheckAllChange">
          全选
          <el-tooltip
            placement="top"
            content="选择的筛选条件记录只保存在本地；登入后默认选中全部；登出后清空选择条件">
            <i class="el-icon-question linhuiba-font-warning i-tip"/>
          </el-tooltip>
        </el-checkbox>
        <el-checkbox-group v-if="searchParamsSelection" v-model="showSearchParams" @change="handlerShowSearchParamsChange">
          <el-checkbox v-for="(item, index) in searchParamsSelection" :key="index" :label="item.label">
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-popover>
  </div>
</template>

<style lang="scss">

	#custom-filter-condition{

	}

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
import * as tools from '@/plugins/tools'

export default {
  name: 'CustomFilterCondition',
  props: {
    /**
     * [searchParamsSelection （订单列表或其他列表）显示的筛选条件数组]
     * @type {Object}
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
    searchParamsSelection: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * [showSearchParamsName （订单列表或其他列表）自定义显示的筛选条件数组名]
     * @type {Object} orderShowSearchParams 订单列表
     */
    showSearchParamsName: {
      type: String,
      default: ''
    },
    /**
     * [searchParams 当前父级的筛选条件]
     * @type {Object}
     */
    searchParams: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * [searchParamsOri 当前父级的筛选条件初始数据，用户切换筛选条件后重置]
     * @type {Object}
     */
    searchParamsOri: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      checkAll: false, // 是否全选
      isIndeterminate: true, // 是否全选不确定状态

      // 选择（订单列表或其他列表）自定义显示的筛选条件字段
      showSearchParams: [],

      is_init: false, // 首次加载时不触发emit

      search_params: []
    }
  },
  watch: {
    searchParams: {
      deep: true,
      handler(val, oldVal) {
        tools.dataBrief(() => {
          this.search_params = JSON.parse(JSON.stringify(val))
        }, 300)
      }
    },
    showSearchParams: {
      deep: true,
      handler(val, oldVal) {
        this.changeShowSearchParams(val, oldVal)
      }
    }
  },
  mounted() {
    this.initOrderShowSearchParams()

  },
  methods: {
    initOrderShowSearchParams() {
      this.is_init = true
      this.showSearchParams = this.$store.state[this.showSearchParamsName] || []
      const checkedCount = this.showSearchParams.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.searchParamsSelection.length
      this.checkAll = checkedCount >= this.searchParamsSelection.length
    },
    // 自定义需要显示的筛选条件
    handlerShowSearchParamsChange(value) {
      const checkedCount = this.showSearchParams.length
      this.isIndeterminate = value.length > 0 && value.length < this.searchParamsSelection.length
      this.checkAll = checkedCount >= this.searchParamsSelection.length
    },
    handleCheckAllChange(val) {
      this.showSearchParams = val ? this.searchParamsSelection.map(item => item.label) : []
      this.isIndeterminate = false
    },

    // 改变了选择（订单列表或其他列表）自定义显示的筛选条件字段
    changeShowSearchParams(val, oldVal) {
      this.$store.commit('SAVE_SHOW_SEARCH_PARAMS', [this.showSearchParamsName, this.showSearchParams])

      // 获取旧显示字段数组不存在于 新显示字段数组 中的参数，即 这些参数不再显示
      // 将返回这些数组到父组件，父组件遍历重置对应的字段数据
      const resetShowSearchParams = tools.arrDifference(oldVal, val)
      // 如果是初始化，那么不触发父级事件
      if (this.is_init) {
        this.is_init = false
      } else {
        new Promise((resolve, reject) => {
          // 改变了选择（订单列表或其他列表）自定义显示的筛选条件字段
          // 重置取消显示的字段的值，并将重置完的结果返给父级
          resetShowSearchParams.map(key => {
            if (this.search_params[key] !== undefined && this.searchParamsOri[key] !== undefined) {
              this.search_params[key] = this.searchParamsOri[key]
            }
          })

          resolve()
        }).then((successMessage) => {
          tools.dataBrief(() => {
            this.$emit('changeShowSearchParams', this.search_params)
          })
        })
      }
    }

  }
}
</script>
