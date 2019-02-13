<!-- 多选级联 -->
<template>
  <div id="v-tree-selected">
    <div v-clickoutside="handleClose" :class="{ 'tree-box': true, 'is-focus': tree_visible }">
      <div class="tree-content" @click="handleFocus">
        <div class="tree-content__tags">
          <el-tag
            v-for="(item, index) in checked_nodes"
            :key="index"
            closable
            disable-transitions
            @close="closeDeputyIndustry(item, index)">
            {{ item[treeProps.label] }}
          </el-tag>
        </div>
        <div style="display: flex">
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable class="tree-content__filter"/>
          <el-tooltip placement="top" content="清空所有">
            <el-button type="text" @click="clear">
              <i class="el-icon-delete"/>
            </el-button>
          </el-tooltip>
        </div>
      </div>

      <transition name="el-zoom-in-top">
        <div v-show="tree_visible" class="tree-select">
          <el-tree
            ref="tree"
            :data="treeData"
            :props="treeProps"
            :filter-node-method="filterNode"
            node-key="id"
            show-checkbox
            highlight-current
            class="linhuiba-margin-top-15 tree-departments"
            @check="checkTreeNode"/>
        </div>
      </transition>
    </div>
  </div>

</template>

<style lang="scss">
#v-tree-selected {

  .tree-box {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 5px;

    &.is-focus {
      border-color: #409EFF;
    }

    .tree-content {
      width: 100%;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      line-height: 40px;
      outline: 0;

      .tree-content__tags {

        .el-tag {
          margin-right: 5px;
        }
      }

      .tree-content__filter {
        width: 100%;

        .el-input__inner {
          border: 0;
          padding-right: 27px;
        }

      }

    }

    .tree-select {
      min-width: 220px;
      position: absolute;
      left: 0;
      transform-origin: center top 0px;
      z-index: 2030;
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      background-color: #fff;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 5px 0;

      .el-tree {
        min-height: 150px;
        max-height: 300px;
        height: auto;

        .el-checkbox {
          margin: 0 8px 0 0;
        }
      }

    }

  }
}
</style>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside' // 点击所处节点外部任意节点将触发绑定事件

export default {
  name: 'VTreeSelected',
  // 包含 Vue 实例可用指令的哈希表。
  // 参考：自定义指令
  directives: { Clickoutside },
  props: {
    // 树形控件可选项
    treeData: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 配置选项
    treeProps: {
      type: Object,
      default: function() {
        return {
          children: 'children',
          label: 'display_name'
        }
      }
    },
    /* // 父级传入的已选中项
		checkedNodes: {
			type: Array,
            default: function(){
				return []
			}
		},*/
    // v-model双向绑定参数
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      // 选择子行业
      filterText: '',

      checked_nodes: [], // 已选中的树形节点

      tree_visible: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.resetChecked()
      this.checked_nodes = this.value
      this.$refs.tree.setCheckedKeys(this.value.map(item => item.id))
    },
    // 重置选项
    resetChecked() {
      this.checked_nodes = []
      this.$refs.tree.setCheckedKeys([])
    },
    // 清空
    clear() {
      this.resetChecked()
      // 清空后，隐藏属性控件
      this.$nextTick(() => {
        this.tree_visible = false
      })
      // this.$emit('selectedComplate', this.checked_nodes);
      this.$emit('input', this.checked_nodes)
    },
    // 过滤
    filterNode(value, data) {
      if (!value) return true
      return data.display_name.indexOf(value) !== -1
    },
    // 选择树形节点后事件
    checkTreeNode() {
      const checkedNodes = this.$refs.tree ? this.$refs.tree.getCheckedNodes() : []
      // 过滤掉父级
      this.checked_nodes = checkedNodes.filter(item => (!item.children || item.children.length <= 0))

      // this.$emit('selectedComplate', this.checked_nodes);
      this.$emit('input', this.checked_nodes)
    },

    // 关闭树形控件
    handleClose() {
      this.tree_visible = false
    },
    handleFocus() {
      this.tree_visible = true
    },
    // 关闭单个选中的树形节点
    closeDeputyIndustry(item, index) {
      Array.isArray(this.checked_nodes) && this.checked_nodes.splice(index, 1)
      this.$refs.tree.setChecked(item.id, false)
      // this.$refs.tree.setCheckedKeys(this.checked_nodes.map(item => item.id));
      // this.$emit('selectedComplate', this.checked_nodes);
      this.$emit('input', this.checked_nodes)
    }
  }
}

</script>
