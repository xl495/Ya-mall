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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/swiper',
    component: Layout,
    meta: { title: '轮播管理', icon: 'form' },
    children: [
      {
        path: 'all',
        name: 'swiperAll',
        component: () => import('@/views/swiper/all'),
        meta: { title: '轮播管理', icon: 'form' }
      },
      {
        path: 'add',
        name: 'swiperAdd',
        component: () => import('@/views/swiper/add'),
        meta: { title: '添加轮播', icon: 'form' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/all',
    name: 'Category',
    meta: { title: '分类', icon: 'example' },
    children: [
      {
        path: 'add',
        name: 'categoryAdd',
        component: () => import('@/views/category/category'),
        meta: { title: '添加分类', icon: 'table' }
      },
      {
        path: 'edit/:id',
        name: 'categoryEdit',
        props: true,
        hidden: true,
        component: () => import('@/views/category/category'),
        meta: { title: '编辑分类', icon: 'table' }
      },
      {
        path: 'all',
        name: 'categoryAll',
        component: () => import('@/views/category/all'),
        meta: { title: '全部分类', icon: 'table' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/all',
    name: 'Article',
    meta: { title: '文章管理', icon: 'example' },
    children: [
      {
        path: 'add',
        name: 'ArticleAdd',
        component: () => import('@/views/article/add'),
        meta: { title: '添加文章', icon: 'table' }
      },
      {
        path: 'all',
        name: 'AtricleAll',
        component: () => import('@/views/article/all'),
        meta: { title: '全部文章', icon: 'table' }
      }
    ]
  },
  {
    path: '/good',
    component: Layout,
    redirect: '/good/all',
    name: 'Good',
    meta: { title: '商品管理', icon: 'table' },
    children: [
      {
        path: 'add',
        name: 'GoodAdd',
        component: () => import('@/views/good/add'),
        meta: { title: '添加商品', icon: 'table' }
      },
      {
        path: 'edit/:id',
        name: 'GoodEdit',
        props: true,
        hidden: true,
        component: () => import('@/views/good/add'),
        meta: { title: '编辑商品', icon: 'table' }
      },
      {
        path: 'all',
        name: 'GoodAll',
        component: () => import('@/views/good/all'),
        meta: { title: '全部商品', icon: 'table' }
      }
    ]
  },
  {
    path: '/sku',
    component: Layout,
    redirect: '/sku/all',
    name: 'Sku',
    meta: { title: '规格管理', icon: 'table' },
    children: [
      {
        path: 'add',
        name: 'SkuAdd',
        component: () => import('@/views/sku/add'),
        meta: { title: '添加规格', icon: 'table' }
      },
      {
        path: 'all',
        name: 'SkuAll',
        component: () => import('@/views/sku/all'),
        meta: { title: '全部规格', icon: 'table' }
      }
    ]
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
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
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
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
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
