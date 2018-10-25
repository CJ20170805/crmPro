import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import index from '../components/index'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: '/crm/',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '信息管理系统登陆'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: '信息管理系统'
      }
    }
  ]
})
