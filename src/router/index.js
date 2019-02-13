import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/* Router Modules */
import tableRouter from './modules/table'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    // hidden: true,
    children: [{
      path: 'dashboard',
      // name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'table' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }

  // 这句话会使不存在的页面重定向到404
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    onlyHideParent: true,
    children: [
      {
        path: '/users',
        component: () => import('@/views/form/index'),
        name: 'Users',
        meta: {
          title: '注册买家',
          icon: 'form'
        }
      }, {
        path: '/users/view/:id',
        component: () => import('@/views/form/index'),
        hidden: true,
        name: 'UserDetail',
        meta: {
          title: 'UserDetail',
          icon: 'form'
        }
      }, {
        path: '/businesses/edit/:id?',
        component: () => import('@/views/form/index'),
        hidden: true,
        name: 'BusinessEditor',
        meta: {
          title: 'BusinessEditor',
          icon: 'form'
        }
      }, {
        path: '/appeal-infos',
        component: () => import('@/views/form/index'),
        name: 'AppealInfos',
        meta: {
          title: 'AppealInfos',
          icon: 'form'
        }
      }, {
        path: '',
        redirect: '/articles',
        component: () => import('@/views/articles/Articles'),
        name: 'Content',
        alwaysShow: true,
        meta: {
          title: '内容管理',
          // icon: 'form'
        },
        children: [
          {
            path: '/articles',
            component: () => import('@/views/articles/Articles'),
            name: 'Articles',
            meta: {
              title: '文章管理',
              // icon: 'form'
            }
          }, {
            path: '/articles/edit',
            component: () => import('@/views/articles/ArticleEditor'),
            name: 'ArticleCreator',
            hidden: true,
            meta: {
              title: '新增文章',
              // icon: 'form'
            }
          }, {
            path: '/articles/edit/:id',
            component: () => import('@/views/articles/ArticleEditor'),
            name: 'ArticleEditor',
            hidden: true,
            meta: {
              title: '编辑文章',
              // icon: 'form'
            }
          }
        ]
      },
    ]
  },
  /* {
    path: '',
    component: Layout,
    meta: { title: 'PDF', icon: 'pdf' },
    children: [
      {
        path: '/appeal-infos2',
        component: () => import('@/views/form/index'),
        name: 'PDF',
        meta: { title: 'PDF' }
      }, {
        path: '/appeal-infos2/edit',
        component: () => import('@/views/form/index'),
        name: 'PDFedit',
        meta: { title: 'PDFedit' }
      }
    ]
  }, */
  tableRouter
]

