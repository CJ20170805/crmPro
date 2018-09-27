// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import vuex from 'vuex'
import store from './store/store.js'
import 'babel-polyfill'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = Axios
Axios.defaults.baseURL = '/api'
Vue.use(vuex)

router.beforeEach((to, from, next) => {
  let LoginToken = sessionStorage.getItem('loginFlag')
  if (!LoginToken && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
