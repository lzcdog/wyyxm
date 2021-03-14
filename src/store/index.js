import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import user from './userinfo/index'
Vue.use(Vuex)

const state = {
  musicparms:[],
  duomusicparms:[],
  finmusicparms:[]
}
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules:{
    user: user
  }
})
export default store