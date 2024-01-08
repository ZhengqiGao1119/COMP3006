import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Layout from '../components/layout/Layout'
import Leaving from '../views/Leaving'
import Activity from '../views/activity/Activity'
import Info from '../views/statistical/Info'
import Setting from '../views/Setting'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
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
        path: '/leaving',
        component: Leaving,
        meta: { title: 'Cinema Activity' ,showInbreadcrumb:true}

      },
      {
        path: '/activity',
        component: Activity,
        meta: { title: 'active ranking' ,showInbreadcrumb:true}

      },
      {
        path: '/info',
        component: Info,
        meta: { title: 'Order Statistics' ,showInbreadcrumb:true}

      },
      {
        path: '/setting',
        component: Setting,
        meta: { title: 'personal settings' ,showInbreadcrumb:true}

      },
      {
        path: '/403',
        component: () => import("@/views/error/403"),
        meta:{showInbreadcrumb:true }

      },
      {
        path: '/404',
        component: () => import("@/views/error/404"),
        meta:{showInbreadcrumb:true }

      }
    ]
  },

  {
    path: "*",
    redirect: '/404',
    meta:{
      showInbreadcrumb:false
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
