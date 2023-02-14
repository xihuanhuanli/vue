import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

  {
    path: '/film',
    component: Layout,
    redirect: '/film/filmInfo',
    children: [{
      path: 'filmInfo',
      name: '电影列表',
      component: () => import('@/views/film/film'),
      meta: { title: '电影列表', icon: 'film' }
    }]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/orderInfo',
    children: [{
      path: 'orderInfo',
      name: '历史订单',
      component: () => import('@/views/order/order'),
      meta: { title: '历史订单', icon: 'order' }
    }]
  },
  {
    path: '/administrator',
    component: Layout,
    redirect: '/administrator/administrator',
    hidden: true,
    name: '后台管理',
    meta: { title: '后台管理', icon: 'administrator' },
    children: [
    {
      path: 'filmManagement',
      name: '电影管理',
      component: () => import('@/views/administrator/filmManagement'),
      meta: { title: '电影管理', icon: 'filmManagement' }
    },
     {
      path: 'userinfo',
      name: '用户管理',
      component: () => import('@/views/administrator/UserAdministrator'),
      meta: { title: '用户管理', icon: 'userinfo' }
    }
  ]
  }
  
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
