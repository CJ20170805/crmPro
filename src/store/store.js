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
    switchComp (state, cName) {
      state.defaultComp = cName
    }
  }
})

export default store
