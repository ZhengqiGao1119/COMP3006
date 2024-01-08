import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import "./assets/icons/index";
import moment from 'moment'
import locale from 'element-ui/lib/locale'

import lang from 'element-ui/lib/locale/lang/en'
// 设置语言
locale.use(lang)

Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
