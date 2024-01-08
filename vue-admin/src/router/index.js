import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login")
  },

  {
      path: '/',
      component: Layout,
      children: [
        {
          path: "",
          redirect: "/home"
        },
        {
          path: "/home",
          component: () => import("../views/Home"),
          meta: { title: 'Home' ,showInbreadcrumb:true}

        },
        {
          path: "/film/list",
          component: () => import("@/views/film/List"),
          meta: { title: 'Film > Film List',showInbreadcrumb:true },

        },
        {
          path: '/film/arrange',
          component: () => import("@/views/film/Arrange"),
          meta: { title: 'Film > Cinema layout',showInbreadcrumb:true },

        },
        {
          path: '/film/add',
          component: () => import("@/views/film/Add"),
          meta: { title: 'Film > Save Film',showInbreadcrumb:true },

        },
        {
          path: '/film/poster',
          component: () => import("@/views/film/Poster"),
          meta: { title: 'Film > Poster',showInbreadcrumb:true },

        },
        {
          path: '/user/list',
          component: () => import("@/views/user/List"),
          meta: { title: 'User > User List',showInbreadcrumb:true },

        },
        {
          path: '/order/list',
          component: () => import("@/views/order/List"),
          meta: { title: 'Order > Order List',showInbreadcrumb:true },

        },
        {
          path: '/order/exception',
          component: () => import("@/views/order/Exception"),
          meta: { title: 'Order > Order Exceptions',showInbreadcrumb:true },

        },
        {
          path: '/worker/list',
          component: () => import("@/views/worker/List"),
          meta: { title: 'film > Workers List',showInbreadcrumb:true },

        },
        {
          path: '/worker/daily',
          component: () => import("@/views/worker/Daily"),
          meta: { title: 'Workers > Daily Work',showInbreadcrumb:true },

        },
        {
          path: '/worker/add',
          component: () => import("@/views/worker/Add"),
          meta: { title: 'Workers > Save Worker',showInbreadcrumb:true },

        },
        {
          path: '/403',
          component: () => import("@/views/error/403"),
          meta:{showInbreadcrumb:true }
        },
        {
          path: '/404',
          component: () => import("@/views/error/404"),
          meta: { showInbreadcrumb:true },

        }
      ]
  },

  {
    path: "*",
    redirect: '/404',
    meta:{
      showInbreadcrumb:true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = localStorage.getItem("token") !== null
  if (to.name !== 'Login' && !isAuthenticated) next({name: 'Login'})
  else next()
})

export default router
