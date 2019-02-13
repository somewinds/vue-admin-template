<!-- 自定义table列：资源、订单列表 -->
<template>
  <div id="v-custom-table-column">
    <el-popover
      v-model="popoverVisible"
      placement="bottom-start"
      popper-class="v-custom-table-column__popover"
      @show="popperShow">
      <el-button slot="reference" type="success" size="mini">
        <i class="el-icon-setting" style="margin-right: 5px;"/>自定义table列
      </el-button>

      <div style="padding: 5px 10px;">
        <el-form>
          <div class="linhuiba-font-help linhuiba-margin-bottom-10">
            移动<i class="fa fa-exchange i-move"/>以改变字段顺序
          </div>
          <el-form-item>
            <div
              v-dragging="{ item: item, list: savedTableColumns, group: 'savedTableColumns' }"
              v-for="(item, index) in savedTableColumns"
              :key="index"
              class="drag-group-draggable linhuiba-margin-bottom-10">
              <div :draggable="true" class="drag-node">
                <i
                  :style="`${(item.value == '其他' && item.is_other) || item.value == '' ? 'visibility: hidden;' : ''}`"
                  class="fa fa-exchange i-move"/>
              </div>
              <span :class="`title ${!item.is_visible && 'linhuiba-font-help'}`">{{ item.name }}</span>
              <el-switch v-model="item.is_visible" :key="`switch_${index}`" active-text="显示" inactive-text="隐藏" class="op-visible"/>
            </div>
            <div>
              <el-button type="primary" size="small" @click="store()">确认</el-button>
              <el-button size="small" @click="store(true)">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-popover>
  </div>
</template>

<style lang="scss">
	#v-custom-table-column{

    }

    .v-custom-table-column__popover{

        .drag-group-draggable{
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            padding-left: 30px;

            & > *{
                position: relative;
                z-index: 10;
                vertical-align: initial;
            }

            .drag-node{
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 5;
                top: 0;
                left: 0;
                text-align: left;
            }

            &.dragging .drag-node{
            }

            .i-move{
                font-size: 20px;
                text-align: center;
                cursor: move;
            }

            .title{
                min-width: 100px;
                display: inline-block;
            }

            .op-visible{
                margin-left: 5px;
            }

        }

    }

</style>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'VCustomTableColumn',
  props: {
    // 父级组件名，只用于获取可选筛选indexindex条件
    parentName: {
      type: String,
      default: 'Communities'
    }
  },
  data() {
    return {
    /**
     * [table_columns 可调整项]
     * @type {Object}
     *[
        {
          label: 'name',
          name: '场地名称',
          is_visible: true,
          seq: 1,
        }, {
          label: 'address',
          name: '场地地址',
          is_visible: true,
          seq: 1,
        }, {
          label: 'category',
          name: '场地类目',
          is_visible: true,
          seq: 1,
        }, {
          label: 'building_area',
          name: '占地面积',
          is_visible: true,
          seq: 1,
        }
      ]
      */
      table_columns: [],
      popoverVisible: false,

      btnSureDisabled: false,
      is_init: true, // 首次加载时不触发emit

      // 已选中（订单列表或其他列表）的自定义显示的筛选条件字段
      savedTableColumns: []
    }
  },
  computed: {
    /* ...mapState('X_TABLE_COLUMN', {
            a: state => state.a,
            b: state => state.b
        }),*/
    X_TABLE_COLUMN() {
      return this.$store.state.X_TABLE_COLUMN
    }
  },
  watch: {
    '$dragging': {
      immediate: true,
      handler: function(val, oldVal) {
        this.setUnDraggable()
      }
    },
    'savedTableColumns': {
      immediate: true,
      handler: function(val, oldVal) {
        this.setUnDraggable()
      }
    }
  },
  mounted() {
    this.init()
    this.bindDragging()
  },
  methods: {
    /* ...mapMutations({
            AAA: 'X_TABLE_COLUMN/AAA' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
        }),*/
    ...mapMutations('X_TABLE_COLUMN', {
      // AAA: 'AAA', // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      GET_SHOW_TABLE_COLUMNS: 'GET_SHOW_TABLE_COLUMNS',
      SET_SHOW_TABLE_COLUMNS: 'SET_SHOW_TABLE_COLUMNS'
    }),
    init() {
      // 如果是初始化，那么 通过 GET_SHOW_TABLE_COLUMNS 从localStorage中获取已选中的筛选项，然后赋值到store中
      if (this.is_init) {
        // this.GET_SHOW_TABLE_COLUMNS(this.parentName);
        this.GET_SHOW_TABLE_COLUMNS(this.parentName)
        this.is_init = false
      }
    },
    // 显示可调整列时，获取调整列
    popperShow() {
      this.table_columns = this.X_TABLE_COLUMN[this.parentName] || []

      const saved_columns = JSON.parse(JSON.stringify(this.X_TABLE_COLUMN[this.parentName] || []))
      saved_columns.forEach((item, index) => {
        if (item.is_visible === undefined) {
          item.is_visible = true
        }
        if (item.seq === undefined) {
          item.seq = index
        }
      })

      saved_columns.sort(function(a, b) {
        return a.seq - b.seq
      })
      this.savedTableColumns = saved_columns
    },
    // 关闭可调整列时，保存调整列
    store(is_reset = false) {
      if (is_reset) {
        this.savedTableColumns = JSON.parse(JSON.stringify(this.table_columns))
      }
      this.savedTableColumns.forEach((item, index) => {
        item.is_visible = is_reset ? true : item.is_visible
        item.seq = index
      })
      const data = JSON.parse(JSON.stringify(this.savedTableColumns))
      this.SET_SHOW_TABLE_COLUMNS([this.parentName, data])
      this.popoverVisible = false
      // console.log(data)
      this.$emit('reset', data)
    },
    // 设置选项内容非拖动按钮不可拖拽
    setUnDraggable() {
      this.$nextTick(function() {
        const node_list = document.querySelectorAll('.drag-group-draggable')
        if (node_list && node_list.length > 0) {
          [...node_list].map(item => item.setAttribute('draggable', 'false'))
        }
      })
    },
    // 绑定拖拽排序
    bindDragging() {
      if (this.$dragging) {
        // 顺序拖动（只要发生图片顺序切换就触发，即切换了顺序）
        this.$dragging.$on('dragged', ({ value }) => {
        })
        // 顺序拖动结束(驱动到外部区域松开，即取消拖动)
        this.$dragging.$on('dragend', () => {

        })
      }
    }

  }
}
</script>
