import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
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
      showTab: false,
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
      showTab: true,
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
    path: '/Demo',
    name: 'Demo',
    component: Demo
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
