import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import Layout from '../components/layout/Layout'
import Home from '../views/Home'
import Info from '../views/film/Info'
import Ticket from '../views/film/Ticket'
import Cart from '../views/user/Cart'
import Order from '../views/user/Order'
import Setting from '../views/user/Setting'
import Films from '../views/Films'
import Activity from '../views/activity/Activity'
import Leaving from '../views/leaving/Leaving'
import Seat from '../views/film/Seat'
import Forget from '../views/Forget'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forget',
    name: 'Forget',
    component: Forget
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/film',
        component: () => import("../views/film/Index"),
        children: [
          {
            path: 'info',
            name: 'Info',
            component: Info
          },
          {
            path: 'ticket',
            name: 'Ticket',
            component: Ticket
          }
        ]
      },
      {
        path: '/user',
        component: () => import("../views/user/Index"),
        children: [
          {
            path: 'cart',
            component: Cart
          },
          {
            path: 'order',
            component: Order
          },
          {
            path: 'setting',
            component: Setting
          }
        ]
      },
      {
        path: '/films',
        component: Films
      },
      {
        path: '/activity',
        component: Activity
      },
      {
        path: '/leaving',
        component: Leaving
      },
      {
        path: '/seat',
        component: Seat
      },
      {
        path: '/404',
        component: () => import("@/views/error/404")
      },
    ]
  },

  {
    path: "*",
    redirect: '/404'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
