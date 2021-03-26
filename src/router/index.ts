import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'
import Demo from '../views/demo.vue'
const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'Home',
    meta: {
      showTab: true,
      name: "首页",
      isLogin: false,
    },
    component: () => import("../views/Home/index.vue")
  },
  {
    path: '/Home',
    meta: {
      showTab: true,
      name: "首页",
      isLogin: false,
    },
    redirect: { name: "Home" }
  },

  {
    path: '/cart',
    name: 'cart',
    meta: {
      showTab: true,
      name: "购物车",
      isLogin: true,
    },
    component: () => import('../views/cart/cart.vue')
  },

  {
    path: '/appsPage',
    name: 'appsPage',
    meta: {
      showTab: true,
      isLogin: false,
      name: "分类"
    },
    component: () => import('../views/appsPage/appsPage.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {
      showTab: false,
      isLogin: false,
      name: "登录"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/index.vue')
  },
  {
    path: '/seachPage',
    name: 'seachPage',
    meta: {
      showTab: true,
      isLogin: false,
    },
    component: () => import('../views/seachPage/seachPage.vue')
  },
  {
    path: '/me',
    name: 'me',
    meta: {
      showTab: true,
      isLogin: true,
    },
    component: () => import('../views/me/index.vue')
  },
  {
    path: '/set',
    name: 'set',
    meta: {
      showTab: true,
      isLogin: true,
    },
    component: () => import('../views/set/set.vue')
  },



  {
    path: '/Demo',
    name: 'Demo',
    component: Demo
  },

]

const router = createRouter({
  history: createWebHashHistory(),//hash路由
  // history: createWebHistory(),//H5路由 注意采用H5路由在上生产时不能直接访问项目，需要nginx转发
  routes
})

export default router
