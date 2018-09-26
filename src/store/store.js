import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    defaultComp: 'staffList',
    userAvatar: '',
    userName: '',
    userDepart: ''
  },
  mutations: {
    switchComp (state, cName) {
      state.defaultComp = cName
    }
  }
})

export default store
