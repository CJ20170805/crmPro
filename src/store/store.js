import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    toStaffList: '123'
  },
  getters: {
    toSfList (state) {
      state.toStaffList = 'staffList'
    }
  }
})

export default store
