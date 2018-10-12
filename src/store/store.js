import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    defaultComp: 'homePage',
    // defaultComp: 'orderList',
    userAvatar: '',
    userName: '',
    userDepart: '',
    userPower: ''
  },
  mutations: {
  },
  getters: {
    userAuthority (state) {
      let up = state.userPower
      if (up === '人事行政专员') {
        return '80004'
      } else if (up === '分公司总经理' || up === '') {
        return '80001'
      } else if (up === '销售总监' || up === '技术总监') {
        return '80005'
      } else if (up === 'BD经理') {
        return '80003'
      } else {
        return '80002'
      }
    }
  }
})

export default store
