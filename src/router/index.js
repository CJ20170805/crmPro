import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import index from '../components/index'
import staffAdd from '../components/staff/staff_add'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: 'admin'
      }
    },
    {
      path: '/staffAdd',
      name: 'staffAdd',
      component: staffAdd
    }
  ]
})
