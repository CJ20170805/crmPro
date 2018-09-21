import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    defaultComp: 'staffList'
  },
  mutations: {
    switchComp (state, cName) {
      state.defaultComp = cName
    }
  }
})

export default store
