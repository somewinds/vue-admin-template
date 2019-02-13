<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <!-- 如果是该路由只有一个子路由，且alwaysShow为false，那么以子路由为根路由 -->
    <!-- <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template> -->
    <!-- 如果（该路由只有一个子路由，且alwaysShow为false）或（onlyHideParent为true），不显示父路由，以各子路由为根路由，展开显示 -->
    <template v-if="item.onlyHideParent || (hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow)">
      <template v-for="child in item.children">
        <template v-if="!child.hidden">
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :is-nest="true"
            :item="child"
            :key="child.path"
            :base-path="resolvePath(child.path)" />
          <app-link v-else :to="resolvePath(child.path)" :key="child.name">
            <el-menu-item :index="resolvePath(child.path)">
              <item v-if="child.meta" :path="child.path" :icon="child.meta.icon" :title="child.meta.title" />
            </el-menu-item>
          </app-link>
        </template>
      </template>
    </template>
    <!-- 否则，正常创建路由 -->
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :path="item.path" :icon="item.meta.icon" :title="item.meta.title" />
      </template>

      <template v-for="child in item.children">
        <template v-if="!child.hidden">
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :is-nest="true"
            :item="child"
            :key="child.path"
            :base-path="resolvePath(child.path)"
            class="nest-menu" />
          <app-link v-else :to="resolvePath(child.path)" :key="child.name">
            <el-menu-item :index="resolvePath(child.path)">
              <item v-if="child.meta" :path="child.path" :icon="child.meta.icon" :title="child.meta.title" />
            </el-menu-item>
          </app-link>
        </template>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    }
  }
}
</script>
